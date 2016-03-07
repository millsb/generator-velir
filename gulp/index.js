'use strict';

var generators = require('yeoman-generator'),
	chalk = require('chalk'),
	path = require('path'),
	_ = require('lodash'),
	tasks = require('./tasks');

module.exports = generators.Base.extend({

	initializing: function() {
	},

	prompting: function () {
		var done = this.async();

		var prompts = [
			{
				type: 'checkbox',
				name: 'tasks',
				message: 'Which gulp tasks would you like to install?',
				choices: tasks
			}
		];

		this.prompt(prompts, function (answers) {
			this.tasks = answers.tasks;

			done();

		}.bind(this));
	},

	writing: {
		gulp: function () {
			var dest = this.options.dest;

			var dotFiles = [
				'gitignore',
				'eslintrc'
			];
			var requiredFiles = [
				'gulp-readme.md',
				'package.json',
				'tasks/utils.js'
			];

			var templateFiles = [
				'gulpfile.js',
				'local.js.example'
			];

			var taskFiles = this.tasks.map(function (task) {
				var filename = _.find(tasks, { value: task }).file;
				return 'tasks/' + filename;
			});

			var _this = this;
			dotFiles.forEach(function (filename) {
				_this.fs.copy(
					_this.templatePath(filename),
					_this.destinationPath(dest + '/' + '.' + filename))
			});

			requiredFiles.forEach(function (filename) {
				_this.fs.copy(
					_this.templatePath(filename),
					_this.destinationPath(dest + '/' + filename));

			});

			templateFiles.forEach(function (filename) {
				_this.fs.copyTpl(
					_this.templatePath(filename),
					_this.destinationPath(dest + '/' + filename),
					{taskList: _this.tasks, projectName: _this.options.projectName});
			});

			console.log(taskFiles);
			taskFiles.forEach(function (filename) {
				_this.fs.copyTpl(
					_this.templatePath(filename),
					_this.destinationPath(dest + '/' + filename),
					{taskList: _this.tasks, projectName: _this.options.projectName });
			});
		}
	},

	install: function() {
		//this.spawnCommandSync('npm', ['install'], {cwd: this.options.dest});
	},

	end: function () {
		var gulpDir = path.join(this.destinationPath(this.options.dest));
		//this.spawnCommand('gulp', ['build'], { cwd: gulpDir });
	}
});

