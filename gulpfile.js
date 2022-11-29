var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	clean = require('gulp-clean'),
	connect = require('gulp-connect'),
	replace = require('gulp-html-replace'),
	juice = require('gulp-juice'),
	sass = require('gulp-sass'),
	util = require('gulp-util');

var paths = {
	style: './src/arquivos/style/*.{scss,css,sass}',
	html: './src/**/*.{html,htm}',
	prod: './dist'
};


gulp.task('clean', function () {
    return gulp.src(paths.prod).pipe(clean());
});

gulp.task('css', function () {
	return gulp.src(paths.style)
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 30 versions'],
			cascade: false
		}))
		.pipe(gulp.dest(paths.prod));
});

gulp.task('html',['css'], function () {
	return gulp.src(paths.html)
		.pipe(juice({
			webResources: {
				images: false,
			},
			removeStyleTags :false
		}))
		.pipe(gulp.dest(paths.prod));
});


gulp.task('connect', ['build'], function () {
	connect.server({
		root: 'dist',
		livereload: true,
		port: 3500
	});
});

gulp.task('watch', ['connect'], function () {
	gulp.watch('src/arquivos/style/**/*', ['html']);
	gulp.watch(paths.html, ['html']);
});


gulp.task('build', ['clean'], function () {
    gulp.start(['html']);
});



gulp.task('default', function () {
    gulp.start(['build']);
});
