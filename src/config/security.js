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
            '/admin/users',
            '/admin/users/create',
            '/admin/users/update',
            '/admin/users/delete',
            '/tables',
            '/users/',
            '/admin/',
            '/admin/users/',
            '/admin/users/create/',
            '/admin/users/update/',
            '/admin/users/delete/',
            '/tables/',
        ],
        permissions: '*',
    }]
}, {
    roles: 'user',
    allows: [
        {
            resources: [
                '/',
                '/rental_shop',
                '/rental_shop/rentals',
                '/rental_shop/returns',
                '/logout',
                '/rental_shop/',
                '/rental_shop/rentals/',
                '/rental_shop/returns/',
                '/logout/',
                '/ticketing/',
                '/ticketing'
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
