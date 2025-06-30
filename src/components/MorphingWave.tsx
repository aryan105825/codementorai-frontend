import { motion } from 'framer-motion';

export default function MorphingWave() {
  const wavePaths = [
    // baseline gentle wave
    "M0,50 C150,100 350,0 500,50 L500,150 L0,150 Z",
    // higher frequency wave
    "M0,50 C100,120 200,-20 300,80 C400,160 500,0 500,50 L500,150 L0,150 Z",
    // back to baseline
    "M0,50 C150,100 350,0 500,50 L500,150 L0,150 Z",
    // another variant with small ripples
    "M0,50 C80,90 160,10 240,70 C320,130 400,-10 500,50 L500,150 L0,150 Z",
    // back to baseline
    "M0,50 C150,100 350,0 500,50 L500,150 L0,150 Z"
  ];

  return (
    <motion.svg
      viewBox="0 0 500 150"
      preserveAspectRatio="none"
      style={{ height: '60px', width: '100%' }}
    >
      <motion.path
        d={wavePaths[0]}
        animate={{ d: wavePaths }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ fill: '#16f09822', stroke: 'none' }}
      />
    </motion.svg>
  );
}
