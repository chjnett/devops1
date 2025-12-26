import React, { useRef } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
import { Server, Database, Cloud, Shield, Zap, Layers } from 'lucide-react';

const SpatialDepthSection = () => {
  const containerRef = useRef(null);

  // 1. Measure scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 2. Physics effect (chewy spring)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001
  });

  // 3. Reverse Dimensional Mapping (3D -> 2D)
  // Start: Tilted 55deg
  // End: 0deg (Flat)
  const rotateX = useTransform(smoothProgress, [0, 0.8], [55, 0]);

  // Start: Scale 0.85
  // End: Scale 1 (Full width)
  const scale = useTransform(smoothProgress, [0, 0.8], [0.85, 1]);

  // Start: translateY -60px (Floating up)
  // End: translateY 0px (Grounded)
  const translateY = useTransform(smoothProgress, [0, 0.8], [-60, 0]);

  // Layer visibility and depth
  // Layer visibility and depth
  // Modified: Text/Layers stay visible (opacity 1) but flatten in Z-space
  const layerOpacity = useTransform(smoothProgress, [0, 1], [1, 1]);
  const layerZ = useTransform(smoothProgress, [0, 0.8], [150, 0]);
  const layer2Z = useTransform(smoothProgress, [0, 0.8], [250, 0]);

  // Brightness/Shadow effect: Dark at start (0), Bright at end (1)
  const overlayOpacity = useTransform(smoothProgress, [0, 0.8], [0.6, 0]);

  return (
    <div className="bg-deep-black text-white selection:bg-neon-purple/30">

      {/* Interactive Reverse Transform Section */}
      {/* Increased height to allow scrolling time for the animation */}
      <section ref={containerRef} className="h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

          {/* 3D Perspective Container */}
          <div style={{ perspective: "1800px" }} className="w-full h-full flex items-center justify-center px-4">

            {/* The Main 3D Card Wrapper */}
            <motion.div
              style={{
                rotateX,
                scale,
                y: translateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-[95%] h-[90%] md:w-[90%] md:h-[90%] bg-gray-900/60 backdrop-blur-md rounded-[2.5rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
            >
              {/* Main Content (The Image) */}
              <div className="absolute inset-0 p-2 md:p-4 flex flex-col pointer-events-none rounded-[2.5rem] overflow-hidden">
                <img
                  src="/images/third.png"
                  alt="Dashboard"
                  className="w-full h-full object-cover rounded-[2rem] shadow-inner"
                />

                {/* Overlay Gradient for polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none rounded-[2rem]" />

                {/* Dynamic Shadow/Brightness Overlay */}
                <motion.div
                  style={{ opacity: overlayOpacity }}
                  className="absolute inset-0 bg-black pointer-events-none rounded-[2rem]"
                />
              </div>

              {/* Floating Layer 1 (Top Right) */}
              <motion.div
                style={{
                  translateZ: layerZ,
                  opacity: layerOpacity
                }}
                className="absolute top-12 right-12 md:top-24 md:right-24 bg-gradient-to-br from-neon-blue/20 to-blue-600/20 backdrop-blur-xl border border-neon-blue/30 rounded-2xl p-6 shadow-2xl flex flex-col justify-end max-w-xs"
              >
                <Database className="text-neon-blue mb-4" size={32} />
                <div className="text-xl font-bold leading-tight text-white">Sample<br />Dashboard</div>
                <p className="text-xs text-white/60 mt-2">
                  임의로 만들어진 대쉬보드입니다.
                </p>
              </motion.div>



              {/* Decorative Reflections */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none rounded-[2.5rem] z-20" />

            </motion.div>

            {/* Floor Glow Effect (Stronger when tilted) */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.8], [0.6, 0]),
                scale: useTransform(smoothProgress, [0, 0.8], [1.2, 0.8]),
                filter: "blur(120px)"
              }}
              className="absolute bottom-10 w-[80%] h-32 bg-neon-purple/20 rounded-[100%] pointer-events-none translate-y-32 z-[-1]"
            />
          </div>
        </div>
      </section>

    </div>
  );
};

export default SpatialDepthSection;
