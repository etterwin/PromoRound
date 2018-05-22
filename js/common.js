

/** Изоляция */
var mobile=(/iphone|iemobile|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));

$(document).ready(function(){

    $(window).on("load",function(){
        $(".scrollbar").mCustomScrollbar({
            scrollInertia: 100,
            mouseWheelPixels: 100
        });
    });

   // var headerStick = $('.header__slick');
   // if ( headerStick.length > 0 ) {
   //     headerStick.css({
   //         "height" : $('header.header').outerHeight()
   //     });
   // }

    //Object-Fill-Polifil
    var $ofi = $('img');
    objectFitImages($ofi);

    //Click elements
    var isDown = false,
        clickItem = $('.js-click');

    clickItem.on('mousedown', function(){
        $(this).addClass('click-in');
        isDown = true;
    });
    $(window).on('mouseup', function(){
        if(isDown){
            clickItem.removeClass('click-in');
            isDown = false;
        }
    });
    clickItem.on('mouseleave', function(){
        if(isDown){
            $(this).removeClass('click-in');
            isDown = false;
        }
    });

    //Tooltip
    $.widget("ui.tooltip", $.ui.tooltip, {
        options: {
            content: function () {
                var text = '<p>' + $(this).prop('title') + '</p>',
                    name = $(this).data('name'),
                    rating = $(this).data('rating'),
                    header = $(this).data('header'),
                    confirm = ($(this).data('confirm') === 1)?'confirm':'',
                    tooltipClass = '';

                header = (header)?'<div class="tooltip__header"><img src="' + header + '" /></div>':'';
                rating = (rating)?'<div class="tooltip__rating">' + rating + '<span>рейтинг</span></div>':'';
                name = (name)?'<h5 class="tooltip__title ' + confirm + '">' + name + '</h5>':'';

                if ( name || header || rating ) {
                    tooltipClass = 'tooltip_big';
                }

                return '<div class="tooltip ' + tooltipClass + '">' + header + name + rating + text + '</div>';
            }
        }
    });
    $('[data-toggle="tooltip"]').tooltip({
        position: {
            my: "center bottom-20",
            at: "center top",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
            }
        }
    });
    $('.contest-avatar__img[data-toggle="tooltip"]').tooltip({
        // options: {
        //     delay: 5000,
        //     duration: 0
        // },
        position: {
            my: "right-20 center",
            at: "left center",
            collision : "flip fit",
            using: function( position, feedback ) {
                $( this ).css( position );
                $( "<div>" )
                    .addClass( "arrow" )
                    .addClass( feedback.vertical )
                    .addClass( feedback.horizontal )
                    .appendTo( this );
            }
        },
        show: {
            // effect: "blind",
            duration: 200
        },
        hide: {
            duration: 200
        }
    });

    //ProgressBar
    $('.contest__progress').each(function () {
        var progressDays = $(this).data('days'),
            progressFinish = (progressDays)? new Date().setTime(new Date().getTime() + progressDays * 24 * 3600 * 1000) : new Date().setTime(new Date().getTime() + 3600 * 1000);
        $(this).anim_progressbar({
            finish : progressFinish,
            interval: 1000
        });
    });

    //Background Contest
    $('.contest__item').each(function () {
        var bgColor = $(this).data('bg');
        if ( bgColor !== undefined ) {
            // console.log(bgColor);

            $(this)
                .css({
                    'background' : bgColor
                });

            $(this)
                .find('.contest__desc')
                .css({
                    'background' : bgColor
                });
        }
    });

    //Contest Hover
    $('.contest__link').on('mouseenter', function () {
        $(this)
            .closest('.contest__item')
            .addClass('contest__item_hover');
    }).on('mouseleave', function () {
        $(this)
            .closest('.contest__item')
            .removeClass('contest__item_hover');
    });

    //ScrollTop
    $('.footer__toplink').on('click', function () {
        event.preventDefault();
        $('html, body').animate({scrollTop : 0}, 500);
        return false;
    });

    //Swiper
    var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    });


    //Checkbox Trigger
    $('.checkbox_trigger').on('click', function () {
        // console.log( 'Trigger : ' + $(this).find('input').prop('checked') );

        var inputTr = $(this).find('input');

        if ( inputTr.prop('checked') === true ) {
            inputTr.prop('checked', false);
            $(this).removeClass('checkbox_active');
        } else {
            inputTr.prop('checked', true);
            $(this).addClass('checkbox_active');
        }
    });
    //Select
    $('.select').selectmenu({
        position: {
            my : "left top+10", at: "left bottom"
        },
        classes : {
            "ui-selectmenu-icon" : "icon icon_drop"
        }
    });

    //Tabs
    $( ".tabs-menu" ).tabs();

    //Collapse
    $( ".collapse" ).accordion({
        collapsible: true,
        heightStyle: 'content',
        header : 'h3'
    });

    // ================================================
    // Модальное окно
    // ================================================
    $('.pp_').click(function(){
        $('.pp').removeClass('pp_show');
        $('.pp_mask').removeClass('pp_show');
        var th_pp = $(this).attr('data-pp');
        // $('.pp_mask').addClass('pp_show');
        $('.pp[data-pp="' + th_pp + '"]').addClass('pp_show');
        // $(this).closest('.pp[data-pp]').removeClass('pp_show');
    });
    $('.pp[data-pp] .close, .pp_mask, .pp__ent-part, .pp__reg-part').on('click', function () {
        $(this).closest('.pp[data-pp]').removeClass('pp_show');
        $('.pp_mask').removeClass('pp_show');
    });
    $('.pp_mask').on('click', function () {
        $('.pp').removeClass('pp_show');
    });



    // $('.sexy_input input, .sexy_input textarea').focusin(function(){
    //     $(this).parent().find('.txt_i_placeholder').addClass('focused');
    //
    // });
    // $('.sexy_input input, .sexy_input textarea').focusout(function(){
    //     if( $(this).val() !='' ){
    //         $(this).parent().find('.txt_i_placeholder').addClass('focused');
    //     }else{
    //         $(this).parent().find('.txt_i_placeholder').removeClass('focused');
    //     }
    //
    // });
    // $('.sexy_input input, .sexy_input textarea').each(function(){
    //     if( $(this).val() !='' ){
    //         $(this).parent().find('.txt_i_placeholder').addClass('focused');
    //     }else{
    //         $(this).parent().find('.txt_i_placeholder').removeClass('focused');
    //     }
    //
    //
    // });


    //

    var w = $(window).width();
    if (w <= 1023) {
        $('.header__btn.header_login').text(' ');
        $('.pp .close').text(' ');
    } else {
        $('.header__btn.header_login').text('Вход');
        $('.pp .close').text('×');
    }
    $(window).resize(function() {
        var w = $(window).width();
        if (w <= 1023) {
            $('.header__btn.header_login').text(' ');
            $('.pp .close').text(' ');
        } else {
            $('.header__btn.header_login').text('Вход');
            $('.pp .close').text('×');
        }
    });

    // burger





    //

    $( ".popular .popular__sel" ).click(function() {
        $(this).addClass('active');
        $('.popular .popular__menu').addClass('open');
    });
    $( ".popular__menu .nav__item a" ).click(function() {
        var selText = $(this).text();
        $( ".popular .popular__sel" ).text(selText);
        $('.popular .popular__sel').removeClass('active');
        $('.popular .popular__menu').removeClass('open');
    });
    $(document).mouseup(function (e){
        var div = $(".popular .popular__menu");
        if (!div.is(e.target)
            && div.has(e.target).length === 0) {
            $('.popular .popular__sel').removeClass('active');
            $('.popular .popular__menu').removeClass('open');
        }
    });


    if (w <= 767) {
        $('.contest_participate .row__cont').addClass('swiper-wrapper');
        $('.contest_participate .row__cont > .col-xs-3').addClass('swiper-slide');
        var swiper = new Swiper('.contest_participate .row', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
        $('.contest_new-year .row__cont').addClass('swiper-wrapper');
        $('.contest_new-year .row__cont > .col-xs-3').addClass('swiper-slide');
        var swiper = new Swiper('.contest_new-year .row', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
        $('.contest_best .row__cont').addClass('swiper-wrapper');
        $('.contest_best .row__cont > .col-xs-3').addClass('swiper-slide');
        var swiper = new Swiper('.contest_best .row', {
            slidesPerView: 3,
            slidesPerColumn: 2,
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
        $('.advantages .row__cont').addClass('swiper-wrapper');
        $('.advantages .row__cont > .col-xs-3').addClass('swiper-slide');
        var swiper = new Swiper('.advantages .row', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
        $('.reviews .row__cont').addClass('swiper-wrapper');
        $('.reviews .row__cont > .col-xs-6').addClass('swiper-slide');
        var swiper = new Swiper('.reviews .row', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
        $('.news .row__cont').addClass('swiper-wrapper');
        $('.news .row__cont > .col-xs-4').addClass('swiper-slide');
        var swiper = new Swiper('.news .row', {
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 10,
        });
    } else {

    }
    //$(window).resize(function() {
    //    var w = $(window).width();
    //    if (w <= 767) {
    //        $('.contest_participate .row__cont').addClass('swiper-wrapper');
    //        $('.contest_participate .row__cont > .col-xs-3').addClass('swiper-slide');
    //        var swiper = new Swiper('.contest_participate .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.contest_new-year .row__cont').addClass('swiper-wrapper');
    //        $('.contest_new-year .row__cont > .col-xs-3').addClass('swiper-slide');
    //        var swiper = new Swiper('.contest_new-year .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.contest_best .row__cont').addClass('swiper-wrapper');
    //        $('.contest_best .row__cont > .col-xs-3').addClass('swiper-slide');
    //        var swiper = new Swiper('.contest_best .row', {
    //            slidesPerView: 3,
    //            slidesPerColumn: 2,
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.advantages .row__cont').addClass('swiper-wrapper');
    //        $('.advantages .row__cont > .col-xs-3').addClass('swiper-slide');
    //        var swiper = new Swiper('.advantages .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //            pagination: {
    //                el: '.swiper-pagination',
    //                type: 'bullets',
    //            },
    //        });
    //        $('.reviews .row__cont').addClass('swiper-wrapper');
    //        $('.reviews .row__cont > .col-xs-6').addClass('swiper-slide');
    //        var swiper = new Swiper('.reviews .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.news .row__cont').addClass('swiper-wrapper');
    //        $('.news .row__cont > .col-xs-4').addClass('swiper-slide');
    //        var swiper = new Swiper('.news .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //    } else {
    //        $('.contest_participate .row__cont').removeClass('swiper-wrapper');
    //        $('.contest_participate .row__cont > .col-xs-3').removeClass('swiper-slide');
    //        var swiper = new Swiper('.contest_participate .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.contest_new-year .row__cont').removeClass('swiper-wrapper');
    //        $('.contest_new-year .row__cont > .col-xs-3').removeClass('swiper-slide');
    //        var swiper = new Swiper('.contest_new-year .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.contest_best .row__cont').removeClass('swiper-wrapper');
    //        $('.contest_best .row__cont > .col-xs-3').removeClass('swiper-slide');
    //        var swiper = new Swiper('.contest_best .row', {
    //            slidesPerView: 3,
    //            slidesPerColumn: 2,
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.advantages .row__cont').removeClass('swiper-wrapper');
    //        $('.advantages .row__cont > .col-xs-3').removeClass('swiper-slide');
    //        var swiper = new Swiper('.advantages .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //            pagination: {
    //                el: '.swiper-pagination',
    //                type: 'bullets',
    //            },
    //        });
    //        $('.reviews .row__cont').removeClass('swiper-wrapper');
    //        $('.reviews .row__cont > .col-xs-6').removeClass('swiper-slide');
    //        var swiper = new Swiper('.reviews .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //        $('.news .row__cont').removeClass('swiper-wrapper');
    //        $('.news .row__cont > .col-xs-4').removeClass('swiper-slide');
    //        var swiper = new Swiper('.news .row', {
    //            slidesPerView: 'auto',
    //            centeredSlides: true,
    //            spaceBetween: 10,
    //        });
    //    }
    //});
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 0,
        // spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });


    $(".filters__item_trigger").click(function() {
        $('.contests__materials .contest__item').addClass('contest__item_op');
        setTimeout(function() {
            $('.contests__materials .contest__item').removeClass('contest__item_op');
        },400);
        setTimeout(function() {
            if ($('.filters__item_trigger .checkbox_trigger').hasClass("checkbox_active"))  {
                $('.contests__materials .contest__item').addClass('contest__item_sm').removeClass('contest__item_lg');

            } else {
                $('.contests__materials .contest__item').addClass('contest__item_lg').removeClass('contest__item_sm');

            }
        },100);
    });
    $('body').on('click', '.ui-menu-item', function(e){
        $('.contests__materials .contest__item').addClass('contest__item_op');
        setTimeout(function() {
            $('.contests__materials .contest__item').removeClass('contest__item_op');
        },400);
    });



    /// DATEPICKER

    $( function() {
        $( ".datepicker" ).datepicker({
                onSelect: function(){

                    $(this).addClass('filled');
                    $(this).parents('.date__input').addClass('selected');

                }
            });
    } );



    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );

    /* Russian (UTF-8) initialisation for the jQuery UI date picker plugin. */
    /* Written by Andrew Stromnov (stromnov@gmail.com). */
    ( function( factory ) {
        if ( typeof define === "function" && define.amd ) {

            // AMD. Register as an anonymous module.
            define( [ "../widgets/datepicker" ], factory );
        } else {

            // Browser globals
            factory( jQuery.datepicker );
        }
    }( function( datepicker ) {

        datepicker.regional.ru = {
            closeText: "Закрыть",
            prevText: "&#x3C;Пред",
            nextText: "След&#x3E;",
            currentText: "Сегодня",
            monthNames: [ "Январь,","Февраль,","Март,","Апрель,","Май,","Июнь,",
                "Июль,","Август,","Сентябрь,","Октябрь,","Ноябрь,","Декабрь," ],
            monthNamesShort: [ "Янв","Фев","Мар","Апр","Май","Июн",
                "Июл","Авг","Сен","Окт","Ноя","Дек" ],
            dayNames: [ "воскресенье","понедельник","вторник","среда","четверг","пятница","суббота" ],
            dayNamesShort: [ "вск","пнд","втр","срд","чтв","птн","сбт" ],
            dayNamesMin: [ "ВС","ПН","ВТ","СР","ЧТ","ПТ","СБ" ],
            weekHeader: "Нед",
            dateFormat: "dd.mm.yy",
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: "" };
        datepicker.setDefaults( datepicker.regional.ru );

        return datepicker.regional.ru;

    } ) );

    $(document).on('focus','.hasDatepicker',function(){
        $(this).parents('.date__input').addClass('focused')
    })





    // flex-Textarea

    //$('textarea').each(function () {
    //    this.setAttribute('style', 'height:' + (this.scrollHeight) + 'px;overflow-y:hidden;');
    //}).on('input', function () {
    //    this.style.height = 'auto';
    //    this.style.height = (this.scrollHeight) + 'px';
    //})






    // drop photos

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        var filedrag = $("#dropzone");

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // file drop
            filedrag.on("dragover", hover);
            filedrag.on("dragleave", hover);
            filedrag.on("drop", handler);
        }
    }
// file drag hover
    function hover(e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.type == "dragover")
            $('#dropzone').addClass("hover");
        else
            $('#dropzone').removeClass("hover");
    }
// file selection
    function handler(e) {
        // cancel event and hover styling
        hover(e);

        // fetch FileList object
        var files = e. originalEvent.target.files || e. originalEvent.dataTransfer.files;
        showImage(files[0]);
    }

    function showImage(f) {
        var img = $('<img>');
        var reader = new FileReader();
        reader.onloadend = function() {
            img.attr('src', reader.result);
            $('#dropzone').css('background-image', 'url('+reader.result+')').addClass("selected");
        }
        reader.readAsDataURL(f);
    }


    // input file

    $("#dropzone input").change(function(){
        var filename = $(this).val().replace(/.*\\/, "");
        $("#dropzone span").val(filename);
    });
    $('#dropzone input').on('change', function(e) {
        var file = this.files[0];
        $('#dropzone').removeClass('hover');
        if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
            return alert('File type not allowed.');
        }
        if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
            var reader = new FileReader(file);
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                var data = e.target.result,
                    $img = $('<img />').attr('src', data).fadeIn();
                $('#dropzone').css('background-image', 'url('+reader.result+')').addClass("selected");
            };
        } else {
            var ext = file.name.split('.').pop();
        }
    });





    //

    // drop photos - dublicate

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        var filedrag = $("#dropzone-pp");

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // file drop
            filedrag.on("dragover", hover);
            filedrag.on("dragleave", hover);
            filedrag.on("drop", handler);
        }
    }
