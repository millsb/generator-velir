var gulp = require('gulp'),
    mocha = require('gulp-spawn-mocha');

gulp.task('test', function() {
  return gulp.src('tests/test-*.js', { read: false })
    .pipe(mocha())
});

gulp.task('watch', function() {
  gulp.watch(['app/**/*.js', 'tests/test-*.js'], ['test']);
});

gulp.task('default', ['test', 'watch']);
