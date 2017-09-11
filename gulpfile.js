/* eslint-disable no-console */

const { Transform } = require('stream');
const del = require('del');
const flowRemoveTypes = require('flow-remove-types');
const fs = require('fs');
const gulp = require('gulp');
const mirror = require('gulp-mirror');
const path = require('path');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const Vinyl = require('vinyl');

const {
  CombineIntoArray,
  getLocalPath,
  HttpsReadable,
  streamToBuffer,
} = require('./gulp-utils');

gulp.task('clean-spec-source', () => del([
  'spec-source/',
]));

gulp.task('download-spec-source', ['clean-spec-source'], () =>
  new HttpsReadable('https://encoding.spec.whatwg.org/encodings.json')
    .pipe(source('encodings.json'))
    .pipe(new Transform({
      objectMode: true,
      transform(file, encoding, cb) {
        streamToBuffer(file.contents)
          .then((data) => {
            const items = JSON.parse(data.toString());
            const item = items.find(({ heading }) => heading === 'Legacy single-byte encodings');
            if (!item) {
              throw new Error('Invalid encodings');
            }

            const singleByteEncodings = item.encodings;

            // add Mazovia
            singleByteEncodings.push({
              name: 'mazovia',
              labels: ['cp790', 'mazovia'],
              custom: true,
            });

            this.push(new Vinyl({
              path: getLocalPath('single-byte-encodings.json'),
              contents: Buffer.from(JSON.stringify(singleByteEncodings)),
            }));

            item.encodings.forEach(({ name, custom }) => {
              const filename = `index-${name.toLowerCase()}.txt`;
              let contents;
              if (custom) {
                contents = fs.createReadStream(`./spec-custom/${filename}`);
              } else {
                contents = new HttpsReadable(`https://encoding.spec.whatwg.org/${filename}`);
              }
              this.push(new Vinyl({
                path: getLocalPath(filename),
                contents,
              }));
            });
          })
          .catch((err) => {
            console.error(err);
          })
          .then(() => cb(null));
      },
    }))
    .pipe(gulp.dest('spec-source'))
);


gulp.task('clean-spec', () => del([
  'spec/',
]));

gulp.task('copy-encodings', ['clean-spec'], () =>
  gulp.src('spec-source/single-byte-encodings.json')
    .pipe(gulp.dest('spec'))
);

gulp.task('single-byte-indexes', ['copy-encodings'], () =>
  gulp.src('spec-source/index-*.txt', { buffer: true })
    .pipe(new Transform({
      objectMode: true,
      transform(file, encoding, cb) {
        const filename = path.basename(file.path);
        const name = filename.slice(6, -4);

        const input = file.contents.toString();
        const regex = /$\s+(\d+)\s0x([0-9A-F]{4})/img;

        let codes = '';
        let matches;
        for (let i = 0; i < 128; i += 1) {
          matches = regex.exec(input);
          if (matches) {
            codes += String.fromCharCode(parseInt(matches[2], 16));
          } else {
            codes += '\u0000';
          }
        }

        this.push([name, codes]);
        cb(null);
      },
    }))
    .pipe(new CombineIntoArray())
    .pipe(new Transform({
      writableObjectMode: true,
      transform(arr, encoding, cb) {
        const indexes = {};
        arr.forEach(([name, codes]) => {
          indexes[name] = codes;
        });

        // no separate file for iso-8859-8-i
        indexes['iso-8859-8-i'] = indexes['iso-8859-8'];

        this.push(Buffer.from(JSON.stringify(indexes)));
        cb(null);
      },
    }))
    .pipe(source('single-byte-indexes.json'))
    .pipe(gulp.dest('spec'))
);


gulp.task('docs', () =>
  gulp.src('spec/single-byte-encodings.json', { buffer: true })
    .pipe(new Transform({
      objectMode: true,
      transform(file, encoding, cb) {
        const encodings = JSON.parse(file.contents.toString());
        this.push('Encoding | Labels\n');
        this.push('-------- | ------\n');
        encodings.forEach(({ name, custom, labels }) => {
          const joinedLabels = labels.reduce((a, x, i) => {
            let prefix;
            if (i === 0) {
              prefix = '';
            } else if (i % 4 === 0) {
              prefix = ',<br>';
            } else {
              prefix = ', ';
            }

            return a + prefix + x;
          }, '');
          let enc;
          if (!custom) {
            enc = `[${name}](https://encoding.spec.whatwg.org/index-${name.toLowerCase()}.txt)`;
          } else {
            enc = `\`${name}\``;
          }
          this.push(`${enc} | ${joinedLabels}\n`);
        });
        cb(null);
      },
    }))
    .pipe(source('Encodings.md'))
    .pipe(gulp.dest('.'))
);


gulp.task('clean', () => del([
  'lib/',
]));

gulp.task('flow-remove-types', ['clean'], () =>
  gulp.src('src/**/*.js')
    .pipe(mirror(
      rename({ extname: '.js.flow' }),
      new Transform({
        objectMode: true,
        transform: (file, enc, cb) => {
          // eslint-disable-next-line no-param-reassign
          file.contents = new Buffer(flowRemoveTypes(file.contents.toString()).toString());
          cb(null, file);
        },
      })
    ))
    .pipe(gulp.dest('lib/'))
);

gulp.task('default', ['flow-remove-types']);
