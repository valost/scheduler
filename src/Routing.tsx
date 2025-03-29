import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CalendarPage } from "./modules/CalendarPage/CalendarPage";
import { HomePage } from "./modules/HomePage/HomePage";

export const Routing = () => (
  <BrowserRouter basename="/scheduler/">
    <Routes>
      <Route>
        <Route index element={<HomePage />}/>
        <Route path="calendar" element={<CalendarPage />}/>
      </Route>
    </Routes>
  </BrowserRouter>
)

export default Routing;