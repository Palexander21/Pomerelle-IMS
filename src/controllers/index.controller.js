let controller = {};

controller.getDashboard = async (req, res, next) => {
    return res.render('index', {
        title: 'Home',
        user: req.session.user,
        admin: req.session.role === 'admin',
    })
};


module.exports = controller;