// file drag hover
    function hover(e) {
        e.stopPropagation();
        e.preventDefault();
        if(e.type == "dragover")
            $('#dropzone-pp').addClass("hover");
        else
            $('#dropzone-pp').removeClass("hover");
    }
// file selection
    function handler(e) {
        // cancel event and hover styling
        hover(e);

        // fetch FileList object
        var files = e. originalEvent.target.files || e. originalEvent.dataTransfer.files;
        showImage(files[0]);
    }

    function showImage(f) {
        var img = $('<img>');
        var reader = new FileReader();
        reader.onloadend = function() {
            img.attr('src', reader.result);
            $('#dropzone-pp').css('background-image', 'url('+reader.result+')').addClass("selected");
        }
        reader.readAsDataURL(f);
    }


    // input file

    $("#dropzone-pp input").change(function(){
        var filename = $(this).val().replace(/.*\\/, "");
        $("#dropzone-pp span").val(filename);
    });
    $('#dropzone-pp input').on('change', function(e) {
        var file = this.files[0];
        $('#dropzone-pp').removeClass('hover');
        if (this.accept && $.inArray(file.type, this.accept.split(/, ?/)) == -1) {
            return alert('File type not allowed.');
        }
        if ((/^image\/(gif|png|jpeg)$/i).test(file.type)) {
            var reader = new FileReader(file);
            reader.readAsDataURL(file);
            reader.onload = function(e) {
                var data = e.target.result,
                    $img = $('<img />').attr('src', data).fadeIn();
                $('#dropzone-pp').css('background-image', 'url('+reader.result+')').addClass("selected");
            };
        } else {
            var ext = file.name.split('.').pop();
        }
    });

    //



    $('input').focusout(function(){
        if(  $(this).val() &&  $(this).val() !='' ){
            $(this).addClass('filled');
        } else {
            $(this).removeClass('filled');

        }
    });
    $('textarea').focusout(function(){
        if(  $(this).val() &&  $(this).val() !='' ){
            $(this).addClass('filled');
        } else {
            $(this).removeClass('filled');

        }
    })


    // contest category

    $('.type__item').click(function () {


        if( !$(this).hasClass('active') ){
            $('.type__item').removeClass('active');
            $(this).addClass('active');


            var th_pr = $(this).find('.contest__category').attr('data-pr');
            var th_create_dialog_parent =  $('.creation_block[data-pr='+ th_pr +']');

            $('.contest__category').removeClass('contest__category_active');
            $(this).find('.contest__category').addClass('contest__category_active');

            $('.creation_block').slideUp(200);

            th_create_dialog_parent.find('.create-block').removeClass('create-block_hide');
            //$('.create').removeClass('create_start');
            th_create_dialog_parent.slideDown(300).addClass('active');
        }

    });


    $('.photo_area').click(function(){
        $(this).closest('in').click();

    });


    $('.num .plus').click(function(){
        var th_p = $(this).parents('.num');
        var th_input = th_p.find('input');
        var min = parseInt(th_p.attr('data-min'));
        var max = parseInt(th_p.attr('data-max'));
        var cur = parseInt(th_input.val());

        if( !min && min == 'undefined' ){
            min = 1;
        }

        if( !max && max == 'undefined' ){
            max = 999;
        }

        if( !cur && cur == 'undefined' ){
            cur = 1;
        }

        cur = cur + 1;

        if( cur >= max){
            cur = max;
        }

        th_input.val(cur);
        th_p.find('.quantity_val').text(cur);

    });

    $('.num .minus').click(function(){
        var th_p = $(this).parents('.num');
        var th_input = th_p.find('input');
        var min = parseInt(th_p.attr('data-min'));
        var max = parseInt(th_p.attr('data-max'));
        var cur = parseInt(th_input.val());

        if( !min && min == 'undefined' ){
            min = 1;
        }

        if( !max && max == 'undefined' ){
            max = 999;
        }

        if( !cur && cur == 'undefined' ){
            cur = 1;
        }

        cur = cur - 1;

        if( cur <= min){
            cur = min;
        }

        th_input.val(cur);
        th_p.find('.quantity_val').text(cur);

    });




    // $('#text1').on('keyup',function(){
    //     var $this = $(this),
    //         val = $this.val();
    //
    //     if(val.length >= 1){
    //         $('#btn').show(100);
    //     }else {
    //         $('#btn').hide(100);
    //     }
    // });



    // плавные якоря

    $('.anc').click( function(){
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 125}, 500);
        }
        return false;
    });





    // .create-blocks appear




    $('body').on('mouseover touchstart',function(){

        if ($('.photo__drop').hasClass('selected')) {
            $('#anc-create-block_img').hide();
        } else {
            $('#anc-create-block_img').show();
        }

        if ($('#create__name').val() && $('#create__name').val().length >= 1) {
            $('#anc-create-block_name').hide();
        } else {
            $('#anc-create-block_name').show();
        }

        if ($('#create__dscrptn').val() && $('#create__dscrptn').val().length >= 1) {
            $('#anc-create-block_dscrp').hide();
        } else {
            $('#anc-create-block_dscrp').show();
        }

        if ($('#create__tags').val() && $('#create__tags').val().length >= 1) {
            $('#anc-create-block_tags').hide();
        } else {
            $('#anc-create-block_tags').show();
        }


        if ($('#datepicker1').val() && $('#datepicker1').val().length >= 1 && $('#datepicker2').val().length >= 1) {
            $('#anc-create-block_date').hide();
        } else {
            $('#anc-create-block_date').show();
        }

        // + с селектом и недодизайненными блоками

    });



    // newcontent_prize-cards

    // $('.newcontent_prize-card .close').click(function () {
    //     $(this).closest('.newcontent_prize-card').remove();
    // });


    // newcontent_prize-cards

    // $('.condits .item').click(function () {
    //     if ($(this).hasClass('active')) {
    //         $(this).removeClass('active');
    //     } else {
    //         $(this).addClass('active');
    //     }
    // });


    // ///////////

    $('.task__point').click(function () {
        $('.task__point').removeClass('task__point_active');
        $(this).addClass('task__point_active');
    });


    // ////////

    $('.newcontent_condit .edit').click(function () {
        $('.create-pp_condit').addClass('pp_show');
    });


    // ////////////


    $('.pop-cats .item').mouseover(function(){
        var j = $(this).find('.item__ico img'),
            k = j.attr('src').slice(0, -4);
        j.attr('src', k + '-hov.svg');

    });
    $('.pop-cats .item').mouseout(function(){
        var z = $(this).find('.item__ico img'),
            x = z.attr('src').slice(0, -8);
        z.attr('src', x + '.svg');
    });



    $('.tabs-menu .organizer__nav').fadeIn(500);
    $('.contests__header.contests__header_filter').fadeIn(500);




    $('.btn_claim').click(function () {
        $('.claim').fadeOut(300);
        setTimeout(function() {
            $('.pp_claim').addClass('pp_claim-thanks');
            $('.thanks').fadeIn(400);
        },400);
    });
    $('.btn_thanks').click(function () {
        $('.pp').removeClass('pp_show');
        setTimeout(function() {
            $('.pp_claim').removeClass('pp_claim-thanks');
            $('.claim').show();
            $('.thanks').hide();
        },200);
    });



    $('.subscribers .subscribers__btn').click(function () {
        if ($(this).hasClass('subscribers__btn-ready')) {
            $(this).text('+ Подписаться').removeClass('subscribers__btn-ready');
        } else {
            $(this).text('вы подписаны').addClass('subscribers__btn-ready');
        }
    });


    // $('.btn_org').click(function () {
    //     $(this).text('Отправить заявку');
    //     $('.organizers__form-inputs').fadeIn(400);
    //     setTimeout(function() {
    //         $('.btn_org').attr('type', 'submit');
    //     },200);
    // });


   // var dswiper = new Swiper('.topagency__items', {
   //     slidesPerView: 2,
   //     spaceBetween: 10,
   //     // slidesPerGroup: 1,
   //     // loop: true,
   //     // loopFillGroupWithBlank: true,
   //     // longSwipes: true;
   //     // navigation: {
   //     //     nextEl: '.swiper-button-next',
   //     //     prevEl: '.swiper-button-prev',
   //     // },
   // });


    $('.topagency__items-list').owlCarousel({
        items: 5,
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        navText: ['',''],
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 4,
            },
            1024: {
                items: 5,
            },

        }
    });


    $('.search__button').click(function () {
        $('.filters__selec, .filters__appr').fadeOut(400);

        setTimeout(function() {
            $('.filters__sear .search__input').fadeIn(400);
        },1000);
        setTimeout(function() {
            $('.filters__sear').addClass('active');
            $('.filters__sear .search__input').fadeIn(400);
        },600);
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest(".filters__sear").length) {

            setTimeout(function() {
                $('.filters__selec, .filters__appr').fadeIn(400);
            },1000);

            setTimeout(function() {
                $('.filters__sear .search__input').fadeOut(400);
            },600);

            $('.filters__sear').removeClass('active');
            // $('.filters__sear .search__input').fadeOut(400);
        }
        e.stopPropagation();
    });




    // perspective

    //originally https://codepen.io/tutsplus/pen/wzdKzQ
