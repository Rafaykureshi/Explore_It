import { Platform } from 'react-native';

export const createShadow = (color, offset = { width: 0, height: 4 }, opacity = 0.3, radius = 8, elevation = 8) => {
  const baseShadow = {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
  };
  
  // Only add elevation for non-web platforms
  if (Platform.OS !== 'web') {
    baseShadow.elevation = elevation;
  }
  
  return baseShadow;
};