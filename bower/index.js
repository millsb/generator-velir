'user strict';

var generators = require('yeoman-generator'),
    chalk = require('chalk'),
    path = require('path'),
    _ = require('lodash'),
    radar = require('../app/radar');


module.exports = generators.Base.extend({

    initializing: function() {
        this.name = this.options.name;
        this.libs = this.options.libs;
        this.frameworks = this.options.frameworks;
        this.destPath = this.destinationPath(this.options.destPath);
    },

    writing: {
        bower: function () {
            var global = {
                name: this.name,
                private: true,
                dependencies: {},
                overrides: {}
            };

            var imported = _.extend({}, global);

            var allDeps = [].concat(this.libs, this.frameworks);

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
            this.fs.write(path.join(this.destPath, '/import/bower_components/.gitkeep'), "");
            this.fs.write(path.join(this.destPath, '/global/bower_components/.gitkeep'), "");

            // Write our config files
            this.fs.write(path.join(this.destPath, '/global/bower.json'), JSON.stringify(global, null, 2));
            this.fs.write(path.join(this.destPath, '/import/bower.json'), JSON.stringify(imported, null, 2));
        }
    },

    install: function() {
        var importedPath = path.join(this.destPath, '/import');
        var globalPath = path.join(this.destPath, '/global');

        // Running tasks synchronously ensure console ouput maintains a semblence of order
        this.spawnCommandSync('bower', ['install'], { cwd: importedPath });
        this.spawnCommandSync('bower', ['install'], { cwd: globalPath });
    }
});
