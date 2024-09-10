
import React from "react";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme'; // Import your custom theme
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import allRoutes from "./routes/routeConfig";
import { Provider } from "react-redux";
import store from "./store/rootReducer";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppRoutes />
      </Router>
    </ThemeProvider>
    </Provider>
  );
};

const AppRoutes = () => {
  const element = useRoutes(allRoutes);
  return element;
};


export default App
