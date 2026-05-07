
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { ToastProvider } from "./components";
import appRoutes from "./routes";


function AppRoutes() {
  const routes = useRoutes([...appRoutes]);

  return routes;
}

function App() {

  return (
    <Router>
      <ToastProvider />
      <AppRoutes />
    </Router>
  )

}

export default App
