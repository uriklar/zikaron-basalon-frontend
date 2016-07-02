const webpackConfig = require('./webpack.config');
const karmaWebpack  = require('karma-webpack');

// Remove entry and output to allow testing
/* eslint-disable prefer-reflect */
delete webpackConfig.entry;
delete webpackConfig.output;

module.exports = (config) => {
  config.set({
    basePath: '',

    plugins: [
      karmaWebpack,
      'karma-jasmine',
      'karma-clear-screen-reporter',
      'karma-mocha-reporter',
      'karma-chrome-launcher',
      'karma-sourcemap-loader'
    ],

    client: {
      captureConsole: true
    },

    frameworks: ['jasmine'],

    webpack: webpackConfig,

    webpackServer: {
      noInfo: true
    },

    files: [
      './app/test.js'
    ],

    proxies: {
      '/assets': '/assets'
    },

    preprocessors: {
      './app/test.js': ['webpack', 'sourcemap']
    },

    mochaReporter: {
      output: 'minimal'
    },

    reporters: ['clear-screen', 'mocha'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
