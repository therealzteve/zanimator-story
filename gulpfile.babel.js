// generated on 2016-05-03 using generator-webapp 2.0.0
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins'; // Loads any plugin from package.json
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';

var source = require('vinyl-source-stream');
var collapse = require('bundle-collapser/plugin');

const $ = gulpLoadPlugins();

// ##################
// TASKS
// ##################

gulp.task('default', ['clean'], () => {
  gulp.start('build');
  gulp.watch('app/**/*.js', ['build']);
});

/**
  Cleans the temporary projects folders
*/
gulp.task('clean', del.bind(null, ['.tmp']));

/**
  Main build task
*/
gulp.task('build', ['lint', 'buildlib'], () => {
  return gulp.src('dist/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});


//gulp.task('lint', lint('app/scripts/**/*.js'));
gulp.task('lint', () => {
  return gulp.src('app/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/**
 * Builds the library for using in the browser
 */
gulp.task('buildlib', ['scripts'], () => {
  var b = browserify({
      debug: true,
      standalone: 'zAnimator'
    })
    .transform(babelify)
    .require('.tmp/main.js',
      {
        entry: true,
        fullPaths: false
        })
    .plugin(collapse);

    return b.bundle()
     .on('error', function (err) { console.log('Error: ' + err.message); })
     .pipe(source('zAnimator.js'))
     .pipe(gulp.dest('lib/'));
});

gulp.task('scripts', () => {
  return gulp.src('app/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp'));
});
