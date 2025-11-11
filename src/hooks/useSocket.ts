/**
 * useSocket.ts
 *
 * Custom hook สำหรับเชื่อมต่อ Socket.IO และรับข้อมูล real-time
 */

// 1. Import hooks และ types
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { type DetectionEvent } from '../types/detection';

// 2. Custom hook - รับ camId และ enabled
export const useSocket = (camId: string, enabled: boolean) => {
  // 3. State สำหรับเก็บ socket instance
  const [socket, setSocket] = useState<Socket | null>(null);

  // 4. State สำหรับเก็บข้อมูล real-time ล่าสุด
  const [realtimeData, setRealtimeData] = useState<DetectionEvent | null>(null);

  // 5. State สำหรับสถานะการเชื่อมต่อ
  const [isConnected, setIsConnected] = useState(false);

  // 6. useEffect สำหรับจัดการ socket connection
  useEffect(() => {
    // 7. ถ้าไม่ enable หรือไม่มี camId ให้ตัดการเชื่อมต่อ
    if (!enabled || !camId) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // 8. สร้าง socket instance เชื่อมต่อกับ server
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL);

    // 9. Event: เมื่อเชื่อมต่อสำเร็จ
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);

      // 10. Subscribe to camera - บอก server ว่าต้องการข้อมูลจากกล้องไหน
      socketInstance.emit('subscribe_camera', { cam_id: camId });
    });

    // 11. Event: เมื่อตัดการเชื่อมต่อ
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });

    // 12. Event: เมื่อได้รับข้อมูล object detection
    socketInstance.on('object_detection', (data: any) => {
      console.log('Received object detection:', data);

      // 13. แปลง data structure ให้ตรงกับ DetectionEvent interface
      setRealtimeData({
        id: Date.now(),               // Generate temporary ID
        cam_id: data.cam_id,
        camera: data.camera,
        timestamp: data.timestamp,
        image_path: data.image.path,  // แปลง data.image.path เป็น image_path
        objects: data.objects,
      });
    });

    // 14. เก็บ socket instance ใน state
    setSocket(socketInstance);

    // 15. Cleanup function - เรียกเมื่อ component unmount หรือ dependencies เปลี่ยน
    return () => {
      if (socketInstance) {
        // 16. Unsubscribe camera
        socketInstance.emit('unsubscribe_camera', { cam_id: camId });

        // 17. Disconnect socket
        socketInstance.disconnect();
      }
    };
  }, [camId, enabled]); // 18. Dependencies - เรียก useEffect ใหม่เมื่อ camId หรือ enabled เปลี่ยน

  // 19. Return ค่าที่ต้องการใช้งาน
  return { socket, realtimeData, isConnected };
};
