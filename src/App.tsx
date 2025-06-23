import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

function App() {
  const [balloonPosition, setBalloonPosition] = useState({ x: 300, y: 200 });
  const [girlPosition, setGirlPosition] = useState({ x: 100, y: 250 });
  const [isChasing, setIsChasing] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Move balloon to random position
  const moveBalloon = () => {
    const newX = Math.random() * (window.innerWidth - 200) + 100;
    const newY = Math.random() * (window.innerHeight - 300) + 150;
    setBalloonPosition({ x: newX, y: newY });
    setIsChasing(true);
  };

  // Move girl towards balloon
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
      setTimeout(() => {
        setShowHearts(false);
        setIsChasing(false);
      }, 2000);
    }
  }, [girlPosition, balloonPosition, isChasing]);

  // Auto-move balloon every 4 seconds
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
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-sky-200 to-pink-200 overflow-hidden relative">
      {/* Decorative clouds */}
      <div className="absolute top-10 left-20 w-24 h-16 bg-white rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute top-16 left-24 w-16 h-10 bg-white rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute top-20 right-32 w-32 h-20 bg-white rounded-full opacity-80 animate-pulse"></div>
      <div className="absolute top-24 right-36 w-20 h-12 bg-white rounded-full opacity-80 animate-pulse"></div>
      
      {/* Floating sparkles */}
      <motion.div
        className="absolute top-32 left-1/4 text-yellow-400"
        animate={{ y: [0, -20, 0], rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Sparkles size={20} />
      </motion.div>
      <motion.div
        className="absolute top-40 right-1/4 text-pink-400"
        animate={{ y: [0, -15, 0], rotate: [0, -360] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      >
        <Star size={16} />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center pt-8"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          Little Girl & Her Balloon
        </h1>
        <p className="text-lg md:text-xl text-white/90 mt-2 drop-shadow">
          Watch her chase the magical balloon! ✨
        </p>
      </motion.div>

      {/* Balloon */}
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
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 2, 
          ease: "easeInOut",
          rotate: { duration: 2, repeat: Infinity }
        }}
        onClick={moveBalloon}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Balloon */}
        <div className="relative">
          <div className="w-20 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full shadow-lg relative">
            <div className="absolute top-2 left-3 w-6 h-8 bg-red-300 rounded-full opacity-60"></div>
          </div>
          {/* String */}
          <div className="w-0.5 h-16 bg-gray-600 mx-auto"></div>
          {/* Knot */}
          <div className="w-2 h-2 bg-gray-700 rounded-full mx-auto -mt-1"></div>
        </div>
      </motion.div>

      {/* Little Girl */}
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
          {/* Head */}
          <div className="w-12 h-12 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full mx-auto relative">
            {/* Hair */}
            <div className="absolute -top-2 -left-1 w-14 h-8 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full"></div>
            {/* Eyes */}
            <div className="absolute top-4 left-3 w-1.5 h-1.5 bg-black rounded-full"></div>
            <div className="absolute top-4 right-3 w-1.5 h-1.5 bg-black rounded-full"></div>
            {/* Smile */}
            <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
          </div>
          
          {/* Body */}
          <div className="w-8 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-t-full mx-auto mt-1"></div>
          
          {/* Arms */}
          <div className="absolute top-12 -left-2 w-6 h-2 bg-pink-300 rounded-full transform rotate-45"></div>
          <div className="absolute top-12 -right-2 w-6 h-2 bg-pink-300 rounded-full transform -rotate-45"></div>
          
          {/* Legs */}
          <div className="flex justify-center gap-1 mt-1">
            <div className="w-2 h-8 bg-pink-300 rounded-full"></div>
            <div className="w-2 h-8 bg-pink-300 rounded-full"></div>
          </div>
          
          {/* Feet */}
          <div className="flex justify-center gap-1">
            <div className="w-3 h-2 bg-black rounded-full"></div>
            <div className="w-3 h-2 bg-black rounded-full"></div>
          </div>
        </div>
      </motion.div>

      {/* Hearts when girl catches balloon */}
      <AnimatePresence>
        {showHearts && (
          <motion.div
            className="absolute z-20"
            style={{ 
              left: girlPosition.x, 
              top: girlPosition.y - 50,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="flex space-x-2">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="text-red-500 fill-red-500" size={24} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
              >
                <Heart className="text-pink-500 fill-pink-500" size={20} />
              </motion.div>
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
              >
                <Heart className="text-red-500 fill-red-500" size={16} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="bg-white/20 backdrop-blur-md rounded-lg px-6 py-3 text-white">
          <p className="text-sm md:text-base font-medium">
            💡 Click the balloon to make it move to a new spot!
          </p>
        </div>
      </motion.div>

      {/* Playful ground elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-green-400 to-green-300 opacity-80"></div>
      <div className="absolute bottom-2 left-20 w-8 h-12 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"></div>
      <div className="absolute bottom-2 left-32 w-6 h-10 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"></div>
      <div className="absolute bottom-2 right-24 w-10 h-14 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"></div>
      <div className="absolute bottom-2 right-40 w-4 h-8 bg-gradient-to-t from-green-600 to-green-400 rounded-t-full"></div>
    </div>
  );
}

export default App;