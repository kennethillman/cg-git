
const gulp          = require('gulp');
const watch         = require('gulp-watch');



const config = require('../config');

///////////////////////////
/// WATCHERS
///////////////////////////


gulp.task('watch:all', ['watch:styles', 'watch:scripts']);

gulp.task('watch:styles', () => {
	gulp.watch(config.watch.styles, ['styles']);
});

gulp.task('watch:scripts', () => {
	gulp.watch(config.watch.scripts, ['scripts']);
});