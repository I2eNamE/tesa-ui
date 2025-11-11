/**
 * Component สำหรับแสดงข้อมูลการตรวจจับวัตถุในรูปแบบ Card
 * ประกอบด้วย รูปภาพ, วันเวลา, ข้อมูลกล้อง, และรายการวัตถุที่ตรวจพบ
 */

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { type DetectionEvent } from '../types/detection';
import { formatThaiDateTime } from '../utils/dateFormat';

interface DetectionCardProps {
  detection: DetectionEvent;
}

const DetectionCard = ({ detection }: DetectionCardProps) => {
  // สร้าง URL ของรูปภาพ
  const imageUrl = `${import.meta.env.VITE_API_BASE_URL.replace('/api', '')}${detection.image_path}`;

  return (
    <Card sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex' }}>
        {/* รูปภาพด้านซ้าย (25%) */}
        <Box sx={{ width: '25%', aspectRatio: '1/1' }}>
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

        {/* เนื้อหาด้านขวา (75%) */}
        <CardContent sx={{ width: '75%', p: 2 }}>
          {/* แสดงเวลา */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <Icon icon="mdi:clock-outline" width={20} />
            <Typography variant="body2" color="text.secondary">
              {formatThaiDateTime(detection.timestamp)}
            </Typography>
          </Stack>

          {/* แสดงข้อมูลกล้อง */}
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
            <Icon icon="mdi:camera" width={20} />
            <Typography variant="body2" color="text.secondary">
              Camera: {detection.cam_id.slice(0, 8)}...
            </Typography>
          </Stack>

          {/* หัวข้อ Detected Objects */}
          <Typography variant="subtitle2" gutterBottom>
            Detected Objects ({detection.objects.length})
          </Typography>

          {/* แสดง Chips ของวัตถุทั้งหมด */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {detection.objects.map((obj) => (
              <Chip
                key={obj.obj_id}
                label={`${obj.type} - ${obj.size}`}
                size="small"
                color="primary"
                variant="outlined"
                icon={<Icon icon="mdi:target" />}
              />
            ))}
          </Box>

          {/* แสดงพิกัดของวัตถุ (3 ตัวแรก) */}
          <Box>
            {detection.objects.slice(0, 3).map((obj) => (
              <Box key={obj.obj_id} sx={{ mb: 0.5 }}>
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

export default DetectionCard;
