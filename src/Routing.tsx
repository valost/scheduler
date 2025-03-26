import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CalendarPage } from "./modules/CalendarPage/CalendarPage";
import { HomePage } from "./modules/HomePage/HomePage";

export const Routing = () => (
  <Router>
    <Routes>
      <Route path='/'>
        <Route index element={<HomePage />}/>
        <Route path="calendar" element={<CalendarPage />}/>
      </Route>
    </Routes>
  </Router>
)

export default Routing;