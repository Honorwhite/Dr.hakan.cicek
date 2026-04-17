$(function () {
    $('.nav-btn').on('click', function () {
        $(this).toggleClass('open');
    });
});

$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 100) {
            $("#header").addClass('glass-effect');
        } else {
            $("#header").removeClass("glass-effect");
        }
    });

    const tabCourse = $('#course-tab');
    const tabDuration = $('#tab-duration');

    let courseActive = tabCourse.find('.tab.active');
    let dataCourseActive = courseActive.data('course');

    let durationActive = tabDuration.find('.tab.active');
    let dataDurationActive = durationActive.data('duration');

    filterClasses(dataCourseActive);
    filterDuration(dataDurationActive);

    tabCourse.find('.tab').on('click', function (e) {
        e.preventDefault();
        let course = $(this).data('course');
        filterClasses(course);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    tabDuration.find('.tab').on('click', function (e) {
        e.preventDefault();
        let duration = $(this).data('duration');
        filterDuration(duration);
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
    });

    function filterClasses(course) {
        if (course === 'all') {
            $('.class-course').addClass('active');
        } else {
            $('.class-course').each(function () {
                const courses = $(this).attr('data-courses') || '';
                if (courses.includes(course)) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
    }

    function filterDuration(duration) {
        if (duration === 'all') {
            $('.class-duration').addClass('active');
        } else {
            $('.class-duration').each(function () {
                const durations = $(this).attr('data-duration') || '';
                if (durations.includes(duration)) {
                    $(this).addClass('active');
                } else {
                    $(this).removeClass('active');
                }
            });
        }
    }
})

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function animateNumber(element, targetNumber, duration) {
    const startTime = performance.now();
    const startNumber = 0;

    function updateNumber(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentNumber = Math.floor(startNumber + progress * (targetNumber - startNumber));

        element.innerText = formatNumber(currentNumber);

        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }

    requestAnimationFrame(updateNumber);
}

function checkScroll() {
    const numberElements = document.querySelectorAll('.number');
    numberElements.forEach(element => {
        // Periksa jika elemen sudah dianimasikan
        if (!element.classList.contains('animated')) {
            const targetValue = parseInt(element.getAttribute("data-target"), 10);
            const durationValue = parseInt(element.getAttribute("data-duration"), 10);

            // Memeriksa apakah elemen muncul di viewport
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateNumber(element, targetValue, durationValue);
                element.classList.add('animated'); // Tandai elemen sudah dianimasikan
            }
        }
    });
}

// Menambah event listener untuk scroll
window.addEventListener('scroll', checkScroll);

// Global function for Google Ads Conversion Tracking
function gtag_report_conversion(url) {
    var callback = function () {
        if (typeof (url) != 'undefined' && url.indexOf('tel:') === -1 && url.indexOf('wa.me') === -1) {
            window.location = url;
        }
    };

    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-17056411775/Xv4SCLnP5u0aEP_gkMU_',
            'value': 1.0,
            'currency': 'TRY',
            'event_callback': callback
        });
        // Set a fallback timeout for the callback
        setTimeout(callback, 1000);
    } else {
        callback();
    }

    // For tel: and whatsapp: links, we don't want to block the default browser action
    // because window.location = 'tel:...' is often blocked by popup blockers or security settings
    if (url && (url.indexOf('tel:') !== -1 || url.indexOf('wa.me') !== -1)) {
        return true;
    }

    return false;
}

// PWA Installation Logic
let deferredPrompt;
// Captured earlier to catch the event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

