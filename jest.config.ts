import type { Config } from 'jest';

const config: Config = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx$': 'babel-jest',
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-button|@react-native-picker|@react-native-firebase/messaging|react-native-.*|%@react-native-community|@codler|@react-native|@react-navigation|uuid|react-redux|@react-native-community/datetimepicker)|victory-.*|@dashdoc/react-native-system-sounds/)',
  ],
  setupFiles: [
    './node_modules/react-native-gesture-handler/jestSetup.js',
    './jest-setup.ts',
  ],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/scripts/assetsTransformer.js',
    '^@src/(.*)$': '<rootDir>/src/$1',
    '^@contexts/(.*)': '<rootDir>/src/contexts/$1',
    '^@store/(.*)': '<rootDir>/src/store/$1',
    '^@navigators/(.*)': '<rootDir>/src/navigators/$1',
    '^@utils/(.*)': '<rootDir>/src/utils/$1',
    '^@assets/(.*)': '<rootDir>/assets/$1',
    '^@components/(.*)': '<rootDir>/src/components/$1',
  },
};

export default config;
