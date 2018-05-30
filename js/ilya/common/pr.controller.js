; (function ($, _, undefined) {
    "use strict";

    pr.createModule('pr.controller', function () {

        var _controllers = {},
            _prototypes = {};

        var init = function () {
                $(document).on('contentChange', function (e, newNode) {
                    initializeControllers(newNode);
                });
            },

            initializeControllers = function (node) {
                node.find('[data-controller]').each(function (idx, elem) {
                    initControllerOnElem(elem, $(this).attr('data-controller'));
                });
            },

            register = function (id, definition) {
                _controllers[id] = definition;

                $(document).find('[data-controller="' + id + '"]').each(function (idx, elem) {
                    initControllerOnElem(elem, id);
                });
            },

            initControllerOnElem = function (elem, controllerID) {

                if (_.isUndefined($(elem).data('_controllers'))) {
                    $(elem).data('_controllers', []);
                }

                $(elem).data('_controllers').push(controllerID);


                if (_.isUndefined(_prototypes[controllerID])) {
                    // Fetch our controller prototype
                    _prototypes[controllerID] = getBaseController();
                    // Extend with our specific controller methods
                    $.extend(true, _prototypes[controllerID].prototype, _controllers[controllerID]);
                }

                // And init
                if (_.isUndefined($(elem).data('_controllerObjs'))) {
                    $(elem).data('_controllerObjs', []);
                }

                var controllers = $(elem).data('_controllerObjs');
                var obj = new _prototypes[controllerID](elem, controllerID);

                controllers.push(obj);


                if (_.isFunction(obj.initialize)) {
                    obj.initialize.call(obj);
                }

                $(elem).removeData('_controller' + controllerID);

                $(document).trigger('controllerReady', {
                    controllerID: obj.controllerID,
                    controllerType: obj.controllerType,
                    controllerElem: elem
                });
            },

            /**
             * Returns a new function that will form our controller prototype
             *
             * @returns 	{function}
             */
            getBaseController = function () {

                /** Base controller definition */
                var baseController = function (scope, type) {
                    this.scope = $(scope);
                    this._eventListeners = [];

                    var self = this;

                    // Add a destroy event handler
                    this.on('destroy', function (e) {
                        // Important - we don't want this event to bubble
                        e.stopPropagation();

                        // Remove each event listener that was created in this controller
                        if (self._eventListeners.length) {
                            for (var i = 0; i < self._eventListeners.length; i++) {
                                var data = self._eventListeners[i];

                                if (data['delegate']) {
                                    data['elem'].off(data['ev'], data['delegate'], data['fn']);
                                } else {
                                    data['elem'].off(data['ev'], data['fn']);
                                }
                            }
                        }

                        if (_.isFunction(self.destroy)) {
                            self.destroy.call(self);
                        }

                        // Remove reference to scope so that GC can do its thing
                        self.scope = null;
                    });
                };

                // Searches for controllers within the current, triggers a destroy event and deletes the controller objs
                baseController.prototype.cleanContents = function () {
                    this.scope.find('[data-controller]')
                        .each(function () {
                            var loopController = $(this);
                            var controllers = loopController.data('_controllerObjs') || [];

                            if (controllers.length) {
                                loopController.trigger('destroy');

                                for (var i = 0; i < controllers.length; i++) {
                                    delete controllers[i];
                                }
                            }
                        });
                };

                baseController.prototype.trigger = function (elem, ev, data) {

                    // Convert silly arguments object to an array
                    var args = Array.prototype.slice.call(arguments);

                    elem = (!_.isElement(elem) && !elem.jquery) ? this.scope : $(args.shift());
                    ev = args[0];
                    data = args[1] || {};

                    // Add our origin to the event
                    if (!data.stack) {
                        data.stack = [];
                    }

                    data.stack.push('controllers.' + this.controllerType + '.' + this.controllerID);

                    elem.trigger(ev, data);

                };

                baseController.prototype.on = function (elem, ev, delegate, fn) {

                    // Convert silly arguments object to an array
                    var args = Array.prototype.slice.call(arguments);

                    // Reconfigure our args as necessary
                    elem = (!_.isElement(elem) && elem != document && elem != window) ? this.scope : $(args.shift());
                    ev = args[0];
                    fn = (args.length == 3) ? args[2] : args[1];
                    delegate = (args.length == 3) ? args[1] : undefined;

                    if (!_.isFunction(fn)) {
                        console.warn("Callback function for " + ev + " doesn't exist in " + this.controllerType
                            + " (" + this.controllerID + ")");
                        return;
                    }

                    // Bind our callback to the controller
                    fn = _.bind(fn, this);

                    // Set up the event
                    if (delegate) {
                        elem.on(ev, delegate, fn);
                        this._eventListeners.push({
                            elem: elem,
                            event: ev,
                            delegate: delegate,
                            fn: fn
                        });
                    } else {
                        elem.on(ev, fn);
                        this._eventListeners.push({
                            elem: elem,
                            event: ev,
                            fn: fn
                        });
                    }
                };

                return baseController;
            };

        return {
            initControllerOnElem: initControllerOnElem,
            register: register,
            init: init
        };
    });

}(jQuery, _));