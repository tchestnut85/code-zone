const router = require('express').Router();
const { User, Blog, Comment } = require('../models');
const userAuth = require('../utils/auth');

router.get('/', userAuth, (req, res) => {
    console.log(req.session);

    Blog.findAll({
        where: {
            creator_id: req.session.user_id
        },
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['content', 'user_id'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
        .then(blogData => {
            const blogs = blogData.map(blog => blog.get({ plain: true }));
            res.render('dashboard', { blogs, loggedIn: true });
        }).
        catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Edit a blog post
router.get('/edit/:id', userAuth, (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'creator_id',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['content', 'user_id', 'blog_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }).
        then(blogData => {
            if (blogData) {
                const blog = blogData.get({ plain: true });

                res.render('edit-blog', {
                    blog,
                    loggedIn: req.session.loggedIn
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;