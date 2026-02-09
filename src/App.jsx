import React, { useState } from 'react';
import { Wheel } from './components/Wheel';
import { Controls } from './components/Controls';
import { Modal } from './components/Modal';
import { definitions as initialDefinitions } from './data/definitions';

function App() {
  const [definitions, setDefinitions] = useState(initialDefinitions);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedDefinition, setSelectedDefinition] = useState(null);

  const handleSpin = () => {
    if (definitions.length === 0) return;

    setIsSpinning(true);
    const randomIndex = Math.floor(Math.random() * definitions.length);

    // Calculate angle to land on the selected item
    // Item is at (index * slice + slice/2) degrees from 12 o'clock
    // We need to rotate the wheel backwards by this amount to bring it to 12 o'clock
    const sliceAngle = 360 / definitions.length;
    const itemAngle = randomIndex * sliceAngle + sliceAngle / 2;
    const targetAngle = 360 - itemAngle;

    // Add extra rotations for effect (5 full spins + target)
    // Ensure we always rotate forward
    const currentRotationMod = rotation % 360;
    const distance = (targetAngle - currentRotationMod + 360) % 360;
    const newRotation = rotation + 1800 + distance;

    setRotation(newRotation);

    // Using a timeout to match the animation duration (4s)
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedDefinition(definitions[randomIndex]);
    }, 4000);
  };

  const handleRemove = () => {
    setDefinitions(definitions.filter(def => def !== selectedDefinition));
    setSelectedDefinition(null);
  };

  const handleReset = () => {
    setDefinitions(initialDefinitions);
    setRotation(0);
    setSelectedDefinition(null);
    setIsSpinning(false);
  };

  return (
    <div className="min-h-screen bg-pastel-green flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-accent drop-shadow-sm tracking-tight">
          Scientific Bingo Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-lg">
          Projecta a l'aula i juga! Definitions remaining: {definitions.length}
        </p>
      </header>

      <div className="relative flex-grow flex items-center justify-center">
        {definitions.length > 0 ? (
          <Wheel
            items={definitions}
            rotation={rotation}
            onSpinEnd={() => { }} // Handled by timeout for state coordination
          />
        ) : (
          <div className="text-2xl text-gray-400 font-bold p-12 bg-white rounded-full shadow-inner">
            JOC ACABAT!
          </div>
        )}
      </div>

      <Controls
        onSpin={handleSpin}
        onReset={handleReset}
        isSpinning={isSpinning}
        disabled={definitions.length === 0}
      />


      <Modal
        isOpen={!!selectedDefinition}
        onClose={() => setSelectedDefinition(null)}
        onRemove={handleRemove}
        definition={selectedDefinition}
      />

      {/* Export Feature */}
      <button
        onClick={() => {
          const htmlContent = document.documentElement.outerHTML;
          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'index.html';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }}
        className="mt-12 mb-4 px-4 py-2 bg-pastel-blue/50 hover:bg-pastel-blue text-blue-accent rounded-full text-xs font-medium transition-colors cursor-pointer opacity-70 hover:opacity-100"
      >
        Descarregar fitxer per a GitHub
      </button>
    </div>
  );
}

export default App;
