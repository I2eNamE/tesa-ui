/**
 * 04_DetectionPopupPage.tsx
 *
 * หน้านี้สอนการใช้งาน DetectionPopup component
 * แสดงรายละเอียดของวัตถุที่ตรวจจับได้
 */

// 1. Import components
import { Container, Typography, Box, Button, Stack, Paper, Grid2 } from '@mui/material';
import { Link } from 'react-router-dom';
import DetectionPopup from '../components/DetectionPopup';
import { type DetectedObject } from '../types/detection';

const DetectionPopupPage = () => {
  // 2. สร้างข้อมูลตัวอย่างสำหรับทดสอบ
  const sampleObjects: DetectedObject[] = [
    {
      obj_id: 'obj_001',
      type: 'drone',
      lat: 14.297567,
      lng: 101.166279,
      objective: 'unknown',
      size: 'medium',
    },
    {
      obj_id: 'obj_002',
      type: 'person',
      lat: 14.297600,
      lng: 101.166300,
      objective: 'our',
      size: 'large',
    },
    {
      obj_id: 'obj_003',
      type: 'car',
      lat: 14.297550,
      lng: 101.166250,
      objective: 'enemy',
      size: 'small',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 3. หัวข้อหน้า */}
      <Typography variant="h3" gutterBottom>
        04. Detection Popup Component
      </Typography>

      {/* ========== ส่วนที่ 1: คำอธิบาย ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📋 Detection Popup คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          DetectionPopup เป็น component สำหรับแสดงรายละเอียดของวัตถุที่ตรวจจับได้
          ใช้แสดงใน popup บนแผนที่หรือใช้แยกต่างหากก็ได้
        </Typography>

        {/* 4. โค้ดตัวอย่าง */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// 1. Import component และ type
import DetectionPopup from './components/DetectionPopup';
import { type DetectedObject } from './types/detection';

// 2. สร้างข้อมูล object
const object: DetectedObject = {
  obj_id: 'obj_001',
  type: 'drone',
  lat: 14.297567,
  lng: 101.166279,
  objective: 'unknown',
  size: 'medium',
};

// 3. ใช้งาน component
<DetectionPopup
  object={object}
  imagePath="/uploads/sample.jpg"
/>`}
          </Typography>
        </Box>

        {/* 5. อธิบายโครงสร้าง */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔧 โครงสร้างของ Detection Popup
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>รูปภาพ (ถ้ามี)</strong> - แสดงรูปที่บันทึกจากกล้อง (optional)</li>
            <li><strong>Object ID</strong> - แสดง ID และ icon ตามประเภท</li>
            <li><strong>Type & Size</strong> - แสดงประเภทและขนาดวัตถุ</li>
            <li><strong>Objective</strong> - แสดงวัตถุประสงค์ (unknown/our/enemy)</li>
            <li><strong>Location</strong> - แสดงพิกัด Latitude และ Longitude</li>
          </ul>
        </Typography>

        {/* 6. Icon Mapping */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🎨 Icon Mapping
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// ฟังก์ชันเลือก icon ตามประเภทวัตถุ
const getObjectIcon = (type: string): string => {
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
  return iconMap[type.toLowerCase()] || iconMap.default;
};`}
          </Typography>
        </Box>
      </Paper>

      {/* ========== ส่วนที่ 2: ตัวอย่าง Component ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        {/* 7. แสดง DetectionPopup หลายแบบ */}
        <Grid2 container spacing={3}>
          {/* 8. Popup แต่ละอัน */}
          {sampleObjects.map((obj) => (
            <Grid2 key={obj.obj_id} size={{ xs: 12, md: 4 }}>
              <DetectionPopup object={obj} imagePath="/uploads/sample.jpg" />
            </Grid2>
          ))}
        </Grid2>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          💡 ทดลองเปลี่ยนข้อมูลใน <code>sampleObjects</code> เพื่อดูการแสดงผลที่แตกต่างกัน
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 3: Props ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📝 Props ของ DetectionPopup
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`interface DetectionPopupProps {
  object: DetectedObject;   // ข้อมูลวัตถุที่จะแสดง (required)
  imagePath?: string;       // path ของรูปภาพ (optional)
}`}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>object</strong> - ข้อมูลวัตถุที่ตรวจจับได้ ต้องมีฟิลด์:
          <ul>
            <li><code>obj_id</code> - ID ของวัตถุ</li>
            <li><code>type</code> - ประเภท (drone, person, car, etc.)</li>
            <li><code>lat, lng</code> - พิกัดตำแหน่ง</li>
            <li><code>objective</code> - วัตถุประสงค์ (unknown, our, enemy)</li>
            <li><code>size</code> - ขนาด (small, medium, large)</li>
          </ul>
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>imagePath</strong> - path ของรูปภาพ (optional) เช่น <code>"/uploads/images/2025/01/11/image.jpg"</code>
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 4: การใช้งานใน MapComponent ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🗺️ การใช้งานใน MapComponent
        </Typography>

        <Typography variant="body1" paragraph>
          DetectionPopup ถูกใช้ใน MapComponent เพื่อแสดงรายละเอียดเมื่อคลิก marker:
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// ใน MapComponent
const [selectedObject, setSelectedObject] = useState<DetectedObject | null>(null);

// เมื่อคลิก marker
el.addEventListener('click', () => {
  setSelectedObject(obj);  // เก็บ object ที่เลือก
});

// แสดง popup
{selectedObject && (
  <Box sx={{ position: 'fixed', ... }}>
    <DetectionPopup
      object={selectedObject}
      imagePath={imagePath}
    />
  </Box>
)}`}
          </Typography>
        </Box>
      </Paper>

      {/* ========== Navigation Buttons ========== */}
      <Stack direction="row" spacing={2}>
        <Link to="/03-detection-card" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Detection Card
          </Button>
        </Link>

        <Link to="/05-image-viewer" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Image Viewer
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default DetectionPopupPage;
