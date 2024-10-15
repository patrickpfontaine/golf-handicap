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
        <Text style={styles.holeX}>Hole: x</Text>
        <Text style={styles.parY}>Par: y</Text>
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
    marginLeft: 'auto',
    marginRight: 'auto',
    top: 30,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_24xl,
    left: '25%',
    position: 'absolute',
    //transform: [{ translateX: -50 }],
  },
  textWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
  },
  holeX: {
    flex: 1, // Allow the text to take available space
    fontSize: FontSize.size_50xl,
    color: Color.allButton,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center', // Center text inside the element
  },
  parY: {
    flex: 1, // Allow the text to take available space
    fontSize: FontSize.size_38xl,
    color: Color.allButton,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center', // Center text inside the element
  },
  // Button grid container for 2x4 layout
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    marginTop: 20,
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
