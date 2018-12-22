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
    res.render('en/news', {
        title: 'GET Team',
        mainPage: null,
        newsPage: 'active',
        enActive: 'active',
        footerText: '© 2018 GET Team',
        layout: 'enIndex'
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