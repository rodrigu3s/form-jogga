const { src, dest, watch, series, parallel } = require('gulp');
const browserSync = require('browser-sync');
const clean = require('gulp-clean');
const pathExists = require('path-exists');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const { PATHS, DEST_PATH } = require('./paths');

// SWALLOW ERROR
function swallowError(error) {
    console.log(error.toString());  
    this.emit("end");   
};

// HTML
function html() {
    return src(PATHS.html.origin)
        .pipe(fileinclude({
            prefix: '@@',           
            basepath: '@file'        
        }))
        .pipe(htmlmin({collapseWhitespace: true })) 
        .on('error', swallowError)
        .pipe(dest(PATHS.html.dist));
};


// JS
function scripts(){
    return src(PATHS.scripts.origin)
        .pipe(concat('index.js'))
        // .pipe(uglify())
        .on('error', swallowError)
        .pipe(dest(PATHS.scripts.dist))
}


// SCSS
function scss(){
    return src(PATHS.sass.origin)
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(dest(PATHS.sass.dist));   
};


// CLEAN DIST
function cleanDist(){
    return src(DEST_PATH)
        .pipe(clean());
};


// BROWSER SYNC
function reload(done) {
    browserSync.reload();
    done();
};

function server(done) {
    browserSync.init({
      server: {
        baseDir: DEST_PATH
      },
    });
    done();
};

// WATCH FILE
function watchFiles(){
    watch(PATHS.sass.watch, series(scss, reload))
    watch([...PATHS.html.include, PATHS.html.origin], series(html, reload))
    watch(PATHS.scripts.origin, series(scripts, reload))
};


// TASK
const wipe = series(cleanDist);
const develop = parallel(html, scss, scripts);
const build = () => {
    return pathExists.sync(DEST_PATH) ? series(wipe, develop) : develop;
};


// EXPORTS
module.exports = {
    wipe,
    dev: series(develop, server, watchFiles),
    default: develop,
    build: build()
};