//Perspective Hover
    //(function() {
    //    $(document)
    //        .on("mousemove", ".contest__item", function(e) {
    //            if( !$(this).hasClass('contest__item_xlg') ) {
    //                var angle = 10;
    //                var W = this.clientWidth;
    //                var H = this.clientHeight;
//
    //                var X = (e.offsetY - (W * 0.5)) / W * -angle + 'deg';
    //                var Y = (e.offsetX - (H * 0.5)) / H * angle + 'deg';
    //                $(this).removeClass('aos-init aos-animate').removeAttr('data-aos data-aos-delay data-aos-once');
    //                $(this).addClass('').css('transform', function () {
    //                    return 'perspective( 800px ) translate3d( 0, -2px, 0 ) scale(1.02) rotateY(' + Y + ') rotateX(' + X + ')'
    //                });
    //            }
    //        })
    //        .on("mouseout", ".contest__item", function() {
    //            $(this).removeAttr('style').removeClass('animate_hover');
    //        });
    //})();






    //CONDITIONS

    $('.s_cond_item').click(function(){

        var th_block = $(this).attr('data-cond');

        $('.cond_block').removeClass('show');
        $('.cond_block[data-cond='+th_block+']').addClass('show');

    });

    $('.js-close_cond_block').click(function(){
       $(this).parents('.cond_block').removeClass('show');

    });

    $('.js-btn_cond_back').click(function(){
        $(this).parents('.cond_block').removeClass('show');
    });

    $('.js-btn_cond_save').click(function(){
        $(this).parents('.cond_block').removeClass('show');
    });




    $('.cond_block_list_item_title').click(function(){

        var th_parent = $(this).parents('.cond_block_list_item');



        if( !th_parent.hasClass('active') ){
            th_parent.addClass('active');
            th_parent.find('.cbl_check').addClass('active');
            th_parent.find('input').focus();
            th_parent.find('.cond_block_list_spoiler').slideDown(300);
        } else {

            th_parent.removeClass('active');
            th_parent.find('.cbl_check').removeClass('active');
            th_parent.find('.cond_block_list_spoiler').slideUp(300);
        }

    });



    //Spoiler tags

    $('.tags_spoiler_toggle').click(function(){

        if( !$(this).hasClass('active') ){
            $(this).addClass('active')
            $(this).parent().find('.tag_spoiler').addClass('show');
            $(this).text($(this).attr('data-close_text'));
        } else {
            $(this).removeClass('active');
            $(this).parent().find('.tag_spoiler').removeClass('show');
            $(this).text($(this).attr('data-exp_text'));
        }


    });


    $('.search__button').click(function(){
        if( !$(this).parent().find('.search__input').hasClass('exp') ){
            $(this).parent().find('.search__input').addClass('exp').focus();
            $('.search__button').addClass('exp')

        } else {
            $(this).closest('form').submit();
        }

    });

    $('.search__input').focusout(function(){
        if( $(this).val() == '' ){
            $('.search__button').removeClass('exp');
            $(this).removeClass('exp');
        }

    })


