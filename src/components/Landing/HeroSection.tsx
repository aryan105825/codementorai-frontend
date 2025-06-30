import { Button, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import CTAButtons from "./CTAButtons";


export default function HeroSection({ navigate }: { navigate: (path: string) => void }) {
  return (
    <>
<CTAButtons onLogin={() => navigate("/login")} onSignup={() => navigate("/register")} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          CodeMentor AI
        </Typography>
        <Typography variant="h5" color="gray" gutterBottom>
          Your AI-powered coding mentorship platform for personalized learning & real-time collaboration.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{ marginTop: 32, marginBottom: 64 }}
      >
        <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
          <Button variant="contained" color="primary" onClick={() => navigate("/register")}>
            Sign Up
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => navigate("/login")}>
            Log In
          </Button>
        </Stack>
      </motion.div>
    </>
  );
}
