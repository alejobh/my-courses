import {
  BrowserRouter as Router,
  Routes as RouterRoutes,
  Route,
} from "react-router-dom";

import { PATHS } from "./constants";

export default function Routes() {
  return (
    <Router>
      <RouterRoutes> 
        <Route path={PATHS.courses.path} element={PATHS.courses.element} />
        <Route path={PATHS.home.path} element={PATHS.home.element} />
      </RouterRoutes>
    </Router>
  )
}
