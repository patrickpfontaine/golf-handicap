/*import React from 'react';
import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Second() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Second Screen</Text>
      <Link href="/" asChild>
        <Button title="Go to Home Screen" />
      </Link>
      <Link href="/third" asChild>
        <Button title="Go to Third Screen" />
      </Link>
    </View>
  );
}*/

/*
import * as React from "react";
import { Text, StyleSheet, View, Pressable, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";

const HolePage = () => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        // Web-specific gradient using inline CSS for web
        <div style={styles.webGradient}>
          <Content />
        </div>
      ) : (
        // Native gradient using LinearGradient from expo
        <LinearGradient 
          style={styles.holePage} 
          locations={[0, 1]} 
          colors={['#30ab62', '#ccf03a']} 
          useAngle={true} 
          angle={180}
        >
          <Content />
        </LinearGradient>
      )}
    </View>
  );
};

// Content component to avoid code duplication
const Content = () => {
  return (
    <>
      <Text style={styles.shadowHill}>
        <Text style={styles.shadowHill1}>Shadow Hill | 18 Holes</Text>
      </Text>

      <View style={styles.textWrapper}>
        <Text style={styles.holeLabel}>Hole: x Par: y</Text>
      </View>

      
      <View style={styles.buttonGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <View style={styles.button}>
              <Text style={styles.text1}>{index + 1}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable style={styles.nextButton} onPress={() => {}}>
        <View style={styles.nextButtonInner} />
        <Text style={styles.nextText}>Next Hole</Text> 
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,  
    alignItems: 'center', // Ensure center alignment for the entire container
    justifyContent: 'center', // Ensure vertical centering
  },
  // Web-specific gradient using inline CSS
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
    marginTop: 40,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_24xl,
  
    
    //transform: [{ translateX: -50 }],
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
    marginTop: 20,
    marginBottom: 0,
  },
  // Button grid container for 2x4 layout
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 120,
    width: '60%', // Set width to ensure buttons align to the center
  },
  buttonWrapper: {
    width: '50%', // 50% width for two buttons per row
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
  text1: {
    fontSize: FontSize.size_50xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_31xl + 90, // Adjust line height to vertically center text
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
  nextButtonInner: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
  },
  nextText: {
    fontSize: FontSize.size_38xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center', // Center text inside the button
    lineHeight: FontSize.size_31xl + 45, // Adjust line height to vertically center text
  },
  holePage: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default HolePage;
*/

import React, { useState } from "react";
import { Text, StyleSheet, View, Pressable, Platform } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { Color, FontFamily, FontSize, Border } from "./GlobalStyles";

const HolePage = () => {
  const [scores, setScores] = useState(Array(18).fill(0));
  const [currentHole, setCurrentHole] = useState(0);
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
    setScores(Array(18).fill(0));
    setCurrentHole(0);
    router.replace('/');
  };

  const totalScore = scores.reduce((acc, score) => acc + score, 0);

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
            totalScore={totalScore}
            scores={scores}
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
            totalScore={totalScore}
            scores={scores}
          />
        </LinearGradient>
      )}
    </View>
  );
};

const Content = ({ currentHole, handleScorePress, handleNextHole, handlePreviousHole, handleCancel, totalScore, scores }) => {
  return (
    <>
      <Text style={styles.shadowHill}>
        <Text style={styles.shadowHill1}>Shadow Hill | 18 Holes</Text>
      </Text>

      <View style={styles.textWrapper}>
        <Text style={styles.holeLabel}>Hole: {currentHole + 1} Par: x</Text>
        <Text style={styles.totalScore}>Total Score: {totalScore}</Text>
      </View>

      <View style={styles.buttonGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <View key={index} style={styles.buttonWrapper}>
            <Pressable style={styles.button} onPress={() => handleScorePress(index + 1)}>
              <Text style={styles.numText}>{index + 1}</Text>
            </Pressable>
          </View>
        ))}
      </View>

      <Pressable
        style={styles.prevButton}
        onPress={currentHole === 0 ? handleCancel : handlePreviousHole}
>
        <Text style={styles.prevText}>
          {currentHole === 0 ? 'Back' : 'Previous Hole'}
        </Text>
      </Pressable>


      <Pressable style={styles.nextButton} onPress={handleNextHole}>
        <Text style={styles.nextText}>Next Hole</Text>
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
