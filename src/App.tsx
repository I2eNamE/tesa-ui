/**
 * App.tsx
 *
 * Component หลักของแอพพลิเคชั่น
 * จัดการ routing, theme, และ React Query
 */

// 1. Import routing components จาก react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 2. Import Material-UI theme
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// 3. Import React Query สำหรับจัดการ API calls
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 4. Import หน้าต่างๆ
import HomePage from './pages/HomePage';
import RoutePage from './pages/01_RoutePage';
import MuiGridPage from './pages/02_MuiGridPage';
import DetectionCardPage from './pages/03_DetectionCardPage';
import DetectionPopupPage from './pages/04_DetectionPopupPage';
import ImageViewerPage from './pages/05_ImageViewerPage';
import MapPage from './pages/06_MapPage';
import ApiSocketPage from './pages/07_ApiSocketPage';


// 5. สร้าง Material-UI theme
// สามารถกำหนดสี, font, spacing ได้
const theme = createTheme({
  palette: {
    mode: 'light',      // 6. โหมดสว่าง (หรือ 'dark' สำหรับโหมดมืด)
    primary: {
      main: '#1976d2',  // 7. สีหลัก (น้ำเงิน)
    },
    secondary: {
      main: '#dc004e',  // 8. สีรอง (แดง)
    },
  },
});

// 9. สร้าง Query Client สำหรับ React Query
// เก็บ cache ของข้อมูลจาก API
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,  // 10. ไม่ refetch เมื่อ focus window
      retry: 1,                      // 11. retry 1 ครั้งถ้า error
    },
  },
});

function App() {
  return (
    // 12. QueryClientProvider - wrap ทั้งแอพเพื่อใช้ React Query
    <QueryClientProvider client={queryClient}>
      {/* 13. ThemeProvider - ใช้ Material-UI theme ทั้งแอพ */}
      <ThemeProvider theme={theme}>
        {/* 14. CssBaseline - reset CSS และใช้ base styles */}
        <CssBaseline />

        {/* 15. BrowserRouter - เปิดใช้งาน routing */}
        <BrowserRouter>
          {/* 16. Routes - container สำหรับกลุ่ม Route */}
          <Routes>
            {/* 17. Route แต่ละหน้า */}
            {/* path = URL path */}
            {/* element = Component ที่จะแสดง */}

            {/* 18. หน้าแรก */}
            <Route path="/" element={<HomePage />} />

            {/* 19. หน้าเรียนรู้แต่ละเรื่อง */}
            <Route path="/01-route" element={<RoutePage />} />
            <Route path="/02-mui-grid" element={<MuiGridPage />} />
            <Route path="/03-detection-card" element={<DetectionCardPage />} />
            <Route path="/04-detection-popup" element={<DetectionPopupPage />} />
            <Route path="/05-image-viewer" element={<ImageViewerPage />} />
            <Route path="/06-map" element={<MapPage />} />
            <Route path="/07-api-socket" element={<ApiSocketPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

// 20. Export App component
export default App;
