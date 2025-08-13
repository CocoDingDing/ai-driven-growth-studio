import heroBg from '@/assets/hero-bg.jpg';

const CosmicBackground = () => {
  return (
    <>
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
    </>
  );
};

export default CosmicBackground;