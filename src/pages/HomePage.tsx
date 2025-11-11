/**
 * HomePage.tsx
 *
 * หน้าแรกของแอพพลิเคชั่น - แสดงเมนูไปยังหน้าต่างๆ ในการเรียนรู้
 */

// 1. Import components
import { Container, Typography, Grid, Card, CardContent, CardActionArea, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';

const HomePage = () => {
  // 2. useNavigate hook สำหรับเปลี่ยนหน้า
  const navigate = useNavigate();

  // 3. กำหนดรายการหน้าทั้งหมด
  const pages = [
    {
      title: '01. React Router',
      description: 'เรียนรู้การทำ routing และการเปลี่ยนหน้า',
      path: '/01-route',
      icon: 'mdi:routes',
      color: '#2196F3',
    },
    {
      title: '02. MUI Grid System',
      description: 'เรียนรู้การจัดวาง layout ด้วย Grid',
      path: '/02-mui-grid',
      icon: 'mdi:grid',
      color: '#4CAF50',
    },
    {
      title: '03. Detection Card',
      description: 'Component แสดงข้อมูลการตรวจจับ',
      path: '/03-detection-card',
      icon: 'mdi:card-text',
      color: '#FF9800',
    },
    {
      title: '04. Detection Popup',
      description: 'Component แสดงรายละเอียดวัตถุ',
      path: '/04-detection-popup',
      icon: 'mdi:information',
      color: '#9C27B0',
    },
    {
      title: '05. Image Viewer',
      description: 'Component แสดงและขยายรูปภาพ',
      path: '/05-image-viewer',
      icon: 'mdi:image',
      color: '#E91E63',
    },
    {
      title: '06. Map Component',
      description: 'แผนที่แสดง markers และ popup',
      path: '/06-map',
      icon: 'mdi:map',
      color: '#00BCD4',
    },
    {
      title: '07. API & Socket',
      description: 'เรียกใช้ API และเชื่อมต่อ Socket.IO',
      path: '/07-api-socket',
      icon: 'mdi:api',
      color: '#F44336',
    },
    {
      title: '08. Dashboard',
      description: 'หน้า Dashboard รวมทุกอย่าง',
      path: '/08-dashboard',
      icon: 'mdi:view-dashboard',
      color: '#3F51B5',
    },
  ];

  return (
    // 4. Container หลัก
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 5. หัวข้อหลัก */}
      <Typography variant="h2" gutterBottom align="center">
        TESA UI Learning
      </Typography>

      {/* 6. คำอธิบาย */}
      <Typography variant="h6" paragraph align="center" color="text.secondary" sx={{ mb: 4 }}>
        เรียนรู้การสร้างแอพพลิเคชั่น TESA ทีละขั้นตอน
      </Typography>

      {/* 7. Grid สำหรับแสดงการ์ด */}
      {/* spacing={3} = ระยะห่าง 24px */}
      <Grid container spacing={3}>
        {/* 8. วนลูปสร้าง Card แต่ละอัน */}
        {pages.map((page) => (
          // 9. Grid item - responsive (mobile: 100%, tablet: 50%, desktop: 33.33%) */}
          <Grid key={page.path} size={{ xs: 12, md: 6, lg: 4 }}>
            {/* 10. Card component */}
            <Card
              sx={{
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  // 11. เมื่อ hover ให้ขยายเล็กน้อย
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
              }}
            >
              {/* 12. CardActionArea ทำให้ทั้ง card คลิกได้ */}
              <CardActionArea onClick={() => navigate(page.path)}>
                {/* 13. ส่วนบนของ card - สีตามที่กำหนด */}
                <Box
                  sx={{
                    height: 120,
                    bgcolor: page.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {/* 14. Icon ขนาดใหญ่สีขาว */}
                  <Icon icon={page.icon} width={64} style={{ color: 'white' }} />
                </Box>

                {/* 15. ส่วนเนื้อหา */}
                <CardContent>
                  {/* 16. ชื่อหน้า */}
                  <Typography variant="h6" gutterBottom>
                    {page.title}
                  </Typography>

                  {/* 17. คำอธิบาย */}
                  <Typography variant="body2" color="text.secondary">
                    {page.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

// 18. Export component
export default HomePage;
