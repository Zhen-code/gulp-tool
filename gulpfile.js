const { series, parallel, src, dest, watch, symlink } = require('gulp')
const gulp = require('gulp')
const { EventEmitter } = require('events');
const { exec } = require('child_process');
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps')
const minifyCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer')
// const imagemin = import('gulp-imagemin')
// let /** @type {import("gulp-imagemin")} */ imagemin;
// const startup = async () => {
//     // @ts-ignore
//     imagemin = (await import("gulp-imagemin")).default
// }
// run this task before any that require imagemin
gulp.task("startup", async () => {
    await startup();
});
function streamTask() {
    return src('*.js').pipe(dest('output'))
}
function promiseTask() {
    return Promise.resolve('the value is ignored');
  }
  function eventEmitterTask() {
    const emitter = new EventEmitter();
    // Emit has to happen async otherwise gulp isn't listening yet
    setTimeout(() => emitter.emit('finish'), 250);
    return emitter;
  }
  function childProcessTask() {
    return exec('date');
  }

  function javascript() {
    return src('src/js/*.js',{
        
    })
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
        extname: '.min.js'
    }))
    .pipe(sourcemaps.write('../maps',{
        mapFile: function(mapFilePath) {
            return mapFilePath.replace('.js.map', '.map')
        }
    }))
    .pipe(dest('build/js'))
  }
  
  function css() {
    return src('src/css/**/*.css')
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('./'))
    .pipe(dest('build/css'))
  }
  function html(cb) {
    // body omitted
    // cb();
    console.log(455);
    return src('src/page/*.html',{
        allowEmpty: true,
        buffer: true,
        read: true,
        removeBOM: true,
        sourcemaps: false,
        resolveSymlinks: true,
        uniqueBy: 'path'
    })
    .pipe(dest('build/page'))
  }
  function link() {
    return src('src/js/*.js')
      .pipe(symlink('output/'));
  }

// watch('src/page/*.html',{
//    events: 'all',
//    ignoreInitial: true,
//    queue: true,
//    delay: 500
// },html)

exports.default = series(image) 

