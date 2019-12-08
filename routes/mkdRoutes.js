const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const validateCommentsInput = require('../validation/comment');

const Comment = mongoose.model('message');

router.get('/', (req, res) => {
    res.render('mkd/index', {
        title: 'Почетна',
        mainPage: 'active',
        mkActive: 'active',
        footerText: '© 2018 ГЕТ Тим'
    });
});

router.get('/idea', (req, res) => {
    res.render('mkd/idea', {
        title: 'За идејата',
        mainPage: null,
        ideaPage: 'active',
        mkActive: 'active',
        footerText: '© 2018 ГЕТ Тим'
    })
});

router.get('/get-team', (req, res) => {
    res.render('mkd/get-team', {
        teamPage: 'active',
        title: 'ГЕТ Тим',
        ideaPage: null,
        mkActive: 'active',
        footerText: '© 2018 ГЕТ Тим'
    });
});

router.get('/news', (req, res) => {
    const interviewItems = [
        {
            interviewTitle: "Интервју со нашиот Филип Попоски за Радио МОФ – 06/12/2018",
            interviewLink: "https://www.radiomof.mk/studenti-smislija-gradski-sistem-na-elektrichni-velosipedi-koi-kje-go-prochistuvaat-vozduhot-so-filtri/?fbclid=IwAR2eunXf1WkALxqu-qJE_EVJ224NT41UQUs0P1cXbbIw0sIKm6cNZlf7zQo"
        },
        {
            interviewTitle: "Учество во централен дневник на 1ТВ на нашите Филип Попоски и Ина Крстевска  07/12/2018",
            interviewLink: "https://1tv.mk/makedonija/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D0%B5%D0%BD-%D0%B4%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA-%D0%BD%D0%B0-1%D1%82%D0%B2-%D0%B1%D0%B5%D0%BD%D0%B5%D1%84%D0%B8/?fbclid=IwAR1YxwzOAUlBAFaqB9fTCrf9j_gu-rCvllWPoNw0QuGZ_E8t_HIkySoJNYA"
        },
        {
            interviewTitle: "Интервју со нашиот Филип Попоски за Иновативност 09/12/2018",
            interviewLink: "https://inovativnost.mk/2018/12/09/%D0%BC%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D1%81%D0%BA%D0%B8-%D1%82%D0%B8%D0%BC-%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0-%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D1%87%D0%BD%D0%B8-%D0%B2%D0%B5/?fbclid=IwAR0xdhNu9IKVic7Pu0bDLppW67eOH1Mxvsetx1k05NBJPqawaJhngWml7pE"
        },
        {
            interviewTitle: "Интервју со нашите Ина Крстевса и Мартин Спасовски за Канал 5 Телевизија 15/12/2018",
            interviewLink: "https://www.kanal5.com.mk/articles/359277/elektrichen-velosiped-so-vgradeni-filtri-za-prochistuvanje-na-vozduhot?fbclid=IwAR2JzMezvroKp2HU5AYmEqkUnUwIi64jfcPgpYlYlEjr64021Os_UL98II4"
        },
        {
            interviewTitle: "Интервју за Фактор со нашиот Марко Насески 17/12/2018",
            interviewLink: "https://www.faktor.mk/genijalno-makedonski-studenti-sozdadoa-velosiped-koj-go-prochistuva-vozduhot?fbclid=IwAR1wNc-k9KylBASzyWt2clbJ6J5ZLaydD3tBu7_zNaeeZywXyBn23Z1ud0Y"
        },
        {
            interviewTitle: "Интервју со нашите Филип Попоски и Марко Насески за емисијата Топ Тема на Телма ТВ 28/12/2018",
            interviewLink: "https://www.youtube.com/watch?v=10IdufrWZvE&fbclid=IwAR2pe8lz-EQMXSkS25727Qly2mV0kugGMw4PX_hMBA8w1vkaaR4p3_AvXPM&app=desktop"
        },
        {
            interviewTitle: "Интревју на нашите Филип Попоски и Марко Насески за Anadolu Agency: 02/01/2019",
            interviewLink: "https://www.aa.com.tr/mk/%d0%bd%d0%b0%d1%81%d0%bb%d0%be%d0%b2%d0%b8-%d0%bd%d0%b0-%d0%b4%d0%b5%d0%bd%d0%be%d1%82/%d1%81%d1%82%d1%83%d0%b4%d0%b5%d0%bd%d1%82%d1%81%d0%ba%d0%b0-%d0%b8%d0%bd%d0%be%d0%b2%d0%b0%d1%82%d0%b8%d0%b2%d0%bd%d0%be%d1%81%d1%82-%d0%b5%d0%bb%d0%b5%d0%ba%d1%82%d1%80%d0%b8%d1%87%d0%b5%d0%bd-%d0%b2%d0%b5%d0%bb%d0%be%d1%81%d0%b8%d0%bf%d0%b5%d0%b4-%d0%ba%d0%be%d1%98-%d0%b3%d0%be-%d0%bf%d1%80%d0%be%d1%87%d0%b8%d1%81%d1%82%d1%83%d0%b2%d0%b0-%d0%b2%d0%be%d0%b7%d0%b4%d1%83%d1%85%d0%be%d1%82/1354044",
            interviewVideo: "https://www.facebook.com/AAmacedonian/videos/293808814501183/"
        },
        {
            interviewTitle: "Видео интервју со Филип Попоски за Види Вака 05/01/2019",
            interviewLink: "https://www.facebook.com/vidivakamedia/videos/2169688046681965/"
        },
        {
            interviewTitle: "Интервјуто за Anadolu Agency и во Турција 14/01/2019",
            interviewLink: "https://www.aa.com.tr/tr/dunya/makedonyanin-havasini-filtreli-bisikletler-temizleyecek/1363979?fbclid=IwAR2GF-J4YXJI-rV5tVJCK2At7mg607TjBxay-wqhyDFWt8AP67oals8jdZo"
        },
        {
            interviewTitle: "Интервјуто за Anadolu Agency и во БиХ, Србија и Хрватска 15/01/2019",
            interviewLink: "https://www.aa.com.tr/ba/nauka-i-tehnologija/makedonski-studenti-izumili-elektri%C4%8Dni-bicikl-s-filterima-za-pre%C4%8Di%C5%A1%C4%87avanje-zraka/1364920?fbclid=IwAR1JspBz0e7ghD_L6X1mh3g8rD3x6C5flbK0J6nIM8vod1A8iwmgHsqq69o"
        },
        {
            interviewTitle: "Статија во Bankar.me од Црна Гора за нас 15/01/2019",
            interviewLink: "https://www.bankar.me/2019/01/15/makedonski-studenti-izumili-elektricni-bicikl-s-filterima-za-preciscavanje-vazduha/?fbclid=IwAR1kFjCtJuSsJmxu3dUklW3Vr195EnelO4nl856kRKWFwz4NguslrSUiev8"
        },
        {
            interviewTitle: "Интервјуто за IT.mk со нашиот Александар Јанковиќ 18/01/2019",
            interviewLink: "https://www.it.mk/get-velosiped-e-elektrichen-velosiped-so-filter-za-namaluvane-na-zagaduvaneto/?fbclid=IwAR1-JqZK-r4Aikwos15ozg82HztXZSfzMIs82scPTtkxASNGqif8w5K-tgA"
        },
        {
            interviewTitle: "Статија на Иновативност за ГЕТ-Велосипед по презентацијата во Универзитет на Југоисточна Европа во Тетово заедно со ФИТР 24/01/2019",
            interviewLink: "https://inovativnost.mk/2019/01/24/%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D1%87%D0%BD%D0%B8%D0%BE%D1%82-%D0%B2%D0%B5%D0%BB%D0%BE%D1%81%D0%B8%D0%BF%D0%B5%D0%B4-%D0%BE%D0%B4-%D0%BA%D0%B0%D0%B2%D0%B0%D0%B4%D0%B0%D1%80%D1%86%D0%B8/?fbclid=IwAR09pIDCA48n5qNchiyKsP5397AibyHJBZP4UAmcYHWm9v1iqxxnn1gnqcI"
        },
        {
            interviewTitle: "Интервју со нашиот Тошко Ристов за Нова Македонија 31/01/2019",
            interviewLink: "https://www.novamakedonija.com.mk/makedonija/skopje/%D0%B7%D0%B0%D0%B3%D0%B0%D0%B4%D1%83%D0%B2%D0%B0%D1%9A%D0%B5%D1%82%D0%BE-%D1%82%D1%80%D1%83%D0%B5-%D0%B8-%D0%BD%D0%B5-%D1%87%D0%B5%D0%BA%D0%B0-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%B0%D1%9A%D0%B5/?fbclid=IwAR3gHZZNf5JWuYbpaExtIm7FrOobGDq-T8cvhvVeGCGlwqry0aclxcQHN1Y"
        },
        {
            interviewTitle: "Претставувани од нашиот Филип Попоски, ГЕТ-Велосипед дел од затворањето на фестивалот Скопје Креатива 02/06/2019",
            interviewLink: "https://www.facebook.com/notes/skopje-kreativa-festival-for-creative-industries/%D0%BB%D0%B8%D1%81%D1%82%D0%B0-%D0%BD%D0%B0-%D1%83%D1%87%D0%B5%D1%81%D0%BD%D0%B8%D1%86%D0%B8-%D1%81%D0%BA%D0%BE%D0%BF%D1%98%D0%B5-%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%B2%D0%B0-2019-%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE-%D1%81%D0%BA%D0%BE%D0%BF%D1%98%D0%B5/2732348670168943/?__tn__=H-R",
        },
        {
            interviewTitle: "Нашите Игор Џамбаски и Александар Јанковиќ дел од Утринска на Телма 12/06/2019",
            interviewLink: "https://www.youtube.com/watch?v=iTDI8eBiu3Q&fbclid=IwAR1I5UaXJXjdiKnO7x1Qgtka-a-V4FULKoL8wbDbsyCm7qrO1o9kq4sw__E"
        }
    ];

    res.render('mkd/news', {
        newsPage: 'active',
        ideaPage: null,
        title: 'Вести',
        mkActive: 'active',
        footerText: '© 2018 ГЕТ Тим',
        interviewItems
    });
});

router.route('/contact-us')
    .get((req, res) => {
        res.render('mkd/contact', {
            mainPage: null,
            contactPage: 'active',
            title: 'Контакт',
            mkActive: 'active',
            footerText: '© 2018 ГЕТ Тим'
        })
    })
    .post((req, res) => {

        ({errors, isValid} = validateCommentsInput(req.body, 'mk'));
        if (!isValid) {
            req.flash('error_msg', Object.keys(errors).map(msg => errors[msg]));
            return res.redirect('/contact-us');
        }

        const newComment = {
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            Email: req.body.Email,
            Message: req.body.Message
        };

        new Comment(newComment)
            .save()
            .then(comment => {
                req.flash('success_msg', 'Вашата порака беше успешно испратена');
                res.redirect('/contact-us');
            })
            .catch(err => console.log(err));


    });

module.exports = router;
