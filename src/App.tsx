import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import { QueryProvider } from "@shared/context/QueryProvider";
import { AuthProvider } from "@shared/context/AuthContext";
import { Topbar } from "@/components/common/Topbar";
import { MainLayout } from "@/layouts/MainLayout/MainLayout";
import { PageLoadingState } from "@/components/common/PageLoadingState";
import { QueryErrorBoundary } from "@/components/common/QueryErrorBoundary";
import { AuthCallbackPage } from "@pages/AuthCallbackPage";

const HomePage = lazy(() => import("@pages/HomePage").then((m) => ({ default: m.HomePage })));
const WerkgroepenPage = lazy(() =>
  import("@pages/Werkgroepen/WerkgroepenPage").then((m) => ({ default: m.WerkgroepenPage }))
);
const LoginPage = lazy(() => import("@pages/LoginPage").then((m) => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import("@pages/SignupPage").then((m) => ({ default: m.SignupPage })));
const ForgotPasswordPage = lazy(() =>
  import("@pages/ForgotPasswordPage").then((m) => ({ default: m.ForgotPasswordPage }))
);
const UpdatePasswordPage = lazy(() =>
  import("@pages/UpdatePasswordPage").then((m) => ({ default: m.UpdatePasswordPage }))
);

/** Matches Vite `base` (no trailing slash); root build uses empty basename */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "");

function AppContent() {
  const theme = useTheme();

  return (
    <>
      <Topbar />
      <Box
        sx={{
          pt: `${theme.mixins.toolbar.minHeight}px`,
        }}
      >
        <QueryErrorBoundary>
          <Suspense fallback={<PageLoadingState />}>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/werkgroepen" element={<WerkgroepenPage />} />
              </Route>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/update-password" element={<UpdatePasswordPage />} />
              <Route path="/auth/callback" element={<AuthCallbackPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </QueryErrorBoundary>
      </Box>
    </>
  );
}

function App() {
  return (
    <QueryProvider>
      <AuthProvider>
        <BrowserRouter basename={routerBasename || undefined}>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </QueryProvider>
  );
}

export default App;
