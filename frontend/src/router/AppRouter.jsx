import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard";
import UploadPage from "../pages/UploadPage";
import ChatPage from "../pages/ChatPage";
import ComparePage from "../pages/ComparePage";
import ExtractPage from "../pages/ExtractPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>

          <Route
            path="/"
            element={
              <Dashboard />
            }
          />

          <Route
            path="/upload"
            element={
              <UploadPage />
            }
          />

          <Route
            path="/chat"
            element={
              <ChatPage />
            }
          />

          <Route
            path="/compare"
            element={
              <ComparePage />
            }
          />

          <Route
            path="/extract"
            element={
              <ExtractPage />
            }
          />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppRouter;