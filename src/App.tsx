import "./App.css";
import { AuthProvider } from "./auth/AuthContext";
import Routes from "./router/Routes";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
