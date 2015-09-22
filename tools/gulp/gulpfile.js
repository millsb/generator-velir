'use strict';

var gulp        = require('gulp'),
    paths       = require('./gulp-config').paths,
    hostname    = require('./gulp-config').hostname,
    browserSync = require('browser-sync');

// Velir task modules
require('./tasks/task-css');
require('./tasks/task-browserify');
require('./tasks/task-patternlab');


gulp.task('watch', function() {
    gulp.watch(paths.scss + "/**/*.scss", ['css']);
    gulp.watch(paths.js + "/**/*.js", ['browserify']);
    gulp.watch(paths.root + "bower.json", ['css-vendor', 'browserify-vendor']);
    gulp.watch(paths.html + "/lab/source/**/*.mustache", ['patternlab']);
    gulp.watch(paths.html + "/lab/source/**/*.json", ['patternlab']);

    var reload = browserSync.reload;

    browserSync({
        proxy: hostname,
        injectChanges: true
    });

    gulp.watch([
        paths.dist + "*.css",
        paths.dist + "*.js",
        paths.html + "/lab/public/*.html"
    ]).on('change', reload);
});

gulp.task('default', ['css', 'css-vendor', 'browserify', 'browserify-vendor', 'patternlab', 'watch']);

