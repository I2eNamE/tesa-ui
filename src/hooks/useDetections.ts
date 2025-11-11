/**
 * useDetections.ts
 *
 * Custom hook สำหรับดึงข้อมูลการตรวจจับล่าสุดจาก API
 * ใช้ React Query สำหรับจัดการ caching และ refetching
 */

// 1. Import useQuery จาก React Query
import { useQuery } from '@tanstack/react-query';

// 2. Import API function
import { getRecentDetections } from '../api/detection';

// 3. Custom hook - รับ camId, token, และ enabled
export const useDetections = (camId: string, token: string, enabled: boolean) => {
  // 4. useQuery สำหรับดึงข้อมูล
  return useQuery({
    // 5. queryKey - unique key สำหรับ cache
    // เมื่อ camId เปลี่ยน จะถือว่าเป็น query ใหม่
    queryKey: ['detections', camId],

    // 6. queryFn - ฟังก์ชันที่จะเรียก API
    queryFn: () => getRecentDetections(camId, token),

    // 7. enabled - เปิด/ปิดการ query
    // ถ้า enabled = false จะไม่เรียก API
    // ต้องมี camId และ token ด้วย
    enabled: enabled && !!camId && !!token,

    // 8. refetchInterval - refetch ทุกๆ 30 วินาที (30000 ms)
    // ทำให้ได้ข้อมูลใหม่อยู่เสมอ
    refetchInterval: 30000,
  });
};
