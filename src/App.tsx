import RouterComponent from "./routes/Router";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./components/redux/rootReducer";

function App() {
  const store = configureStore({
    reducer: rootReducer,
    devTools: false,
  });

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
