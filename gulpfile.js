// require gulp
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    bourbon = require("node-bourbon").includePaths,
    neat = require("node-neat").includePaths;

// gulp task to process sass into css
gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass({
                includePaths: bourbon,
                includePaths: neat
            })) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('app/css')) //Sets destination of processed sass
    .pipe(browserSync.reload({ // Tells browserSync to reload when sass changes
      stream: true
    }))
});

// gulp task to run browserSync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

// gulp task to watch for changes and then run tasks above
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
  // // Reloads the browser whenever HTML or JS files change
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});
