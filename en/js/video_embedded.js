$(document).ready(function() {
    Fancybox.bind("[data-fancybox]", {
        // Fancybox options
        autoFocus: false,
        trapFocus: false,
        placeFocusBack: false,
        dragToClose: true,
        Toolbar: {
            display: {
                left: [],
                middle: [],
                right: ["close"],
            },
        },
        Youtube: {
            ratio: 16 / 9,
            autoplay: true,
            mute: false,
        },
    });
});