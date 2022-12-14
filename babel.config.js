module.exports = {
  plugins: [
    ['macros', {
      'fontawesome-svg-core': {
        'license': 'free'
      }
    }]
  ],
  presets: [
    ['@babel/preset-env'],
    ['@babel/preset-typescript'],
    ['@babel/preset-react', { runtime: 'automatic' }],
  ]
};
