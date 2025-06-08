import "./App.css";
import Landing from "./landing";
import { AuthProvider } from "./AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Landing />
    </AuthProvider>
  );
}

export default App;
