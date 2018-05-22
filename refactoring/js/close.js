$(document).ready(function () {
    $(document).mouseup(function (e) {
        let popup_agency = $('.org-pp');
        if (!popup_agency.is(e.target) && popup_agency.has(e.target).length === 0) {
            $('div.org-pp-wrap').removeClass('pp_show');
        }
        let popup_juri = $('.juries-pp');
        if (!popup_juri.is(e.target) && popup_juri.has(e.target).length === 0) {
            $('div.contest__juries-pp').removeClass('pp_show');
        }
        let popup_video = $('.owl-item.active');
        if (!popup_video.is(e.target) && popup_video.has(e.target).length === 0) {
            $('div.cip-winner-pp_video').removeClass('pp_show');
        }
    });

    $(document).on('click', '.test-animation', function () {
        let button_page = $(this).data('buttonid');

        if(button_page === 'authorize') {
            // Добавить селектор родительскому контейнеру - это важно.
            // Благодаря ему регулируется высота блока для абсолютных дочек
            $('.contest-action-wrapper').addClass('authorize');
            // Удалить селекторы у родителя
            $('.contest-action-wrapper').removeClass('subscribe');
            $('.contest-action-wrapper').removeClass('relocation');
            // И удалить прежде селекторы у контейнеров дочек
            $('section.contest-action__container').addClass('disable');
            $('section.contest-action__container').removeClass('active');
            // И показать нужный
            $('section.authorize').removeClass('disable');
            $('section.authorize').addClass('active');
        }
        else if (button_page === 'subscribe') {
            $('.contest-action-wrapper').addClass('subscribe');

            $('.contest-action-wrapper').removeClass('authorize');
            $('.contest-action-wrapper').removeClass('relocation');

            $('section.contest-action__container').addClass('disable');
            $('section.contest-action__container').removeClass('active');

            $('section.subscribe').removeClass('disable');
            $('section.subscribe').addClass('active');
        }
        else {
            $('.contest-action-wrapper').addClass('relocation');

            $('.contest-action-wrapper').removeClass('authorize');
            $('.contest-action-wrapper').removeClass('subscribe');

            $('section.contest-action__container').addClass('disable');
            $('section.contest-action__container').removeClass('active');

            $('section.relocation').removeClass('disable');
            $('section.relocation').addClass('active');

        }
    });

});