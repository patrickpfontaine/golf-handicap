import React from 'react';
import { Text, StyleSheet, Image, View, Pressable, Platform } from 'react-native';
import { Link } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { FontSize, FontFamily, Color } from './GlobalStyles';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();
  const [fontsLoaded, fontError] = useFonts({
    Katibeh_400Regular: require('../assets/fonts/Katibeh-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  if (fontError) {
    console.error('Error loading fonts:', fontError);
    return <View style={styles.container}><Text>Error loading fonts</Text></View>;
  }

  return (
    <View style={styles.container}>
      {Platform.OS === 'web' ? (
        <div style={styles.webGradient}>
          <HomeContent />
        </div>
      ) : (
        <LinearGradient
          style={styles.frontPage}
          colors={['#30ab62', '#ccf03a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <HomeContent />
        </LinearGradient>
      )}
    </View>
  );
};

const HomeContent = () => {
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.shadowHillGolf}>{`Shadow Hill!\nGolf Course`}</Text>
      <Text style={styles.holes}>18 Holes</Text>
      
      <Pressable
        style={styles.beginbutton}
        onPress={() => router.push("/HolePage")}
      >
        <Image
          style={styles.beginbuttonChild}
          source={require('../assets/rectangle-1.png')}
      />
        <Text style={styles.begin}>Begin</Text>
      </Pressable>

      <Link href="/ScoresScreen" asChild>
        <Pressable style={[styles.beginbutton, styles.scoresButton]}>
          <Image
            style={styles.beginbuttonChild}
            source={require('../assets/rectangle-1.png')}
          />
          <Text style={styles.begin}>Scores</Text>
        </Pressable>
      </Link>
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
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  shadowHillGolf: {
    fontSize: FontSize.size_50xl,
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
  scoresButton: {
    marginTop: 100,
  },
  beginbuttonChild: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  begin: {
    fontSize: FontSize.size_50xl,
    color: Color.colorBlack,
    fontFamily: FontFamily.katibehRegular,
    textAlign: 'center',
    lineHeight: FontSize.size_50xl + 60,
  },
  frontPage: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});

export default HomeScreen;