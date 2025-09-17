import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Dashboard } from "./components/pages/Dashboard";
import { MyTasks } from "./components/pages/MyTasks";
import { NotFound } from "./components/pages/NotFound";
import { Layout } from "./Layout";
import { Profile } from "./components/pages/Profile";
import "./index.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/my-tasks" element={<MyTasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
