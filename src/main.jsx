import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./providers/AuthProvider.jsx";
import ProductProvider from "./providers/ProductProvider.jsx";
import { Provider } from 'react-redux';
import { store } from "./app/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <ProductProvider>
          <Router>
            <App />
          </Router>
        </ProductProvider>
      </AuthProvider>
    </Provider>
  </StrictMode>
);
