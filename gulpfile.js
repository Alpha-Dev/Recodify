const gulp = require('gulp');
const babel = require('gulp-babel');
const shell = require('gulp-shell')

gulp.task('build', function(cb) {
	return gulp.src('babel/**/**.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
  cb(err);
});

gulp.task('runScript', ['build'], function() {
	return gulp.src('./', {read: false})
		.pipe(shell([
			'node dist/main'
		]));
});

gulp.task('default', ['build', 'runScript']);
