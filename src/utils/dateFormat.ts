/**
 * ฟังก์ชันจัดรูปแบบวันที่
 */

import { format } from 'date-fns';

// แปลงวันที่ให้เป็นรูปแบบไทย (dd/MM/yyyy HH:mm:ss)
// ตัวอย่าง: "2025-01-11T10:30:00.000Z" → "11/01/2025 10:30:00"
export const formatThaiDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};
