import { Box, Typography, Grid, Paper } from "@mui/material";
import { Code, UserCheck, BarChart, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "AI Debugging",
    icon: <Code size={32} />,
    description: "Get instant explanations and fix suggestions for your code.",
  },
  {
    title: "Peer Mentorship",
    icon: <UserCheck size={32} />,
    description: "Invite peers, collaborate in real-time and learn together.",
  },
  {
    title: "Smart Analytics",
    icon: <BarChart size={32} />,
    description: "Track your learning journey with progress and session heatmaps.",
  },
  {
    title: "Certification",
    icon: <Star size={32} />,
    description: "Earn certificates after completing mentorship sessions and projects.",
  },
];

export default function FeaturesSection() {
  return (
    <Grid container spacing={4}>
      {features.map((feature, idx) => (
        <Grid item xs={12} md={6} key={idx}>
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
            <Paper elevation={4} style={{ padding: 24, backgroundColor: "#1f2937" }}>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Box color="#14b8a6">{feature.icon}</Box>
                <Typography variant="h6">{feature.title}</Typography>
              </Box>
              <Typography color="gray">{feature.description}</Typography>
            </Paper>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
