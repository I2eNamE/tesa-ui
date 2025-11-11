/**
 * 01_RoutePage.tsx
 *
 * หน้านี้สอนเรื่อง React Router - การทำ routing ในแอพพลิเคชั่น
 * ใช้สำหรับสลับไปมาระหว่างหน้าต่างๆ โดยไม่ต้อง refresh หน้า
 */

// 1. Import components จาก react-router-dom
import { Link } from 'react-router-dom';
// 2. Import Material-UI components สำหรับสร้าง UI
import { Container, Typography, Box, Button, Stack, Paper } from '@mui/material';

const RoutePage = () => {
  return (
    // 3. Container คือ component ที่ช่วยจัดขอบเขตความกว้างของเนื้อหา
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 4. Typography สำหรับแสดงข้อความ variant="h3" = หัวข้อขนาดใหญ่ */}
      <Typography variant="h3" gutterBottom>
        01. React Router
      </Typography>

      {/* 5. Paper คือ component ที่สร้าง card พื้นหลังสีขาว */}
      <Paper sx={{ p: 3, mb: 3 }}>
        {/* 6. Typography variant="h5" = หัวข้อขนาดกลาง */}
        <Typography variant="h5" gutterBottom>
          📚 React Router คืออะไร?
        </Typography>

        {/* 7. Typography variant="body1" = ข้อความธรรมดา */}
        <Typography variant="body1" paragraph>
          React Router เป็น library ที่ใช้สำหรับจัดการ routing ในแอพพลิเคชั่น React
        </Typography>

        {/* 8. Box เป็น container ทั่วไป ใช้จัดการ layout และ styling */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          {/* 9. Typography component="pre" = แสดงโค้ดแบบ preformatted */}
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// 1. ติดตั้ง React Router
npm install react-router-dom

// 2. ตัวอย่างการใช้งาน
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

// 3. สร้าง routes
<BrowserRouter>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
  </Routes>
</BrowserRouter>

// 4. สร้าง Link เพื่อเปลี่ยนหน้า
<Link to="/about">ไปหน้า About</Link>`}
          </Typography>
        </Box>

        {/* 10. Typography variant="h6" = หัวข้อขนาดเล็ก */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔑 Components หลักของ React Router
        </Typography>

        {/* 11. Typography component="div" = แสดงเนื้อหาแบบ block */}
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

      {/* 12. Stack คือ component ที่จัดเรียง elements แบบ flex */}
      {/* direction="row" = เรียงแนวนอน, spacing={2} = ระยะห่างระหว่าง elements */}
      <Stack direction="row" spacing={2}>
        {/* 13. Link component จาก react-router-dom ใช้สำหรับเปลี่ยนหน้า */}
        {/* to="/02-mui-grid" = path ที่ต้องการไปถึง */}
        {/* style={{ textDecoration: 'none' }} = ลบเส้นใต้ของลิงก์ */}
        <Link to="/02-mui-grid" style={{ textDecoration: 'none' }}>
          {/* 14. Button component จาก Material-UI */}
          {/* variant="contained" = ปุ่มแบบมีพื้นหลังสี */}
          <Button variant="contained">
            ไปหน้าถัดไป: MUI Grid
          </Button>
        </Link>

        {/* 15. Button variant="outlined" = ปุ่มแบบมีเฉพาะขอบ */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            กลับหน้าแรก
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

// 16. Export component เพื่อใช้ในไฟล์อื่น
export default RoutePage;
