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
        <Text style={styles.shadowHill1}>Shadow Hill</Text>
        <Text style={styles.text}>{` `}</Text>
      </Text>

      {Array.from({ length: 7 }).map((_, index) => (
        <View key={index} style={[styles[`button${index + 1}`], index % 2 === 0 ? styles.buttonPosition1 : styles.buttonPosition2]}>
          <View style={styles.button1Child} />
          <Text style={styles.text1}>{index + 1}</Text>
        </View>
      ))}

      <Pressable style={styles.nextbutton} onPress={() => {}}>
        <View style={styles.nextbuttonChild} />
        <Text style={styles.next}>NEXT</Text>
      </Pressable>

      <Text style={styles.parY}>Par: y</Text>
      <Text style={styles.holeX}>Hole: x</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonPosition2: {
    height: 127,
    width: 101,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  buttonPosition1: {
    marginTop: -20,
    height: 127,
    width: 101,
    top: "50%",
    left: "50%",
    position: "absolute",
  },
  text1: {
    marginTop: -36.5,
    marginLeft: -50.5,
    height: 100,
    width: 100,
    top: "50%",
    left: "50%",
    color: Color.colorBlack,
    textAlign: "center",
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_31xl,
  },
  nextbutton: {
    top: 686,
    left: 211,
    height: 103,
    width: 142,
    position: "absolute",
  },
  nextbuttonChild: {
    top: 0,
    left: 0,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    height: '100%',
    width: '100%',
  },
  next: {
    top: 32,
    left: 30,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_31xl,
    textAlign: "center",
  },
  parY: {
    left: 217,
    color: Color.allButton,
    textAlign: "center",
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_31xl,
    position: "absolute",
  },
  holeX: {
    left: 51,
    color: Color.allButton,
    textAlign: "center",
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_31xl,
    position: "absolute",
  },
  shadowHill1: {
    color: Color.allButton,
  },
  shadowHill: {
    marginLeft: -96,
    top: 99,
    textAlign: "center",
    fontFamily: FontFamily.katibehRegular,
    fontSize: FontSize.size_31xl,
    left: "50%",
    position: "absolute",
  },
  button1Child: {
    marginTop: -63.5,
    marginLeft: -49.5,
    backgroundColor: Color.allButton,
    borderRadius: Border.br_xl,
    position: "absolute",
    width: 100,
  },
  holePage: {
    flex: 1,
    width: "100%",
    height: 844,
    overflow: "hidden",
    backgroundColor: "transparent",
  },
});

export default HolePage;
