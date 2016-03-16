var _ = require('lodash');

var radar = {};

radar.getVersion = function(key, filteredBy ) {
    var filtered = radar.filtered(filteredBy);
    var version = _.result(_.find(filtered, { value: key }), 'version');
    return version;
};

radar.getIgnoreOverrides = function(filteredBy) {
    var filterPred = _.extend(filteredBy, { bowerIgnore: true });
    var filtered = radar.filtered(filterPred);

    return _.reduce(filtered, function(overrides, entry) {
        overrides[entry.value] = { ignore: true };
        return overrides;
    }, {});
};

radar.filtered = function(predicate) {
    return _.filter([].concat(radar.frameworks, radar.libs), predicate);
};

radar.choices = function(key) {
    return _.map(radar[key], function(collection) {
        return _.pick(collection, 'name', 'value', 'checked');
    });
};


radar.frameworks = [
    {
        name: 'AngularJS',
        value: 'angular',
        version: "*",
        checked: false,
        global: false
    },
    {
        name: 'Backbone',
        value: 'backbone',
        version: "*",
        checked: false,
        global: false
    }
];

radar.libs = [
    {
        name: 'Bourbon (SCSS)',
        value: 'bourbon',
        version: "*",
        checked: true,
        bowerIgnore: true,
        global: true
    },
    {
        name: 'bxSlider',
        value: 'bxslider',
        version: "*",
        checked: false,
        global: false
    },
    {
        name: 'jQuery',
        value: 'jquery',
        version: "*",
        checked: true,
        global: false
    },
    {
        name: 'LoDash',
        value: 'lodash',
        version: '*',
        checked: true,
        global: false
    },
    {
        name: 'Neat (SCSS)',
        value: 'neat',
        version: '*',
        checked: true,
        bowerIgnore: true,
        global: true
    }
];



module.exports = radar;
