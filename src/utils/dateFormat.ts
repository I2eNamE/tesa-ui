// 1. Import ฟังก์ชัน format จาก date-fns สำหรับจัดรูปแบบวันที่
import { format } from 'date-fns';

// 2. ฟังก์ชันแปลงวันที่ให้เป็นรูปแบบภาษาไทย
export const formatThaiDateTime = (dateString: string): string => {
  // 3. แปลง string เป็น Date object
  const date = new Date(dateString);

  // 4. จัดรูปแบบวันที่ตามที่กำหนด
  // 'dd/MM/yyyy HH:mm:ss' = วัน/เดือน/ปี ชั่วโมง:นาที:วินาที
  // ตัวอย่าง: 11/01/2025 10:30:00
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};
