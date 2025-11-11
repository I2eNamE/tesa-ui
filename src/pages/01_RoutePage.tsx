/**
 * หน้าสอนเรื่อง React Router - การทำ routing ในแอพพลิเคชั่น
 */

import { Link } from 'react-router-dom';
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';

const RoutePage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        01. React Router
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📚 React Router คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          React Router เป็น library ที่ใช้สำหรับจัดการ routing ในแอพพลิเคชั่น React
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// ติดตั้ง React Router
npm install react-router-dom

// ตัวอย่างการใช้งาน
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// สร้าง routes
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</BrowserRouter>

// สร้าง Link เพื่อเปลี่ยนหน้า
<Link to="/about">ไปหน้า About</Link>`}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔑 Components หลักของ React Router
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>BrowserRouter</strong> - component หลักที่ wrap ทั้งแอพ</li>
            <li><strong>Routes</strong> - container สำหรับกลุ่ม Route</li>
            <li><strong>Route</strong> - กำหนด path และ component ที่จะแสดง</li>
            <li><strong>Link</strong> - สร้างลิงก์เปลี่ยนหน้าโดยไม่ refresh</li>
            <li><strong>useNavigate</strong> - hook สำหรับเปลี่ยนหน้าแบบ programmatic</li>
            <li><strong>useParams</strong> - hook สำหรับดึง parameters จาก URL</li>
          </ul>
        </Typography>
      </Paper>

      <Stack direction="row" spacing={2}>
        <Link to="/02-mui-grid" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: MUI Grid
          </Button>
        </Link>

        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            กลับหน้าแรก
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default RoutePage;
