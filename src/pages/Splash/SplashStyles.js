import { StyleSheet } from 'react-native';
import {Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width,
    height: height,
    resizeMode: 'cover',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: width,
    height: '32%',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  text: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 60,
    textAlign: 'left',
    color: '#111928',
    marginTop:10,
    borderRadius: 10,
  },
  subHeadingText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'left',
    marginTop:10,
    color: '#111928',
  },
  dotContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 20,
    height: 20,
    borderRadius: 50,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
    marginBottom: 2,
  },
  activeDot: {
    backgroundColor: '#111928',
  },
});
