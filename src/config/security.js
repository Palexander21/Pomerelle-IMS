'use strict';
let node_acl = require('acl'),
    mongoose = require('mongoose'),
    acl;

let backend = new node_acl.mongodbBackend(mongoose.connection.db, 'acl_');
acl = new node_acl(backend);
acl.allow([{
    roles: 'admin',
    allows: [{
        resources: [
            '/',
            '/users',
            '/admin',
            '/tables',
        ],
        permissions: '*',
    }]
}, {
    roles: 'user',
    allows: [
        {
            resources: [
                '/',
                '/rentals',
                '/rentals/returns',
                '/logout',
            ],
            permissions: '*'
        },
        {
            resources: [
                '/tables',
            ],
            permissions: ['get']
        }
    ]
}
]).catch(err => {
    console.log(`ACL error ${err}`);
});

acl.addRoleParents('user', 'guest').catch(err => console.error(err));
acl.addRoleParents('admin', 'user').catch(err => console.error(err));

module.exports = acl;
