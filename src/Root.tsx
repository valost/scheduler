import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from './App';
import { CalendarPage } from './modules/CalendarPage/CalendarPage';
import { HomePage } from './modules/HomePage/HomePage';
import LoginPage from './modules/Login/LoginPage.tsx';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="calendar" element={<CalendarPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  </Router>
);

export default Root;
