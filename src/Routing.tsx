import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CalendarPage } from './pages/CalendarPage/CalendarPage.tsx';
import { HomePage } from './pages/HomePage/HomePage.tsx';
import { UserPage } from './pages/UserPage/UserPage.tsx';
import Layout from './pages/Layout/Layout.tsx';
import { LoginPage } from './pages/LoginPage/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/RegisterPage.tsx';

export const Routing = () => (
  <BrowserRouter basename="/scheduler">
    <Routes>
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="calendar/:locationId" element={<CalendarPage />} />
          <Route path="user-account" element={<UserPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Routing;
