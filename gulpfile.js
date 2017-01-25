// Purpose of this file is describe 'tasks' that convert from
// developer mode to production mode. 
// Things like converting Sass to CSS, removing comments, mergin files, etc.

// 1. Import gulp
let gulp = require('gulp');
let sass = require('gulp-sass');
let browser = require('gulp-browser');

// 2. create default tasks
gulp.task('default', ['html', 'css', 'js']);

// 3. create subtasks
gulp.task('html', function () {
    // Copy index.html into the public/ directory
    return gulp.src('index.html')
        .pipe(gulp.dest('public/'));
});

gulp.task('css', function () {
    // Convert style.scss to style.css
    // Copy css file to public/
    return gulp.src('scss/style.scss')
        .pipe(sass()) // requires gulp-sass
        .pipe(gulp.dest('public/'));
});

gulp.task('js', function () {
    // Copy js file to public/
    return gulp.src('js/app.js')
        .pipe(browser.browserify())
        .pipe(gulp.dest('public/'));
});

gulp.task('watch', ['default'], function() {
    //gulp.watch('files-to-watch', 'task-to-run')
    gulp.watch('*.html', ['html']);
    gulp.watch('scss/*.scss', ['css']);
    gulp.watch('js/*.js', ['js']);
});