/**
 * DetectionCard.tsx
 *
 * Component สำหรับแสดงข้อมูลการตรวจจับวัตถุในรูปแบบ Card
 * ประกอบด้วย รูปภาพ, วันเวลา, ข้อมูลกล้อง, และรายการวัตถุที่ตรวจพบ
 */

// 1. Import Material-UI components
import {
  Card,           // Component สำหรับสร้าง card
  CardContent,    // เนื้อหาภายใน card
  Typography,     // แสดงข้อความ
  Chip,           // แสดง tag/label เล็กๆ
  Box,            // Container ทั่วไป
  Stack,          // จัดเรียง elements แบบ flex
} from '@mui/material';

// 2. Import Icon component จาก iconify
import { Icon } from '@iconify/react';

// 3. Import types และ utility functions
import { type DetectionEvent } from '../types/detection';
import { formatThaiDateTime } from '../utils/dateFormat';

// 4. ประกาศ Props interface
interface DetectionCardProps {
  detection: DetectionEvent;  // ข้อมูลการตรวจจับ
}

// 5. Component หลัก
const DetectionCard = ({ detection }: DetectionCardProps) => {
  // 6. สร้าง URL ของรูปภาพ
  // แปลง path จาก "/uploads/..." เป็น "https://tesa-api.crma.dev/uploads/..."
  // replace('/api', '') = ลบ /api ออกจาก base URL
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${detection.image_path}`;

  return (
    // 7. Card component - การ์ดหลัก
    // sx={{ mb: 2 }} = margin-bottom: 16px (2 * 8px)
    <Card sx={{ mb: 2 }}>
      {/* 8. Box แบ่งเป็น 2 columns ด้วย flexbox */}
      <Box sx={{ display: 'flex' }}>
        {/* ========== ซ้าย: รูปภาพ (25% ของความกว้าง) ========== */}
        {/* 9. Box สำหรับรูปภาพ */}
        {/* width: '25%' = กว้าง 25% */}
        {/* aspectRatio: '1/1' = สี่เหลี่ยมจัตุรัส */}
        <Box sx={{ width: '25%', aspectRatio: '1/1' }}>
          {/* 10. img element แสดงรูปภาพ */}
          {/* component="img" = บอกให้ Box แสดงเป็น img tag */}
          {/* objectFit: 'cover' = ครอบรูปให้พอดีกรอบ ไม่ผิดสัดส่วน */}
          <Box
            component="img"
            src={imageUrl}
            alt="Detection"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>

        {/* ========== ขวา: เนื้อหา (75% ของความกว้าง) ========== */}
        {/* 11. CardContent สำหรับเนื้อหาด้านขวา */}
        {/* p: 2 = padding: 16px */}
        <CardContent sx={{ width: '75%', p: 2 }}>
          {/* 12. แสดงเวลา */}
          {/* Stack direction="row" = จัดเรียงแนวนอน */}
          {/* spacing={1} = ระยะห่าง 8px */}
          {/* alignItems="center" = จัดให้อยู่กึ่งกลางแนวตั้ง */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            {/* 13. Icon นาฬิกา */}
            <Icon icon="mdi:clock-outline" width={20} />

            {/* 14. แสดงเวลาที่ตรวจจับ */}
            {/* variant="body2" = ข้อความขนาดเล็ก */}
            {/* color="text.secondary" = สีเทา */}
            <Typography variant="body2" color="text.secondary">
              {formatThaiDateTime(detection.timestamp)}
            </Typography>
          </Stack>

          {/* 15. แสดงข้อมูลกล้อง */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            {/* 16. Icon กล้อง */}
            <Icon icon="mdi:camera" width={20} />

            {/* 17. แสดง Camera ID (แค่ 8 ตัวแรก) */}
            {/* slice(0, 8) = ตัดเอาตัวอักษร 8 ตัวแรก */}
            <Typography variant="body2" color="text.secondary">
              Camera: {detection.cam_id.slice(0, 8)}...
            </Typography>
          </Stack>

          {/* 18. หัวข้อ "Detected Objects" */}
          {/* variant="subtitle2" = หัวข้อย่อยขนาดเล็ก */}
          {/* gutterBottom = เว้นระยะด้านล่าง */}
          <Typography variant="subtitle2" gutterBottom>
            Detected Objects ({detection.objects.length})
          </Typography>

          {/* 19. แสดง Chips ของวัตถุทั้งหมด */}
          {/* flexWrap: 'wrap' = ถ้าเกินบรรทัดให้ขึ้นบรรทัดใหม่ */}
          {/* gap: 1 = ระยะห่าง 8px */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {/* 20. วนลูป map เพื่อสร้าง Chip แต่ละอัน */}
            {detection.objects.map((obj) => (
              // 21. Chip component แสดง tag
              <Chip
                key={obj.obj_id}                    // key สำหรับ React list
                label={`${obj.type} - ${obj.size}`} // ข้อความใน chip
                size="small"                         // ขนาดเล็ก
                color="primary"                      // สีน้ำเงิน
                variant="outlined"                   // แบบมีเฉพาะขอบ
                icon={<Icon icon="mdi:target" />}   // Icon ด้านหน้า
              />
            ))}
          </Box>

          {/* 22. แสดงพิกัดของวัตถุ (แค่ 3 ตัวแรก) */}
          {/* slice(0, 3) = เอาแค่ 3 วัตถุแรก */}
          <Box>
            {detection.objects.slice(0, 3).map((obj) => (
              <Box key={obj.obj_id} sx={{ mb: 0.5 }}>
                {/* 23. แสดง latitude, longitude และ objective */}
                {/* variant="caption" = ข้อความขนาดเล็กมาก */}
                {/* toFixed(6) = ทศนิยม 6 ตำแหน่ง */}
                <Typography variant="caption" color="text.secondary">
                  📍 {typeof obj.lat === 'number' ? obj.lat.toFixed(6) : obj.lat},{' '}
                  {typeof obj.lng === 'number' ? obj.lng.toFixed(6) : obj.lng} • {obj.objective}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
};

// 24. Export component
export default DetectionCard;
