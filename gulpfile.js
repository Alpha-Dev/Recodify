var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('gulp-browserify');

gulp.task('babel', function () {
  return gulp.src(['babel/main.js'])
      .pipe(browserify({
          transform:['babelify']
      }))
      .pipe(gulp.dest('script'));
});
