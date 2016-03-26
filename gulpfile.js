const gulp = require('gulp');
const babel = require('gulp-babel');
const shell = require('gulp-shell');


gulp.task('build', function(cb) {
	return gulp.src('babel/**/**.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task("moveTests",["build"],function(){
	return gulp.src('./dist/test/*.*')
	.pipe(gulp.dest('./test'));
});

gulp.task('runScript', ['build'], function() {
	return gulp.src('./', {read: false})
		.pipe(shell([
			'node dist/main'
		]));
});

gulp.task('test', ['moveTests'], function() {
	return gulp.src('./', {read: false})
		.pipe(shell([
			'mocha'
		]));
});


gulp.task('default', ['build','moveTests',"test"]);

gulp.task('buildTest', ['build', 'test']);
