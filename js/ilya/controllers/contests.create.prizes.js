; (function ($, _, undefined) {
    "use strict";

    pr.controller.register('contests.create.prizes', {

        prizes: [],
        hiddenField: null,

        initialize: function () {
            this.on('click', '[data-action="savePrize"]', this.savePrize);
            this.on('click', '[data-action="removePrizeCard"]', this.removePrizeCard);

            this.on('click', '[data-action="selectImage"]', this.selectImage);
            this.on('change', '[data-role="imagesStorage"]', this.uploadImage);
            this.on('click', '[data-action="removeImage"]', this.removeImage);

            this.on('click', '[data-action="selectDigitalImage"]', this.selectDigitalImage);
            this.on('change', '[data-role="digitalImagesStorage"]', this.uploadDigitalImage);

            this.on('click', '[data-action="selectAttachment"]', this.selectAttachment);
            this.on('change', '[data-role="filesStorage"]', this.uploadAttachment);

            this.on('click', '[data-action="saveKeys"]', this.saveKeys);

            this.setup();
        },

        setup: function () {
            this.hiddenField = this.scope.find('input[name="prizes"]');

            this.loadFromHidden();
        },

        /* Hidden Field */

        loadFromHidden: function () {
            this.prizes = JSON.parse(this.hiddenField.val());
        },

        saveToHidden: function () {
            var json = JSON.stringify(this.prizes);

            this.hiddenField.val(json);
        },

        /* Window Helpers */

        clearWindow: function (window) {
            window.find('[data-image]').remove();

            window.find('[data-count]').html('1');
            window.find('input[name="prize_title"]').val(null);
            window.find('textarea[name="prize_description"]').val(null);

            var imagesInput = window.find('[data-role="imagesStorage"]');
            imagesInput.replaceWith(imagesInput.val('').clone(true));
        },

        clearAllWindows: function (e) {
            var self = this;

            this.scope.find('[data-window]').each(function () {
                self.clearWindow($(this));
            });
        },

        /* Prizes Object */

        savePrize: function (e) {
            var window = $(e.currentTarget).closest('[data-window]');

            var images = [];
            window.find('[data-image]').each(function () {
                images.push($(this).attr('data-path'));
            });

            this.prizes.push({
                type: window.attr('data-window'),
                count: window.find('[data-count]').html(),
                name: window.find('input[name="prize_title"]').val(),
                description: window.find('textarea[name="prize_description"]').val(),
                images: images,
                files: window.find('[name="prize_files"]').val(),
            });

            this.clearAllWindows();

            this.saveToHidden();
            this.showPrizes();

            $(e.currentTarget).closest('.pp[data-pp]').find('.close').click();
        },

        removePrize: function (index) {
            this.prizes.splice(index, 1);

            this.saveToHidden();
            this.showPrizes();
        },

        showPrizes: function () {
            this.scope.find('[data-role="createdPrizes"]').empty();

            var self = this;

            this.prizes.forEach(function (prize, id) {
                self.showOnePrize(id, prize);
            });
        },

        showOnePrize: function (id, prize) {
            var panel = this.scope.find('[data-role="createdPrizes"]');

            if (prize.type == 'physical') {
                var icon = $('<img/>').attr('src', '/img/create_contest/prize_photo_2.jpg');
            } else {
                var icon = $('<span/>').addClass('prizes_list_item_image_lock')
            }

            panel.append(
                $('<div/>')
                    .addClass('prizes_list_item')
                    .attr('data-role', 'prizeCard')
                    .attr('data-id', id)
                    .append(
                        $('<span/>')
                            .addClass('prizes_list_item_remove')
                            .attr('data-action', 'removePrizeCard')
                    )
                    .append(
                        $('<div/>')
                            .addClass('prizes_list_item_image')
                            .attr('style', 'background: linear-gradient(180deg, #ff7b7b 0%, rgb(0, 114, 255) 100%);')
                            .append(icon)
                    )
                    .append(
                        $('<div/>')
                            .addClass('prizes_list_item_title')
                            .html(prize.name)
                    )
                    .append(
                        $('<div/>')
                            .addClass('prizes_list_item_count')
                            .html(prize.count + ' шт.')
                    )
                    .append(
                        $('<div/>')
                            .addClass('prizes_list_item_place_link')
                            .append(
                                $('<div/>')
                                    .addClass('prizes_list_item_stage_link_title')
                                    .html('Привязать к месту')
                            )
                            .append(
                                $('<div/>')
                                    .addClass('select_box')
                                    .append(
                                        $('<select/>')
                                            .addClass('select')
                                            .attr('name', 'prize_' + id + '_stage')
                                            .append(
                                                $('<option/>').attr('value', 1).html('1 место')
                                            )
                                            .append(
                                                $('<option/>').attr('value', 2).html('2 место')
                                            )
                                            .append(
                                                $('<option/>').attr('value', 3).html('3 место')
                                            )
                                            .append(
                                                $('<option/>').attr('value', 4).html('4 место')
                                            )
                                            .append(
                                                $('<option/>').attr('value', 5).html('5 место')
                                            )
                                    )
                            )
                    )
            );

            /*
                <div class="prizes_list_item">
                    <span class="prizes_list_item_remove"></span>
                    <div class="prizes_list_item_image" style="background: linear-gradient(180deg, #ff7b7b 0%, rgb(0, 114, 255) 100%);">
                        <span class="prizes_list_item_image_lock"></span>
                    </div>

                    <div class="prizes_list_item_title">Видео-урок по каллиграфии BrushPen(цифровые)</div>
                    <div class="prizes_list_item_count">100шт</div>

                    <div class="prizes_list_item_stage_link">
                        <div class="prizes_list_item_stage_link_title">Привязать к этапу</div>
                        <div class="select_box">
                            <select class="select" name="prize_stage">
                                <option>1 этап</option>
                                <option>2 этап</option>
                                <option>3 этап</option>
                                <option>4 этап</option>
                            </select>
                        </div>
                    </div>

                    <div class="prizes_list_item_place_link">
                        <div class="prizes_list_item_stage_link_title">Привязать к месту</div>
                        <div class="select_box">
                            <select class="select" name="prize_stage">
                                <option>1 место</option>
                                <option>2 место</option>
                                <option>3 место</option>
                                <option>4 место</option>
                            </select>
                        </div>
                    </div>
                </div>
            */
        },

        removePrizeCard: function (e) {
            var prize = $(e.currentTarget).closest('[data-role="prizeCard"]');

            this.removePrize(prize.attr('data-id'));
        },

        selectImage: function (e) {
            $(e.currentTarget).closest('[data-window]').find('[name="prize_images"]').click();
        },

        uploadImage: function (e) {
            var formData = new FormData;

            formData.append('file', $(e.currentTarget).prop('files')[0]);

            var self = this;

            $.ajax({
                method: "POST",
                url: '/contest-prize-file/store',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: formData,
                processData: false,
                contentType: false,
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        $(e.currentTarget)
                            .closest('[data-window]')
                            .find('[data-role="images"]')
                            .prepend(
                                $('<div/>')
                                    .addClass('prize_photo_item')
                                    .attr('data-image', '')
                                    .attr('data-path', data.path)
                                    .append(
                                        $('<span/>')
                                            .addClass('prize_photo_item_remove')
                                            .attr('data-action', 'removeImage')
                                    )
                                    .append(
                                        $('<img/>').attr('src', data.url)
                                    )
                        );

                        /*
                            <div class="prize_photo_item">
                                <span class="prize_photo_item_remove"></span>
                                <img src="{{ asset('img/create_contest/prize_photo.jpg') }}" alt="" />
                            </div>
                        */
                    }

                    self.clearUploadInput($(e.currentTarget));
                });
        },

        removeImage: function (e) {
            var imageCard = $(e.currentTarget).closest('[data-path]');

            var self = this;

            $.ajax({
                method: "POST",
                url: '/contest-prize-file/destroy',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: {
                    path: imageCard.attr('data-path')
                }
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        imageCard.remove();
                    }

                    self.clearUploadInput(
                        $(e.currentTarget).closest('[data-path]').find('[data-role="imagesStorage"]')
                    );
                });
        },

        selectDigitalImage: function (e) {
            $(e.currentTarget).closest('[data-window]').find('[data-role="digitalImagesStorage"]').click();
        },

        uploadDigitalImage: function (e) {
            var formData = new FormData;

            formData.append('file', $(e.currentTarget).prop('files')[0]);

            var self = this;

            $.ajax({
                method: "POST",
                url: '/contest-prize-file/store',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: formData,
                processData: false,
                contentType: false,
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        $(e.currentTarget)
                            .closest('[data-window]')
                            .find('[data-action="selectImage"]')
                            .append(
                                $('<div/>')
                                    .attr('data-image', '')
                                    .attr('data-path', data.path)
                                    .attr('data-url', data.url)
                        );

                        /*
                            <div class="prize_photo_item">
                                <span class="prize_photo_item_remove"></span>
                                <img src="{{ asset('img/create_contest/prize_photo.jpg') }}" alt="" />
                            </div>
                        */
                    }

                    self.clearUploadInput($(e.currentTarget));
                });
        },

        clearUploadInput: function (input) {
            input.replaceWith(input.val('').clone(true));
        },

        selectAttachment: function (e) {
            $(e.currentTarget).parent().find('[data-role="filesStorage"]').click();
        },

        uploadAttachment: function (e) {
            var formData = new FormData;

            formData.append('file', $(e.currentTarget).prop('files')[0]);

            var self = this;

            $.ajax({
                method: "POST",
                url: '/contest-prize-file/store',
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                },
                data: formData,
                processData: false,
                contentType: false,
            })
                .done(function (data) {
                    if (data.status == 'ok') {
                        var field = $(e.currentTarget).closest('[data-window]').find('[name="prize_files"]');

                        var files = JSON.parse(field.val());

                        var type = $(e.currentTarget).attr('data-type');
                        files[type] = data.path;

                        field.val(JSON.stringify(files));
                    }

                    $(e.currentTarget).closest('[data-pp]').find('[data-action="close"]').click();

                    self.clearUploadInput($(e.currentTarget));
                });
        },

        saveKeys: function (e) {
            var filesField = $(e.currentTarget).closest('[data-window]').find('[name="prize_files"]');

            var files = JSON.parse(filesField.val());

            if (files['keys'] === undefined) {
                files['keys'] = [];
            }

            files['keys'] = $(e.currentTarget).closest('[data-pp]').find('[name="prize_files_keys"]').val();

            filesField.val(JSON.stringify(files));
        },
    });
}(jQuery, _));