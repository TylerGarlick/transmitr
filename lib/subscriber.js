'use strict';

let Emitter = require('events').EventEmitter;
let Promise = require('bluebird');

const emitter = Symbol('emitter');
const queueName = Symbol('queueName');
const channel = Symbol('channel');

class Subscriber {

  constructor(uri) {
    this[queueName] = '';
    this[emitter] = new Emitter();
  }

  setup(exchangeName, exchangeType) {
    this[channel] = {};
  }

  on(callback) {
    this[emitter].on('message', callback);
  }

  once(callback) {
    this[emitter].once('message', callback);
  }

  removeAllListeners() {
    this[emitter].removeAllListeners();
  }

  acknowledge(message) {
    let channel = this[channel];
    if (channel) {
      this.channel.ack(message);
    }
  }

  deny(message) {
    let channel = this[channel];
    if (channel) {
      this.channel.nack(message);
    }
  }

  stop() {
    let channel = this[channel];
    if (channel) {
      return channel.close();
    } else {
      return Promise.resolve();
    }
  }

  purge() {
    let channel = this[channel];
    if (channel) {
      let queueName = this[queueName];
      return channel.purgeQueue(queueName);
    } else {
      return Promise.resolve();
    }
  }

}

module.exports = Subscriber;