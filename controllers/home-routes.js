const router = require('express').Router();
const sequelize = require('../config/connection');
const { Blog, User, Comment } = require('../models');

// GET the homepage
router.get('/', (req, res) => {
    console.log(req.session);

    Blog.findAll({
        attributes: [
            'id',
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

// User login route
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

// Route for page to create a new blog post
router.get('/new-blog', (req, res) => {
    res.render('new-blog');
});

// Route for single-blog page
router.get('/blog/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'content', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({ message: "We didn't find a blog post with that ID!" });
                return;
            }
            const blog = blogData.get({ plain: true });
            res.render('single-blog', { blog });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;