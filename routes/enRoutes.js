const express = require('express');
const mongoose = require('mongoose');
const router = express();
const validateCommentsInput = require('../validation/comment');

const Comment = mongoose.model('message');

router.get('/', (req, res) => {
    res.render('en/index', {
        title: 'Home',
        mainPage: 'active',
        enActive: 'active',
        footerText: '© 2018 GET Team',
        layout: 'enIndex'
    })
});

router.get('/idea', (req, res) => {
    res.render('en/idea', {
        title: 'Idea',
        mainPage: null,
        ideaPage: 'active',
        enActive: 'active',
        footerText: '© 2018 GET Team',
        layout: 'enIndex'
    });
});

router.get('/get-team', (req, res) => {
    res.render('en/get-team', {
        title: 'GET Team',
        mainPage: null,
        teamPage: 'active',
        enActive: 'active',
        footerText: '© 2018 GET Team',
        layout: 'enIndex'
    });
});

router.get('/news', (req, res) => {
    const interviewItems = [
        {
            interviewTitle: "Interview of our Filip Poposki for Radio MOF",
            interviewLink: "https://www.radiomof.mk/studenti-smislija-gradski-sistem-na-elektrichni-velosipedi-koi-kje-go-prochistuvaat-vozduhot-so-filtri/?fbclid=IwAR2eunXf1WkALxqu-qJE_EVJ224NT41UQUs0P1cXbbIw0sIKm6cNZlf7zQo"
        },
        {
            interviewTitle: "Our Filip Poposki and Ina Krstevska as part of the Central News on 1TV",
            interviewLink: "https://1tv.mk/makedonija/%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE-%D1%86%D0%B5%D0%BD%D1%82%D1%80%D0%B0%D0%BB%D0%B5%D0%BD-%D0%B4%D0%BD%D0%B5%D0%B2%D0%BD%D0%B8%D0%BA-%D0%BD%D0%B0-1%D1%82%D0%B2-%D0%B1%D0%B5%D0%BD%D0%B5%D1%84%D0%B8/?fbclid=IwAR1YxwzOAUlBAFaqB9fTCrf9j_gu-rCvllWPoNw0QuGZ_E8t_HIkySoJNYA"
        },
        {
            interviewTitle: "Interview of our Filip Poposki for Inovativnost",
            interviewLink: "https://inovativnost.mk/2018/12/09/%D0%BC%D0%B0%D0%BA%D0%B5%D0%B4%D0%BE%D0%BD%D1%81%D0%BA%D0%B8-%D1%82%D0%B8%D0%BC-%D1%80%D0%B0%D0%B7%D0%B2%D0%B8%D0%B2%D0%B0-%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D1%87%D0%BD%D0%B8-%D0%B2%D0%B5/?fbclid=IwAR0xdhNu9IKVic7Pu0bDLppW67eOH1Mxvsetx1k05NBJPqawaJhngWml7pE"
        },
        {
            interviewTitle: "Our Ina Krstevska and Martin Spasovski on an interview for Kanal 5 TV",
            interviewLink: "https://www.kanal5.com.mk/articles/359277/elektrichen-velosiped-so-vgradeni-filtri-za-prochistuvanje-na-vozduhot?fbclid=IwAR2JzMezvroKp2HU5AYmEqkUnUwIi64jfcPgpYlYlEjr64021Os_UL98II4"
        },
        {
            interviewTitle: "Our Marko Naseski on an interview for Faktor",
            interviewLink: "https://www.faktor.mk/genijalno-makedonski-studenti-sozdadoa-velosiped-koj-go-prochistuva-vozduhot?fbclid=IwAR1wNc-k9KylBASzyWt2clbJ6J5ZLaydD3tBu7_zNaeeZywXyBn23Z1ud0Y"
        },
        {
            interviewTitle: "Our Filip Poposki and Marko Naseski on the show “Тop Tema na Telma TV”",
            interviewLink: "https://www.youtube.com/watch?v=10IdufrWZvE&fbclid=IwAR2pe8lz-EQMXSkS25727Qly2mV0kugGMw4PX_hMBA8w1vkaaR4p3_AvXPM&app=desktop"
        },
        {
            interviewTitle: "Our Filip Poposki and Marko Naseski on an interview for Anadolu Agency",
            interviewLink: "https://www.aa.com.tr/mk/%d0%bd%d0%b0%d1%81%d0%bb%d0%be%d0%b2%d0%b8-%d0%bd%d0%b0-%d0%b4%d0%b5%d0%bd%d0%be%d1%82/%d1%81%d1%82%d1%83%d0%b4%d0%b5%d0%bd%d1%82%d1%81%d0%ba%d0%b0-%d0%b8%d0%bd%d0%be%d0%b2%d0%b0%d1%82%d0%b8%d0%b2%d0%bd%d0%be%d1%81%d1%82-%d0%b5%d0%bb%d0%b5%d0%ba%d1%82%d1%80%d0%b8%d1%87%d0%b5%d0%bd-%d0%b2%d0%b5%d0%bb%d0%be%d1%81%d0%b8%d0%bf%d0%b5%d0%b4-%d0%ba%d0%be%d1%98-%d0%b3%d0%be-%d0%bf%d1%80%d0%be%d1%87%d0%b8%d1%81%d1%82%d1%83%d0%b2%d0%b0-%d0%b2%d0%be%d0%b7%d0%b4%d1%83%d1%85%d0%be%d1%82/1354044",
            interviewVideo: "https://www.facebook.com/AAmacedonian/videos/293808814501183/"
        },
        {
            interviewTitle: "Video Interview of out Filip Poposki for VidiVaka media",
            interviewLink: "https://www.facebook.com/vidivakamedia/videos/2169688046681965/"
        },
        {
            interviewTitle: "Our Anadolu Agency interview now available in Turkey",
            interviewLink: "https://www.aa.com.tr/tr/dunya/makedonyanin-havasini-filtreli-bisikletler-temizleyecek/1363979?fbclid=IwAR2GF-J4YXJI-rV5tVJCK2At7mg607TjBxay-wqhyDFWt8AP67oals8jdZo"
        },
        {
            interviewTitle: "Our Anadolu Agency interview now available in Bosnia and Herzegovina, Serbia and Croatia",
            interviewLink: "https://www.aa.com.tr/ba/nauka-i-tehnologija/makedonski-studenti-izumili-elektri%C4%8Dni-bicikl-s-filterima-za-pre%C4%8Di%C5%A1%C4%87avanje-zraka/1364920?fbclid=IwAR1JspBz0e7ghD_L6X1mh3g8rD3x6C5flbK0J6nIM8vod1A8iwmgHsqq69o"
        },
        {
            interviewTitle: "A column in Bankar.me from Montenegro for our project",
            interviewLink: "https://www.bankar.me/2019/01/15/makedonski-studenti-izumili-elektricni-bicikl-s-filterima-za-preciscavanje-vazduha/?fbclid=IwAR1kFjCtJuSsJmxu3dUklW3Vr195EnelO4nl856kRKWFwz4NguslrSUiev8"
        },
        {
            interviewTitle: "Our Aleksandar Jankovikj on an interview for IT.mk",
            interviewLink: "https://www.it.mk/get-velosiped-e-elektrichen-velosiped-so-filter-za-namaluvane-na-zagaduvaneto/?fbclid=IwAR1-JqZK-r4Aikwos15ozg82HztXZSfzMIs82scPTtkxASNGqif8w5K-tgA"
        },
        {
            interviewTitle: "A column for GET-Bicycle in Innovativnost after our presentation at the South East European University in Tetovo, together with the Fund for Innovation and Technology Development",
            interviewLink: "https://inovativnost.mk/2019/01/24/%D0%B5%D0%BB%D0%B5%D0%BA%D1%82%D1%80%D0%B8%D1%87%D0%BD%D0%B8%D0%BE%D1%82-%D0%B2%D0%B5%D0%BB%D0%BE%D1%81%D0%B8%D0%BF%D0%B5%D0%B4-%D0%BE%D0%B4-%D0%BA%D0%B0%D0%B2%D0%B0%D0%B4%D0%B0%D1%80%D1%86%D0%B8/?fbclid=IwAR09pIDCA48n5qNchiyKsP5397AibyHJBZP4UAmcYHWm9v1iqxxnn1gnqcI"
        },
        {
            interviewTitle: "Our Tosko Ristov on an interview for Nova Makedonija",
            interviewLink: "https://www.novamakedonija.com.mk/makedonija/skopje/%D0%B7%D0%B0%D0%B3%D0%B0%D0%B4%D1%83%D0%B2%D0%B0%D1%9A%D0%B5%D1%82%D0%BE-%D1%82%D1%80%D1%83%D0%B5-%D0%B8-%D0%BD%D0%B5-%D1%87%D0%B5%D0%BA%D0%B0-%D1%82%D0%B5%D1%81%D1%82%D0%B8%D1%80%D0%B0%D1%9A%D0%B5/?fbclid=IwAR3gHZZNf5JWuYbpaExtIm7FrOobGDq-T8cvhvVeGCGlwqry0aclxcQHN1Y"
        },
        {
            interviewTitle: "Represented by our Filip Poposki, GET-Bicycle as part of the closing of the festival Skopje Kreativa",
            interviewLink: "https://www.facebook.com/notes/skopje-kreativa-festival-for-creative-industries/%D0%BB%D0%B8%D1%81%D1%82%D0%B0-%D0%BD%D0%B0-%D1%83%D1%87%D0%B5%D1%81%D0%BD%D0%B8%D1%86%D0%B8-%D1%81%D0%BA%D0%BE%D0%BF%D1%98%D0%B5-%D0%BA%D1%80%D0%B5%D0%B0%D1%82%D0%B8%D0%B2%D0%B0-2019-%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D0%BE-%D1%81%D0%BA%D0%BE%D0%BF%D1%98%D0%B5/2732348670168943/?__tn__=H-R",
            interviewPhotos: "https://www.facebook.com/pg/LOKOMOTIVA-Centre-for-New-Initiatives-in-Arts-and-Culture-238745038237/photos/?tab=album&album_id=10158323527638238&__tn__=-UCH-R"
        },
        {
            interviewTitle: "Our Igor Dzambaski and Aleksandar Jankovikj a part of the morning show on Telma TV",
            interviewLink: "https://www.youtube.com/watch?v=iTDI8eBiu3Q&fbclid=IwAR1I5UaXJXjdiKnO7x1Qgtka-a-V4FULKoL8wbDbsyCm7qrO1o9kq4sw__E"
        }
    ];

    res.render('en/news', {
        title: 'GET Team',
        mainPage: null,
        newsPage: 'active',
        enActive: 'active',
        footerText: '© 2018 GET Team',
        layout: 'enIndex',
        interviewItems
    });
});

router.route('/contact-us')
    .get((req, res) => {
        res.render('en/contact', {
            title: 'Contact',
            mainPage: null,
            contactPage: 'active',
            enActive: 'active',
            footerText: '© 2018 GET Team',
            layout: 'enIndex'
        });
    })
    .post((req, res) => {

        ({ errors, isValid } = validateCommentsInput(req.body, 'en'));
        if(!isValid) {
            req.flash('error_msg', Object.keys(errors).map(msg => errors[msg]));
            return res.redirect('/en/contact-us');
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
                console.log(comment);
                req.flash('success_msg', 'Your message has been successfully sent');
                res.redirect('/en/contact-us');
            })
            .catch(err => console.log(err));

    });

module.exports = router;
