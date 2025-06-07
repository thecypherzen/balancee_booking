import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/state/store";
import { ThemeProvider } from "@/hooks/ThemeContext";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </Provider>,
);
