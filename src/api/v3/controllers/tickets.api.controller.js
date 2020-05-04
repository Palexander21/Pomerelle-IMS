const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const tickets = mongoose.model('Tickets');

let controller = {};

controller.get_ticket_price = async (req, res) => {
    console.log(req.params)
    let price = await tickets.findOne({ticket: req.params.ticket})
        .catch(err => {
            console.error(`DB query failed for ticket: ${req.params.ticket}`)
            res.status(500).send({
                message: err.error || `DB query failed for ticket: ${req.params.ticket}`
            })
        })
    console.log(price)
    if (price)
        return res.status(200).send(price)
    else
        return res.status(404).send({message: 'Failed to find ticket'})
}


module.exports = controller;
