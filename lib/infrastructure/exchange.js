'use strict';

let Promise = require('bluebird');
let AbstractManager = require('./abstract');

const DEFAULTS = {
  KINDS: {
    DIRECT: 'direct',
    FANOUT: 'fanout',
    HEADERS: 'headers',
    TOPIC: 'topic'
  }
};


class ExchangeManager extends AbstractManager {

  static KINDS = DEFAULTS.KINDS;

  /**
   * Creates an Exchange
   * @public
   * @param {String} exchange
   * @param {String} kind
   * @param {Object} [options]
   * @param {Boolean} [options.durable] - defaults to true
   * @param {Boolean} [options.internal] - defaults to false
   * @param {Boolean} [options.autoDelete] - defaults to false
   * @param {String} [options.alternateExchange]
   * @param {Object} [options.arguments]
   * @returns {Promise.<String>}
   */
  * create(exchange, kind, options) {
    options = options || { durable: true };

    let channel = yield this.channelManager.create();
    let result = yield Promise.resolve(channel.assertExchange(exchange, kind, options));

    return Promise.resolve(result.exchange);
  }

  * remove(name) {
    let channel = yield this.channelManager.create();
    return Promise.resolve(channel.deleteExchange(name));
  }
}

module.exports = ExchangeManager;