import React from 'react';
import { RefreshCw, RotateCw } from 'lucide-react';

export const Controls = ({ onSpin, onReset, isSpinning, disabled }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 z-10">
            <button
                onClick={onSpin}
                disabled={disabled || isSpinning}
                className="flex items-center gap-2 px-8 py-4 bg-green-accent hover:bg-green-500 text-white font-bold text-xl rounded-full shadow-lg transition-transform transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                GIRAR RULETA
            </button>

            <button
                onClick={onReset}
                disabled={disabled || isSpinning}
                className="flex items-center gap-2 px-6 py-3 bg-pastel-blue hover:bg-blue-200 text-blue-800 font-semibold text-lg rounded-full shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <RefreshCw className="w-5 h-5" />
                Reiniciar joc
            </button>
        </div>
    );
};
