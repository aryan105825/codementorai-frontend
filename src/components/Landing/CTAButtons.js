import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack, Button } from "@mui/material";
import { motion } from "framer-motion";
export default function CTAButtons({ onLogin, onSignup }) {
    return (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: 0.2 }, style: { marginTop: 32, marginBottom: 64 }, children: _jsxs(Stack, { direction: "row", spacing: 2, justifyContent: "center", flexWrap: "wrap", children: [_jsx(Button, { variant: "contained", color: "primary", onClick: onSignup, children: "Sign Up" }), _jsx(Button, { variant: "outlined", color: "inherit", onClick: onLogin, children: "Log In" })] }) }));
}
