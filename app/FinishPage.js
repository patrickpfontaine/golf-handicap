import React from "react";
import { Text, StyleSheet, View, Pressable, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Border, Color, FontFamily, FontSize } from "./GlobalStyles";
import { useRouter, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGame } from './context/GameContext';

const FinishPage = () => {
  const router = useRouter();
  const { totalScore } = useLocalSearchParams();
  const { resetGame, scores, totalScore: calculatedTotalScore } = useGame(); // Pull scores from context
  const parsedTotalScore = Number(totalScore) || calculatedTotalScore; // Use passed or calculated total score
  const handicap = parsedTotalScore - 72;

  const saveCurrentScoreAndResetGame = async () => {
    try {
      // Save the current game score along with the hole-by-hole scores
      const currentDate = new Date().toISOString();
      const gameRecord = { date: currentDate, totalScore: parsedTotalScore, scores }; // Include hole scores
      
      // Get existing saved games
      const savedGamesJSON = await AsyncStorage.getItem('@saved_games');
      let savedGames = savedGamesJSON ? JSON.parse(savedGamesJSON) : [];
      
      // Add the new game record
      savedGames.push(gameRecord);
      
      // Save the updated list of games
      await AsyncStorage.setItem('@saved_games', JSON.stringify(savedGames));
      
      // Reset the game using context
      await resetGame();
      
      console.log('Game completed and reset');
    } catch (error) {
      console.error("Failed to save score or reset game:", error);
    }
  };

  const handleDone = async () => {
    await saveCurrentScoreAndResetGame();
    router.replace('/'); // Navigate to home screen
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <div style={styles.webGradient}>
          <Content totalScore={parsedTotalScore} handicap={handicap} onDone={handleDone} />
        </div>
      ) : (
        <LinearGradient 
          style={styles.finishPage} 
          locations={[0, 1]} 
          colors={['#30ab62', '#ccf03a']} 
          useAngle={true} 
          angle={180}
        >
          <Content totalScore={parsedTotalScore} handicap={handicap} onDone={handleDone} />
        </LinearGradient>
      )}
    </View>
  );
};

const Content = ({ totalScore, handicap, onDone }) => (
  <View style={styles.contentContainer}>
    <Text style={styles.shadowHill}>Shadow Hill</Text>

    <View style={styles.scoreCard}>
      <Text style={styles.scoreText}>Final Score: {totalScore}</Text>
      <Text style={styles.scoreText}>Handicap: {handicap}</Text>
    </View>

    <Pressable style={styles.doneButton} onPress={onDone}>
      <Text style={styles.doneText}>DONE</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webGradient: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundImage: 'linear-gradient(180deg, #30ab62, #ccf03a)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishPage: {
    flex: 1,
    width: "100%",
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  shadowHill: {
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.allButton,
    marginBottom: 40,
  },
  scoreCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    padding: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  doneButton: {
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    padding: 15,
    width: 142,
    alignItems: 'center',
  },
  doneText: {
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorBlack,
  },
});

export default FinishPage;
