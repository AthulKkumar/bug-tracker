import { BrowserRouter } from "react-router-dom";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "./context/AuthContext";
import "@radix-ui/themes/styles.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <Theme appearance="dark">
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
