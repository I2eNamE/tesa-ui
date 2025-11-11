/**
 * 07_ApiSocketPage.tsx
 *
 * หน้านี้อธิบายการทำงานของ API และ Socket.IO แบบละเอียด
 * พร้อมตัวอย่าง code และคำอธิบายการทำงาน
 */

// 1. Import components
import { Container, Typography, Box, Button, Stack, Paper, Alert, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const ApiSocketPage = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 2. หัวข้อหน้า */}
      <Typography variant="h3" gutterBottom>
        07. API & Socket.IO
      </Typography>

      {/* ========== ส่วนที่ 1: API ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          📡 API (REST)
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1️⃣ การตั้งค่า Axios Instance
        </Typography>

        <Typography variant="body1" paragraph>
          สร้าง axios instance สำหรับเรียก API โดยกำหนด base URL จาก environment variable
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// src/api/axios.ts
import axios from 'axios';

// สร้าง instance พร้อม base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  // เช่น "https://tesa-api.crma.dev/api"
});

export default axiosInstance;`}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          2️⃣ API Function: getRecentDetections
        </Typography>

        <Typography variant="body1" paragraph>
          ฟังก์ชันสำหรับดึงข้อมูลการตรวจจับล่าสุดจาก API
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// src/api/detection.ts
import axiosInstance from './axios';
import { type DetectionResponse } from '../types/detection';

export const getRecentDetections = async (
  camId: string,    // Camera ID
  token: string     // Authentication token
): Promise<DetectionResponse> => {
  // เรียก GET /object-detection/{camId}
  const response = await axiosInstance.get(\`/object-detection/\${camId}\`, {
    headers: {
      'x-camera-token': token,  // ส่ง token ใน header
    },
  });

  return response.data;
};`}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          3️⃣ Custom Hook: useDetections
        </Typography>

        <Typography variant="body1" paragraph>
          ใช้ React Query เพื่อจัดการ API call พร้อม caching และ auto-refetch
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// src/hooks/useDetections.ts
import { useQuery } from '@tanstack/react-query';
import { getRecentDetections } from '../api/detection';

export const useDetections = (
  camId: string,
  token: string,
  enabled: boolean
) => {
  return useQuery({
    // Query key สำหรับ cache
    queryKey: ['detections', camId],

    // ฟังก์ชันเรียก API
    queryFn: () => getRecentDetections(camId, token),

    // เปิด/ปิดการ query
    enabled: enabled && !!camId && !!token,

    // Refetch ทุกๆ 30 วินาที
    refetchInterval: 30000,
  });
};`}
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mt: 2 }}>
          ✅ <strong>ข้อดีของ React Query:</strong>
          <ul>
            <li>Automatic caching - ไม่ต้องเรียก API ซ้ำถ้ามีข้อมูลใน cache</li>
            <li>Auto refetch - refetch ข้อมูลใหม่ตามเวลาที่กำหนด</li>
            <li>Loading & Error states - จัดการ state ให้อัตโนมัติ</li>
          </ul>
        </Alert>
      </Paper>

      {/* ========== ส่วนที่ 2: Socket.IO ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🔌 Socket.IO (Real-time)
        </Typography>

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          1️⃣ Custom Hook: useSocket
        </Typography>

        <Typography variant="body1" paragraph>
          เชื่อมต่อ Socket.IO และรับข้อมูล real-time
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// src/hooks/useSocket.ts
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocket = (camId: string, enabled: boolean) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [realtimeData, setRealtimeData] = useState<DetectionEvent | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!enabled || !camId) {
      // ปิดการเชื่อมต่อถ้า disabled
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    // สร้าง socket instance
    const socketInstance = io(import.meta.env.VITE_SOCKET_URL);

    // Event: เชื่อมต่อสำเร็จ
    socketInstance.on('connect', () => {
      console.log('Connected to socket server');
      setIsConnected(true);

      // Subscribe to camera
      socketInstance.emit('subscribe_camera', { cam_id: camId });
    });

    // Event: ตัดการเชื่อมต่อ
    socketInstance.on('disconnect', () => {
      console.log('Disconnected from socket server');
      setIsConnected(false);
    });

    // Event: รับข้อมูล object detection
    socketInstance.on('object_detection', (data: any) => {
      console.log('Received object detection:', data);

      // แปลง data structure
      setRealtimeData({
        id: Date.now(),
        cam_id: data.cam_id,
        camera: data.camera,
        timestamp: data.timestamp,
        image_path: data.image.path,
        objects: data.objects,
      });
    });

    setSocket(socketInstance);

    // Cleanup function
    return () => {
      if (socketInstance) {
        socketInstance.emit('unsubscribe_camera', { cam_id: camId });
        socketInstance.disconnect();
      }
    };
  }, [camId, enabled]);

  return { socket, realtimeData, isConnected };
};`}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          2️⃣ Socket Events
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem' }}>
{`// Events ที่ client ส่งไปหา server
socketInstance.emit('subscribe_camera', { cam_id: 'camera-id' });
socketInstance.emit('unsubscribe_camera', { cam_id: 'camera-id' });

// Events ที่ client รับจาก server
socketInstance.on('connect', () => { ... });      // เชื่อมต่อสำเร็จ
socketInstance.on('disconnect', () => { ... });   // ตัดการเชื่อมต่อ
socketInstance.on('object_detection', (data) => { ... }); // รับข้อมูล`}
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mt: 2 }}>
          💡 <strong>หลักการทำงาน Socket.IO:</strong>
          <ol>
            <li>Client เชื่อมต่อกับ server</li>
            <li>Client ส่ง "subscribe_camera" พร้อม camera ID</li>
            <li>เมื่อมีการตรวจจับใหม่ server จะส่ง "object_detection" event</li>
            <li>Client รับข้อมูลและอัพเดท UI แบบ real-time</li>
          </ol>
        </Alert>
      </Paper>

      {/* ========== ส่วนที่ 3: การใช้งานใน Dashboard ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🎯 การใช้งานรวมกันใน Dashboard
        </Typography>

        <Typography variant="body1" paragraph>
          Dashboard ใช้ทั้ง API และ Socket.IO เพื่อ:
        </Typography>

        <Typography component="div">
          <ul>
            <li><strong>API</strong> - ดึงข้อมูลการตรวจจับย้อนหลัง (history)</li>
            <li><strong>Socket.IO</strong> - รับข้อมูลการตรวจจับแบบ real-time</li>
            <li><strong>Combined</strong> - รวมข้อมูลทั้งสองแสดงในหน้าเดียว</li>
          </ul>
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 1, mb: 2, mt: 2 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', overflow: 'auto' }}>
{`// ใน DashboardPage
const [allDetections, setAllDetections] = useState<DetectionEvent[]>([]);

// 1. เรียก API เพื่อดึง history
const { data, isLoading, error } = useDetections(camId, token, isStarted);

// 2. เมื่อได้ข้อมูลจาก API ให้เก็บไว้
useEffect(() => {
  if (data?.data) {
    setAllDetections(data.data);
  }
}, [data]);

// 3. เชื่อมต่อ Socket.IO
const { realtimeData, isConnected } = useSocket(camId, isStarted);

// 4. เมื่อได้ข้อมูล real-time ให้เพิ่มเข้า array
useEffect(() => {
  if (realtimeData) {
    setAllDetections((prev) => [realtimeData, ...prev]);
  }
}, [realtimeData]);

// 5. แสดง allDetections ในหน้า
{allDetections.map((detection) => (
  <DetectionCard key={detection.id} detection={detection} />
))}`}
          </Typography>
        </Box>

        <Alert severity="success" sx={{ mt: 2 }}>
          ✅ <strong>ผลลัพธ์:</strong> ได้ข้อมูลครบทั้งย้อนหลังและ real-time ในหน้าเดียว!
        </Alert>
      </Paper>

      {/* ========== ส่วนที่ 4: Data Flow ========== */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          🔄 Data Flow Diagram
        </Typography>

        <Box sx={{ bgcolor: '#f5f5f5', p: 3, borderRadius: 1 }}>
          <Typography component="pre" sx={{ m: 0, fontSize: '0.875rem', lineHeight: 1.8 }}>
{`┌─────────────────────────────────────────────────────────────┐
│                         USER ACTIONS                        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    กรอก Camera ID + Token
                              │
                              ▼
                        กดปุ่ม Start
                              │
          ┌───────────────────┴───────────────────┐
          ▼                                       ▼
┌──────────────────────┐              ┌─────────────────────┐
│    API Call (REST)   │              │  Socket.IO Connect  │
│                      │              │                     │
│  useDetections()     │              │  useSocket()        │
│                      │              │                     │
│  GET /object-        │              │  emit('subscribe_   │
│    detection/:id     │              │    _camera')        │
└──────────────────────┘              └─────────────────────┘
          │                                       │
          ▼                                       ▼
    Response (History)                   on('object_detection')
          │                                       │
          └───────────────────┬───────────────────┘
                              ▼
                    ┌──────────────────┐
                    │ allDetections [] │
                    │                  │
                    │ [history...] +   │
                    │ [realtime...]    │
                    └──────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
   ┌──────────┐      ┌──────────┐      ┌──────────────┐
   │   Map    │      │  Cards   │      │  Statistics  │
   │Component │      │  Feed    │      │   (future)   │
   └──────────┘      └──────────┘      └──────────────┘`}
          </Typography>
        </Box>
      </Paper>

      {/* ========== Navigation Buttons ========== */}
      <Stack direction="row" spacing={2}>
        <Link to="/06-map" style={{ textDecoration: 'none' }}>
          <Button variant="outlined">
            หน้าก่อนหน้า: Map Component
          </Button>
        </Link>

        <Link to="/08-dashboard" style={{ textDecoration: 'none' }}>
          <Button variant="contained">
            ไปหน้าถัดไป: Dashboard
          </Button>
        </Link>
      </Stack>
    </Container>
  );
};

export default ApiSocketPage;
