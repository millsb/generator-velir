/**
 *  Usage:
 *      Once per computer:
 *         $ npm install -g gulp
 *
 *      Once per project, in gulp folder:
 *         $ npm install
 *
 *
 *      Running clumped tasks (defined in this file) --
 *      see tasks/utils.js config
 *         $ gulp dev
 *
 *      Running single task (task defined in /tasks.  eg. /tasks/css.js)
 *         $ gulp css            // will use the default config
 *         $ gulp css --env prod // will use the prod config
 *
 *      For details on setConfig, see "user supplied keys" in /tasks/utils.js
**/

// Include gulp and plugins
var gulp    = require("gulp"),
    utils   = require("./tasks/utils"),
    path    = require("path"),
    config  = utils.loadConfig(); // initialize the config


// set some defaults
utils.setConfig({
    root : path.resolve("../../web/Website"),
    dest : path.resolve("../../web/Website/dist")
});


// load the tasks
utils.loadTasks([<%- taskList %>]);

/**
 * dev task
 */
gulp.task("build", function(){

    // set the dev config (cache in utils.js)
    utils.setConfig({
        env   : "dev",
        watch : false
    });

    // build with this config
    utils.build();
});

/**
 * dev task
 */
gulp.task("watch", function(){

    // set the dev config (cache in utils.js)
    utils.setConfig({
        env   : "dev",
        watch : true
    });

    // build with this config
    utils.build();
});

/**
 * prod task
 */
gulp.task("prod", function(){

    // set the prod config (cache in utils.js)
    utils.setConfig({
        env   : "prod",
        watch : false
    });

    // build with this config
    utils.build();

});




// Default Task (run when you run 'gulp'). dev envirnoment
gulp.task("default", [config.local.defaultTask || "build"]);
