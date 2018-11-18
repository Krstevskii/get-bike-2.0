const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Comment = mongoose.model('message');

router.get('/', (req, res) => {
    res.render('mkd/index', {
        title: 'Почетна',
        mainPage: 'active'
    });
});

router.get('/idea', (req, res) => {
    res.render('mkd/idea', {
        title: 'За идејата',
        mainPage: null,
        ideaPage: 'active'
    })
});

router.get('/get-team', (req, res) => {
    res.render('mkd/get-team', {
        teamPage: 'active',
        title: 'ГЕТ Тим',
        ideaPage: null
    });
});

router.get('/news', (req, res) => {
    res.render('mkd/news', {
        newsPage: 'active',
        ideaPage: null,
        title: 'Вести'
    });
});

router.get('/contact-us', (req, res) => {
   res.render('mkd/contact', {
       mainPage: null,
       contactPage: 'active',
       title: 'Контакт'
   })
});

router.post('/contact-us', (req, res) => {
    const newComment = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Message: req.body.Message
    }

    new Comment(newComment)
        .save()
        .then(comment => {
            console.log(comment);
            req.flash('success_msg', 'Вашата порака беше успешно испратена');
            res.redirect('/contact-us');
        })
        .catch(err => console.log(err));


});

module.exports = router;