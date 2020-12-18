const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const userAuth = require('../../utils/auth');

// GET all blog posts
router.get('/', (req, res) => {
    console.log('req.session from blog-routes line 6:', req.session);
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'creator_id',
            'content',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'content', 'user_id', 'blog_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ],
        order: [['created_at', 'DESC']]
    })
        .then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// GET - single blog post by ID
router.get('/:id', (req, res) => {
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
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['content', 'user_id', 'blog_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({ message: "We couldn't find that blog post!" });
            }
            res.json(blogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST - create a blog post
router.post('/', userAuth, (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        creator_id: req.session.user_id
    })
        .then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT - update a blog post
router.put('/:id', userAuth, (req, res) => {
    Blog.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({ message: "We couldn't find that blog post!" });
                return;
            }
            res.json(blogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE - delete a blog post
router.delete('/:id', userAuth, (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(blogData => {
            if (!blogData) {
                res.status(404).json({ message: "We couldn't find that blog post!" });
                return;
            }
            res.json(blogData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;