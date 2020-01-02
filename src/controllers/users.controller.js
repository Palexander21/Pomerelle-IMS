let controller = {};

controller.login = async (req, res) => {
    return res.render('login', { title: 'Login' })
};

controller.create = async (req, res) => {
    return res.render('register', {
        title: 'Create User',
        user: req.session.user,
        admin: req.session.role === 'admin',
    })
};

module.exports = controller;