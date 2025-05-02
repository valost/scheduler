import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage } from './modules/CalendarPage/CalendarPage';
import { HomePage } from './modules/HomePage/HomePage';
import { UserPage } from './modules/UserPage/UserPage';
import { AuthProvider } from './context/AuthContext';

export const Routing = () => (
  <AuthProvider>
    <BrowserRouter basename="/scheduler">
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="user-account" element={<UserPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default Routing;
