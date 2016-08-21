var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

/**
 * Compile SASS
 */
gulp.task('sass', function() {
    gulp.src('./src/client/sass/client.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: [
                './node_modules/sass-material-colors/sass/'
            ]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

/**
 * Compile JS
 */
gulp.task('js', function() {
    return browserify('./src/client/js/client.js')
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .bundle()
        .pipe(plumber())
        .pipe(source('client.js'))
        .pipe(buffer())
        .pipe(babel({
            presets: [ 'es2015' ]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./public/js/maps/'))
        .pipe(gulp.dest('./public/js/'));
});

/**
 * Compile readonly SASS
 */
gulp.task('readonly-sass', function() {
    gulp.src('./src/client/sass/readonly/readonly.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: [
                './node_modules/sass-material-colors/sass/'
            ]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/css'));
});

/**
 * Compile readonly JS
 */
gulp.task('readonly-js', function() {
    return browserify('./src/client/js/readonly/readonly.js')
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        })
        .bundle()
        .pipe(plumber())
        .pipe(source('readonly.js'))
        .pipe(buffer())
        .pipe(babel({
            presets: [ 'es2015' ]
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./public/js/maps/'))
        .pipe(gulp.dest('./public/js/'));
});

/**
 * Watch code
 */
gulp.task('watch', function() {
    gulp.watch('./plugins/**/*.js', [ 'js' ]);
    gulp.watch('./src/client/js/**/*.js', [ 'js' ]);
    gulp.watch('./src/client/sass/**/*.scss', [ 'sass' ]);
    gulp.watch('./src/client/js/readonly/**/*.js', [ 'readonly-js' ]);
    gulp.watch('./src/client/sass/readonly/**/*.scss', [ 'readonly-sass' ]);
});

// ----------
// Default tasks
// ----------
gulp.task('default', [ 'sass', 'js', 'readonly-sass', 'readonly-js', 'watch' ]);
