import { useEffect, useRef } from 'react';

const CosmicBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Star properties
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkle: number;
    }> = [];

    // Create small stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        twinkle: Math.random() * 0.02 + 0.01,
      });
    }

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach((star) => {
        // Update twinkle effect
        star.opacity += star.twinkle;
        if (star.opacity > 1 || star.opacity < 0.1) {
          star.twinkle *= -1;
        }

        // Draw star
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.fillStyle = '#ffffff';
        ctx.shadowBlur = star.size * 3;
        ctx.shadowColor = '#8B5CF6';
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      {/* Deep space gradient background - exact same as aipourtous */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f172a 70%, #000000 100%)'
      }} />
      
      {/* Animated canvas stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Large cosmic orbs - exactly like aipourtous */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top right purple orb */}
        <div 
          className="absolute w-80 h-80 rounded-full opacity-60 animate-pulse"
          style={{
            top: '10%',
            right: '10%',
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.2) 40%, transparent 70%)',
            filter: 'blur(40px)',
            animationDuration: '4s'
          }}
        />
        
        {/* Center large purple/blue orb */}
        <div 
          className="absolute w-96 h-96 rounded-full opacity-40 animate-pulse"
          style={{
            top: '40%',
            right: '20%',
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(59, 130, 246, 0.4) 50%, transparent 70%)',
            filter: 'blur(60px)',
            animationDuration: '6s',
            animationDelay: '2s'
          }}
        />
        
        {/* Bottom right cyan orb */}
        <div 
          className="absolute w-72 h-72 rounded-full opacity-50 animate-pulse"
          style={{
            bottom: '20%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.7) 0%, rgba(6, 182, 212, 0.3) 40%, transparent 70%)',
            filter: 'blur(50px)',
            animationDuration: '5s',
            animationDelay: '1s'
          }}
        />
        
        {/* Left side purple orb */}
        <div 
          className="absolute w-64 h-64 rounded-full opacity-35 animate-pulse"
          style={{
            top: '60%',
            left: '5%',
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
            filter: 'blur(45px)',
            animationDuration: '7s',
            animationDelay: '3s'
          }}
        />
        
        {/* Small top cyan orb */}
        <div 
          className="absolute w-48 h-48 rounded-full opacity-60 animate-pulse"
          style={{
            top: '5%',
            left: '50%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, rgba(34, 211, 238, 0.3) 40%, transparent 70%)',
            filter: 'blur(30px)',
            animationDuration: '3s',
            animationDelay: '0.5s'
          }}
        />
      </div>
    </>
  );
};

export default CosmicBackground;