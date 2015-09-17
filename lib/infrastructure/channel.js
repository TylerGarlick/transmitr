'use strict';

let Promise = require('bluebird');
let MQ = Promise.promisifyAll(require('amqplib'));

class ChannelManager {

  /**
   * Creates a new ChannelManager
   * @param uri
   */
  constructor(uri) {
    this.uri = uri;
  }

  /**
   * Create a new channel from a connection
   * @public
   * @returns {ChannelManager}
   */
  * create() {
    let connection = yield this._connect();
    return Promise.resolve(connection.createChannel());
  }

  /**
   * Connects to the rabbitmq server
   * @private
   * @returns {Connection}
   */
  * _connect() {
    return Promise.resolve(MQ.connect(this.uri));
  }

}

module.exports = ChannelManager;