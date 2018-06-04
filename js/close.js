$(document).ready(function () {
    $(document).mouseup(function (e) {
        // Просто какое-то огорчение
        // Сработает, если ткнули мимо объекта
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
        let popup_photo = $('.cropp-ph fieldset');
        if (!popup_photo.is(e.target) && popup_photo.has(e.target).length === 0) {
            $('div.cropp-ph-wrap').removeClass('pp_show');
        }

        // Скрыть активный элемент, если ткнули мимо
        let active = $('.active');
        if (!active.is(e.target) && active.has(e.target).length === 0) {
            $(active).removeClass('active');
            $('.account__box.box-disable').removeClass('box-disable').addClass('box-active');
            $('[data-block = register-form]').addClass('box-disable').removeClass('box-active');
            $("input.checkbox__input.open-form").prop('checked', false);

            $('.contest-action__container').each(function () {
                $(this).addClass('disable');
            });
        }
    });

    // Откроет лист по клику
    $(document).on('click', '.open-list', function () {
        $(this).parent('.field-wrapper').siblings('.select-list').addClass('active');
    });

    // По выбору элемента из списка запишет в велью инпута и скроет список
    $(document).on('click', '.choose-item', function () {
        let value = $(this).text();
        let input_id = $(this).data('fieldid');

        $('[data-field = ' + input_id + ']').attr('value', value);
        $(this).parent('.select-list').removeClass('active');
    });

    // Клик по одному из условий откроет первый блок с выбором: авторизоваться и зарегаться
    $(document).on('click', '.conditions__item', function () {
        $('[data-block = authorize ]').removeClass('disable').addClass('active');
    });

    // Открыть блок по клику на селектор
    $(document).on('click', '.open-block', function () {
        let block_id = $(this).data('blockid');
        $(this).closest('.contest-action__container').removeClass('active').addClass('disable');
        $('[data-block = ' + block_id + ']').addClass('active');
        remove_form();
    });

    // Скрыть форму из условий
    function remove_form() {
        $('.account__box.box-disable').removeClass('box-disable').addClass('box-active');
        $('[data-block = register-form]').addClass('box-disable').removeClass('box-active');
        $("input.checkbox__input.open-form").prop('checked', false);
    }

    // Клик по области с
    $(document).on('click', '.open-form', function () {
        if ($('input.checkbox__input.open-form').is(':checked')) {
            $('.account__box.box-active').addClass('box-disable').removeClass('box-active');
            $('[data-block = register-form]').removeClass('box-disable').addClass('box-active');
        }
        else {
            remove_form();
        }
    });

});