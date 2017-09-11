/* @flow */

const { Transform } = require('stream');

const { encode, decode } = require('./index');

/**
 */
class Encoder extends Transform {
  constructor(encoding: string, options?: *) {
    super(options);
    this._encoding = encoding;
  }

  _encoding: string;

  _transform(
    chunk: Buffer | string,
    encoding: string,
    callback: (error: ?Error, data?: Buffer | string) => void
  ): void {
    callback(null, encode(this._encoding, chunk.toString()));
  }

  /**
   */
  setSingleByteEncoding(encoding: string) {
    this._encoding = encoding;
  }
}

module.exports.Encoder = Encoder;

/**
 */
class Decoder extends Transform {
  constructor(encoding: string, options?: *) {
    super(options);
    this._encoding = encoding;
  }

  _encoding: string;

  _transform(
    chunk: Buffer | string,
    encoding: string,
    callback: (error: ?Error, data?: Buffer | string) => void
  ): void {
    callback(null, decode(this._encoding, Buffer.from(chunk)));
  }

  /**
   */
  setSingleByteEncoding(encoding: string) {
    this._encoding = encoding;
  }
}

module.exports.Decoder = Decoder;
