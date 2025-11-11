# TESA UI - Learning Project

โปรเจค React + TypeScript + Vite สำหรับเรียนรู้การพัฒนา TESA Web Application ทีละขั้นตอน

## 📚 โครงสร้างการเรียนรู้

โปรเจคนี้แบ่งเป็นหน้าต่างๆ เพื่อเรียนรู้ทีละเรื่อง:

### หน้าที่สร้างแล้ว ✅

1. **01. React Router** (`/01-route`)

   - เรียนรู้การทำ routing และการเปลี่ยนหน้า
   - ใช้ `react-router-dom` สำหรับจัดการ routes

2. **02. MUI Grid System** (`/02-mui-grid`)

   - เรียนรู้การจัดวาง layout ด้วย Material-UI Grid
   - ระบบ Grid 12 columns แบบ responsive

3. **03. Detection Card** (`/03-detection-card`)

   - Component สำหรับแสดงข้อมูลการตรวจจับวัตถุ
   - รูปแบบ Card พร้อมรูปภาพและรายละเอียด

4. **04. Detection Popup** (`/04-detection-popup`)

   - Component สำหรับแสดงรายละเอียดวัตถุ
   - ใช้แสดงใน popup บนแผนที่

5. **05. Image Viewer** (`/05-image-viewer`)

   - Component สำหรับแสดงและขยายรูปภาพ
   - Thumbnail + Modal แบบ full screen

6. **06. Map Component** (`/06-map`)

   - แผนที่ Mapbox พร้อม custom markers
   - Pulse animation และ click to show popup

7. **07. API & Socket** (`/07-api-socket`)

   - อธิบายการทำงานของ API และ Socket.IO แบบละเอียด
   - Data flow diagram และตัวอย่าง code



### Components ที่สร้างแล้ว

- **DetectionCard** - แสดงข้อมูลการตรวจจับในรูปแบบ card
- **DetectionPopup** - แสดงรายละเอียดวัตถุใน popup
- **ImageViewer** - แสดงและขยายรูปภาพ
- **MapComponent** - แผนที่ Mapbox พร้อม markers

### Hooks ที่สร้างแล้ว

- **useDetections** - ดึงข้อมูลการตรวจจับจาก API (React Query)
- **useSocket** - เชื่อมต่อ Socket.IO และรับข้อมูล real-time

## 🚀 การติดตั้งและรันโปรเจค

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รันโปรเจค (development mode)
npm run dev

# 3. Build โปรเจค (production)
npm run build
```

## 🔧 Environment Variables

สร้างไฟล์ `.env` หรือใช้ `.env.production` ที่มีอยู่แล้ว:

```env
VITE_API_BASE_URL=https://tesa-api.crma.dev/api
VITE_SOCKET_URL=https://tesa-api.crma.dev
VITE_MAPBOX_TOKEN=your-mapbox-token
```

## 📖 การใช้งานหน้า Dashboard

1. เปิดหน้า Dashboard (`/08-dashboard`)
2. กรอก **Camera ID** และ **Camera Token**
3. กดปุ่ม **Start** เพื่อเริ่มเชื่อมต่อ
4. ระบบจะ:
   - ดึงข้อมูล detection history จาก API
   - เชื่อมต่อ Socket.IO เพื่อรับข้อมูล real-time
   - แสดงแผนที่พร้อม markers
   - แสดง detection cards ในรูปแบบ feed

## 🏗️ โครงสร้างโปรเจค

```
tesa-ui/
├── src/
│   ├── api/              # API calls
│   │   ├── axios.ts      # Axios instance
│   │   └── detection.ts  # Detection API
│   │
│   ├── components/       # React components
│   │   ├── DetectionCard.tsx
│   │   ├── DetectionPopup.tsx
│   │   ├── ImageViewer.tsx
│   │   └── MapComponent.tsx
│   │
│   ├── hooks/            # Custom hooks
│   │   ├── useDetections.ts
│   │   └── useSocket.ts
│   │
│   ├── pages/            # Pages
│   │   ├── HomePage.tsx
│   │   ├── 01_RoutePage.tsx
│   │   ├── 02_MuiGridPage.tsx
│   │   ├── 03_DetectionCardPage.tsx
│   │   ├── 04_DetectionPopupPage.tsx
│   │   ├── 05_ImageViewerPage.tsx
│   │   ├── 06_MapPage.tsx
│   │   ├── 07_ApiSocketPage.tsx
│   │
│   ├── types/            # TypeScript types
│   │   └── detection.ts
│   │
│   ├── utils/            # Utility functions
│   │   └── dateFormat.ts
│   │
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
│
├── .env                  # Environment variables (local)
├── .env.production       # Environment variables (production)
└── package.json
```

## 📦 Dependencies

### Main Dependencies

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Material-UI (MUI)** - UI components
- **React Router** - Routing
- **React Query** - Data fetching และ caching
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **Mapbox GL** - Interactive maps
- **Iconify** - Icons
- **date-fns** - Date formatting

## 💡 สิ่งที่เรียนรู้ในแต่ละหน้า

### 01. React Router

- การใช้ `BrowserRouter`, `Routes`, `Route`
- การใช้ `Link` และ `useNavigate`
- การสร้าง navigation ระหว่างหน้า

### 02. MUI Grid System

- การใช้ `Grid` component
- Responsive design (xs, md, lg)
- Layout patterns (3 columns, sidebar, etc.)

### 03. Detection Card

- การสร้าง Card component
- การแสดงข้อมูลที่ซับซ้อน
- การใช้ Material-UI components

### 04. Detection Popup

- การสร้าง Popup component
- Icon mapping ตามประเภทวัตถุ
- การแสดงรายละเอียดวัตถุ

### 05. Image Viewer

- การสร้าง Image viewer component
- Modal และ Backdrop
- Hover effects และ transitions

### 06. Map Component

- การใช้ Mapbox GL
- การสร้าง custom markers
- Pulse animation
- Click events และ popup

### 07. API & Socket

- การเรียกใช้ API ด้วย Axios
- React Query สำหรับ caching
- Socket.IO สำหรับ real-time
- Data flow diagram


## 📝 หมายเหตุ

- ทุกไฟล์มี **comment หมายเลข** กำกับทุกบรรทัดสำคัญ
- แต่ละ comment มี**คำอธิบาย**ว่าโค้ดส่วนนั้นทำอะไร
- เรียนรู้ทีละขั้นตอน เริ่มจากพื้นฐานไปยังขั้นสูง

## 🔗 เอกสารเพิ่มเติม

- [TESA_API.md](../TESA_API.md) - วิธีการเรียกใช้ API
- [TESA_SOCKETIO.md](../TESA_SOCKETIO.md) - วิธีการเชื่อมต่อ Socket.IO

## 🎯 หน้าต่างๆ ที่สามารถเข้าถึงได้

- `/` - หน้าแรก (เมนูทั้งหมด)
- `/01-route` - เรียนรู้ React Router
- `/02-mui-grid` - เรียนรู้ MUI Grid System
- `/03-detection-card` - เรียนรู้ Detection Card
- `/04-detection-popup` - เรียนรู้ Detection Popup
- `/05-image-viewer` - เรียนรู้ Image Viewer
- `/06-map` - เรียนรู้ Map Component
- `/07-api-socket` - เรียนรู้ API & Socket.IO