//member page tabs

    $('.member_tabs_head_item').click(function(){
       var th_t = $(this).attr('data-tab');

       $('.member_tabs_head_item').removeClass('active');
       $(this).addClass('active');
       $('.member_tabs_item').removeClass('active');
       $('.member_tabs_item[data-tab='+th_t+']').addClass('active');


       if( $('.member_stats_item_clickable').length > 0 ){
           $('.member_stats_item_clickable').removeClass('active');
           $('.mt_a_item').removeClass('active');
       }

        $('.filters').removeClass('hide')


    });

    $('.member_stats_item_clickable').click(function(){
        var th_t = $(this).attr('data-tab');

        $('.member_stats_item_clickable').removeClass('active');
        $(this).addClass('active');
        $('.mt_a_item').removeClass('active');
        $('.mt_a_item[data-tab='+th_t+']').addClass('active');


        if( $('.member_tabs_head_item').length > 0 ){
            $('.member_tabs_head_item').removeClass('active');
            $('.member_tabs_item').removeClass('active');

            $('.filters').addClass('hide');
        }


    });



    //EDIT PROFILE TABS
    $('.js-tab').click(function(){
        var th_t = $(this).attr('data-tab');

        $('.js-tab').removeClass('active');
        $(this).addClass('active');
        $('.edit_tab').removeClass('active');
        $('.edit_tab[data-tab='+th_t+']').addClass('active');



    });




    $('.winners_items-list').owlCarousel({
        items: 5,
        margin: 10,
        loop: true,
        nav: true,
        dots: false,
        navText: ['',''],
        responsive : {
            0: {
                items : 1,
            },
            400 : {
                items : 4,
            },

            1280 : {
                items : 4,

            },
        }

    });




    $('.hamburger-menu').on('click', function() {
        if ( $('.bar').hasClass('animate') ) {
            $('.header__menu').removeClass('open');
            $('.bar').removeClass('animate sidebar_open');
            $('.menu_block').removeClass('open');
            $('.bar').removeClass('menu_open');
        } else {
            $('.bar').addClass('animate');
            $('.bar').addClass('menu_open');
            $('.header__menu').addClass('open');
            $('.bar').removeClass('invert');
        }
    });




    //Sprint 3

    $('.feedbacks_wrapper_list').owlCarousel({
        items: 2,
        margin: 20,
        loop: true,
        nav: true,
        dots: false,
        navText: ['',''],
        responsive : {
            0: {
                items : 1,
            },
            400 : {
                items : 4,
            },
            1024 : {
                items : 2,
            },

            1280 : {
                items : 2,

            },
        }

    });


    $('.feedbacks_toggle_item').click(function(){
        var th_list = $(this).attr('data-list');


        $('.feedbacks_toggle_item').removeClass('active');
        $('.feedbacks_wrapper_list').removeClass('active');

        $(this).addClass('active');
        $('.feedbacks_wrapper_list[data-list='+th_list+']').addClass('active');

    })




    //Prize chooze album photo and remove from list preview

    function calc_prize_window_height(){

        var inner_height =  $('.prize_type_wrapper').outerHeight() + 40;

        $('.choose_prize_type.prize_type').outerHeight(inner_height);




    }

    $('.prize_photo_item').click(function(){
        $(this).addClass('active');
        $('.prize_photo_item').removeClass('active');
        $('.prize_photo_item_active').remove();

        $(this).append('<span class="prize_photo_item_active">обложка</span>');

    });


    $('.prize_photo_item_remove').click(function(){
       $(this).parents('.prize_photo_item').fadeOut(300, function(){
           $(this).remove();
           calc_prize_window_height();
       })
    });


    $('.pp_sub').click(function(){
        $('.pp_sub').removeClass('show');
        var th_pp = $(this).attr('data-pp');
        $('.pp_sub_wrap[data-pp="' + th_pp + '"]').addClass('show');
    });

    $('.close_sub').click(function(){
        $(this).closest('.pp_sub_wrap[data-pp]').removeClass('show');
    });



    //MAP

