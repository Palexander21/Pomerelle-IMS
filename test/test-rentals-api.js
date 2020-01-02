let expect = require('chai').expect,
    request = require('request')
;

request = request.defaults({jar: true});
let user = {
    username: 'user',
    password: 'test',
};

let rental = {
    firstName: 'Customer',
    lastName: 'Guy1',
    address: '123 Test Lane',
    phone: '(555)-555-5555',
    city: 'Testingtown',
    state: 'UT',
    zipcode: 84321,
    license: '123456789',
    rentalDate: '2020-01-01',
    skierType: '3',
    weight: 200,
    heightFt: 6,
    heightIn: 2,
    age: 25,
    bootSize: 12,
    gender: 'M',
    skiSchool: 'No',
    bootNumber: '456123',
    skiNumber: '123456',
    poleNumber: '456789',
    rt: 123,
    lt: 123,
    rth: 12,
    lth: 12,
    inputNote: 'Test Note',
    techSignature: 'PA'
};

describe('Test Valid Data', function () {
    before(function (done) {
        let config = {
            url: 'http://localhost/api/v3/users/login',
            form: user,
        };
        request.post(config, function (err, res) {
            if (err)
                console.log(err);
            done();
        })
    });
    describe('POST /api/v3/rentals', function () {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/rentals',
                form: rental,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    describe('POST /api/v3/rentals/completed', function () {
        it('Returns 200', function (done) {
            let config = {
                url: 'http://localhost/api/v3/rentals/completed',
                form: rental,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(200);
                done();
            })
        })
    });
    describe('POST /api/v3/rentals/returns', function () {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/rentals/returns',
                form: rental,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    // describe('Unauthorized GET /api/v3/rentals', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    // describe('Unauthorized GET /api/v3/rentals/open', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals/open',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    // describe('Unauthorized GET /api/v3/rentals/open/count', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals/open/count',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    // describe('Unauthorized GET /api/v3/rentals/:id', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals/123456',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    // describe('Unauthorized GET /api/v3/rentals/returns', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals/returns',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
    // describe('Unauthorized GET /api/v3/rentals/returns/count', function () {
    //     it('Returns 401', function (done) {
    //         let config = {
    //             url: 'http://localhost/api/v3/rentals/returns/count',
    //             form: rental,
    //         };
    //         request.get(config, function (err, res) {
    //             expect(res.statusCode).to.equal(401);
    //             done();
    //         })
    //     })
    // });
});
