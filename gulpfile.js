// including plugins
// gulp refs:
//   1) 10 things to know about Gulp: https://engineroom.teamwork.com/10-things-to-know-about-gulp/
//   2) Gulp for Beginners: https://css-tricks.com/gulp-for-beginners/
// note: to add more plugins:
// $ sudo npm install gulp-debug --save-dev


// including plugins
var gulp =        require( 'gulp' ),
    util =        require( 'gulp-util' ),
    concat =      require( 'gulp-concat' ),
    uglify =      require( 'gulp-uglify' ),
    minify =      require( 'gulp-minify' ),
    minifyHtml =  require( 'gulp-minify-html' ),
    debug =       require( 'gulp-debug' );
//var $ = require('gulp-load-plugins')();

//util.log("./dist/0.0.2/trr_photo_effects.min.js");
gulp.task( 'default', function() {
  gulp.src([
    // "dev/src/*.js",
    //'./js/load_the_script_loader.js',

    // 3rd party libs.
    './js/ScrollMagic/scrollmagic/minified/ScrollMagic.min.js',
    './js/ThreeJs/three.min.js',

    // Plugin core libs.
    './js/main.js',
    './js/globals.js',
    './js/lib.js',
    './js/init.js',
    './js/scroll-event.js',
    './js/page-fixups.js',

    // for the canvas-dots effect extensions.
    './js/canvas-dots/js/globals-canvas-dots.js',
    './js/canvas-dots/js/management-page-fixes-canvas-dots.js',
    './js/canvas-dots/js/init-canvas-dots.js',
    './js/canvas-dots/js/lib-canvas-dots.js',
    './js/canvas-dots/js/scroll-event-canvas-dots.js',
    './js/canvas-dots/images/image-data-canvas-dots.js',

    // for the pixellate effect extensions.
    './js/pixellate/js/globals-pixellate.js',
    './js/pixellate/js/management-page-fixes-pixellate.js',
    './js/pixellate/js/init-pixellate.js',
    './js/pixellate/js/lib-pixellate.js',
    './js/pixellate/js/scroll-event-pixellate.js',
    './js/pixellate/images/image-data-pixellate.js',

    ])
    .pipe(debug({title: 'Loaded:'}))
    .pipe(concat( 'trr_photo_effects.0.0.2.min.js' ))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/0.0.2'))
    .pipe(debug());
});

/*jshint node: true, strict: false */
/*
var gulp = require('gulp');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task( 'dist', function() {
  var jsFiles = [
    'js/vector.js',
    'js/particle.js',
    'js/breathing-halftone.js'
  ];

  gulp.src( jsFiles )
    .pipe( concat('breathing-halftone.pkgd.js') )
    .pipe( gulp.dest('dist') );

  gulp.src( jsFiles )
    .pipe( rename('breathing-halftone.pkgd.min.js') )
    .pipe( uglify({ preserveComments: 'some' }) )
    .pipe( gulp.dest('dist') );

});
*/
