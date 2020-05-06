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
            '/users/',
            '/admin/',
            '/admin/users/',
            '/admin/users/create/',
            '/admin/users/update/',
            '/admin/users/delete/',
            '/admin/configure',
            '/admin/configure/',
            '/admin/configure/kitchen',
            '/admin/configure/kitchen/',
            '/admin/configure/tickets',
            '/admin/configure/tickets/',
            '/admin/inventory',
            '/admin/inventory/',
            '/admin/inventory/kitchen',
            '/admin/inventory/kitchen/',
            '/admin/inventory/tickets',
            '/admin/inventory/tickets/',
            '/admin/inventory/equipment',
            '/admin/inventory/equipment/',
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
                '/ticketing',
                '/kitchen',
                'kitchen/',
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
