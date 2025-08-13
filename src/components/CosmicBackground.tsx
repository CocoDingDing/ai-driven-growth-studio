import heroBg from '@/assets/hero-bg.jpg';

const CosmicBackground = () => {
  return (
    <>
      {/* Exact same background image as aipourtous */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroBg})`
        }}
      />
    </>
  );
};

export default CosmicBackground;