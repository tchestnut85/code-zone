const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

// GET the homepage
router.get('/', (req, res) => {
    console.log(req.session);

    Blog.findAll({
        attributes: [
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['content', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            const blogs = blogData.map(blog => blog.get({ plain: true }));
            console.log(blogs);
            res.render('homepage', {
                blogs,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// User login route - if no account this should redirect to signup page, 
// if wrong password it should redirect to login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

// Direct user to signup page when clicking signup link
router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/new-blog', (req, res) => {
    res.render('new-blog');
});

module.exports = router;