
const gulp          = require('gulp');
const gulpif        = require('gulp-if');
const using         = require('gulp-using');
const path          = require('path');

const config = require('../config');


///////////////////////////
/// LOGOS
///////////////////////////

const logoCopyToBrand = function(env){

    let logosrc = 'assets/svg/logos/'+env+'.svg';
   
    return gulp.src(logosrc)
        .pipe(using())
        .pipe(gulpif(!config.prod, gulp.dest(path.join(config.dev, env)), gulp.dest(path.join(config.dist, env))))

}


gulp.task('logos:amelia', function() {
    return logoCopyToBrand('amelia');
});

gulp.task('logos:alltommat', function() {
    return logoCopyToBrand('alltommat');
});

gulp.task('logos:damernasvarld', function() {
    return logoCopyToBrand('damernasvarld');
});

gulp.task('logos:skonahem', function() {
    return logoCopyToBrand('skonahem');
});

gulp.task('logos:veckorevyn', function() {
    return logoCopyToBrand('veckorevyn');
});

gulp.task('logos:amelia', function() {
    return logoCopyToBrand('amelia');
});

gulp.task('logos:topphalsa', function() {
    return logoCopyToBrand('topphalsa');
});

gulp.task('logos:mama', function() {
    return logoCopyToBrand('mama');
});


gulp.task('logos:all', [
        'logos:amelia',
        'logos:alltommat',
        'logos:damernasvarld',
        'logos:skonahem',
        'logos:veckorevyn',
        'logos:topphalsa',
        'logos:mama'
]);