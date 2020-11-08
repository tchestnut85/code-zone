const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);

    Blog.findAll({
        where: {
            creator_id: req.session.user_id
        },
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
            console.log('blogs:', blogs);
            res.render('dashboard', { blogs, loggedIn: req.session.loggedIn });
        }).
        catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;