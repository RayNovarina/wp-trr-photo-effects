// including plugins
var gulp = require( 'gulp' ),
    uglify = require( 'gulp-uglify' ),
    minifyHtml = require( 'gulp-minify-html' ),
    concat = require( 'gulp-concat' );

gulp.task( 'minify', function() {
  gulp.src([
    // "dev/src/*.js",
      './js/load_the_script_loader.js',
      //'./js/globals.js',
      //'./js/lib.js',
      //'./js/init.js',
      //'./js/scroll-event.js',
      //'./js/page-fixups.js',
      //'./js/main.js',
           ])
    .pipe(concat( 'trr_photo_effects.min.js' ))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/0.0.1'))
});