// MAP
    if (typeof google !== 'undefined' && typeof markerPosition !== 'undefined') {
        google.maps.event.addDomListener(window, 'load', function () {
            var position = markerPosition.split(',');

            var mapContainer = document.getElementById('prize_map');
            if (!mapContainer) {
                return;
            }

            var or_marks= [
                [position[0], position[1]]
            ];

            position = new google.maps.LatLng(position[0], position[1]);


            var mapOptions = {
                center: position,
                zoom: 17,
                minZoom: 3,
                scrollwheel: false,
                // navigationControl: true,
                mapTypeControl: false,
                // scaleControl: true,
                // disableDefaultUI: true,
                streetViewControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };


            var map = new google.maps.Map(mapContainer, mapOptions);
            map.set('styles', [
                {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#d3d3d3"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "color": "#808080"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#b3b3b3"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ffffff"
                        },
                        {
                            "weight": 1.8
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d7d7d7"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#ebebeb"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#a7a7a7"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#efefef"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "color": "#696969"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#737373"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#d6d6d6"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {},
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#dadada"
                        }
                    ]
                }
            ]);


            for (i = 0; i < or_marks.length; i++) {
                var image = new google.maps.MarkerImage("/template/img/marker.png", new google.maps.Size(75,82), new google.maps.Point(0,0), new google.maps.Point(32,82));
                var myLatLng = new google.maps.LatLng(or_marks[i][0], or_marks[i][1]);
                var _marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                    icon: image,
                    id: i,
                });
            }


            //MAP
            google.maps.event.addListener(map, "idle", function(){
                google.maps.event.trigger(map, 'resize');
            });




            var marker = new google.maps.Marker({
                position: position,
                map: map,
                icon: new google.maps.MarkerImage("/template/img/marker.png", new google.maps.Size(75,82), new google.maps.Point(0,0), new google.maps.Point(32,82))
            });


            // infowindow.open(map, marker);


        });
    }






    //Tagger

    var keys = {
        tab: 9, //add tag
        enter: 13, //add tag
        backspace: 8, //edit tag
        up: 38,
        down: 40
    };

    var itemPos = 0;

    var methods = {
        addTag: function ($this) {
            console.log('addTag: li.results ul li.highlight: ', $('li.results ul li.highlight'));
            //check if an item in the list is highlighted - if it is then we should add this item instead of the written value
            if ($('li.results ul li.highlight').length) {
                console.log('highlighted item to be added as a tag');

                //get the value and add as a tagged item
                $('.tagger > ul li.input').before('<li class="tag"><span>' + $('li.highlight').text() + '</span></li>');

                //hide this item from the list
                $('li.results ul li').filter(function () {
                    if ($(this).text() === $('li.highlight').text()) {
                        console.warn('text is matching the higlighting so add hidden class: ', $('li.highlight').text());
                    }
                    return $(this).text() === $('li.highlight').text();
                }).addClass('hidden');
                console.warn('add class to: ', $('li.highlight'));

                //set this item as selected in the multi select
                $('select optgroup option').filter(function () {
                    return $(this).text() === $('li.highlight').text();
                }).prop('selected', true);

                //clear the value
                $this.val('');

            } else {

                //check if this item is already in the list before adding it to the list?
                var matchingItem = true;
                $('.tagger > select optgroup option').each(function(inx, elm){
                    if ($this.val() == $(elm).text()) {
                        matchingItem = false;
                    }
                });





                if ($this.val().length > 0) {
                    //check the state of the item...such as
                    console.log('add as a tag');
                    //get the value and add as a tagged item
                    $('.tagger > ul li.input').before('<li class="tag"><span>' + $this.val() + '</span></li>');
                    //if the item is not in the list already then we can add it
                    if (matchingItem) {
                        //add to the select list also
                        $('.tagger > select optgroup[label="added"]').append('<option>' + $this.val() + '</option>');
                    }

                    //set this item as selected in the multi select
                    $('select optgroup option').filter(function () {
                        return $(this).text() === $this.val();
                    }).prop('selected', true);

                    //clear the value
                    $this.val('');

                }

            }


        },
        addTagFromResults: function () {
            var $this = $(this);
            $this.addClass('hidden');
            //add the item to the tags
            $('.tagger > ul li.input').before('<li class="tag"><span>' + $this.text() + '</span></li>');
            //set as selected
            $('select optgroup[label="defaults"] option').filter(function () {
                return $(this).text() === $this.text();
            }).prop('selected', true);
            //clear the input value for search results
            $('li.input input').val('');

        },
        editTag: function () {
            //edit the last item by removing it, adding the value to the input field

            $('select optgroup option').filter(function () {
                return $(this).text() === $('li.tag:last').text();
            }).prop('selected', false);


            $('li.input input').val($('li.tag:last').text());
            $('li.tag:last').remove();
            // $('select optgroup[label="added"]:contains("'+$('li.tag:last').text()+'")').remove();
        },
        removeTag: function() {
            var $this = $(this);
            //check what item it is and remove it from the list
            console.log('remove item', $this);

            $('li.results').find('ul li:contains("'+$this.text()+'")').removeClass('hidden');
            console.log('remove elm: ', $('li.results').find('ul li:contains("'+$this.text()+'")'));


            // $('select optgroup[label="defaults"] option').filter(function (elm) {
            //   return $(this).text() === $this.text();
            // }).prop('selected', false);

            $('select optgroup option').filter(function () {
                return $(this).text() === $this.text();
            }).prop('selected', false);

            $this.parents('li').remove();
        },
        showResults: function () {
            var $this = $('.tagger input');
            console.log('focused on input so show the dropdown list');

            if (!$this.hasClass('items-added')) {

                $this.addClass('items-added');

                //clear all results before we begin adding again
                $('li.results ul').empty();

                //add results to the listings
                $('select optgroup[label="defaults"] option').each(function (inx, elm) {
                    // console.log(elm, inx);
                    $('li.results ul').append('<li>'+$(elm).text()+'</li>');
                });

            }

            //show the results list with all items
            $('li.results').show();

        },
        checkResults: function ($this, options, code) {
            //check against the list of options
            // console.info('normal keyups ', $this.val());
            console.info('val len:', $this.val().length);

            $this.removeClass('items-added');

            var listItem = 0;

            //check that the field val is > 2 chars
            if ($this.val().length > 0) {
                //start by clearing the ul of results
                $('.results ul').empty();

                //check for matches by looping through the options
                for (var i = 0; i < options.length; i++) {
                    //create a regex with the value the user has typed in
                    var rgx = new RegExp($this.val(), 'i');
                    //check if thier is a match
                    if ($(options[i]).val().match(rgx)) {
                        //add the matches
                        $('.results ul').append('<li>' + $(options[i]).val() + '</li>');
                        //show the results
                        $('.tagger > ul').addClass('show-results');
                    }
                }
            }


        }//end of function
    };//end of methods object







