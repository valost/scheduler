import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CalendarPage } from "./modules/CalendarPage/CalendarPage";
import { HomePage } from "./modules/HomePage/HomePage";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const Root = () => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />}/>
          <Route path="calendar" element={<CalendarPage />}/>
        </Route>
      </Routes>
    </Router>
  </LocalizationProvider>
)

export default Root;