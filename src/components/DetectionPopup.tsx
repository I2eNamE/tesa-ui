/**
 * DetectionPopup.tsx
 *
 * Component สำหรับแสดงรายละเอียดของวัตถุที่ตรวจจับ
 * ใช้แสดงใน popup บนแผนที่
 */

// 1. Import components
import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { type DetectedObject } from '../types/detection';
import ImageViewer from './ImageViewer';

// 2. ประกาศ Props interface
interface DetectionPopupProps {
  object: DetectedObject;   // ข้อมูลวัตถุที่จะแสดง
  imagePath?: string;       // path ของรูปภาพ (optional)
}

const DetectionPopup = ({ object, imagePath }: DetectionPopupProps) => {
  // 3. สร้าง URL ของรูปภาพ (ถ้ามี)
  const imageUrl = imagePath
    ? `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${imagePath}`
    : null;

  // 4. ฟังก์ชันเลือก icon ตามประเภทวัตถุ
  const getObjectIcon = (type: string): string => {
    // 5. กำหนด mapping ระหว่างประเภทวัตถุกับ icon
    const iconMap: Record<string, string> = {
      person: 'mdi:account',      // icon คน
      vehicle: 'mdi:car',         // icon ยานพาหนะ
      car: 'mdi:car',             // icon รถยนต์
      truck: 'mdi:truck',         // icon รถบรรทุก
      bicycle: 'mdi:bike',        // icon จักรยาน
      bike: 'mdi:bike',
      motorcycle: 'mdi:motorbike', // icon มอเตอร์ไซค์
      drone: 'mdi:drone',         // icon โดรน
      default: 'mdi:map-marker',  // icon เริ่มต้น
    };

    // 6. คืนค่า icon ตามประเภท (lowercase) หรือ icon เริ่มต้น
    return iconMap[type.toLowerCase()] || iconMap.default;
  };

  return (
    // 7. Card component สำหรับ popup
    // minWidth: 280 = ความกว้างขั้นต่ำ 280px
    <Card sx={{ minWidth: 280 }}>
      {/* ========== รูปภาพ (ถ้ามี) ========== */}
      {/* 8. แสดงรูปภาพถ้ามี imageUrl */}
      {imageUrl && (
        <ImageViewer
          src={imageUrl}
          alt="Detection"
          width="100%"
          height={150}
          objectFit="cover"
        />
      )}

      {/* ========== เนื้อหา ========== */}
      {/* 9. CardContent - ส่วนเนื้อหาของ card */}
      <CardContent sx={{ p: 2 }}>
        {/* 10. Stack spacing={1.5} = ระยะห่างระหว่าง elements = 12px */}
        <Stack spacing={1.5}>
          {/* ========== Object ID ========== */}
          {/* 11. แสดง ID และ icon ของวัตถุ */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* 12. เรียกใช้ getObjectIcon เพื่อหา icon ที่เหมาะสม */}
            <Icon icon={getObjectIcon(object.type)} width={20} />

            {/* 13. แสดง object ID แบบตัวหนา */}
            <Typography variant="subtitle2" fontWeight="bold">
              {object.obj_id}
            </Typography>
          </Stack>

          {/* ========== Type and Size ========== */}
          {/* 14. แสดงประเภทและขนาดวัตถุ */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* 15. Icon tag */}
            <Icon icon="mdi:tag" width={18} />

            {/* 16. แสดง type และ size คั่นด้วย • */}
            <Typography variant="body2" color="text.secondary">
              {object.type} • {object.size}
            </Typography>
          </Stack>

          {/* ========== Objective ========== */}
          {/* 17. แสดงวัตถุประสงค์ของวัตถุ */}
          <Stack direction="row" spacing={1} alignItems="center">
            {/* 18. Icon target */}
            <Icon icon="mdi:target" width={18} />

            {/* 19. แสดง objective (unknown/our/enemy) */}
            <Typography variant="body2" color="text.secondary">
              {object.objective}
            </Typography>
          </Stack>

          {/* ========== Location (Lat/Lng) ========== */}
          {/* 20. แสดงพิกัดที่ตั้ง */}
          {/* alignItems="flex-start" = จัดให้อยู่ด้านบน */}
          <Stack direction="row" spacing={1} alignItems="flex-start">
            {/* 21. Icon map marker */}
            {/* marginTop: 2 = เลื่อนลงเล็กน้อยให้ตรงกับข้อความ */}
            <Icon icon="mdi:map-marker" width={18} style={{ marginTop: 2 }} />

            {/* 22. Box สำหรับแสดง lat และ lng */}
            <Box>
              {/* 23. แสดง Latitude */}
              {/* variant="caption" = ข้อความขนาดเล็กมาก */}
              {/* display="block" = แสดงเป็น block ขึ้นบรรทัดใหม่ */}
              <Typography variant="caption" color="text.secondary" display="block">
                Lat: {typeof object.lat === 'number' ? object.lat.toFixed(6) : object.lat}
              </Typography>

              {/* 24. แสดง Longitude */}
              <Typography variant="caption" color="text.secondary" display="block">
                Lng: {typeof object.lng === 'number' ? object.lng.toFixed(6) : object.lng}
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

// 25. Export component
export default DetectionPopup;
