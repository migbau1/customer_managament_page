import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AuthProvider from "./context/Auth.context";
import AppRoutes from "./routes/AppRoutes";
import "./server";

function App(): JSX.Element {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
