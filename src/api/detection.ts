// 1. Import axios instance และ types ที่เราสร้างไว้
import axiosInstance from './axios';
import { type DetectionResponse } from '../types/detection';

// 2. ฟังก์ชัน async สำหรับดึงข้อมูลการตรวจจับล่าสุด
export const getRecentDetections = async (
  camId: string,    // 3. รับ camera ID เป็น parameter
  token: string     // 4. รับ authentication token เป็น parameter
): Promise<DetectionResponse> => {  // 5. return type เป็น Promise ของ DetectionResponse

  // 6. เรียก API ด้วย GET method
  // URL จะเป็น {baseURL}/object-detection/{camId}
  // เช่น https://tesa-api.crma.dev/api/object-detection/550e8400-e29b-41d4-a716-446655440000
  const response = await axiosInstance.get(`/object-detection/${camId}`, {
    // 7. ส่ง token ใน header สำหรับ authentication
    headers: {
      'x-camera-token': token,
    },
  });

  // 8. return ข้อมูลที่ได้จาก API
  return response.data;
};
