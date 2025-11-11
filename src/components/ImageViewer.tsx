/**
 * ImageViewer.tsx
 *
 * Component สำหรับแสดงรูปภาพแบบ thumbnail
 * เมื่อคลิกจะขยายเป็นภาพเต็มใน modal popup
 */

// 1. Import hooks และ components
import { useState } from 'react';
import { Box, IconButton, Modal, Backdrop } from '@mui/material';
import { Icon } from '@iconify/react';

// 2. ประกาศ Props interface
interface ImageViewerProps {
  src: string;                    // URL ของรูปภาพ
  alt?: string;                   // ข้อความ alt (optional)
  width?: string | number;        // ความกว้างของ thumbnail
  height?: string | number;       // ความสูงของ thumbnail
  style?: React.CSSProperties;    // custom style (optional)
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';  // วิธีแสดงภาพ
}

const ImageViewer = ({
  src,
  alt = 'Image',                  // 3. ค่า default ของ alt
  width = '100%',                 // 4. ค่า default ของ width
  height = 'auto',                // 5. ค่า default ของ height
  style,
  objectFit = 'cover',            // 6. ค่า default ของ objectFit
}: ImageViewerProps) => {
  // 7. State สำหรับเปิด/ปิด modal
  const [open, setOpen] = useState(false);

  // 8. ฟังก์ชันเปิด modal
  const handleOpen = () => setOpen(true);

  // 9. ฟังก์ชันปิด modal
  const handleClose = () => setOpen(false);

  return (
    <>
      {/* ========== Thumbnail Image (รูปเล็ก) ========== */}
      {/* 10. รูปภาพขนาดย่อ คลิกเพื่อขยาย */}
      <Box
        component="img"         // 11. แสดงเป็น img element
        src={src}
        alt={alt}
        onClick={handleOpen}    // 12. เมื่อคลิกให้เปิด modal
        sx={{
          width,
          height,
          objectFit,
          cursor: 'pointer',    // 13. เปลี่ยน cursor เป็นรูปมือ
          transition: 'transform 0.2s, opacity 0.2s',  // 14. เพิ่ม animation
          '&:hover': {          // 15. เมื่อ hover ให้ขยายเล็กน้อย
            transform: 'scale(1.02)',
            opacity: 0.9,
          },
          ...style,             // 16. รวม custom style ที่ส่งเข้ามา
        }}
      />

      {/* ========== Modal Popup (รูปเต็ม) ========== */}
      {/* 17. Modal component สำหรับแสดงรูปเต็ม */}
      <Modal
        open={open}             // 18. เปิด/ปิดตาม state
        onClose={handleClose}   // 19. เมื่อคลิกนอก modal ให้ปิด
        closeAfterTransition    // 20. ปิดหลังจาก animation เสร็จ
        slots={{ backdrop: Backdrop }}  // 21. ใช้ Backdrop component
        slotProps={{
          backdrop: {
            timeout: 500,       // 22. ระยะเวลา fade in/out
            sx: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',  // 23. สีพื้นหลังโปร่งแสง
              zIndex: 10000,    // 24. ความสูงของ layer
            },
          },
        }}
        sx={{
          zIndex: 10000,        // 25. ความสูงของ modal
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',                           // 26. จัดให้อยู่กึ่งกลางแนวตั้ง
            left: '50%',                          // 27. จัดให้อยู่กึ่งกลางแนวนอน
            transform: 'translate(-50%, -50%)',  // 28. ย้ายกลับ 50% เพื่อให้อยู่กึ่งกลางจริงๆ
            maxWidth: '90vw',                    // 29. กว้างสุด 90% ของหน้าจอ
            maxHeight: '90vh',                   // 30. สูงสุด 90% ของหน้าจอ
            outline: 'none',                     // 31. ลบ outline เมื่อ focus
            zIndex: 10001,
          }}
        >
          {/* 32. ปุ่มปิด (มุมบนขวา) */}
          <IconButton
            onClick={handleClose}  // 33. คลิกเพื่อปิด modal
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: 'rgba(0, 0, 0, 0.6)',  // 34. พื้นหลังสีดำโปร่งแสง
              color: 'white',
              zIndex: 1,
              '&:hover': {        // 35. เมื่อ hover ให้เข้มขึ้น
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
              },
            }}
          >
            <Icon icon="mdi:close" width={24} />
          </IconButton>

          {/* 36. รูปภาพขนาดเต็ม */}
          <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',  // 37. แสดงรูปทั้งหมดโดยไม่ครอบ
              borderRadius: 1,
            }}
          />
        </Box>
      </Modal>
    </>
  );
};

// 38. Export component
export default ImageViewer;
