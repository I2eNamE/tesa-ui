/**
 * หน้าสอนการใช้งาน ImageViewer component
 * แสดงรูปภาพแบบ thumbnail และคลิกเพื่อขยาย
 */

import { Container, Typography, Box, Button, Stack, Paper, Grid, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageViewer from '../components/ImageViewer';

const ImageViewerPage = () => {
  const sampleImages = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        05. Image Viewer Component
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🖼️ ImageViewer คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          ImageViewer เป็น component สำหรับแสดงรูปภาพแบบ thumbnail
          เมื่อคลิกจะขยายเป็นภาพเต็มใน modal popup
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          💡 คลิกที่รูปภาพเพื่อขยายดูแบบเต็ม
        </Alert>

        <Grid container spacing={2}>
          {sampleImages.map((src, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Image {index + 1}
                </Typography>
                <ImageViewer
                  src={src}
                  alt={`Sample Image ${index + 1}`}
                  width="100%"
                  height={200}
                  objectFit="cover"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Stack direction="row" spacing={2}>
        <Link to="/04-detection-popup" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Detection Popup
          </Button>
        </Link>
        <Link to="/06-map" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Map Component
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default ImageViewerPage;
