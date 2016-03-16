var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash');

module.exports = generators.Base.extend({

    initializing: function() {
        this.name = this.options.name;
        this.libs = this.options.libs;
        this.destPath = this.destinationPath(this.options.destPath);
    },

    writing: {
        styles: function () {
            var topFile = this.templatePath('project.scss');
            var otherFiles = this.templatePath('project/**/*.scss');
            var destFolder = path.join(this.destPath, "/" +  this.name);

            this.fs.copyTpl(
                topFile,
                path.join(destFolder, "/" + this.name + '.scss'),
                {
                    name: this.name,
                    libs: this.libs
                });

            this.fs.copy(otherFiles, destFolder);
        }
    }
});
