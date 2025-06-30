import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import Wave from 'react-wavify';
export default function AnimatedWave() {
    return (_jsxs(Box, { sx: { mt: 6, mb: -2, overflow: 'hidden', lineHeight: 0 }, children: [_jsx(Wave, { fill: "#16f09822", paused: false, options: { height: 20, amplitude: 25, speed: 0.2, points: 4 } }), _jsx(Wave, { fill: "#16f09811", paused: false, options: { height: 15, amplitude: 15, speed: 0.1, points: 3 } })] }));
}
