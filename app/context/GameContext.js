import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [parValues] = useState([4, 3, 4, 5, 4, 3, 4, 5, 4, 4, 3, 4, 5, 4, 3, 4, 5, 4]); // Example par values

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    calculateTotalScore();
    saveScores();
  }, [scores]);

  const initializeGame = async () => {
    try {
      const existingScores = await AsyncStorage.getItem('@user_scores');
      if (existingScores) {
        const parsedScores = JSON.parse(existingScores);
        setScores(parsedScores);
        const nextHole = parsedScores.findIndex(score => score === 0);
        setCurrentHole(nextHole !== -1 ? nextHole : 0);
      } else {
        resetGame();
      }
    } catch (error) {
      console.error('Error initializing game:', error);
    }
  };

  const resetGame = async () => {
    try {
      const newScores = Array(18).fill(0);
      setScores(newScores);
      setCurrentHole(0);
      setTotalScore(0);
      await AsyncStorage.setItem('@user_scores', JSON.stringify(newScores));
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  const saveScores = async () => {
    try {
      await AsyncStorage.setItem('@user_scores', JSON.stringify(scores));
    } catch (e) {
      console.error('Error saving scores:', e);
    }
  };

  const calculateTotalScore = () => {
    const total = scores.reduce((acc, score) => acc + score, 0);
    setTotalScore(total);
  };

  const getCurrentParValue = () => parValues[currentHole];

  const getScoreRelativeToPar = () => {
    const totalPar = parValues.reduce((acc, par) => acc + par, 0);
    return totalScore - totalPar;
  };

  const value = {
    scores,
    setScores,
    currentHole,
    setCurrentHole,
    totalScore,
    getCurrentParValue,
    getScoreRelativeToPar,
    initializeGame,
    resetGame, // Add resetGame to the context value
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};