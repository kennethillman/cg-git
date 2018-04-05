const gulp          = require('gulp');
const shrinkwrap 	= require('gulp-shrinkwrap');


const config = require('../config');

///////////////////////////
/// SHRINKWRAP
///////////////////////////

 
gulp.task('shrinkwrap', () => {
  return gulp.src('package.json')
    .pipe(shrinkwrap())      // just like running `npm shrinkwrap` 
    .pipe(gulp.dest('./'));  // writes newly created `npm-shrinkwrap.json` to the location of your choice 
});
 
gulp.task('shrinkwrap-dev', () => {
  return gulp.src('package.json')
    .pipe(shrinkwrap({dev: true}))  // just like running `npm shrinkwrap --dev` 
    .pipe(gulp.dest('./'));
});
