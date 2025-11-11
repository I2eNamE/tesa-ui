/**
 * หน้าสอนการใช้งาน DetectionPopup component
 * แสดงรายละเอียดของวัตถุที่ตรวจจับได้
 */

import { Container, Typography, Box, Button, Stack, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DetectionPopup from '../components/DetectionPopup';
import { type DetectedObject } from '../types/detection';

const DetectionPopupPage = () => {
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
      <Typography variant="h3" gutterBottom>
        04. Detection Popup Component
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📋 Detection Popup คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          DetectionPopup เป็น component สำหรับแสดงรายละเอียดของวัตถุที่ตรวจจับได้
          ใช้แสดงใน popup บนแผนที่หรือใช้แยกต่างหากก็ได้
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <Grid container spacing={3}>
          {sampleObjects.map((obj) => (
            <Grid key={obj.obj_id} size={{ xs: 12, md: 4 }}>
              <DetectionPopup object={obj} imagePath="/uploads/sample.jpg" />
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          💡 ทดลองเปลี่ยนข้อมูลใน <code>sampleObjects</code> เพื่อดูการแสดงผลที่แตกต่างกัน
        </Typography>
      </Paper>

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
