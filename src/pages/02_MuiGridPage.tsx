/**
 * หน้าสอนเรื่อง Material-UI Grid System
 * ใช้สำหรับจัดวางองค์ประกอบต่างๆ บนหน้าเว็บแบบ responsive
 */

import { Container, Typography, Box, Button, Stack, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const MuiGridPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        02. Material-UI Grid System
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📐 Grid System คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          Grid System เป็นระบบจัดวาง layout แบบแบ่งเป็นช่อง (columns) 12 ช่อง
          ช่วยให้จัดวางองค์ประกอบได้อย่างยืดหยุ่นและ responsive
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// Import Grid
import { Grid } from '@mui/material';

// การใช้งานพื้นฐาน
<Grid container spacing={2}>
  <Grid size={6}>ช่องที่ 1 (50%)</Grid>
  <Grid size={6}>ช่องที่ 2 (50%)</Grid>
</Grid>

// Responsive Grid
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6, lg: 4 }}>
    Mobile: 100%, Tablet: 50%, Desktop: 33.33%
  </Grid>
</Grid>`}
          </Typography>
        </Box>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔑 หลักการทำงาน
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>container</strong> - กำหนดให้เป็น Grid container</li>
            <li><strong>size</strong> - กำหนดขนาด (1-12) เช่น size=6 คือ 50%</li>
            <li><strong>spacing</strong> - ระยะห่างระหว่าง Grid items</li>
            <li><strong>responsive</strong> - กำหนดขนาดต่างกันตามขนาดหน้าจอ</li>
          </ul>
        </Typography>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่าง Grid Layouts
        </Typography>

        {/* Grid 3 ช่องเท่ากัน */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1. Grid แบบ 3 ช่องเท่ากัน
        </Typography>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={4}>
            <Box sx={{ bgcolor: '#e3f2fd', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 1 (33.33%)
            </Box>
          </Grid>
          <Grid size={4}>
            <Box sx={{ bgcolor: '#e8f5e9', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 2 (33.33%)
            </Box>
          </Grid>
          <Grid size={4}>
            <Box sx={{ bgcolor: '#fff3e0', p: 2, borderRadius: 1, textAlign: 'center' }}>
              ช่องที่ 3 (33.33%)
            </Box>
          </Grid>
        </Grid>

        {/* Grid Responsive */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          2. Grid แบบ Responsive
        </Typography>

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

        {/* Grid Sidebar Layout */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          3. Grid แบบ Sidebar Layout (3:9)
        </Typography>

        <Grid container spacing={2}>
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

      <Stack direction="row" spacing={2}>
        <Link to="/01-route" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Route
          </Button>
        </Link>
        <Link to="/03-detection-card" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Detection Card
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default MuiGridPage;
