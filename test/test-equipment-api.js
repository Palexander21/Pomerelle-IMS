let expect = require('chai').expect,
    request = require('request')
;

request = request.defaults({jar: true});
let user = {
    username: 'user',
    password: 'test',
};

let skis = {
    type: 'skis',
    number: '123456',
    size: 155,
    last_tune: "2020-01-01",
    last_used: '2020-01-01',
};
let snowboard = {
    type: 'snowboard',
    number: '987654',
    size: 155,
    last_tune: "2020-01-01",
    last_used: '2020-01-01',
};
let boots = {
    type: 'boots',
    number: '456123',
    size: 12,
};
let poles = {
    type: 'poles',
    number: '456789',
    size: 120,
};


describe('Add Equipment to DB', function () {
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
    describe('Add Skis', function (done) {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/equipment',
                form: skis,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    describe('Add Boots', function (done) {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/equipment',
                form: boots,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    describe('Add Snowboard', function (done) {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/equipment',
                form: snowboard,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    });
    describe('Add Poles', function (done) {
        it('Returns 201', function (done) {
            let config = {
                url: 'http://localhost/api/v3/equipment',
                form: poles,
            };
            request.post(config, function (err, res) {
                expect(res.statusCode).to.equal(201);
                done();
            })
        })
    })
});
