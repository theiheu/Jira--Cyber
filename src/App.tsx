/* import react router dom v6 packages */
import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "./routes/PrivateRoutes/PrivateRoutes";

/* import local components */
import Layout from "./Layout/Layout";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import CreateProjectPage from "./Pages/ProjectPage/CreateProject/CreateProjectPage";
import ProjectManagement from "./Pages/ProjectPage/ProjectManagement/ProjectManagement";

import GeneralDrawer from "./Components/Drawer/GeneralDrawer";
import ProjectDetail from "./Pages/ProjectPage/ProjectDetail/ProjectDetail";

import ModalComponent from "./Components/Modal/ModalComponent";

function App() {
  return (
    <>
      <GeneralDrawer />
      <ModalComponent />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* Private routes */}
          <Route element={<PrivateRoutes />}>
            <Route index element={<ProjectManagement />} />
            <Route path="create-project" element={<CreateProjectPage />} />
            <Route
              path="project-detail/:projectId"
              element={<ProjectDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
