import { Typography, Link, Box, Stack } from "@mui/material";

export default function Footer() {
  return (
    <Box textAlign="center" paddingY={4} color="gray">
      <Stack direction="row" spacing={2} justifyContent="center" mb={1}>
        <Link href="#" underline="hover" color="inherit">GitHub</Link>
        <Link href="#" underline="hover" color="inherit">Contact</Link>
      </Stack>
      <Typography variant="body2">
        © 2025 CodeMentor AI
      </Typography>
    </Box>
  );
}
