var pr = pr || {};

(function ($, _, undefined) {
    "use strict";

    pr = (function () {

        var createModule = function (name, fn) {

            var bits = name.split('.'),
                currentPath = window;

            var tmpName = [];

            // Loop through the path pieces and ensure they exist
            if (bits.length) {
                for (var i = 0; i < bits.length; i++) {

                    if (_.isUndefined(currentPath[bits[i]])) {
                        currentPath[bits[i]] = {};
                    }

                    currentPath = currentPath[bits[i]];
                }
            } else {
                return false;
            }

            // Assign our module to the path
            currentPath = _.extend(currentPath, fn.call(currentPath));

            // Set up init if it exists
            if (_.isFunction(currentPath.init)) {
                $(document).ready(function () {
                    currentPath.init.call(currentPath);
                });
            }

            $(document).trigger('moduleCreated', [name]);
        };

        return {
            createModule: createModule,
        };

    }());

}(jQuery, _));

$.fn.animationComplete = function (callback) {
    return $(this).one('webkitAnimationEnd animationend', function (e) {
        // Important fix: ignore bubbled transition events
        if (e.target == this) {
            callback.apply(this);
        }
    });
};

if (typeof jstz !== 'undefined') {
    document.cookie = "timezone=" + jstz.determine().name();
}