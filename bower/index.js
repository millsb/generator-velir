'user strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    radar = require('./radar');

module.exports = generators.Base.extend({

    prompting: function() {
        var done = this.async();

        var prompts = [
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
            }
        ];

        this.prompt(prompts, function(answers) {
            this.jsFrameworks = answers.jsFrameworks;
            this.jsLibs = answers.jsLibs;

            done();
        }.bind(this));
    },

    writing: {
        bower: function () {
            var global = {
                name: this.options.name,
                private: true,
                dependencies: {},
                overrides: {}
            };

            var imported = {
                name: this.options.name,
                private: true,
                dependencies: {},
                overrides: {}
            };

            var allDeps = [].concat(this.jsFrameworks, this.jsLibs);
            console.log(allDeps);

            global.dependencies = _.reduce(allDeps, function(deps, lib) {
                var version = radar.getVersion(lib, { global: true });
                if (version) {
                    deps[lib] = version;
                }

                return deps;
            }, {});

            imported.dependencies = _.reduce(allDeps, function(deps, lib) {
                var version = radar.getVersion(lib, { global: false });
                if (version) {
                    deps[lib] = version;
                }

                return deps;
            }, {});

            global.overrides = radar.getIgnoreOverrides({ global: true });
            imported.overrides = radar.getIgnoreOverrides({ global: false });


            // Gulp will error if bower_components doesn't exist, even if the dep tree is empty
            // Create empty versions of those folders
            this.fs.write(path.join(this.options.vendorDir, '/import/bower_components/.gitkeep'), "");
            this.fs.write(path.join(this.options.vendorDir, '/global/bower_components/.gitkeep'), "");

            // Write our config files
            this.fs.write(path.join(this.options.vendorDir, '/global/bower.json'), JSON.stringify(global, null, 2));
            this.fs.write(path.join(this.options.vendorDir, '/import/bower.json'), JSON.stringify(imported, null, 2));
        }
    },

    install: function() {
        var vendorDir = this.options.vendorDir;
        var importedPath = path.join(vendorDir, '/import');
        var globalPath = path.join(vendorDir, '/global');

        // Running tasks synchronously ensure console ouput maintains a semblence of order
        this.spawnCommandSync('bower', ['install'], { cwd: importedPath });
        this.spawnCommandSync('bower', ['install'], { cwd: globalPath });
    }
});
