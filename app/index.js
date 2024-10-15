import React from 'react'; 
import { Text, StyleSheet, Image, View, Pressable, Platform } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { FontSize, FontFamily, Color } from './GlobalStyles'; // import GlobalStyles.js

const FrontPage = () => {
  const [fontsLoaded] = useFonts({
    Katibeh_400Regular: require('../assets/fonts/Katibeh-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

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
          style={styles.frontPage}
          colors={['#30ab62', '#ccf03a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
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
    <View style={styles.contentContainer}>
      <Text style={styles.shadowHillGolf}>{`Shadow Hill\nGolf Course`}</Text>
      <Text style={styles.holes}>18 Holes</Text>
      <Link href="/HolePage" asChild>
        <Pressable style={styles.beginbutton}>
          <Image
            style={styles.beginbuttonChild}
            source={require('../assets/rectangle-1.png')}
          />
          <Text style={styles.begin}>Begin</Text>
        </Pressable>
      </Link>
    </View>
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
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  shadowHillGolf: {
    fontSize: 64,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    marginBottom: 30,
  },
  holes: {
    fontSize: FontSize.size_31xl,
    textAlign: 'center',
    fontFamily: FontFamily.katibehRegular,
    color: Color.colorWhite,
    marginBottom: 50,
  },
  beginbutton: {
    width: 215,
    height: 89,
    backgroundColor: 'transparent',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  beginbuttonChild: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  begin: {
    fontSize: FontSize.size_31xl,
    color: '#000',
  },
  frontPage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default FrontPage; 
