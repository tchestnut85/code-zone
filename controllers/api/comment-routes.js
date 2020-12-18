const router = require('express').Router();
const { Comment } = require('../../models');
const userAuth = require('../../utils/auth');

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll({
        attributes: [
            'id',
            'content',
            'user_id',
            'blog_id'
        ],
        order: [['created_at', 'DESC']]
    })
        .then(commentData => res.json(commentData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

// POST - create a comment ** OLD CODE
router.post('/', userAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            content: req.body.content,
            blog_id: req.body.blog_id,
            user_id: req.session.user_id
        })
            .then(commentData => res.json(commentData))
            .catch(err => {
                res.status(400).json(err);
            });
    }
});

// PUT - update a comment
router.put('/:id', userAuth, (req, res) => {
    Comment.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(commentData => {
            if (!commentData[0]) {
                res.status(404).json({ message: "We couldn't find that comment!" });
                return;
            }
            res.json(commentData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

// DELETE a comment
router.delete('/:id', userAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(commentData => {
        if (!commentData) {
            res.status(404).json({ message: "We couldn't find that comment!" });
            return;
        }
        res.json(commentData);
    })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;