import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CalendarPage } from './modules/CalendarPage/CalendarPage';
import { HomePage } from './modules/HomePage/HomePage';
import { UserPage } from './modules/UserPage/UserPage';
import Layout from './modules/Layout/Layout.tsx';

export const Routing = () => (
  <BrowserRouter basename="/scheduler">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="user-account" element={<UserPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default Routing;
