# single-byte

Transforms for [single-byte encodings](https://encoding.spec.whatwg.org/#legacy-single-byte-encodings).

Implementation has no dependencies and is based on precomputed indexes for various encodings
base on specification provided by the [Web Hypertext Application Technology Working Group (WHATWG)](https://en.wikipedia.org/wiki/WHATWG).

## Installation

`npm install --save single-byte`

## Usage example

### Any environment

```javascript
const { encode } = require('single-byte');

const buffer = encode('iso-8859-2', 'zażółć gęślą jaźń');
console.log(decode('iso-8859-2', buffer));
```

### Environment supporting Node.js streams API

```javascript
const fs = require('fs');
const { Encoder } = require('single-byte/stream');

fs.createReadStream('file-utf8.txt')
  .pipe(new Encoder('iso-8859-2'))
  .pipe(fs.createWriteStream('file-iso-8859-2.txt'));
```

# API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [UTILITIES](#utilities)
-   [encode](#encode)
-   [decode](#decode)
-   [STREAMS](#streams)
-   [Encoder](#encoder)
-   [Decoder](#decoder)
-   [SUPPORTED ENCODINGS](#supported-encodings)

## UTILITIES

Basic functions.


## encode

**Parameters**

-   `label` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `text` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

Returns **[Buffer](https://nodejs.org/api/buffer.html)**

## decode

**Parameters**

-   `label` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `buffer` **[Buffer](https://nodejs.org/api/buffer.html)**

Returns **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**

## STREAMS

Streams


## Encoder

**Extends Transform**

**Parameters**

-   `encoding` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `options` **any**

## Decoder

**Extends Transform**

**Parameters**

-   `encoding` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)**
-   `options` **any**

## SUPPORTED ENCODINGS

| Encoding                                                                    | Labels                                                                                                                                                                                        |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [IBM866](https://encoding.spec.whatwg.org/index-IBM866.txt)                 | 866, cp866, csibm866, ibm866                                                                                                                                                                  |
| [ISO-8859-2](https://encoding.spec.whatwg.org/index-ISO-8859-2.txt)         | csisolatin2, iso-8859-2, iso-ir-101, iso8859-2,<br>iso88592, iso_8859-2, iso_8859-2:1987, l2,<br>latin2                                                                                       |
| [ISO-8859-3](https://encoding.spec.whatwg.org/index-ISO-8859-3.txt)         | csisolatin3, iso-8859-3, iso-ir-109, iso8859-3,<br>iso88593, iso_8859-3, iso_8859-3:1988, l3,<br>latin3                                                                                       |
| [ISO-8859-4](https://encoding.spec.whatwg.org/index-ISO-8859-4.txt)         | csisolatin4, iso-8859-4, iso-ir-110, iso8859-4,<br>iso88594, iso_8859-4, iso_8859-4:1988, l4,<br>latin4                                                                                       |
| [ISO-8859-5](https://encoding.spec.whatwg.org/index-ISO-8859-5.txt)         | csisolatincyrillic, cyrillic, iso-8859-5, iso-ir-144,<br>iso8859-5, iso88595, iso_8859-5, iso_8859-5:1988                                                                                     |
| [ISO-8859-6](https://encoding.spec.whatwg.org/index-ISO-8859-6.txt)         | arabic, asmo-708, csiso88596e, csiso88596i,<br>csisolatinarabic, ecma-114, iso-8859-6, iso-8859-6-e,<br>iso-8859-6-i, iso-ir-127, iso8859-6, iso88596,<br>iso_8859-6, iso_8859-6:1987         |
| [ISO-8859-7](https://encoding.spec.whatwg.org/index-ISO-8859-7.txt)         | csisolatingreek, ecma-118, elot_928, greek,<br>greek8, iso-8859-7, iso-ir-126, iso8859-7,<br>iso88597, iso_8859-7, iso_8859-7:1987, sun_eu_greek                                              |
| [ISO-8859-8](https://encoding.spec.whatwg.org/index-ISO-8859-8.txt)         | csiso88598e, csisolatinhebrew, hebrew, iso-8859-8,<br>iso-8859-8-e, iso-ir-138, iso8859-8, iso88598,<br>iso_8859-8, iso_8859-8:1988, visual                                                   |
| [ISO-8859-8-I](https://encoding.spec.whatwg.org/index-ISO-8859-8-I.txt)     | csiso88598i, iso-8859-8-i, logical                                                                                                                                                            |
| [ISO-8859-10](https://encoding.spec.whatwg.org/index-ISO-8859-10.txt)       | csisolatin6, iso-8859-10, iso-ir-157, iso8859-10,<br>iso885910, l6, latin6                                                                                                                    |
| [ISO-8859-13](https://encoding.spec.whatwg.org/index-ISO-8859-13.txt)       | iso-8859-13, iso8859-13, iso885913                                                                                                                                                            |
| [ISO-8859-14](https://encoding.spec.whatwg.org/index-ISO-8859-14.txt)       | iso-8859-14, iso8859-14, iso885914                                                                                                                                                            |
| [ISO-8859-15](https://encoding.spec.whatwg.org/index-ISO-8859-15.txt)       | csisolatin9, iso-8859-15, iso8859-15, iso885915,<br>iso_8859-15, l9                                                                                                                           |
| [ISO-8859-16](https://encoding.spec.whatwg.org/index-ISO-8859-16.txt)       | iso-8859-16                                                                                                                                                                                   |
| [KOI8-R](https://encoding.spec.whatwg.org/index-KOI8-R.txt)                 | cskoi8r, koi, koi8, koi8-r,<br>koi8_r                                                                                                                                                         |
| [KOI8-U](https://encoding.spec.whatwg.org/index-KOI8-U.txt)                 | koi8-ru, koi8-u                                                                                                                                                                               |
| [macintosh](https://encoding.spec.whatwg.org/index-macintosh.txt)           | csmacintosh, mac, macintosh, x-mac-roman                                                                                                                                                      |
| [windows-874](https://encoding.spec.whatwg.org/index-windows-874.txt)       | dos-874, iso-8859-11, iso8859-11, iso885911,<br>tis-620, windows-874                                                                                                                          |
| [windows-1250](https://encoding.spec.whatwg.org/index-windows-1250.txt)     | cp1250, windows-1250, x-cp1250                                                                                                                                                                |
| [windows-1251](https://encoding.spec.whatwg.org/index-windows-1251.txt)     | cp1251, windows-1251, x-cp1251                                                                                                                                                                |
| [windows-1252](https://encoding.spec.whatwg.org/index-windows-1252.txt)     | ansi_x3.4-1968, ascii, cp1252, cp819,<br>csisolatin1, ibm819, iso-8859-1, iso-ir-100,<br>iso8859-1, iso88591, iso_8859-1, iso_8859-1:1987,<br>l1, latin1, us-ascii, windows-1252,<br>x-cp1252 |
| [windows-1253](https://encoding.spec.whatwg.org/index-windows-1253.txt)     | cp1253, windows-1253, x-cp1253                                                                                                                                                                |
| [windows-1254](https://encoding.spec.whatwg.org/index-windows-1254.txt)     | cp1254, csisolatin5, iso-8859-9, iso-ir-148,<br>iso8859-9, iso88599, iso_8859-9, iso_8859-9:1989,<br>l5, latin5, windows-1254, x-cp1254                                                       |
| [windows-1255](https://encoding.spec.whatwg.org/index-windows-1255.txt)     | cp1255, windows-1255, x-cp1255                                                                                                                                                                |
| [windows-1256](https://encoding.spec.whatwg.org/index-windows-1256.txt)     | cp1256, windows-1256, x-cp1256                                                                                                                                                                |
| [windows-1257](https://encoding.spec.whatwg.org/index-windows-1257.txt)     | cp1257, windows-1257, x-cp1257                                                                                                                                                                |
| [windows-1258](https://encoding.spec.whatwg.org/index-windows-1258.txt)     | cp1258, windows-1258, x-cp1258                                                                                                                                                                |
| [x-mac-cyrillic](https://encoding.spec.whatwg.org/index-x-mac-cyrillic.txt) | x-mac-cyrillic, x-mac-ukrainian                                                                                                                                                               |
| `mazovia`                                                                   | cp790, mazovia                                                                                                                                                                                |
