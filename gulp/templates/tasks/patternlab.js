var gulp 	= require('gulp'),
	run 	= require('gulp-run'),
	utils   = require("./utils"),
	browserSync = require("browser-sync"),
	config  = utils.loadConfig();

gulp.task('patternlab', ['patternlab-copy'], function() {
	run('php ' + config.root + '/html_templates/lab/core/console --generate').exec(function() {
		browserSync.reload();
	});
});

/** Copy output files to their folders inside the PatternLab web root */
gulp.task('patternlab-copy', ['css'], function() {
	return gulp.src(config.root + "/dist/*.{css,.map}")
		.pipe(gulp.dest(config.root + '/html_templates/lab/source/css'));
});

// register the watch
utils.registerWatcher("patternlab", [
	config.root + "/html_templates/lab/source/**/*.{twig,mustache,json}"
]);

utils.registerWatcher('patternlab-copy', [
	config.root + "/web/Website/dist/*"
]);

