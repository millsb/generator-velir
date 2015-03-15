'use strict';

var generators = require('yeoman-generator'),
	chalk = require('chalk'),
	path = require('path'),
	_ = require('lodash'),
	radar = require('./radar');

module.exports = generators.Base.extend({

	initializing: {},

	prompting: function () {
		var done = this.async();

		var prompts = [
			{
				type: 'input',
				name: 'name',
				message: 'What is the name of your project?',
				default: 'velirapp'
			},
			{
				type: 'confirm',
				name: 'sitecore',
				message: 'Is this a Sitecore project?',
				default: true
			},
			{
				type: 'list',
				name: 'buildTool',
				message: 'Choose a build tool',
				choices: radar.choices('build')
			},
			{
				type: 'list',
				name: 'jsModules',
				message: 'Choose a module system',
				choices: radar.choices('modules')
			},
			{
				type: 'checkbox',
				name: 'jsFrameworks',
				message: 'Choose javascript frameworks to include',
				choices: radar.choices('frameworks')
			},
			{
				type: 'checkbox',
				name: 'jsLibs',
				message: 'Choose other javascript libraries to include',
				choices: radar.choices('libs')
			},
			{
				type: 'confirm',
				name: 'jsTests',
				message: 'Include JS unit testing?'
			}
		];

		this.prompt(prompts, function (answers) {
			this.name = answers.name;
			this.sitecore = answers.sitecore;
			this.buildTool = answers.buildTool;
			this.jsModules = answers.jsModules;
			this.jsFrameworks = answers.jsFrameworks || [];
			this.jsLibs = answers.jsLibs;
			this.jsTests = answers.jsTests || [];

			if (this.sitecore) {
				this.destinationRoot('./web/Website');
			}
			done();

		}.bind(this));
	},

	writing: {
		stylesheets: function () {
			var destFolder = 'styles/' + this.name + '/';
			this.fs.copyTpl(
				this.templatePath('scss/project.scss'),
				this.destinationPath('styles/' + this.name + '.scss'),
				{
					name: this.name,
					neat: this.jsLibs.hasOwnProperty('neat'),
					bourbon: this.jsLibs.hasOwnProperty('bourbon')
				});

			this.copy('scss/project/_colors.scss', destFolder + '_colors.scss');
			this.copy('scss/project/_forms.scss', destFolder + '_forms.scss');
			this.copy('scss/project/_general.scss', destFolder + '_general.scss');
			this.copy('scss/project/_mixins.scss', destFolder + '_mixins.scss');
			this.copy('scss/project/_typography.scss', destFolder + '_typography.scss');
		},

		html: function () {
			var htmlDir = this.sitecore ? "html_templates/" : "";
			this.fs.copyTpl(this.templatePath('index.html'),
				this.destinationPath(htmlDir + 'index.html'),
				this);
		},

		gulp: function () {
			var pathPrefix = this.sitecore ? "../../" : "";
			this.copy('gulp/_package.json', pathPrefix + 'tools/gulp/package.json');
			this.copy('gulp/gulpfile.js', pathPrefix + 'tools/gulp/gulpfile.js');
			this.copy('gulp/gulp-config.js', pathPrefix + 'tools/gulp/gulp-config.js');
			this.copy('gulp/gulp-util.js', pathPrefix + 'tools/gulp/gulp-util.js');
			this.copy('gulp/tasks/task-css.js', pathPrefix + 'tools/gulp/tasks/task-css.js');
			this.copy('gulp/tasks/task-browserify.js', pathPrefix + 'tools/gulp/tasks/task-browserify.js');
			this.copy('gulp/tasks/task-patternlab.js', pathPrefix + 'tools/gulp/tasks/task-patternlab.js');
		},

		bower: function () {
			var bower = {
				name: this.name,
				private: true,
				dependencies: {}
			};

			this.jsFrameworks.forEach(function (lib) {
				bower.dependencies[lib] = radar.getVersion(lib);
			});

			this.jsLibs.forEach(function (lib) {
				bower.dependencies[lib] = radar.getVersion(lib);
			});

			this.fs.write('bower.json', JSON.stringify(bower, null, 2));
		},


		settings: function () {
			this.copy('gitignore', '.gitignore');
			this.copy('bowerrc', '.bowerrc');
			this.copy('jshintrc', 'js/.jshintrc');
		}
	},

	install: function () {
		this.bowerInstall();
	},

	end: function () {
		// do an npm install in the gulp dir
		var gulpDir = path.join(__dirname, "tools/gulp");
		this.spawnCommand('npm', ['install'], {cwd: gulpDir});
	}
});

