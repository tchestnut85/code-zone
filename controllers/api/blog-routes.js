const router = require('express').Router();
const { Blog, User } = require('../../models');

// GET all blog posts
router.get('/', (req, res) => {
    Blog.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: {
            model: User,
            attribute: ['username']
        },
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
            'content',
            'createdAt',
        ],
        include: [
            {
                model: 'User',
                attributes: ['username']
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
router.post('/', (req, res) => {
    Blog.create({
        title: req.body.title,
        content: req.body.content,
        creator_id: req.body.id
    })
        .then(blogData => res.json(blogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;