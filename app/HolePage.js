
import React from "react";
import { Text, StyleSheet, View, Pressable, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useGame } from './context/GameContext';
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";

const HolePage = () => {
  const {
    scores,
    setScores,
    currentHole,
    setCurrentHole,
    totalScore,
    getCurrentParValue
  } = useGame();
  const router = useRouter();

  const handleScorePress = (score) => {
    const updatedScores = [...scores];
    updatedScores[currentHole] = score;
    setScores(updatedScores);
  };

  const handleNextHole = () => {
    if (currentHole < 17) {
      setCurrentHole(currentHole + 1);
    }
  };

  const handlePreviousHole = () => {
    if (currentHole > 0) {
      setCurrentHole(currentHole - 1);
    }
  };

  const handleCancel = () => {
    // Reset all scores to null
    setScores(new Array(18).fill(null));
    // Reset current hole to 0
    setCurrentHole(0);
    // Navigate back to home
    router.replace('/');
  };

  const handleFinish = () => {
    router.push({
      pathname: '/FinishPage',
      params: { totalScore: totalScore }
    });
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <div style={styles.webGradient}>
          <Content
            currentHole={currentHole}
            handleScorePress={handleScorePress}
            handleNextHole={handleNextHole}
            handlePreviousHole={handlePreviousHole}
            handleCancel={handleCancel}
            handleFinish={handleFinish}
            totalScore={totalScore}
            scores={scores}
            par={getCurrentParValue()}
          />
        </div>
      ) : (
        <LinearGradient 
          style={styles.holePage} 
          locations={[0, 1]} 
          colors={['#30ab62', '#ccf03a']} 
          useAngle={true} 
          angle={180}
        >
          <Content
            currentHole={currentHole}
            handleScorePress={handleScorePress}
            handleNextHole={handleNextHole}
            handlePreviousHole={handlePreviousHole}
            handleCancel={handleCancel}
            handleFinish={handleFinish}
            totalScore={totalScore}
            scores={scores}
            par={getCurrentParValue()}
          />
        </LinearGradient>
      )}
    </View>
  );
};

const Content = ({ 
  currentHole, 
  handleScorePress, 
  handleNextHole, 
  handlePreviousHole, 
  handleCancel, 
  handleFinish, 
  totalScore, 
  scores,
  par 
}) => {
  return (
    <>
      <Text style={styles.shadowHill}>
        <Text style={styles.shadowHill1}>Shadow Hill | 18 Holes</Text>
      </Text>

      <View style={styles.textWrapper}>
        <Text style={styles.holeLabel}>Hole: {currentHole + 1} Par: {par}</Text>
        <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
      </View>

      <View style={styles.buttonGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <Pressable 
              style={[
                styles.button,
                scores[currentHole] === index + 1 && styles.selectedButton
              ]} 
              onPress={() => handleScorePress(index + 1)}
            >
              <Text style={styles.numText}>{index + 1}</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.prevButton}
        onPress={currentHole === 0 ? handleCancel : handlePreviousHole}>
        <Text style={styles.prevText}>
          {currentHole === 0 ? 'Back' : 'Previous'}
        </Text>
      </Pressable>

      <Pressable
        style={styles.nextButton}
        onPress={currentHole === 17 ? handleFinish : handleNextHole}>
        <Text style={styles.nextText}>
          {currentHole === 17 ? 'Finish' : 'Next Hole'}
        </Text>
      </Pressable>
    </>
  );
};

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
  shadowHill1: {
    color: Color.allButton,
  },
  shadowHill: {
    marginTop: 30,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_24xl,
  },
  textWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  holeLabel: {
    fontSize: FontSize.size_50xl,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    marginTop: 40,
  },
  totalScore: {
    fontSize: FontSize.size_50xl,
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    marginTop: -5,
    marginBottom: 40,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    width: '60%',
    marginBottom: 120,
  },
  buttonWrapper: {
    width: '50%',
    padding: 10,
    alignItems: 'center',
  },
  button: {
    height: 100,
    width: 100,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numText: {
    fontSize: FontSize.size_50xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_31xl + 90,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 60,
    width: 150,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prevButton: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    height: 60,
    width: 150,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextText: {
    fontSize: FontSize.size_38xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_31xl + 45,
  },
  prevText: {
    fontSize: FontSize.size_38xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_31xl + 45,
  },
  holePage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default HolePage;
