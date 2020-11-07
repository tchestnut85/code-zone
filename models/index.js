const User = require('./User');
const Blog = require('./Blog');

module.exports = { User, Blog };

// Model Associations
User.hasMany(Blog, {
    foreignKey: 'creator_id'
});

Blog.belongsTo(User, {
    foreignKey: 'creator_id'
});

module.exports = { User, Blog };