let express = require('express');
const { body, validationResult } = require('express-validator/check');
let router = express.Router();
const mongoose = require('mongoose');
const equipment = mongoose.model('Equipment');
let open_rentals = [];

router.get('/', function(req, res, next) {
    let clients = [];
    const io = req.app.get('socket-io');
    io.on('connection', socket => {
        clients.push(socket.id);
        if (clients[1] === socket.id) {
            console.log('Duplicate Connection Detected');
            // remove the connection listener for any subsequent
            // connections with the same ID
            io.removeAllListeners('connection');
        }
        console.log(socket.id + ' connected');
        console.log(clients.length + ' total clients');
        if (open_rentals.length !== 0) {
            console.log(`Queue size: ${open_rentals.length}`);
            open_rentals.forEach(rental => {
                io.emit('page-connect', rental.values);
            });
            open_rentals.forEach(rental => {
                io.emit('update-rentals', rental.values);
            })
        }
        socket.on('new-rental', data => {
           open_rentals.push(data);
           console.log(`Queue size: ${open_rentals.length}`);
           // console.log(data.values);
           io.emit('update-rentals', data.values);
        });
        socket.on('disconnect', () => {
            console.log(`${socket.id} disconnected`);
            clients = clients.filter(id => id !== socket.id);
        })
    });
    // rentals.find({}).then(function (err, rentals) {
    //     if (err) throw err;
    //
    //     res.render('rentals', {
    //         title: 'Rentals',
    //         rentals: rentals,
    //     });
    // });
    res.render('rentals', {
                title: 'Rentals',
            });

});

module.exports = router;
