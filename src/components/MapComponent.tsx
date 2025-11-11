/**
 * MapComponent.tsx
 *
 * Component สำหรับแสดงแผนที่ Mapbox พร้อม markers ของวัตถุที่ตรวจจับได้
 * คลิก marker เพื่อแสดงรายละเอียดใน popup
 */

// 1. Import hooks และ libraries
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Box, IconButton } from '@mui/material';
import { Icon } from '@iconify/react';

// 2. Import types และ components
import { type DetectedObject } from '../types/detection';
import DetectionPopup from './DetectionPopup';

// 3. Import Mapbox CSS
import 'mapbox-gl/dist/mapbox-gl.css';

// 4. โหลด Iconify สำหรับใช้ dynamic icons
// ตรวจสอบว่าอยู่ใน browser environment
if (typeof window !== 'undefined') {
  const script = document.createElement('script');
  script.src = 'https://code.iconify.design/3/3.1.0/iconify.min.js';
  // 5. ถ้ายังไม่มี script นี้ ให้เพิ่มเข้าไป
  if (!document.querySelector('script[src*="iconify"]')) {
    document.head.appendChild(script);
  }
}

// 6. กำหนดตำแหน่งพื้นฐานของกล้อง 2 จุด
const LOCATIONS = {
  defence: { lng: 101.166279, lat: 14.297567 },   // 7. จุดที่ 1: Defence
  offence: { lng: 101.171298, lat: 14.286451 },   // 8. จุดที่ 2: Offence
};

// 9. ประกาศ Props interface
interface MapComponentProps {
  objects: DetectedObject[];      // 10. รายการวัตถุที่จะแสดงบนแผนที่
  imagePath?: string;             // 11. path ของรูปภาพ (optional)
  cameraLocation?: string;        // 12. ตำแหน่งกล้อง 'defence' หรือ 'offence'
}

