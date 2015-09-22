var plumber = require('gulp-plumber')
    notify  = require('gulp-notify');

function drano(){
    return plumber({
        errorHandler: function(err) {
            notify.onError({ title: "<%= error.plugin %>", message: "<%= error.message %>", sound: "Beep" })(err);
            this.emit("end");
        }
    });
};

module.exports = {
    drano: drano
}
