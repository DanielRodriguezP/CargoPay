import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoutes";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useAuthStore } from "./store/auth";

import { Container } from "./components/Container";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import PayPage from "./pages/PayPage";
import './App.css'

const queryClient = new QueryClient();

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {/* <Navigation /> */}
        <Container>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route element={<ProtectedRoute isAllowed={isAuth} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/pays" element={<PayPage />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
