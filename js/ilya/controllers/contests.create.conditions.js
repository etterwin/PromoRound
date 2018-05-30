; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('contests.create.conditions', {

        conditions: {},
        hiddenField: null,

        initialize: function () {
            this.on('click', '[data-action="saveConditions"]', this.saveConditions);

            this.on('click', '[data-action="clearService"]', this.clearService);
            this.on('click', '[data-action="saveService"]', this.saveService);

            this.on('click', '[data-action="removeConditionCard"]', this.removeConditionCard);

            this.setup();
        },

        setup: function () {
            this.hiddenField = this.scope.find('input[name="conditions"]');

            this.loadFromHidden();
        },

        /* Hidden Field */

        loadFromHidden: function () {
            this.conditions = JSON.parse(this.hiddenField.val());
        },

        saveToHidden: function () {
            var json = JSON.stringify(this.conditions);

            this.hiddenField.val(json);
        },

        /* Window Helpers */

        clearService: function (e) {
            var area = $(e.currentTarget).closest('[data-service]').find('.cond_block_list');

            this._doClearService(area);

            this.updateActiveServicesAndRecount();
        },
    
        clearAllServices: function (e) {
            var self = this;

            this.scope.find('[data-service]').each(function () {
                var area = $(this).find('.cond_block_list');

                self._doClearService(area);
            });

            this.updateActiveServicesAndRecount();
        },

        _doClearService: function (area) {
            area.find('.cond_block_list_item.active .cond_block_list_item_title').click();

            area.find('input').val(null);
        },

        saveService: function (e) {
            this.updateActiveServicesAndRecount();
        },

        updateActiveServicesAndRecount: function (e) {
            this.scope.find('[data-role="condits_bottom_number"]').html(
                this.scope.find('.cond_block_list_item.active').length
            );

            var self = this;

            this.scope.find('[data-service]').each(function () {
                var menuItem = self.scope.find('.s_cond_item[data-cond="' + $(this).attr('data-cond') + '"]');

                var activeConditions = $(this).find('.cond_block_list_item.active').length;

                if (activeConditions > 0) {
                    menuItem.addClass('active');

                    menuItem.find('.s_cond_item_title span').html('(' + activeConditions + ')');
                } else {
                    menuItem.removeClass('active');

                    menuItem.find('.s_cond_item_title span').html('');
                }
            });
        },

        /* Conditions Object */

        addCondition: function (service, type, extra) {
            if (this.conditions[service] === undefined) {
                this.conditions[service] = [];
            }

            var index = this.conditions[service].push({
                service: service,
                type: type,
                extra: extra,
            });

            return index - 1;
        },

        removeCondition: function (service, index) {
            this.conditions[service].splice(index, 1);

            this.saveToHidden();
            this.showConditions();
        },

        saveConditions: function (e) {
            var self = this;

            this.scope.find('[data-service]')
                .each(function (index, element) {
                    var service = $(element).attr('data-service');

                    $(element).find('.cond_block_list_item.active')
                        .each(function (index, element) {
                            var fields = {};

                            $(element)
                                .find('[data-field]')
                                .each(function (index, element) {
                                    var name = $(element).attr('name');
                                    var value = $(element).val();

                                    fields[name] = value;
                                });

                            self.addCondition(service, $(element).attr('data-type'), fields);
                        });
                });

            this.clearAllServices();

            this.saveToHidden();
            this.showConditions();

            $(e.currentTarget).closest('.pp[data-pp]').find('.close').click();
        },

        showConditions: function () {
            this.scope.find('[data-role="createdConditions"]').empty();

            var self = this;

            for (var service in this.conditions) {
                this.conditions[service].forEach(function (condition, id) {
                    self.showOneCondition(id, condition);
                });
            }
        },

        showOneCondition: function (id, condition) {
            var panel = this.scope.find('[data-role="createdConditions"]');

            panel.append(
                $('<div/>')
                    .addClass('newcontent_condit-card')
                    .attr('data-role', 'conditionCard')
                    .attr('data-service', condition.service)
                    .attr('data-id', id)
                    .append(
                        $('<a/>')
                            .attr('data-action', 'removeConditionCard')
                            .addClass('close')
                    )
                    .append(
                        $('<div/>')
                            .addClass('image')
                            .append(
                                $('<img/>').attr('src', '/img/cond/' + condition.service.toLowerCase() + '.svg').attr('alt', '')
                            )
                    )
                    .append(
                        $('<div/>')
                            .addClass('title')
                            .append(
                                $('<span/>').html(condition.service + ' - ' + condition.type)
                            )
                    )
                    .append(
                        $('<div/>')
                            .addClass('edit pp_')
                            .attr('data-pp', 'condit-' + id)
                    )
            );

            /*
                <div class="newcontent_condit-card">
                    <a href="javascript:void(0);" class="close"></a>
                    <div class="image">
                        <img src="{{ asset('img/contests/borodist.jpg') }}" alt="">
                    </div>
                    <div class="title">
                        <span>Масло для бороды «IRISH WHISKEY»</span>
                    </div>
                    <div class="edit pp_" data-pp="condit-1"></div>
                </div>
            */
        },

        removeConditionCard: function (e) {
            var condition = $(e.currentTarget).closest('[data-role="conditionCard"]');

            this.removeCondition(condition.attr('data-service'), condition.attr('data-id'));
        },

        //
    });
}(jQuery, _));