import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from 'react-router-dom';

import Home from 'screens/Home';
import Courses from 'screens/Courses';

export default function Routes() {
  return (
    <Router>
      <RouterRoutes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/" element={<Home />} />
      </RouterRoutes>
    </Router>
  );
}
