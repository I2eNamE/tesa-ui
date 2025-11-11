/**
 * 02_MuiGridPage.tsx
 *
 * หน้านี้สอนเรื่อง Material-UI Grid System
 * ใช้สำหรับจัดวางองค์ประกอบต่างๆ บนหน้าเว็บแบบ responsive
 */

// 1. Import components จาก Material-UI
import { Container, Typography, Box, Button, Stack, Paper, Grid } from '@mui/material';
// 2. Import Link จาก react-router-dom
import { Link } from 'react-router-dom';

const MuiGridPage = () => {
  return (
    // 3. Container สำหรับจำกัดความกว้างของเนื้อหา
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 4. หัวข้อหน้า */}
      <Typography variant="h3" gutterBottom>
        02. Material-UI Grid System
      </Typography>

      {/* ========== ส่วนที่ 1: คำอธิบาย Grid System ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📐 Grid System คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          Grid System เป็นระบบจัดวาง layout แบบแบ่งเป็นช่อง (columns) 12 ช่อง
          ช่วยให้จัดวางองค์ประกอบได้อย่างยืดหยุ่นและ responsive
        </Typography>

        {/* 5. แสดงตัวอย่างโค้ด */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// 1. Import Grid (Grid เวอร์ชั่นใหม่)
import { Grid } from '@mui/material';

// 2. การใช้งานพื้นฐาน
<Grid container spacing={2}>
  <Grid size={6}>ช่องที่ 1 (50%)</Grid>
  <Grid size={6}>ช่องที่ 2 (50%)</Grid>
</Grid>

// 3. Responsive Grid
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
    Mobile: 100%, Tablet: 50%, Desktop: 33.33%
  </Grid>
</Grid>

// xs = extra small (mobile)
// sm = small (tablet portrait)
// md = medium (tablet landscape)
// lg = large (desktop)
// xl = extra large (large desktop)`}
          </Typography>
        </Box>

        {/* 6. อธิบายหลักการทำงาน */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔑 หลักการทำงาน
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>container</strong> - กำหนดให้เป็น Grid container (ภาชนะหลัก)</li>
            <li><strong>size</strong> - กำหนดขนาด (1-12) เช่น size=6 คือ 50% ของความกว้าง</li>
            <li><strong>spacing</strong> - ระยะห่างระหว่างแต่ละ Grid item</li>
            <li><strong>responsive</strong> - กำหนดขนาดต่างกันตามขนาดหน้าจอ</li>
          </ul>
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 2: ตัวอย่าง Grid แบบต่างๆ ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่าง Grid Layouts
        </Typography>

        {/* 7. ตัวอย่างที่ 1: Grid แบบเท่ากัน 3 ช่อง */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Grid แบบ 3 ช่องเท่ากัน
        </Typography>

        {/* 8. Grid container = สร้าง container หลัก */}
        {/* spacing={2} = ระยะห่างระหว่าง items = 2 * 8px = 16px */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* 9. Grid size={4} = 4/12 = 33.33% ของความกว้าง */}
          <Grid size={4}>
            <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 1 (33.33%)
            </Box>
          </Grid>

          {/* 10. ช่องที่ 2 */}
          <Grid size={4}>
            <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 2 (33.33%)
            </Box>
          </Grid>

          {/* 11. ช่องที่ 3 */}
          <Grid size={4}>
            <Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 3 (33.33%)
            </Box>
          </Grid>
        </Grid>

        {/* 12. ตัวอย่างที่ 2: Grid แบบ Responsive */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Grid แบบ Responsive
        </Typography>

        {/* 13. size เป็น object กำหนดขนาดต่างกันตามขนาดหน้าจอ */}
        {/* xs: 12 = Mobile เต็มหน้าจอ 100% */}
        {/* md: 6 = Tablet 50% */}
        {/* lg: 4 = Desktop 33.33% */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Box sx={{ bgcolor: '#f3e5f5', p: 2, borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="body2">
                Mobile: 100%<br />
                Tablet: 50%<br />
                Desktop: 33.33%
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Box sx={{ bgcolor: '#e1f5fe', p: 2, borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="body2">
                Mobile: 100%<br />
                Tablet: 50%<br />
                Desktop: 33.33%
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <Box sx={{ bgcolor: '#fff9c4', p: 2, borderRadius: 1, textAlign: 'center' }}>
              <Typography variant="body2">
                Mobile: 100%<br />
                Tablet: 50%<br />
                Desktop: 33.33%
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* 14. ตัวอย่างที่ 3: Grid แบบ Sidebar Layout */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Grid แบบ Sidebar Layout (3:9)
        </Typography>

        {/* 15. Layout แบบ Sidebar ซ้าย 25% เนื้อหาขวา 75% */}
        <Grid container spacing={2}>
          {/* 16. Sidebar - size={3} = 3/12 = 25% */}
          <Grid size={3}>
            <Box sx={{ bgcolor: '#ffebee', p: 2, borderRadius: 1, minHeight: 200 }}>
              <Typography variant="subtitle2" gutterBottom>
                Sidebar (25%)
              </Typography>
              <Typography variant="body2">
                เมนู, ฟิลเตอร์, หรือเนื้อหาเสริม
              </Typography>
            </Box>
          </Grid>

          {/* 17. Main Content - size={9} = 9/12 = 75% */}
          <Grid size={9}>
            <Box sx={{ bgcolor: '#e8eaf6', p: 2, borderRadius: 1, minHeight: 200 }}>
              <Typography variant="subtitle2" gutterBottom>
                Main Content (75%)
              </Typography>
              <Typography variant="body2">
                เนื้อหาหลัก, ข้อมูล, หรือตาราง
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* ========== Navigation Buttons ========== */}
      {/* 18. Stack สำหรับจัดปุ่มเรียงกัน */}
      <Stack direction="row" spacing={2}>
        {/* 19. ปุ่มกลับหน้าก่อน */}
        <Link to="/01-route" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Route
          </Button>
        </Link>

        {/* 20. ปุ่มไปหน้าถัดไป */}
        <Link to="/03-detection-card" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Detection Card
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

// 21. Export component
export default MuiGridPage;
