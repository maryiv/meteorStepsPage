const gulp = require('gulp');
const sass = require('gulp-sass');
const autoPrefix = require('gulp-autoprefixer');
const paths = {
    input: '../imports/ui/stylesheets/**/*.scss',
    output: '../client/'
};

gulp.task('sass', function() {
    return gulp
        .src(paths.input)
        .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
        .pipe(autoPrefix())
        .pipe(gulp.dest(paths.output));
});

gulp.task('watch', function() {
    return gulp
        .watch(paths.input, ['sass'])
        .on('change', function(event) {
            console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
});

gulp.task('default', ['sass', 'watch']);

gulp.task('prod', function () {
    return gulp
        .src(paths.input)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(autoPrefix())
        .pipe(gulp.dest(paths.output));
});