//on keydown - used only to prevent the tab key
    $('.tagger input').on('keydown', function(e) {
        var $this = $(this),
            code = e.which;
        if (code == keys.tab || code == keys.up || code == keys.down) {
            e.preventDefault();



            //get down and up events

            console.log('items in list count: ', $('.results ul li:not(".hidden")').length-1, ' itemPos: ', itemPos);

            //if the itemPos is greater than 0 or 0 then we can go down the numbers e.g. 0, 1, 2
            if (code == keys.down) {
                console.log('down the list..');

                //do here so that the first item we go to is ind 0!


                //if the itemPos is not the same as the max items being shown?
                if (itemPos != $('.results ul li:not(".hidden")').length) { //-1
                    //remove class from all items
                    $('.results ul li').removeClass('highlight');
                    setTimeout(function () {
                        //add class to item we are on
                        $('.results ul li:not(".hidden")').eq(itemPos).addClass('highlight');
                    }, 200);

                }

                // then we increment for the next one

                if (itemPos < $('.results ul li:not(".hidden")').length) {
                    console.log('add 1 to the itemPos: ', itemPos, ' = ', itemPos+1);
                    itemPos+=1;


                    $('.itemPos').text(itemPos);
                } else {
                    console.log('itemPos is <= len of items: ', $('.results ul li:not(".hidden")').length-1);
                }




                //if the itemPos is at the end of the line? we need to get back to 0
            } else if (code == keys.up){
                console.log('up the list...');

                $('.itemPos').text(itemPos);

                console.log('up..', itemPos, $('.results ul li:not(".hidden")').length-1);

                //if the itemPos is not the same as the first item?
                //if (itemPos != 0) {
                //remove class from all items
                $('.results ul li:not(".hidden")').removeClass('highlight');

                setTimeout(function () {
                    //add class to item we are on
                    $('.results ul li:not(".hidden")').eq(itemPos).addClass('highlight');
                }, 200);

                //}

                if (itemPos !== 0) {
                    console.log('take 1 away from the itemPos: ', itemPos, ' = ', itemPos-1);
                    itemPos-=1;
                } else {
                    console.log('itemPos is 0: ', itemPos);
                }


            }



        }
    })
    //on keyup
        .on('keyup', function(e) { // mouseup
            e.preventDefault();
            var $this = $(this),
                code = e.which,
                options = $('.tagger select').find('option');
            //check the value against the list of options

            //if keyup is tab or enter key then select the item or create the item
            if (code == keys.tab || code == keys.enter) {
                //ADD TAG
                methods.addTag($this);

                //then show the tags again as we are still inside the input field
                methods.showResults();

                //reset the itemposition
                itemPos = 0;

            } else if (code == keys.backspace && $('li.input input').val() == '') {
                //EDIT TAG
                methods.editTag();
            } else {
                //CHECK RESULTS
                methods.checkResults($this, options, code);

            }

        })
        //when the field is focused
        .on('focus', methods.showResults)
        //when the user blurs away from the field
        .on('blur', function () {
            //hide the results
            $('li.results').hide();
            //reset the item position
            itemPos=0;

        });





    $('.tagger, .tagger > ul').on('click', function () {
        //focus on the field
        $('.tagger input').focus();
    });

