/* @flow */

const encodings = require('../spec/single-byte-encodings.json');
const indexes = require('../spec/single-byte-indexes.json');

function getEncodingName(labelInput) {
  if (indexes[labelInput]) {
    return labelInput;
  }

  const label = labelInput.toLowerCase();
  const encoding = encodings.find(e => e.labels.includes(label));
  if (!encoding) {
    throw new Error(`Unknown encoding label "${label}"`);
  }
  return encoding.name.toLowerCase();
}

/**
 */
function encode(label: string, text: string): Buffer {
  const name = getEncodingName(label);
  const codes = indexes[name];
  const buffer = Buffer.allocUnsafe(text.length);
  for (let i = 0; i < text.length; i += 1) {
    const code = text.charCodeAt(i);
    if (code < 128) {
      buffer[i] = code;
    } else {
      const index = codes.indexOf(text[i]);
      if (index !== -1) {
        buffer[i] = 128 + index;
      } else {
        buffer[i] = 63; // '?'
      }
    }
  }
  return buffer;
}

module.exports.encode = encode;

/**
 */
function decode(label: string, buffer: Buffer): string {
  const name = getEncodingName(label);
  const codes = indexes[name];

  let s = '';
  for (let i = 0; i < buffer.length; i += 1) {
    const code = buffer[i];
    if (code < 128) {
      s += String.fromCharCode(code);
    } else {
      s += codes[code - 128];
    }
  }
  return s;
}

module.exports.decode = decode;
