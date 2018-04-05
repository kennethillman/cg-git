
const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const imagemin      = require('gulp-imagemin');
const using         = require('gulp-using');
const path          = require('path');

const config = require('../config');

///////////////////////////
/// IMAGES FOR BRANDS
///////////////////////////

const imagesCopyToBrand = function(env){

    let logosrc = 'assets/images/'+env+'/*.*';
   
    return gulp.src(logosrc)
        .pipe(using())
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.dev, env, 'images')), gulp.dest(path.join(config.dist, env, 'images'))))

}


gulp.task('images:amelia', function() {
    return imagesCopyToBrand('amelia');
});

gulp.task('images:alltommat', function() {
    return imagesCopyToBrand('alltommat');
});

gulp.task('images:damernasvarld', function() {
    return imagesCopyToBrand('damernasvarld');
});

gulp.task('images:skonahem', function() {
    return imagesCopyToBrand('skonahem');
});

gulp.task('images:veckorevyn', function() {
    return imagesCopyToBrand('veckorevyn');
});

gulp.task('images:amelia', function() {
    return imagesCopyToBrand('amelia');
});

gulp.task('images:topphalsa', function() {
    return imagesCopyToBrand('topphalsa');
});

gulp.task('images:mama', function() {
    return imagesCopyToBrand('mama');
});


gulp.task('images:all', [
        'images:amelia',
        'images:alltommat',
        'images:damernasvarld',
        'images:skonahem',
        'images:veckorevyn',
        'images:topphalsa',
        'images:mama'
]);