const MapComponent = ({ objects, imagePath, cameraLocation }: MapComponentProps) => {
  // ========== Refs ========== //

  // 13. Ref สำหรับ container ของแผนที่
  const mapContainer = useRef<HTMLDivElement>(null);

  // 14. Ref สำหรับเก็บ map instance
  const map = useRef<mapboxgl.Map | null>(null);

  // 15. Ref สำหรับเก็บ markers ทั้งหมด
  const markers = useRef<mapboxgl.Marker[]>([]);

  // 16. Ref สำหรับเก็บ marker ที่กำลังถูกเลือก
  const selectedMarkerRef = useRef<HTMLDivElement | null>(null);

  // ========== States ========== //

  // 17. State สำหรับเก็บวัตถุที่ถูกเลือก
  const [selectedObject, setSelectedObject] = useState<DetectedObject | null>(null);

  // 18. State สำหรับตำแหน่งของ popup card
  const [cardPosition, setCardPosition] = useState<{ x: number; y: number } | null>(null);

  // 19. ตั้งค่า Mapbox access token จาก environment variable
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  // ========== Helper Functions ========== //

  // 20. ฟังก์ชันหาจุดกึ่งกลางแผนที่ตาม camera location
  const getMapCenter = () => {
    if (cameraLocation === 'defence') return [LOCATIONS.defence.lng, LOCATIONS.defence.lat];
    if (cameraLocation === 'offence') return [LOCATIONS.offence.lng, LOCATIONS.offence.lat];
    return [101.166279, 14.297567]; // 21. default location
  };

  // 22. ฟังก์ชันหา icon name ตามประเภทวัตถุ
  const getIconName = (type: string): string => {
    // 23. กำหนด mapping ระหว่างประเภทวัตถุกับ icon
    const iconMap: Record<string, string> = {
      person: 'mdi:account',              // icon คน
      car: 'mdi:car',                     // icon รถยนต์
      truck: 'mdi:truck',                 // icon รถบรรทุก
      bike: 'mdi:bike',                   // icon จักรยาน
      drone: 'healthicons:drone',         // icon โดรน
      default: 'mdi:map-marker',          // icon เริ่มต้น
    };
    // 24. คืนค่า icon ตามประเภท (lowercase)
    return iconMap[type.toLowerCase()] || iconMap.default;
  };

  // 25. ฟังก์ชันสร้างสีจาก object ID (แต่ละ ID จะได้สีไม่ซ้ำกัน)
  const getColorForObjectId = (objectId: string): string => {
    // 26. Array ของสีที่หลากหลาย
    const colors = [
      '#FF5722', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0',
      '#00BCD4', '#E91E63', '#FF9800', '#009688', '#F44336',
      '#3F51B5', '#8BC34A', '#FFEB3B', '#673AB7', '#00E676',
    ];

    // 27. สร้าง hash จาก object_id
    let hash = 0;
    for (let i = 0; i < objectId.length; i++) {
      hash = objectId.charCodeAt(i) + ((hash << 5) - hash);
    }

    // 28. ใช้ hash เลือกสี
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };

  // 29. ฟังก์ชันปิด popup
  const handleClose = () => {
    setSelectedObject(null);
    setCardPosition(null);
    selectedMarkerRef.current = null;
  };

  // ========== Effects ========== //

  // 30. Effect: สร้างแผนที่ (run ครั้งเดียวตอน mount)
  useEffect(() => {
    // 31. ตรวจสอบว่ามี container
    if (!mapContainer.current) return;

    // 32. สร้าง Mapbox Map instance
    map.current = new mapboxgl.Map({
      container: mapContainer.current,                    // 33. DOM element ที่จะแสดงแผนที่
      style: 'mapbox://styles/mapbox/satellite-streets-v12',  // 34. สไตล์แผนที่ (ดาวเทียม)
      center: getMapCenter() as [number, number],        // 35. จุดกึ่งกลาง [lng, lat]
      zoom: 17,                                          // 36. ระดับ zoom (17 = ใกล้มาก)
    });

    // 37. Cleanup function - ลบแผนที่เมื่อ component unmount
    return () => {
      map.current?.remove();
    };
  }, []); // 38. Dependencies = [] หมายถึง run ครั้งเดียว

  // 39. Effect: อัพเดทจุดกึ่งกลางแผนที่เมื่อ camera location เปลี่ยน
  useEffect(() => {
    if (map.current && cameraLocation) {
      // 40. ใช้ flyTo สำหรับเคลื่อนแผนที่แบบ animation
      map.current.flyTo({
        center: getMapCenter() as [number, number],
        zoom: 17,
        duration: 1000, // 41. ระยะเวลา animation (1 วินาที)
      });
    }
  }, [cameraLocation]); // 42. Run เมื่อ cameraLocation เปลี่ยน

  // 43. Effect: สร้าง markers สำหรับวัตถุทั้งหมด
  useEffect(() => {
    if (!map.current) return;

    // 44. ลบ markers เก่าทั้งหมด
    markers.current.forEach((marker) => marker.remove());
    markers.current = [];

    // 45. ถ้าไม่มีวัตถุ ให้หยุด
    if (objects.length === 0) return;

    // 46. สร้าง marker สำหรับแต่ละวัตถุ
    objects.forEach((obj) => {
      const color = getColorForObjectId(obj.obj_id);   // 47. หาสีของวัตถุ
      const iconName = getIconName(obj.type);          // 48. หา icon ของวัตถุ

      // 49. สร้าง DOM element สำหรับ marker
      const el = document.createElement('div');
      el.className = 'marker';
      el.style.cssText = `
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;

      // 50. สร้างวงกลม pulse animation (วงกลมขยายออก)
      const pulseCircle = document.createElement('div');
      pulseCircle.className = 'pulse-circle';
      pulseCircle.style.cssText = `
        position: absolute;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background-color: ${color};
        opacity: 0.4;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        animation: pulse 2s ease-out infinite;  /* 51. animation ชื่อ 'pulse' วนไป infinite */
        pointer-events: none;                    /* 52. ไม่ให้คลิกได้ (คลิกผ่าน) */
      `;

      // 53. สร้าง container สำหรับ icon
      const iconContainer = document.createElement('div');
      iconContainer.className = 'iconify-marker';
      iconContainer.style.cssText = `
        cursor: pointer;                         /* 54. cursor รูปมือ */
        position: relative;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 50%;                      /* 55. ทำเป็นวงกลม */
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 3px solid ${color};              /* 56. ขอบสีตาม object */
      `;

      // 57. สร้าง icon element ด้วย Iconify
      const iconElement = document.createElement('span');
      iconElement.className = 'iconify';
      iconElement.setAttribute('data-icon', iconName);  // 58. ตั้งค่า icon
      iconElement.style.cssText = `
        color: ${color};
        font-size: 24px;
      `;

      // 59. ประกอบ DOM elements เข้าด้วยกัน
      iconContainer.appendChild(iconElement);
      el.appendChild(pulseCircle);
      el.appendChild(iconContainer);

      // 60. เพิ่ม event listener เมื่อคลิก marker
      el.addEventListener('click', (e) => {
        e.stopPropagation();              // 61. หยุดไม่ให้ event ลงไปที่ map
        setSelectedObject(obj);           // 62. เลือกวัตถุนี้
        selectedMarkerRef.current = el;   // 63. เก็บ reference ของ marker

        // 64. คำนวณตำแหน่งของ popup card
        const rect = el.getBoundingClientRect();
        setCardPosition({
          x: rect.left + rect.width / 2,   // 65. กึ่งกลางแนวนอน
          y: rect.top,                      // 66. ด้านบนของ marker
        });
      });

      // 67. แปลง lat/lng เป็น number
      const lat = typeof obj.lat === 'number' ? obj.lat : parseFloat(obj.lat);
      const lng = typeof obj.lng === 'number' ? obj.lng : parseFloat(obj.lng);

      // 68. สร้าง Mapbox Marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])           // 69. ตั้งตำแหน่ง [lng, lat]
        .addTo(map.current!);            // 70. เพิ่มลงแผนที่

      // 71. เก็บ marker ไว้ใน array
      markers.current.push(marker);
    });
  }, [objects, imagePath]); // 72. Run เมื่อ objects หรือ imagePath เปลี่ยน

  // 73. Effect: อัพเดทตำแหน่ง popup เมื่อแผนที่เลื่อนหรือ zoom
  useEffect(() => {
    if (!map.current || !selectedMarkerRef.current) return;

    // 74. ฟังก์ชันอัพเดทตำแหน่ง popup
    const updateCardPosition = () => {
      if (selectedMarkerRef.current) {
        const rect = selectedMarkerRef.current.getBoundingClientRect();
        setCardPosition({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
      }
    };

    // 75. ฟัง event 'move' (แผนที่เลื่อน)
    map.current.on('move', updateCardPosition);

    // 76. ฟัง event 'zoom' (ซูมแผนที่)
    map.current.on('zoom', updateCardPosition);

    // 77. Cleanup - เอา event listeners ออก
    return () => {
      map.current?.off('move', updateCardPosition);
      map.current?.off('zoom', updateCardPosition);
    };
  }, [selectedObject]); // 78. Run เมื่อ selectedObject เปลี่ยน

  // ========== Render ========== //

  return (
    // 79. Box หลัก
    <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* 80. CSS Animation สำหรับ pulse effect */}
      <style>
        {`
          @keyframes pulse {
            0% {
              transform: translate(-50%, -50%) scale(0.5);
              opacity: 0.8;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.2);
              opacity: 0.4;
            }
            100% {
              transform: translate(-50%, -50%) scale(1.8);
              opacity: 0;
            }
          }
        `}
      </style>

      {/* 81. Container ของแผนที่ */}
      <Box
        ref={mapContainer}
        sx={{
          height: '100%',
          width: '100%',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      />

      {/* 82. แสดง Detection Popup เมื่อมี selectedObject */}
      {selectedObject && cardPosition && (
        <Box
          sx={{
            position: 'fixed',                      // 83. ตำแหน่งแบบ fixed
            left: cardPosition.x,                   // 84. ตำแหน่ง x
            top: cardPosition.y,                    // 85. ตำแหน่ง y
            transform: 'translate(-50%, -100%)',    // 86. ขยับให้อยู่เหนือ marker
            zIndex: 9999,                           // 87. ให้อยู่บนสุด
            mb: 1,
          }}
        >
          {/* 88. ปุ่มปิด popup */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'white',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <Icon icon="mdi:close" width={16} />
          </IconButton>

          {/* 89. แสดง DetectionPopup component */}
          <DetectionPopup object={selectedObject} imagePath={imagePath} />
        </Box>
      )}
    </Box>
  );
};

// 90. Export component
export default MapComponent;