$(document).ready(function () {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isSafari = isIOS && navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('CriOS') === -1 && navigator.userAgent.indexOf('FxiOS') === -1 && navigator.userAgent.indexOf('OPiOS') === -1;
    const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

    $('.marquee-container').each(function () {
        const cont = $(this); // Mengambil marquee-container saat ini
        const content = cont.find('.marquee-content');
        const clone = content.clone();
        const clone2 = clone.clone();
        cont.append(clone);
        cont.append(clone2); // Clone hanya untuk container ini

        cont.find('.marquee-content').addClass('marquee'); // Tambahkan class marquee pada konten yang di-clone
    });

    // Mobile Bottom Bar Injection
    const mobileBottomBar = `
        <div class="mobile-bottom-bar">
            <a href="tel:+905322777401" class="mobile-bottom-item" onclick="gtag_report_conversion('tel:+905322777401');">
                <i class="fa-solid fa-phone"></i>
                <span>Tıkla Ara</span>
            </a>
            <a href="https://wa.me/905322777401" class="mobile-bottom-item" target="_blank">
                <i class="fa-brands fa-whatsapp"></i>
                <span>WhatsApp</span>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=Medical+Park+Seyhan+Hastanesi+Adana" class="mobile-bottom-item" target="_blank">
                <i class="fa-solid fa-location-dot"></i>
                <span>Yol Tarifi</span>
            </a>
        </div>
    `;
    $('body').append(mobileBottomBar);

    // Custom PWA UI Injection
    const pwaUI = `
        <div id="pwa-install-banner" class="pwa-banner" style="display: none;">
            <div class="pwa-banner-content">
                <div class="pwa-banner-info">
                    <img src="web-app-manifest-192x192.png" alt="App Icon" class="pwa-mini-logo">
                    <span>Uygulamamızı Kurun</span>
                </div>
                <div class="pwa-banner-actions">
                    <button id="pwa-install-btn" class="btn btn-accent rounded-pill btn-sm px-3">Yükle</button>
                    <button id="pwa-close-banner" class="pwa-banner-close">&times;</button>
                </div>
            </div>
        </div>
        <div id="ios-install-overlay" class="pwa-overlay" style="display: none;">
            <div class="pwa-modal">
                <button class="pwa-close-btn">&times;</button>
                <div class="pwa-content">
                    <img src="web-app-manifest-192x192.png" alt="App Icon" class="pwa-logo">
                    <h3 style="font-size: 1.5rem; margin-bottom: 1rem; color: #155766;">Uygulamayı Kur</h3>
                    <p>Prof. Dr. Hakan Çiçek uygulamasına ana ekranınızdan kolayca ulaşın.</p>
                    <div class="ios-instructions">
                        <div class="step">
                            <span class="step-num">1</span>
                            <p>Safari menüsündeki <strong>Paylaş</strong> <i class="fa-solid fa-arrow-up-from-bracket ios-icon"></i> simgesine dokunun.</p>
                        </div>
                        <div class="step">
                            <span class="step-num">2</span>
                            <p>Menüde <strong>Ana Ekrana Ekle</strong> <i class="fa-solid fa-square-plus ios-icon"></i> seçeneğine dokunun.</p>
                        </div>
                    </div>
                    <button class="btn btn-accent w-100 rounded-pill mt-3 pwa-close-btn-inner">Anladım</button>
                </div>
            </div>
        </div>
    `;
    $('body').append(pwaUI);

    const installBanner = $('#pwa-install-banner');
    const installBtn = $('#pwa-install-btn');
    const closeBanner = $('#pwa-close-banner');
    const iosOverlay = $('#ios-install-overlay');

    // Show if (Android OR iOS Safari) and NOT already in standalone mode
    if ((isAndroid || isSafari) && !isStandalone) {
        // Show for any mobile device (responsive CSS handles desktop floating)
        installBanner.css('display', 'flex').hide().show(); 
    }

    installBtn.on('click', function() {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    installBanner.fadeOut();
                }
                deferredPrompt = null;
            });
        } else {
            // iOS or any device without native prompt (show manual instructions)
            iosOverlay.fadeIn().css('display', 'flex');
        }
    });

    closeBanner.on('click', function() {
        installBanner.fadeOut();
        // localStorage.setItem('pwa_banner_dismissed', 'true'); // Temporarily disabled for testing
    });

    $('.pwa-close-btn, .pwa-close-btn-inner').on('click', function() {
        iosOverlay.fadeOut();
    });

    window.addEventListener('appinstalled', () => {
        installBanner.fadeOut();
        deferredPrompt = null;
    });

    // Language Switcher Injection
    function injectLanguageSwitcher() {
        const pagesMap = {
            'index.html': 'index_en.html',
            'hakan_cicek.html': 'about.html',
            'hizmetlerimiz.html': 'services.html',
            'iletisim.html': 'contact.html',
            'blog.html': 'blog_en.html',
            'makaleler.html': 'publishings.html',
            'yorumlar.html': 'reviews.html',
            'kalcaprotezi.html': 'kalcaprotezi_en.html',
            'dizprotezi.html': 'dizprotezi_en.html',
            'sporcerrahisi.html': 'sporcerrahisi_en.html',
            'adana_meniskus.html': 'adana_meniscus.html',
            'dizbagyaralanmalari.html': 'knee_injuries.html',
            'dizbaglejyonlari.html': 'knee_ligament_injuries.html',
            'eklemartroplasti.html': 'joint_arthroplasty.html',
            'omurgacerrahisi.html': 'spine_surgery.html',
            'omuzveayakbilegi.html': 'shoulder_and_ankle.html',
            'on_capraz_bag_cerrahisi.html': 'anterior_cruciate_ligament_surgery.html',
            'ortopediktravma.html': 'ortopedic_trauma.html',
            'patella_neden_cikar.html': 'patella.html',
            'primerprotez.html': 'primer_joint.html',
            'kvkk.html': 'privacy_policy.html',
            'sporyaralanmalari.html': 'sports_injuries.html'
        };

        const reverseMap = {};
        for (const [tr, en] of Object.entries(pagesMap)) {
            reverseMap[en] = tr;
        }
        const allPages = { ...pagesMap, ...reverseMap };

        const path = window.location.pathname;
        const currentFile = path.split('/').pop() || 'index.html';
        const otherFile = allPages[currentFile] || (currentFile.includes('_en') ? currentFile.replace('_en', '') : currentFile);

        const isEn = $('html').attr('lang') === 'en' || currentFile.includes('_en') || Object.values(pagesMap).includes(currentFile);
        
        const trHref = isEn ? otherFile : currentFile;
        const enHref = isEn ? currentFile : otherFile;
        const currentLang = isEn ? 'EN' : 'TR';
        const currentFlag = isEn ? 'image/en_flag.png' : 'image/tr_flag.png';
        const trChecked = isEn ? '' : 'checked';
        const enChecked = isEn ? 'checked' : '';

        const langSwitcherHTML = `
            <li class="nav-item dropdown language-selector">
                <a class="nav-link dropdown-toggle d-flex align-items-center gap-2"
                    href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown"
                    aria-expanded="false" style="color: var(--text-color) !important;">
                    <img src="${currentFlag}" alt="${currentLang}" class="flag-icon" style="width: 24px !important; height: 24px !important; border-radius: 50%; object-fit: cover;">
                    <span class="d-xl-none">Dil: </span>${currentLang}
                </a>
                <ul class="dropdown-menu shadow-sm dropdown-menu-end" aria-labelledby="languageDropdown">
                    <li>
                        <a class="dropdown-item d-flex align-items-center gap-3" href="${trHref}">
                            <input class="form-check-input" type="radio" name="lang_select" ${trChecked} style="pointer-events: none;">
                            <img src="image/tr_flag.png" alt="TR" class="flag-icon" style="width: 20px !important; height: 20px !important; border-radius: 50%; object-fit: cover;">
                            <span style="flex-grow: 1;">Türkçe</span>
                        </a>
                    </li>
                    <li>
                        <a class="dropdown-item d-flex align-items-center gap-3" href="${enHref}">
                            <input class="form-check-input" type="radio" name="lang_select" ${enChecked} style="pointer-events: none;">
                            <img src="image/en_flag.png" alt="EN" class="flag-icon" style="width: 20px !important; height: 20px !important; border-radius: 50%; object-fit: cover;">
                            <span style="flex-grow: 1;">English</span>
                        </a>
                    </li>
                </ul>
            </li>
        `;

        // Remove any existing switcher and append new one
        $('.language-selector').remove();
        $('.navbar-nav').first().each(function() {
            // Find and remove the old text-based switcher if it exists
            $(this).find('li').each(function() {
                if ($(this).text().includes('🇹🇷🇬🇧')) {
                    $(this).remove();
                }
            });
            $(this).append(langSwitcherHTML);
        });
    }

    injectLanguageSwitcher();
});



