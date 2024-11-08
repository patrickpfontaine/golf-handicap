import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GameContext = createContext();

export function GameProvider({ children }) {
  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [parValues] = useState([4, 3, 4, 5, 4, 3, 4, 5, 4, 4, 3, 4, 5, 4, 3, 4, 5, 4]); // Example par values
  const [pastGames, setPastGames] = useState([]);

  useEffect(() => {
    initializeGame();
    loadPastGames(); // Load past games when the app starts
  }, []);

  useEffect(() => {
    calculateTotalScore();
    saveScores();
  }, [scores]);

  // Initialize game by loading scores from storage
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

  // Load past games from AsyncStorage
  const loadPastGames = async () => {
    try {
      const storedPastGames = await AsyncStorage.getItem('@past_games');
      if (storedPastGames) {
        setPastGames(JSON.parse(storedPastGames));
      }
    } catch (error) {
      console.error('Error loading past games:', error);
    }
  };

  // Save current game state to AsyncStorage
  const saveScores = async () => {
    try {
      await AsyncStorage.setItem('@user_scores', JSON.stringify(scores));
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  };

  // Save the completed game to past games when all holes are filled
  const savePastGame = async () => {
    if (scores.every(score => score > 0)) {
      const newGame = {
        date: new Date().toISOString(),
        totalScore,
        scores,
      };
      const updatedPastGames = [...pastGames, newGame];
      setPastGames(updatedPastGames);

      try {
        await AsyncStorage.setItem('@past_games', JSON.stringify(updatedPastGames));
        resetGame(); // Reset the game after saving it
      } catch (error) {
        console.error('Error saving past game:', error);
      }
    }
  };

  // Reset the game to its initial state
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

  // Calculate the total score
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
    resetGame,
    savePastGame, // Add savePastGame to save completed games
    pastGames, // Add pastGames to the context value
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