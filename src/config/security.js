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
            '/admin'
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
                '/api/v3/rentals',
                '/api/v3/equipment',
            ],
            permissions: '*'
        },
        {
            resources: '/api/v3/users',
            permissions: ['get']
        }
    ]
}, {
    roles: 'guest',
    allows: [
        {
            resources: ['login',],
            permissions: ['get', 'post']
        }
    ]
}
]).catch(err => {
    console.log(`ACL error ${err}`);
});

acl.addRoleParents('user', 'guest').catch(err => console.error(err));
acl.addRoleParents('admin', 'user').catch(err => console.error(err));

module.exports = acl;
