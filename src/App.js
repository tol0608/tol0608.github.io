import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(GlobalStyle, {}), _jsx(Provider, { store: store, children: _jsx(RouterComponent, {}) })] }));
}
export default App;
