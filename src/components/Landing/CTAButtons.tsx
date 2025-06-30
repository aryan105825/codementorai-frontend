import { Stack, Button } from "@mui/material";
import { motion } from "framer-motion";

interface CTAButtonsProps {
  onLogin: () => void;
  onSignup: () => void;
}

export default function CTAButtons({ onLogin, onSignup }: CTAButtonsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      style={{ marginTop: 32, marginBottom: 64 }}
    >
      <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
        <Button variant="contained" color="primary" onClick={onSignup}>
          Sign Up
        </Button>
        <Button variant="outlined" color="inherit" onClick={onLogin}>
          Log In
        </Button>
      </Stack>
    </motion.div>
  );
}
