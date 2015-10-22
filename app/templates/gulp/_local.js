// this file is optional and is for settings that should not be checked into git.
// to use, copy the contents into local.js

// Variables
var webRoot = '../../web/Website';
var destRoot = '../../web/Website/dist';
var projectName = <%= projectName %>;

module.exports = {

	/**
	 * ENVIRONMENT
	 */

	// Current build environment
	env: 'dev',

	/**
	 * DIRECTORY SETTINGS
	 */

	// Our web root
	root: webRoot,

	// Root of build destination
	// NOTE: This directory WILL BE REMOVED AND REMADE
	dest: destRoot,


	/**
	 * SERVER SETTINGS
	 */

	// Hostname to be used with browserSync for proxy.
	// http://www.browsersync.io/docs/options/#option-proxy
	// omit or set to false for static sites
	//"hostname": "my-project.machine.velir.com",


	// Port that browsersync will run on
	// http://www.browsersync.io/docs/options/#option-port
	browserSyncPort: 9080,

	// Proxy address that browsersync will use
	// i.e., my-project.machine.velir.com -> localhost:9080

	// What gulp task to run when you type "gulp"
	defaultTask: "build",

	// start a browserSync server?

	/**
	 * TASK SETTINGS
	 */
	loadedTasks: ['bower', 'css', 'js'],
	taskConfig: {
		js: {
			default: {
				// Patern of files to compile
				src: [webRoot + '/js/**/*.js'],

				// Name of output file
				filename: projectName + '.js'
			}
		},

		css: {
			default: {
				// Pattern of files to compile
				src: [webRoot + '/styles/' + projectName + '/' + projectName + '.scss'],
			}
		},

		bower: {
			default: {
				// Where bower.json can be found
				bowerRoot: webRoot + "/vendor",
				js: {
					// Name of bower js bundle
					filename: "vendor.js"
				},
				css: {
					// Name of bower css bundle
					filename: "vendor.css"
				},
				// Specify bower packages that will NOT be bundled
				ignorePackages: ['modernizr', 'bourbon', 'neat']
			}
		},

		svgSprite: {
			default: {
				// Folder full of individual icons
				src: webRoot + '/assets/icons/*.svg',
				// Name of output file
				filename: 'icons.svg'
			}
		}
	}
};