document.addEventListener('DOMContentLoaded', function () {

    // Tabs

    const tabsContent = document.querySelectorAll('.tabcontent'),
        tabs = document.querySelectorAll('.tabheader__item'),
        tabsPerent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsPerent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }

            });
        }
    });

    // Timer

    const deadline = '2020-10-15';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', deadline);

    // Modal

    const dataDisplay = document.querySelectorAll('[data-modal]'),
        dataClose = document.querySelector('[data-close]'),
        modal = document.querySelector('.modal');

    function modalOpen() {
        modal.style.display = "block";
        document.body.style.overflow = 'hidden';
        modal.classList.add('foresc');
        clearTimeout(modalTimer);
    }

    dataDisplay.forEach((item) => {
        item.addEventListener('click', modalOpen);
    });

    function modalClose() {
        modal.style.display = "";
        document.body.style.overflow = '';
        modal.classList.remove('foresc');
    }

    dataClose.addEventListener('click', modalClose);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape"  && modal.classList.contains('foresc')) {
            modalClose();
        }
    });

    const modalTimer = setTimeout(modalOpen, 5000);

    function modalScrollOpen() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            modalOpen();
            window.removeEventListener('scroll', modalScrollOpen);
        }
    }

    window.addEventListener('scroll', modalScrollOpen);
});