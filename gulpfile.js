var gulp = require('gulp');
var $gulp = require('gulp-load-plugins')();

gulp.task('js', function () {
    return gulp.src('./src.js/**/*.js')
        .pipe($gulp.ngAnnotate())
        .pipe($gulp.concat('app.js'))
        .pipe(gulp.dest('./build/client/'));
});

gulp.task('tmpl', function () {
    return gulp.src('./src.js/templates/*.html')
        .pipe($gulp.angularTemplates({module: "MainModule"}))
        .pipe(gulp.dest('./build/client/'));
});

gulp.task('build', ['js', 'tmpl'], function () {
    return gulp.src('./build/client/*.js')
        .pipe($gulp.concat('client.js'))
        .pipe(gulp.dest('./'))
        .pipe($gulp.uglify())
        .pipe($gulp.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('default', ['build'], function () {
    gulp.watch('src.js/**/*.js', ['build']);
    gulp.watch('src.js/**/*.html', ['build']);
});