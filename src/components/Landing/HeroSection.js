import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import CTAButtons from "./CTAButtons";
export default function HeroSection({ navigate }) {
    return (_jsxs(_Fragment, { children: [_jsx(CTAButtons, { onLogin: () => navigate("/login"), onSignup: () => navigate("/register") }), _jsxs(motion.div, { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8 }, children: [_jsx(Typography, { variant: "h2", fontWeight: "bold", gutterBottom: true, children: "CodeMentor AI" }), _jsx(Typography, { variant: "h5", color: "gray", gutterBottom: true, children: "Your AI-powered coding mentorship platform for personalized learning & real-time collaboration." })] }), _jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.5 }, style: { marginTop: 32, marginBottom: 64 }, children: _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "center", flexWrap: "wrap", children: [_jsx(Button, { variant: "contained", color: "primary", onClick: () => navigate("/register"), children: "Sign Up" }), _jsx(Button, { variant: "outlined", color: "inherit", onClick: () => navigate("/login"), children: "Log In" })] }) })] }));
}
