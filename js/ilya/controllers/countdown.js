;
(function ($, _, undefined) {
    "use strict";

    pr.controller.register('countdown', {

        duration: null,
        left: null,

        timer: null,

        initialize: function () {
            this.setup();
        },

        setup: function () {
            this.duration = parseInt(this.scope.attr('data-duration'));
            this.left = parseInt(this.scope.attr('data-left'));

            this.timer = new Timer();

            this.start();
        },

        start: function () {
            this.timer.start({
                countdown: true,
                startValues: {
                    seconds: this.left,
                }
            });

            var self = this;

            this.timer.addEventListener('secondsUpdated', function () {
                self.listenSeconds()
            });

            this.timer.addEventListener('targetAchieved', function () {
                self.listenFinish()
            });
        },

        listenSeconds: function (e) {
            var text = [];
            var notZero = false;

            var values = this.timer.getTimeValues();

            if (values.days > 0) {
                text.push(values.days + ' days ');
                notZero = true;
            }

            if (values.hours > 0 || notZero) {
                text.push((values.hours < 10 ? '0' : '') + values.hours + ':');
                notZero = true;
            }

            if (values.minutes > 0 || notZero) {
                text.push((values.minutes < 10 ? '0' : '') + values.minutes + ':');
                notZero = true;
            }

            if (values.seconds > 0 || notZero) {
                text.push((values.seconds < 10 ? '0' : '') + values.seconds);
            }

            this.scope.find('.time').html(text.join(''));
        },

        listenFinish: function (e) {
            this.scope.find('.time').html('Finished!');
        }
    });
}(jQuery, _));