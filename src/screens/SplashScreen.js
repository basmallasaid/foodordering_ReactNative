import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ImageBackground, SafeAreaView, StatusBar,Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SplashScreen = ({onFinish}) => {
    useEffect(()=>{
        const timer=setTimeout(() => {
            onFinish();
        }, 5000);
         return () => clearTimeout(timer);
    },[])
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent"/>

      <ImageBackground source={require('../../assets/splash.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.darkenOverlay} />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.contentContainer}>
            <View style={styles.glassCard}>
              <Text style={styles.brandName}>
                Foodie<Text style={styles.brandNameBold}>Express</Text>
              </Text>
              <View style={styles.separator} />
              <Text style={styles.tagline}>
                Fast Delivery • Fresh Taste
              </Text>
            </View>
            <Text style={styles.footerText}>v 1.0.2</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  darkenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)', 
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  glassCard: {
    width: '100%',
    backgroundColor: 'rgba(28, 28, 30, 0.85)', 
    borderRadius: 32,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)', 
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 10,
  },
  brandName: {
    fontSize: 40,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  brandNameBold: {
    fontWeight: '900', 
    color: '#FF7A51', 
  },
  separator: {
    width: 40,
    height: 4,
    backgroundColor: '#FF7A51',
    borderRadius: 2,
    marginVertical: 15,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    fontWeight: '500',
    letterSpacing: 1.2,
    textTransform: 'uppercase', 
  },
  footerText: {
    marginTop: 20,
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    fontWeight: '600',
  }
});

export default SplashScreen;