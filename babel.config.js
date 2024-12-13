module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          '@assets': './assets',
          '@components': './rn/components',
          '@screens': './rn/screens',
          '@utils': './rn/utils',
          '@services': './rn/services',
          '@store': './rn/store',
        },
      },
    ],
    ['@babel/plugin-proposal-decorators', {version: '2023-11'}],
    '@babel/plugin-transform-class-static-block',
  ],
};
