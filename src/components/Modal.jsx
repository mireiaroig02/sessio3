import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';

export const Modal = ({ isOpen, onClose, onRemove, definition }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative overflow-hidden border-4 border-pastel-blue"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="text-center space-y-8 mt-2">
                            <h2 className="text-3xl font-bold text-blue-accent uppercase tracking-wide">
                                Definició Seleccionada
                            </h2>

                            <div className="p-6 bg-pastel-green rounded-xl border-l-4 border-green-accent">
                                <p className="text-2xl md:text-3xl font-medium text-gray-800 leading-relaxed">
                                    "{definition}"
                                </p>
                            </div>

                            <div className="flex justify-center gap-4 pt-4">
                                <button
                                    onClick={onRemove}
                                    className="flex items-center gap-2 px-6 py-3 bg-red-100 text-red-600 hover:bg-red-200 font-semibold rounded-lg transition-colors group"
                                >
                                    <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Eliminar definició
                                </button>
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-semibold rounded-lg transition-colors"
                                >
                                    Tancar
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
