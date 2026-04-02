$(function () {
    'use strict';

    // EmailJS Initialization
    if (typeof emailjs !== 'undefined') {
        emailjs.init("i070ZtH6g9mNrJ42x");
    }

    const forms = $('.needs-validation');

    forms.on('submit', function (event) {
        event.preventDefault();
        const form = $(this);
        const submitBtn = form.find('.submit_form');
        const originalBtnText = submitBtn.html();

        if (!form[0].checkValidity()) {
            event.stopPropagation();
        } else {
            submitBtn.html('Gönderiliyor...');
            submitBtn.prop('disabled', true);

            // Get form data
            const formData = {
                name: form.find('[name="name"]').val(),
                phone: form.find('[name="phone"]').val(),
                email: form.find('[name="email"]').val(),
                treatment: form.find('[name="treatment"]').val(),
                preferred_date: form.find('[name="preferred_date"]').val(),
                preferred_time: form.find('[name="preferred_time"]').val(),
                symptoms: form.find('[name="symptoms"]').val()
            };

            // Format Date (YYYY-MM-DD to DD.MM.YYYY as requested by 'ters' mention, or ay/gün/yıl as literally requested)
            // User requested "ay gün yıl" but also said "it is currently reversed (ters)". 
            // In TR, DD.MM.YYYY is standard. US is MM/DD/YYYY. 
            // I will provide DD.MM.YYYY (Standard TR) as it is the most logical 'correction' to YYYY-MM-DD.
            if (formData.preferred_date) {
                const dateParts = formData.preferred_date.split('-');
                if (dateParts.length === 3) {
                    // DD.MM.YYYY format
                    formData.preferred_date = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
                }
            }

            // EmailJS Send
            emailjs.send('service_c9c4pip', 'template_wuvdzfj', formData)
                .then(function() {
                    const toast = new bootstrap.Toast($('.success_msg')[0]);
                    toast.show();
                    form[0].reset();
                    form.removeClass('was-validated');
                }, function(error) {
                    console.error('EmailJS Hatası:', error);
                    const errtoast = new bootstrap.Toast($('.error_msg')[0]);
                    errtoast.show();
                })
                .finally(function() {
                    submitBtn.html(originalBtnText);
                    submitBtn.prop('disabled', false);
                });
        }

        form.addClass('was-validated');
    });
});