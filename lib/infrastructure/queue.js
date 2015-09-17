'use strict';

let Promise = require('bluebird');
let AbstractManager = require('./abstract');

class QueueManager extends AbstractManager {

  * create(queueName, options) {
    queueName = queueName || '';
    options = options || {};

    let channel = yield this.channelManager.create();
    return Promise.resolve(channel.assertQueue(queueName, options));
  }

  * remove(queueName, options) {
    options = options || {};

    let channel = yield this.channelManager.create();
    return Promise.resolve(channel.deleteQueue(queueName, options));
  }

  * purge(queueName) {
    let channel = yield this.channelManager.create();
    return Promise.resolve(channel.purgeQueue(queueName));
  }

  * sendTo(queueName, payload, options) {
    options = options || {};

    let channel = yield this.channelManager.create();
    payload = this._coerceIntoBuffer(payload);
    return Promise.resolve(channel.sendToQueue(queueName, payload, options));
  }

  * bindTo(queueName, source, pattern) {
    pattern = pattern || '';

    let channel = yield this.channelManager.create();
    channel.bindQueue(queueName, source, pattern);
    return Promise.resolve(channel);
  }

  * unbindFrom(queueName, source, pattern) {
    pattern = pattern || '';

    let channel = yield this.channelManager.create();
    channel.unbindQueue(queueName, source, pattern);
    return Promise.resolve(channel);
  }

  _coerceIntoBuffer(payload) {
    let output;
    let type = typeof payload;
    if (type === Object) {
      output = new Buffer(JSON.stringify(payload));
    } else if (type === String || type == Number || type === Array) {
      output = new Buffer(payload);
    } else {
      throw new Error(`Payload must be an object, string, number or array`);
    }
    return output;
  }
}

module.exports = QueueManager;