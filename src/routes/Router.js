import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, } from "react-router-dom";
import Home from "../pages/home";
import { MainContainer, ContentWrapper, Header, Navigation, SafeArea, HeaderTitle, HeaderSubTitle, } from "../styles/layouts/MainLayout.styles";
const MainLayout = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (_jsxs(MainContainer, { children: [_jsxs(Header, { children: [_jsx(HeaderTitle, { children: "\uD5C8\uB9ACUP!" }), _jsx(HeaderSubTitle, { children: "\uC6B0\uB9AC\uAC00 \uBC31\uB144\uD574\uB85C \uD560 \uC218 \uC788\uC744\uAE4C?" })] }), _jsx(SafeArea, { children: _jsx(ContentWrapper, { children: _jsx(Routes, { children: _jsx(Route, { path: "/", element: _jsx(Home, {}) }) }) }) }), _jsx(Navigation, {})] }));
};
const RouterComponent = () => {
    useEffect(() => {
        if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify({}));
        }
    }, []);
    return (_jsx(Router, { children: _jsx(Suspense, { fallback: _jsx("div", { children: "Loading..." }), children: _jsx(Routes, { children: _jsx(Route, { path: "/*", element: _jsx(MainLayout, {}) }) }) }) }));
};
export default RouterComponent;
