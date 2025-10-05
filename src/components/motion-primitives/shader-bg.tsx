import React from 'react';
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react';

const ShaderBG = () => {
  return (
    <ShaderGradientCanvas
      className="hidden md:block lg:block"
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 5,
      }}
      pointerEvents="none"
      lazyLoad
    >
      <ShaderGradient
        control="props"
        color1="#790000"
        color2="#004400"
        color3="#00009c"
        type="sphere"
        animate="on"
        uTime={6.2}
        uSpeed={0.1}
        uStrength={0.3}
        uDensity={0.8}
        uFrequency={5.5}
        uAmplitude={3.2}
        positionX={-0.1}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={130}
        rotationZ={70}
        reflection={0.4}
        wireframe={false}
        shader="defaults"
        cAzimuthAngle={270}
        cPolarAngle={180}
        cDistance={0.5}
        cameraZoom={15.1}
        lightType="env"
        brightness={0.8}
        envPreset="lobby"
        grain="on"
        zoomOut={false}
      />
    </ShaderGradientCanvas>
  );
};

export default ShaderBG;
