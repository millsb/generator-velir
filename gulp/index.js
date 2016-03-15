'use strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    allTasks = require('../app/tasks');

module.exports = generators.Base.extend({

    initializing: function() {
        this.name = this.options.name;
        this.tasks = this.options.tasks;
        this.destPath = this.destinationPath(this.options.destPath);
    },

    writing: {
        gulp: function () {

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
                var filename = _.find(allTasks, { value: task }).file;
                return 'tasks/' + filename;
            });

            var _this = this;
            dotFiles.forEach(function (filename) {
                _this.fs.copy(
                    _this.templatePath(filename),
                    path.join(_this.destPath, filename));
            });

            requiredFiles.forEach(function (filename) {
                _this.fs.copy(
                    _this.templatePath(filename),
                    path.join(_this.destPath, filename));
            });

            templateFiles.forEach(function (filename) {
                _this.fs.copyTpl(
                    _this.templatePath(filename),
                    path.join(_this.destPath, filename),
                    {taskList: quoteArrayValues(_this.tasks), name: _this.name});
            });

            console.log(taskFiles);
            taskFiles.forEach(function (filename) {
                _this.fs.copyTpl(
                    _this.templatePath(filename),
                    path.join(_this.destPath, filename),
                    {taskList: quoteArrayValues(_this.tasks), name: _this.options.projectName });
            });
        }
    },

    install: function() {
        // Running tasks synchronously ensure console ouput maintains a semblence of order
        this.spawnCommandSync('npm', ['install'], {cwd: this.destPath });
    },

    end: function () {
        // Running tasks synchronously ensures console ouput maintains a semblence of order
        this.spawnCommandSync('gulp', ['watch'], { cwd: this.destPath });
    }
});

function quoteArrayValues(arr) {
    return arr.map(function(item) {
        return "\'" + item + "\'";
    }).join(',');
}

