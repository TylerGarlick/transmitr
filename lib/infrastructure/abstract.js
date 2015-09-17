'use strict';

let ChannelManager = require('./channel');

class AbstractManager {

  /**
   * Setup the AbstractManager
   * @param {String} uri
   */
  constructor(uri) {
    this.channelManager = new ChannelManager(uri);
  }
}

module.exports = AbstractManager;