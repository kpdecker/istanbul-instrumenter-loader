'use strict';

var istanbul = require('istanbul');

module.exports = function(source) {
    if (this.cacheable) {
        this.cacheable();
    }

    // If we were in a pitched response then do not perform coverage as this is likely
    // generated code and has a very high chance of having a name conflict on `resourcePath`.
    //
    // This is a bit hacky and https://github.com/webpack/webpack/issues/655 has been filed
    // to see if we can get a more formal API.
    if (!this.request) {
      return source;
    }

    var instrumenter = new istanbul.Instrumenter({
        embedSource: true,
        noAutoWrap: true
    });

    return instrumenter.instrumentSync(source, this.resourcePath);
};
