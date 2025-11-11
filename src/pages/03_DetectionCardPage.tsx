/**
 * หน้าสอนการใช้งาน DetectionCard component
 * แสดงตัวอย่าง card สำหรับแสดงข้อมูลการตรวจจับวัตถุ
 */

import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import DetectionCard from '../components/DetectionCard';
import { type DetectionEvent } from '../types/detection';

const DetectionCardPage = () => {
  const sampleDetection: DetectionEvent = {
    id: 1,
    cam_id: '550e8400-e29b-41d4-a716-446655440000',
    timestamp: '2025-01-11T10:30:00.000Z',
    image_path: '/uploads/sample.jpg',
    camera: {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Team Alpha',
      location: 'defence',
    },
    objects: [
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
    ],
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        03. Detection Card Component
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🎴 Detection Card คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          Detection Card เป็น component สำหรับแสดงข้อมูลการตรวจจับวัตถุในรูปแบบ card
          ประกอบด้วย รูปภาพ, เวลา, ข้อมูลกล้อง, และรายการวัตถุที่ตรวจพบ
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// Import component และ type
import DetectionCard from './components/DetectionCard';
import { type DetectionEvent } from './types/detection';

// สร้างข้อมูล detection
const detection: DetectionEvent = {
  id: 1,
  cam_id: '550e8400-...',
  timestamp: '2025-01-11T10:30:00.000Z',
  image_path: '/uploads/sample.jpg',
  camera: { ... },
  objects: [ ... ],
};

// ใช้งาน component
<DetectionCard detection={detection} />`}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔧 โครงสร้างของ Detection Card
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>รูปภาพ (25% ด้านซ้าย)</strong> - แสดงภาพที่บันทึกจากกล้อง</li>
            <li><strong>เวลา</strong> - แสดงวันเวลาที่ตรวจจับ (รูปแบบไทย)</li>
            <li><strong>Camera ID</strong> - แสดง UUID ของกล้อง (8 ตัวแรก)</li>
            <li><strong>Detected Objects</strong> - จำนวนวัตถุที่ตรวจพบ</li>
            <li><strong>Object Chips</strong> - แสดงแต่ละวัตถุเป็น chip (type + size)</li>
            <li><strong>พิกัด</strong> - แสดง lat/lng และ objective (3 วัตถุแรก)</li>
          </ul>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <DetectionCard detection={sampleDetection} />

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          💡 ทดลองเปลี่ยนข้อมูลใน <code>sampleDetection</code> เพื่อดูการแสดงผลที่แตกต่างกัน
        </Typography>
      </Paper>

      <Stack direction="row" spacing={2}>
        <Link to="/02-mui-grid" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: MUI Grid
          </Button>
        </Link>
        <Link to="/04-detection-popup" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Detection Popup
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default DetectionCardPage;
