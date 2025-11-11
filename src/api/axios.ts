// 1. Import axios library สำหรับทำ HTTP requests
import axios from 'axios';

// 2. สร้าง axios instance พร้อมตั้งค่าเริ่มต้น
const axiosInstance = axios.create({
  // 3. ตั้งค่า baseURL จากตัวแปร environment variable
  // ทุก request จะเริ่มต้นด้วย URL นี้
  // เช่น baseURL = "https://tesa-api.crma.dev/api"
  // เมื่อเรียก get('/cameras') จะเรียกไปที่ "https://tesa-api.crma.dev/api/cameras"
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// 4. Export instance เพื่อใช้งานในไฟล์อื่น
export default axiosInstance;
