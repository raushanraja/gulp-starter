const { gulp, series, src, dest  } = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var browserSync = require('browser-sync')
var watch = require('gulp-watch');

function PUG() {
    return src('pug/*.pug')
        .pipe(pug({
            doctype: 'html',
            pretty: true
        }))
        .pipe(dest('./dist/'))
        .pipe(browserSync.stream());
}

function SASS() {
    return src('scss/*.scss')
        .pipe(sass()).on('error', sass.logError)
        .pipe(dest('./dist/css'))
        .pipe(browserSync.stream());
}

function IMAGE() {
    return src('images/*')
        .pipe(dest('./dist/images'))
        .pipe(browserSync.stream());
}


function JS() {
    return src('js/*')
        .pipe(dest('./dist/js'))
        .pipe(browserSync.stream());
}


function WATCH(done) {
    browserSync.init({
        server: "./dist"
    });

    watch('scss/**/*.scss',SASS);
    watch('pug/**/*.pug', PUG);
    watch('images/**/*.*', IMAGE);
    watch('js/**/*.js', JS);
    watch('dist/*').on('change', browserSync.reload)
}


exports.default = series(PUG,IMAGE,SASS,WATCH);