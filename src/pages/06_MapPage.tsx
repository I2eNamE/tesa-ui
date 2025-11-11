/**
 * 06_MapPage.tsx
 *
 * หน้านี้สอนการใช้งาน MapComponent
 * แสดงแผนที่ Mapbox พร้อม markers และ popup
 */

// 1. Import components
import { Container, Typography, Box, Button, Stack, Paper, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import { type DetectedObject } from '../types/detection';

const MapPage = () => {
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
      size: 'large',
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* 3. หัวข้อหน้า */}
      <Typography variant="h3" gutterBottom>
        06. Map Component
      </Typography>

      {/* ========== ส่วนที่ 1: คำอธิบาย ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🗺️ MapComponent คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          MapComponent เป็น component สำหรับแสดงแผนที่ Mapbox พร้อมกับ:
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>Satellite Map</strong> - แผนที่ดาวเทียม</li>
            <li><strong>Custom Markers</strong> - markers แบบ custom พร้อม icon และสี</li>
            <li><strong>Pulse Animation</strong> - animation วงกลมขยายออกเพื่อดึงดูดสายตา</li>
            <li><strong>Click to Show Popup</strong> - คลิก marker เพื่อดูรายละเอียด</li>
            <li><strong>Dynamic Colors</strong> - แต่ละ object ID จะได้สีไม่ซ้ำกัน</li>
          </ul>
        </Typography>

        {/* 4. โค้ดตัวอย่าง */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2, mt: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// 1. Import MapComponent
import MapComponent from './components/MapComponent';
import { type DetectedObject } from './types/detection';

// 2. สร้างข้อมูล objects
const objects: DetectedObject[] = [
  {
    obj_id: 'obj_001',
    type: 'drone',
    lat: 14.297567,
    lng: 101.166279,
    objective: 'unknown',
    size: 'medium',
  },
];

// 3. ใช้งาน component
<MapComponent
  objects={objects}
  imagePath="/uploads/sample.jpg"
  cameraLocation="defence"
/>`}
          </Typography>
        </Box>

        {/* 5. อธิบายการทำงาน */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔧 การทำงาน
        </Typography>

        <Typography component="div">
          <ol>
            <li><strong>Initialize Map</strong> - สร้างแผนที่ Mapbox ตาม camera location</li>
            <li><strong>Create Markers</strong> - สร้าง custom markers สำหรับแต่ละวัตถุ
              <ul>
                <li>Icon ตามประเภทวัตถุ (drone, person, car, etc.)</li>
                <li>สีตาม object ID (hash-based color)</li>
                <li>Pulse animation รอบๆ marker</li>
              </ul>
            </li>
            <li><strong>Click Event</strong> - เมื่อคลิก marker จะ:
              <ul>
                <li>แสดง DetectionPopup พร้อมรายละเอียด</li>
                <li>Position popup ให้อยู่เหนือ marker</li>
              </ul>
            </li>
            <li><strong>Auto Update</strong> - อัพเดทตำแหน่ง popup เมื่อแผนที่เลื่อนหรือ zoom</li>
          </ol>
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          💡 <strong>Mapbox Token:</strong> ต้องตั้งค่า <code>VITE_MAPBOX_TOKEN</code> ในไฟล์ <code>.env</code> ก่อนใช้งาน
        </Alert>
      </Paper>

      {/* ========== ส่วนที่ 2: ตัวอย่าง Component ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          คลิกที่ marker บนแผนที่เพื่อดูรายละเอียดของวัตถุ
        </Typography>

        {/* 6. แสดง MapComponent */}
        {/* Box กำหนดความสูง 500px สำหรับแผนที่ */}
        <Box sx={{ height: 500, width: '100%', borderRadius: 1, overflow: 'hidden' }}>
          <MapComponent
            objects={sampleObjects}
            imagePath="/uploads/sample.jpg"
            cameraLocation="defence"
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          📍 ตัวอย่างนี้แสดง 3 markers:
          <ul>
            <li><strong>Drone</strong> (สีแดง-ส้ม) - พิกัด 14.297567, 101.166279</li>
            <li><strong>Person</strong> (สีน้ำเงิน) - พิกัด 14.297600, 101.166300</li>
            <li><strong>Car</strong> (สีเขียว) - พิกัด 14.297550, 101.166250</li>
          </ul>
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 3: Props ของ MapComponent ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📝 Props ของ MapComponent
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`interface MapComponentProps {
  objects: DetectedObject[];      // รายการวัตถุที่จะแสดงบนแผนที่ (required)
  imagePath?: string;             // path ของรูปภาพ (optional)
  cameraLocation?: string;        // 'defence' หรือ 'offence' (optional)
}`}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>objects</strong> - Array ของวัตถุที่ตรวจจับได้ แต่ละวัตถุต้องมี:
          <ul>
            <li><code>obj_id</code> - ID ของวัตถุ</li>
            <li><code>type</code> - ประเภท (drone, person, car, etc.)</li>
            <li><code>lat, lng</code> - พิกัดตำแหน่ง</li>
            <li><code>objective</code> - วัตถุประสงค์ (unknown, our, enemy)</li>
            <li><code>size</code> - ขนาด (small, medium, large)</li>
          </ul>
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>imagePath</strong> - path ของรูปภาพที่จะแสดงใน popup (optional)
        </Typography>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>cameraLocation</strong> - ตำแหน่งกล้อง เพื่อกำหนดจุดกึ่งกลางแผนที่:
          <ul>
            <li><code>'defence'</code> - พิกัด 14.297567, 101.166279</li>
            <li><code>'offence'</code> - พิกัด 14.286451, 101.171298</li>
          </ul>
        </Typography>
      </Paper>

      {/* ========== Navigation Buttons ========== */}
      <Stack direction="row" spacing={2}>
        <Link to="/05-image-viewer" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Image Viewer
          </Button>
        </Link>

        <Link to="/07-api-socket" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: API & Socket
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default MapPage;
