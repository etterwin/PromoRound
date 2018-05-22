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
});