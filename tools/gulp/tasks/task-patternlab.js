'use strict';

var gulp    = require('gulp'),
    shell   = require('gulp-shell'),
    drano   = require('../gulp-util').drano,
    paths   = require('../gulp-config').paths;

gulp.task('patternlab', function() {

    gulp.src('')
        .pipe(drano())
        .pipe(shell([
            "php " + paths.html + "lab/core/builder.php -g"
        ]))
});
