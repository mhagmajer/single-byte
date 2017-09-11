const { Readable, Transform } = require('stream');
const https = require('https');
const path = require('path');

module.exports.getLocalPath = function getLocalPath(filename) {
  return path.resolve(process.cwd(), filename);
};


module.exports.streamToBuffer = function streamToBuffer(stream) {
  return new Promise((resolve) => {
    const chunks = [];
    stream.on('data', chunk => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  });
};

module.exports.HttpsReadable = class HttpsReadable extends Readable {
  constructor(options) {
    super();

    https.request(options, (res) => {
      res.on('data', chunk => this.push(chunk));
      res.on('end', () => this.push(null));
    }).end();
  }

  _read() {} // eslint-disable-line class-methods-use-this
};

module.exports.CombineIntoArray = class CombineIntoArray extends Transform {
  constructor() {
    super({
      objectMode: true,
    });

    this._items = [];
  }

  _transform(chunk, encoding, cb) {
    this._items.push(chunk);
    cb(null);
  }

  _flush(cb) {
    this.push(this._items);
    cb(null);
  }
};
