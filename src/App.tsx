import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

function App() {
  const [balloonPosition, setBalloonPosition] = useState({ x: 300, y: 200 });
  const [girlPosition, setGirlPosition] = useState({ x: 100, y: 250 });
  const [isChasing, setIsChasing] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [score, setScore] = useState(0);

  // Move balloon to random position with smooth easing
  const moveBalloon = () => {
    const newX = Math.random() * (window.innerWidth - 200) + 100;
    const newY = Math.random() * (window.innerHeight - 300) + 150;
    setBalloonPosition({ x: newX, y: newY });
    setIsChasing(true);
  };

  // Move girl towards balloon with playful bounce
  useEffect(() => {
    if (isChasing) {
      const timer = setTimeout(() => {
        setGirlPosition({
          x: balloonPosition.x - 80,
          y: balloonPosition.y + 50
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [balloonPosition, isChasing]);

  // Check if girl caught the balloon
  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(girlPosition.x - balloonPosition.x, 2) + 
      Math.pow(girlPosition.y - balloonPosition.y, 2)
    );
    
    if (distance < 100 && isChasing) {
      setShowHearts(true);
      setScore(score + 1);
      setTimeout(() => {
        setShowHearts(false);
        setIsChasing(false);
      }, 2000);
    }
  }, [girlPosition, balloonPosition, isChasing]);

  // Auto-move balloon every 4 seconds if not chasing
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isChasing) {
        moveBalloon();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isChasing]);

  // Initial balloon movement
  useEffect(() => {
    setTimeout(() => moveBalloon(), 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-200 overflow-hidden relative font-sans">
      {/* Decorative clouds with subtle animation */}
      <div className="absolute top-10 left-20 w-28 h-16 bg-white rounded-full opacity-70 animate-floatSlow"></div>
      <div className="absolute top-16 left-28 w-20 h-12 bg-white rounded-full opacity-70 animate-floatSlow delay-2000"></div>
      <div className="absolute top-20 right-32 w-36 h-24 bg-white rounded-full opacity-70 animate-floatSlow delay-1000"></div>
      <div className="absolute top-24 right-36 w-24 h-16 bg-white rounded-full opacity-70 animate-floatSlow delay-3000"></div>
      
      {/* Floating sparkles with gentle rotation and bounce */}
      <motion.div
        className="absolute top-32 left-1/4 text-yellow-400"
        animate={{ y: [0, -15, 0], rotate: [0, 360] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Sparkles size={24} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/4 text-pink-400"
        animate={{ y: [0, -12, 0], rotate: [0, -360] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1, ease: "easeInOut" }}
      >
        <Star size={20} />
      </motion.div>

      {/* Title with warm shadow and playful font */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-8 select-none"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] tracking-wide font-[Comic_Sans_MS,Comic_Sans,Comic_Sans_MS,cursive]">
          Little Girl & Her Balloon
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mt-3 drop-shadow select-text">
          Watch her chase the magical balloon!
        </p>
      </motion.div>

      {/* Balloon with playful bounce and sway animation */}
      <motion.div
        className="absolute z-10 cursor-pointer"
        style={{ 
          left: balloonPosition.x, 
          top: balloonPosition.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ 
          x: balloonPosition.x, 
          y: balloonPosition.y,
          rotate: [0, 8, -8, 0],
          scale: [1, 1.05, 1, 1.05]
        }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          rotate: { duration: 2, repeat: Infinity },
          scale: { duration: 2, repeat: Infinity }
        }}
        onClick={moveBalloon}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Move balloon"
      >
        {/* Balloon shape */}
        <div className="relative">
          <div className="w-24 h-28 bg-gradient-to-br from-red-500 to-red-700 rounded-full shadow-xl relative">
            <div className="absolute top-3 left-5 w-8 h-10 bg-red-300 rounded-full opacity-70"></div>
          </div>
          {/* String */}
          <div className="w-1 h-20 bg-gray-700 mx-auto"></div>
          {/* Knot */}
          <div className="w-3 h-3 bg-gray-800 rounded-full mx-auto -mt-1"></div>
        </div>
      </motion.div>

      {/* Little Girl with subtle hair and arm animations */}
      <motion.div
        className="absolute z-5"
        style={{ 
          left: girlPosition.x, 
          top: girlPosition.y,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{ 
          x: girlPosition.x, 
          y: girlPosition.y,
        }}
        transition={{ 
          duration: 2.5, 
          ease: "easeInOut"
        }}
      >
        {/* Girl character */}
        <div className="relative">
          {/* Head with hair sway */}
          <motion.div
            className="w-14 h-14 bg-gradient-to-br from-pink-300 to-pink-400 rounded-full mx-auto relative shadow-md"
            animate={{ rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Hair */}
            <motion.div
              className="absolute -top-3 -left-2 w-16 h-10 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full shadow-inner"
              animate={{ x: [0, 2, 0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            ></motion.div>
            {/* Eyes */}
            <div className="absolute top-5 left-4 w-2 h-2 bg-black rounded-full"></div>
            <div className="absolute top-5 right-4 w-2 h-2 bg-black rounded-full"></div>
            {/* Smile */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-5 h-3 border-b-2 border-black rounded-full"></div>
          </motion.div>
          
          {/* Body */}
          <div className="w-10 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-t-full mx-auto mt-2 shadow-lg"></div>
          
          {/* Arms with gentle sway */}
          <motion.div
            className="absolute top-14 -left-3 w-7 h-3 bg-pink-400 rounded-full shadow-sm transform rotate-45"
            animate={{ rotate: [45, 35, 45, 55, 45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          <motion.div
            className="absolute top-14 -right-3 w-7 h-3 bg-pink-400 rounded-full shadow-sm transform -rotate-45"
            animate={{ rotate: [-45, -35, -45, -55, -45] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          ></motion.div>
          
          {/* Legs */}
          <div className="flex justify-center gap-2 mt-2">
            <div className="w-3 h-10 bg-pink-400 rounded-full shadow-inner"></div>
            <div className="w-3 h-10 bg-pink-400 rounded-full shadow-inner"></div>
          </div>
          
          {/* Feet */}
          <div className="flex justify-center gap-2">
            <div className="w-4 h-3 bg-black rounded-full shadow-md"></div>
            <div className="w-4 h-3 bg-black rounded-full shadow-md"></div>
          </div>
        </div>
      </motion.div>

      {/* Hearts when girl catches balloon with scale and fade animation */}
      <AnimatePresence>
        {showHearts && (
          <motion.div
            className="absolute z-20"
            style={{ 
              left: girlPosition.x, 
              top: girlPosition.y - 60,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1.3 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex space-x-3">
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="text-red-600 fill-red-600" size={28} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
              >
                <Heart className="text-pink-600 fill-pink-600" size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
              >
                <Heart className="text-red-600 fill-red-600" size={20} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Score display */}
      <motion.div
        className="absolute top-6 right-6 bg-white/80 backdrop-blur-md rounded-full px-5 py-2 shadow-lg select-none font-bold text-purple-700 text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        aria-label="Score"
      >
        Score: {score}
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center select-none"
      >
        <div className="bg-white/30 backdrop-blur-md rounded-lg px-6 py-3 text-purple-900 font-semibold shadow-md">
          <p className="text-sm md:text-base">
            💡 Click the balloon to make it move to a new spot!
          </p>
        </div>
      </motion.div>

      {/* Playful ground elements with shadows */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-green-500 to-green-300 opacity-90 shadow-inner"></div>
      <div className="absolute bottom-2 left-20 w-10 h-16 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full shadow-lg"></div>
      <div className="absolute bottom-2 left-36 w-8 h-14 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full shadow-lg"></div>
      <div className="absolute bottom-2 right-28 w-12 h-18 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full shadow-lg"></div>
      <div className="absolute bottom-2 right-44 w-6 h-12 bg-gradient-to-t from-green-700 to-green-500 rounded-t-full shadow-lg"></div>

      {/* Custom animations for clouds */}
      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-floatSlow {
          animation: floatSlow 6s ease-in-out infinite;
        }
        .delay-1000 {
          animation-delay: 1s;
        }
        .delay-2000 {
          animation-delay: 2s;
        }
        .delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  );
}

export default App;