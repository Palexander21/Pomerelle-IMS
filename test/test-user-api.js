let expect = require('chai').expect,
    request = require('request'),
    mongoose = require('mongoose')
    // Users = mongoose.model('Users');
    ;
let token;
let unauth_user = {
    username: 'notauser',
    password: 'test',
    confirmPassword: 'test',
    role: 'user',
    firstName: 'test',
    lastName: 'tester',
    position: 'tester',
    startDate: '2019-12-21',
};
let new_user = {
    username: 'user',
    password: 'test',
    confirmPassword: 'test',
    role: 'user',
    firstName: 'test',
    lastName: 'tester',
    position: 'tester',
    startDate: '2019-12-21',
};
let admin = {
    username: 'test',
    password: 'asdfjkl;',
    confirmPassword: 'test',
    role: 'admin',
    firstName: 'test',
    lastName: 'tester',
    position: 'tester',
    startDate: '2019-12-21',
};

describe('POST Functionality', function () {
    describe('Unauthorized POST /api/v3/users/login', function () {
        it('Returns 404', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/login',
                form: unauth_user,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });
    describe('Unauthorized POST /api/v3/users/create', function () {
        it('Returns 401', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/create',
                form: new_user,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            })
        })
    });
    describe('Authorized POST /api/v3/users/login', function () {
        it('Returns Success', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/login',
                form: admin,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                let json = JSON.parse(res.body);
                token = `Bearer ${json.token}`;
                done();
            })
        })
    });
    describe('Duplicate Username', function () {
        it('Returns 409', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/create',
                form: new_user,
                headers: {
                    authorization: token
                }
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(409);
                done();
            })
        })
    });
    // describe('User cannot DELETE /api/v3/users/', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: `http://localhost/api/v3/users/${new_user.username}`,
    //             headers: {
    //                 authorization: token
    //             }
    //         };
    //         request.delete(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    describe('Admin can DELETE Existing User', function () {
        it('Returns 200', function (done) {
            let config = {
                url: `http://localhost/api/v3/users/${new_user.username}`,
                form: new_user,
                headers: {
                    authorization: token
                }
            };
            request.delete(config, function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        })
    });
    describe('Authorized DELETE Non-Existing User', function () {
        it('Returns 404', function (done) {
            let config = {
                url: `http://localhost/api/v3/users/${new_user.username}`,
                form: new_user,
                headers: {
                    authorization: token
                }
            };
            request.delete(config, function (err, res) {
                expect(res.statusCode).to.equal(404);
                done();
            })
        })
    });

    describe('Authorized POST /api/v3/users/create', function () {
        it('Returns Success', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/create',
                form: new_user,
                headers: {
                    authorization: token
                }
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    // describe(`Authorized PUT /api/v3/users/${new_user.username}`, function () {
    //     it('Returns Success', function (done) {
    //         let config = {
    //             url: `http://localhost/api/v3/users/${new_user.username}`,
    //             form: new_user,
    //             headers: {
    //                 authorization: token
    //             }
    //         };
    //         request.post(config, function (err, res) {
    //             expect(res.statusCode).to.equal(201);
    //             done();
    //         })
    //     })
    // });
});

describe('GET Functionality', function () {
    describe('Unauthorized GET /api/v3/users', function () {
        it('Returns 401', function (done) {
            request('http://localhost/api/v3/users', function (err, res, body) {
                expect(res.statusCode).to.equal(401);
                done();
            })
        });
    });
    describe('Unauthorized GET /api/v3/users/create', function () {
        it('Returns 401', function (done) {
            request('http://localhost/api/v3/users/create', function (err, res, body) {
                expect(res.statusCode).to.equal(401);
                done();
            })
        });
    });
    describe('Authorized GET /api/v3/users/logout', function () {
        it('Returns 200', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/logout',
                headers: {
                    authorization: token
                }
            };
            request.get(config, function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        });
    });
    describe('Authorized GET /api/v3/users/', function () {
        it('Returns 200', function (done) {
            let config = {
                url: 'http://localhost/api/v3/users/',
                headers: {
                    authorization: token
                }
            };
            request.get(config, function (err, res) {
                expect(res.statusCode).to.equal(200);
                expect(JSON.parse(res.body).length).to.equal(2);
                done();
            })
        });
    });
});
