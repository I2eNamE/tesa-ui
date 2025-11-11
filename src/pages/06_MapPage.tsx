/**
 * หน้าสอนการใช้งาน MapComponent
 * แสดงแผนที่ Mapbox พร้อม markers และ popup
 */

import { Container, Typography, Box, Button, Stack, Paper, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import MapComponent from '../components/MapComponent';
import { type DetectedObject } from '../types/detection';

const MapPage = () => {
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
      <Typography variant="h3" gutterBottom>
        06. Map Component
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🗺️ MapComponent คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          MapComponent เป็น component สำหรับแสดงแผนที่ Mapbox พร้อม custom markers และ popup
        </Typography>

        <Alert severity="info" sx={{ mt: 2 }}>
          💡 <strong>Mapbox Token:</strong> ต้องตั้งค่า <code>VITE_MAPBOX_TOKEN</code> ในไฟล์ <code>.env</code> ก่อนใช้งาน
        </Alert>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          คลิกที่ marker บนแผนที่เพื่อดูรายละเอียดของวัตถุ
        </Typography>

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
