'use strict';

module.exports = function(wallaby) {
  return {
    files: [
      '**/*.js',
      { pattern: '**/*.test.js', ignore: true }
    ],

    tests: [
      'test/*.test.js'
    ],

    env: {
      type: 'node',
      runner: 'node'
    },

    bootstrap: function() {
      require('./test/_helper');
    }
  };
};