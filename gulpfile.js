var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var read = require('read-file');
var bower = require('gulp-bower');

var localServer = require('./server.js');

gulp.task('js', function () {
    return gulp.src('./src.js/**/*.js')
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('./build/client/'));
});

gulp.task('tmpl', function () {
    return gulp.src('./src.js/templates/*.html')
        .pipe(plugins.angularTemplates({module: "MainModule"}))
        .pipe(gulp.dest('./build/client/'));
});

gulp.task('libs', function () {
    return bower()
        .pipe(gulp.src(mainBowerFiles()))
        .pipe(plugins.concat('libs.js'))
        .pipe(gulp.dest('./'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['js', 'tmpl', 'libs'], function () {
    return gulp.src('./build/client/*.js')
        .pipe(plugins.concat('client.js'))
        .pipe(gulp.dest('./'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build'], function () {

    //localServer.app.start();

    gulp.watch('src.js/**/*.js', ['build']);
    gulp.watch('src.js/**/*.html', ['build']);
});