var _ = require('lodash');

var radar = {};

radar.getVersion = function(key) {
  var all = [].concat(radar.build, radar.modules, radar.frameworks, radar.libs);
  var version = _.result(_.find(all, { value: key }), 'version');
  return version;
}

radar.build = [
  {
    name: "Grunt",
    value: "grunt",
    version: "*"
  },
  {
    name: "Gulp",
    value: 'gulp',
    version: "*"
  }
];

radar.grunt = [
  {
    name: "grunt-sass",
    value: 'grunt-sass',
    version: "*"
  }
];

radar.modules = [
  {
    name: 'Globals (no module system)',
    value: 'globals'
  },
  {
    name: 'AMD (RequireJS)',
    value: 'requirejs',
    version: "*"
  },
  {
    name: 'CommonJS (Browserify)',
    value: 'browserify',
    version: "*"
  }
];

radar.frameworks = [
  {
    name: 'AngularJS',
    value: 'angular',
    version: "*",
    checked: false
  },
  {
    name: 'Backbone',
    value: 'backbone',
    version: "*",
    checked: false
  }
];

radar.libs = [
  {
    name: 'Bourbon (SCSS)',
    value: 'bourbon',
    version: "*",
    checked: true
  },
  {
    name: 'bxSlider',
    value: 'bxslider',
    version: "*",
    checked: false
  },
  {
    name: 'jQuery',
    value: 'jquery',
    version: "*",
    checked: true
  },
  {
    name: 'LoDash',
    value: 'lodash',
    checked: true
  },
  {
    name: "Modernizr",
    value: 'modernizr',
    checked: true
  },
  {
    name: 'Neat (SCSS)',
    value: 'neat',
    version: '*',
    checked: true
  }
];

radar.choices = function(key) {
  return _.pick(radar[key], 'name', 'value', 'checked');
}


module.exports = radar;