//RESULT TAG ADD
    $('.tagger').on('mousedown', 'li.results ul li', methods.addTagFromResults);

//REMOVE TAG
    $('.tagger').on('mousedown', 'li.tag span', methods.removeTag);

//CUSTOM ACTION IN RESULTS
    $('.tagger').on('mousedown', '.action', function () {

        console.log('action');

        //create a new item?


    });



    $('.limits_list_item_head').click(function(){

        var th_parent = $(this).parents('.limits_list_item');
        $('.limits_list_item_spoiler').slideUp(300);


        if( !th_parent.hasClass('active') ){
            th_parent.addClass('active');
            th_parent.find('.limits_list_item_spoiler').slideDown(300);
        } else {

            th_parent.removeClass('active');
            th_parent.find('.cbl_check').removeClass('active');
            th_parent.find('.limits_list_item_spoiler').slideUp(300);
        }

    });



    /**/
    /* new */
    /**/




    $('body').on('click', '.winners__items .item', function(event){
        $(".winners__items .item").addClass('item_disable');
        $(this).removeClass('item_disable');
    });



    $('.juries-pp-list').owlCarousel({
        center: true,
        items: 2,
        margin: 0,
        loop: true,
        nav: true,
        dots: false,
        navText: ['',''],
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 1,
            },
            1024: {
                items: 2,
            },

        }
    });


    $('.cip-winner__use .side_vote').click(function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });

    $('.cip-winner-pp .user_vote').click(function(){
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
    });


    $('.cip-winner-pp__cards-list').owlCarousel({
        items: 1,
        margin: 0,
        loop: true,
        nav: true,
        dots: true,
        navText: ['','']
    });


    $('.votes__title').click(function(){
        var th_pp_p = $(this).attr('data-pp-profiles');
        $('.user__votes-pp[data-pp-profiles="' + th_pp_p + '"]').addClass('user__votes-pp_show');
    });
    $('.user__votes-pp .votes-pp__close').on('click', function () {
        $(this).closest('.user__votes-pp').removeClass('user__votes-pp_show');
    });


    $('.cip-winner_audio .side_watch').click(function(){

        $(this).closest('.cip-winner_audio').addClass('playbar');

        if($('.cip-winner_audio').hasClass('playing')) {
            $('.cip-winner_audio').removeClass('playing');
        } else {
            $(this).closest('.cip-winner_audio').addClass('playing');
        }
    });



    $('.cropp-ph__close').on('click', function () {
        $(this).closest('.cropp-ph').removeClass('pp_show');
    });



    $('.pics__cover').click(function(){
        var pic_cov = $(this).attr('data-pic_cov');
        $('.cropp-ph-wrap[data-pic_cov="' + pic_cov + '"]').addClass('pp_show');
    });
    $('.cropp-ph__close').on('click', function () {
        $(this).closest('.cropp-ph-wrap').removeClass('pp_show');
    });


    // Croppie

    var basic = $('#main-cropper').croppie({
        viewport: { width: 374, height: 100 },
        boundary: { width: 374, height: 280 },
        showZoomer: false
        // url: 'http://lorempixel.com/500/400/'
    });

    function readFile(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#main-cropper').croppie('bind', {
                    url: e.target.result
                });
                $('.cropp-ph__cont-upload').addClass('hide');
                $('.cropp-ph__cont-cropp').removeClass('hide');
                // setTimeout(function() {
                //     $('.cropp-ph__cont-upload').remove();
                // },200);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $('#upload').on('change', function () { readFile(this); });




    $('.prize_image_zone').on('click', function () {
        $(this).closest('.cropp-ph__cont-upload').removeClass('pp_show');
    });

    $('.cropp-ph__btn_back').on('click', function () {
        $('.cropp-ph__cont-upload').removeClass('hide');
        $('.cropp-ph__cont-cropp').addClass('hide');
    });
















    /**/
    /**/
    /**/






    moment.locale('ru');
    $('#stages_calendar').dateRangePicker({

        autoClose: false,
        format: 'DD-MMMM-YYYY',
        separator: ' to ',
        language: 'ru',
        startOfWeek: 'monday',// or monday
        getValue: function()
        {
            return $(this).val();
        },

        startDate: new Date(),
        endDate: false,
        time: {
            enabled: false
        },
        minDays: 0,
        maxDays: 0,
        showShortcuts: false,
        shortcuts:
            {
                //'prev-days': [1,3,5,7],
                //'next-days': [3,5,7],
                //'prev' : ['week','month','year'],
                //'next' : ['week','month','year']
            },
        customShortcuts : [],
        inline:true,
        container:'#stages_calendar',
        alwaysOpen:true,
        singleDate:false,
        lookBehind: false,
        batchMode: false,
        duration: 200,
        stickyMonths: false,
        dayDivAttrs: [],
        dayTdAttrs: [],
        applyBtnClass: '',
        singleMonth: 'auto',
        customArrowPrevSymbol: '<span class="cl_range_prev"></span>',
        customArrowNextSymbol: '<span class="cl_range_next"></span>',


        hoveringTooltip: function(days)
        {
            var D = ['', 'Один','Два', 'Три','Четыре','Пять'];
            return D[days] ? D[days] : days + ' дней';
        },


        showTopbar: true,
        swapTime: false,
        selectForward: false,
        selectBackward: false,
        showWeekNumbers: false,
        getWeekNumber: function(date) //date will be the first day of a week
        {
            return moment(date).format('w');
        },
        monthSelect: false,
        yearSelect: false,

        setValue: function(s,s1,s2,s3,s4)
        {
            $('.sc_start_date').text(s1);
            $('.sc_end_date').text(s2);

            $('.dates_stages_range_duration_days_val').text($('.selected-days-num').text() + ' дней')




            console.log(s);
            console.log(s1);
            console.log(s2);
            console.log(s3);
            console.log(s4);
        }
    });









});