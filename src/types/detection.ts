// 1. ประกาศ type สำหรับ DetectedObject - วัตถุที่ตรวจพบแต่ละชิ้น
export interface DetectedObject {
  obj_id: string;      // 2. รหัสประจำตัววัตถุ เช่น "obj_001"
  type: string;        // 3. ประเภทวัตถุ เช่น "drone", "person", "car"
  lat: number;         // 4. ละติจูด (Latitude) ของตำแหน่งวัตถุ
  lng: number;         // 5. ลองจิจูด (Longitude) ของตำแหน่งวัตถุ
  objective: string;   // 6. วัตถุประสงค์ เช่น "unknown", "our", "enemy"
  size: string;        // 7. ขนาดวัตถุ เช่น "small", "medium", "large"
}

// 8. ประกาศ type สำหรับ Camera - ข้อมูลกล้อง
export interface Camera {
  id: string;          // 9. UUID ของกล้อง
  name: string;        // 10. ชื่อกล้อง เช่น "Team Alpha"
  location: string;    // 11. ตำแหน่งกล้อง เช่น "defence" หรือ "offence"
}

// 12. ประกาศ type สำหรับ DetectionEvent - เหตุการณ์การตรวจจับ
export interface DetectionEvent {
  id: number;          // 13. ID ของ event ในฐานข้อมูล
  cam_id: string;      // 14. UUID ของกล้องที่ตรวจจับ
  camera: Camera;      // 15. ข้อมูลกล้อง (ใช้ Camera interface ที่ประกาศไว้ข้างบน)
  timestamp: string;   // 16. เวลาที่ตรวจจับ (ISO 8601 format)
  image_path: string;  // 17. path ของรูปภาพที่บันทึก เช่น "/uploads/images/2025/01/11/image.jpg"
  objects: DetectedObject[];  // 18. Array ของวัตถุที่ตรวจจับได้ (ใช้ DetectedObject interface)
}

// 19. ประกาศ type สำหรับ DetectionResponse - response จาก API
export interface DetectionResponse {
  success: boolean;    // 20. สถานะความสำเร็จของการเรียก API
  data: DetectionEvent[];  // 21. Array ของ detection events ที่ได้รับ
}
