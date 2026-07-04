import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const BASE_WIDTH = 393;

export const scale = (size: number): number => (width / BASE_WIDTH) * size;

export const fontScale = (size: number): number => {
  const factor = 0.3;
  return size + (scale(size) - size) * factor;
};
