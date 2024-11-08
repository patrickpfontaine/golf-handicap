import React from 'react';
import { Text, StyleSheet, View, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useGame } from './context/GameContext';
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";

const ScoresScreen = () => {
  const router = useRouter();
  const { pastGames } = useGame(); // Assuming we'll add this to GameContext

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <div style={styles.webGradient}>
          <ScoresContent pastGames={pastGames} router={router} />
        </div>
      ) : (
        <LinearGradient
          style={styles.scoresPage}
          colors={['#30ab62', '#ccf03a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <ScoresContent pastGames={pastGames} router={router} />
        </LinearGradient>
      )}
    </View>
  );
};

const ScoresContent = ({ pastGames, router }) => {
  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.contentContainer}>
      <Text style={styles.title}>Past Scores</Text>
      
      <ScrollView style={styles.scoresContainer}>
        {pastGames && pastGames.length > 0 ? (
          pastGames.map((game, index) => (
            <View key={index} style={styles.scoreCard}>
              <Text style={styles.dateText}>
                {new Date(game.date).toLocaleDateString()}
              </Text>
              <Text style={styles.scoreText}>Total Score: {game.totalScore}</Text>
              <View style={styles.holeScores}>
                {game.scores.map((score, holeIndex) => (
                  <Text key={holeIndex} style={styles.holeScore}>
                    Hole {holeIndex + 1}: {score || '-'}
                  </Text>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.noScores}>No past games recorded</Text>
        )}
      </ScrollView>

      <Pressable style={styles.backButton} onPress={handleBack}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webGradient: {
    display: 'flex',
    width: '100%',
    height: '100vh',
    backgroundImage: 'linear-gradient(180deg, #30ab62, #ccf03a)',
    alignItems: 'center',
  },
  scoresPage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: FontSize.size_50xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    marginTop: 30,
    marginBottom: 20,
  },
  scoresContainer: {
    width: '100%',
    maxWidth: 600,
  },
  scoreCard: {
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_xl,
    padding: 20,
    marginBottom: 15,
  },
  dateText: {
    fontSize: FontSize.size_24xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorBlack,
    marginBottom: 10,
  },
  scoreText: {
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorBlack,
    marginBottom: 15,
  },
  holeScores: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  holeScore: {
    width: '25%',
    fontSize: FontSize.size_24xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorBlack,
    marginBottom: 5,
  },
  noScores: {
    fontSize: FontSize.size_31xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    textAlign: 'center',
    marginTop: 50,
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    height: 60,
    width: 150,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: FontSize.size_38xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_31xl + 45,
  },
});

export default ScoresScreen;