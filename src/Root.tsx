import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { App } from './App';
import { CalendarPage } from "./modules/CalendarPage/CalendarPage";
import { HomePage } from "./modules/HomePage/HomePage";

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />}/>
        <Route path="calendar" element={<CalendarPage />}/>
      </Route>
    </Routes>
  </Router>
)

export default Root;