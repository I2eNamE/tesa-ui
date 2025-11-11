/**
 * 05_ImageViewerPage.tsx
 *
 * หน้านี้สอนการใช้งาน ImageViewer component
 * แสดงรูปภาพแบบ thumbnail และคลิกเพื่อขยาย
 */

// 1. Import components
import { Container, Typography, Box, Button, Stack, Paper, Grid2, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageViewer from '../components/ImageViewer';

const ImageViewerPage = () => {
  // 2. URL รูปภาพตัวอย่าง (ใช้รูปจาก placeholder service)
  const sampleImages = [
    'https://picsum.photos/400/300?random=1',
    'https://picsum.photos/400/300?random=2',
    'https://picsum.photos/400/300?random=3',
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 3. หัวข้อหน้า */}
      <Typography variant="h3" gutterBottom>
        05. Image Viewer Component
      </Typography>

      {/* ========== ส่วนที่ 1: คำอธิบาย ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🖼️ ImageViewer คืออะไร?
        </Typography>

        <Typography variant="body1" paragraph>
          ImageViewer เป็น component สำหรับแสดงรูปภาพแบบ thumbnail
          เมื่อคลิกจะขยายเป็นภาพเต็มใน modal popup พร้อม:
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>Thumbnail</strong> - แสดงรูปย่อในขนาดที่กำหนด</li>
            <li><strong>Click to Expand</strong> - คลิกเพื่อขยายเป็นรูปเต็ม</li>
            <li><strong>Modal Popup</strong> - แสดงรูปเต็มใน modal พร้อม backdrop</li>
            <li><strong>Close Button</strong> - ปุ่มปิดที่มุมบนขวา</li>
            <li><strong>Hover Effect</strong> - animation เมื่อ hover ที่รูป</li>
          </ul>
        </Typography>

        {/* 4. โค้ดตัวอย่าง */}
        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2, mt: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// 1. Import component
import ImageViewer from './components/ImageViewer';

// 2. ใช้งาน component
<ImageViewer
  src="https://example.com/image.jpg"
  alt="Sample Image"
  width="100%"
  height={200}
  objectFit="cover"
/>`}
          </Typography>
        </Box>

        {/* 5. อธิบายการทำงาน */}
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          🔧 การทำงาน
        </Typography>

        <Typography component="div">
          <ol>
            <li><strong>Thumbnail Display</strong> - แสดงรูปขนาดย่อตามที่กำหนด</li>
            <li><strong>Hover Effect</strong> - เมื่อ hover จะ:
              <ul>
                <li>ขยายเล็กน้อย (scale 1.02)</li>
                <li>ลด opacity เป็น 0.9</li>
                <li>Cursor เปลี่ยนเป็นรูปมือ</li>
              </ul>
            </li>
            <li><strong>Click Event</strong> - เมื่อคลิกจะเปิด Modal แสดงรูปเต็ม</li>
            <li><strong>Close</strong> - ปิด modal ได้โดย:
              <ul>
                <li>คลิกปุ่มปิด (มุมบนขวา)</li>
                <li>คลิกนอก modal (backdrop)</li>
              </ul>
            </li>
          </ol>
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 2: ตัวอย่าง Component ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          💡 ตัวอย่างการแสดงผล
        </Typography>

        <Alert severity="info" sx={{ mb: 3 }}>
          💡 คลิกที่รูปภาพเพื่อขยายดูแบบเต็ม
        </Alert>

        {/* 6. Grid สำหรับแสดงรูปภาพ */}
        <Grid2 container spacing={2}>
          {/* 7. แสดงรูปแต่ละรูป */}
          {sampleImages.map((src, index) => (
            <Grid2 key={index} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Image {index + 1}
                </Typography>
                {/* 8. ImageViewer component */}
                <ImageViewer
                  src={src}
                  alt={`Sample Image ${index + 1}`}
                  width="100%"
                  height={200}
                  objectFit="cover"
                />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* ========== ส่วนที่ 3: Props ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📝 Props ของ ImageViewer
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`interface ImageViewerProps {
  src: string;                    // URL ของรูปภาพ (required)
  alt?: string;                   // ข้อความ alt (optional, default: 'Image')
  width?: string | number;        // ความกว้าง (optional, default: '100%')
  height?: string | number;       // ความสูง (optional, default: 'auto')
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  style?: React.CSSProperties;    // custom style (optional)
}`}
          </Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 2 }}>
          <strong>src</strong> - URL ของรูปภาพ (required)
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>alt</strong> - ข้อความ alt สำหรับ accessibility (default: 'Image')
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>width</strong> - ความกว้างของ thumbnail (default: '100%')
          <ul>
            <li>string: เช่น '100%', '200px', '50vw'</li>
            <li>number: จำนวน pixels เช่น 200</li>
          </ul>
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>height</strong> - ความสูงของ thumbnail (default: 'auto')
          <ul>
            <li>string: เช่น 'auto', '200px', '50vh'</li>
            <li>number: จำนวน pixels เช่น 200</li>
          </ul>
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>objectFit</strong> - วิธีแสดงภาพ (default: 'cover')
          <ul>
            <li><code>'cover'</code> - ครอบเต็มพื้นที่ (อาจถูกตัด)</li>
            <li><code>'contain'</code> - แสดงทั้งหมด (อาจมีพื้นที่ว่าง)</li>
            <li><code>'fill'</code> - ยืดเต็มพื้นที่ (อาจผิดสัดส่วน)</li>
            <li><code>'none'</code> - แสดงขนาดจริง</li>
            <li><code>'scale-down'</code> - ใช้ขนาดเล็กกว่าระหว่าง contain หรือ none</li>
          </ul>
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>style</strong> - custom CSS styles (optional)
        </Typography>
      </Paper>

      {/* ========== ส่วนที่ 4: objectFit Examples ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          📐 ตัวอย่าง objectFit
        </Typography>

        <Grid2 container spacing={2}>
          {/* 9. แสดงแต่ละ objectFit */}
          {(['cover', 'contain', 'fill'] as const).map((fit) => (
            <Grid2 key={fit} size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  objectFit: "{fit}"
                </Typography>
                <ImageViewer
                  src={sampleImages[0]}
                  alt={`ObjectFit ${fit}`}
                  width="100%"
                  height={150}
                  objectFit={fit}
                />
              </Paper>
            </Grid2>
          ))}
        </Grid2>
      </Paper>

      {/* ========== ส่วนที่ 5: ตัวอย่าง Code ใน DetectionPopup ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          🔗 การใช้งานใน DetectionPopup
        </Typography>

        <Typography variant="body1" paragraph>
          ImageViewer ถูกใช้ใน DetectionPopup เพื่อแสดงรูปภาพการตรวจจับ:
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// ใน DetectionPopup component
const imageUrl = imagePath
  ? \`\${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}\${imagePath}\`
  : null;

{imageUrl && (
  <ImageViewer
    src={imageUrl}
    alt="Detection"
    width="100%"
    height={150}
    objectFit="cover"
  />
)}`}
          </Typography>
        </Box>
      </Paper>

      {/* ========== Navigation Buttons ========== */}
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
