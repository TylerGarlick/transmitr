'use strict';

let Emitter = require('events').EventEmitter;
let Promise = require('bluebird');
let QueueManager = require('./infrastructure/queue');
let ExchangeManager = require('./infrastructure/exchange');

class Transmitr {

  constructor(uri) {
    this.queueManager = new QueueManager(uri);
    this.exchangeManager = new ExchangeManager(uri);
    this.emitter = new EventEmitter();
  }

  on(callback) {
    this.emitter.on('message', callback);
  }

  once(callback) {
    this.emitter.once('message', callback);
  }

  removeAllListeners() {
    this.emitter.removeAllListeners('message');
  }

  publish() {
    
  }


  * consume(exchangeName, type, options) {
    options = options || {};
    yield this.exchangeManager.create(exchangeName, type);
    let result = yield this.queueManager.create();
    let queue = result.queue;
    let channel = yield this.queueManager.bindTo(queue, exchangeName);
    return channel.consume(queue, (msg) => this.emitter.emit('message', msg), options);
  }

}

module.exports = Transmitr;