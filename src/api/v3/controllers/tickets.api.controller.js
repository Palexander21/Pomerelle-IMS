const { body, validationResult } = require('express-validator/check');
const mongoose = require('mongoose');
const Tickets = mongoose.model('Tickets');

let controller = {};

controller.get_tickets = async (req, res) => {
    let tickets = await Tickets.find()
        .catch(err => {
            console.error('DB query failed to get all tickets')
            res.status(500).send({
                message: err.error || 'DB query failed to get all tickets'
            })
        })
    if (tickets)
        return res.status(200).send(tickets);
    else
        return res.status(404).send({
            message: "Failed to find tickets"
        })
}

controller.get_ticket_price = async (req, res) => {
    let price = await Tickets.findOne({ticket: req.params.ticket})
        .catch(err => {
            console.error(`DB query failed for ticket: ${req.params.ticket}`)
            res.status(500).send({
                message: err.error || `DB query failed for ticket: ${req.params.ticket}`
            })
        })
    if (price)
        return res.status(200).send(price)
    else
        return res.status(404).send({message: 'Failed to find ticket'})
}

controller.add_ticket = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let ticket = await Tickets.findOne({ticket: req.body.ticket})
        if (ticket) {
            return res.status(409).send({
                msg: 'Ticket already exists',
            });
        }
        else {
            ticket = new Tickets(req.body);
            await ticket.save()
                .catch(err => {
                    return res.status(500).send({
                        msg: err.message || 'Failed to create new ticket'
                    })
                });
            return res.status(201).send({
                msg: `Ticket ${req.body.ticket} successfully created.`
            })
        }
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(400).send({
            msg: 'Failed to validate POST, ensure all fields are filled',
        });
    }
}

controller.update_ticket = async (req, res) => {
    let ticket = await Tickets.updateOne({ticket: req.params.ticket}, req.body)
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find ticket: ${req.params.ticket}`
                })
            }
            return res.status(500).send({
                msg: `Could not update ticket: ${req.params.ticket}`
            })
        });
    if (!ticket) {
        return res.status(404).send({
            msg: `Could not find ticket: ${req.params.ticket}`
        })
    }
    let ret = await Tickets.findOne({ticket:req.params.ticket});
    return res.send({
        msg: 'Tickets successfully updated',
        ticket: ret
    })
}

controller.delete_ticket = async (req, res) => {
    let ticket = await Tickets.deleteOne({ticket: req.params.ticket})
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find ticket: ${req.params.ticket}`
                })
            }
            return res.status(500).send({
                msg: `Could not delete ticket: ${req.params.ticket}`
            })
        });
    if (!ticket) {
        return res.status(404).send({
            msg: `Could not find ticket: ${req.params.ticket}`
        })
    }
    return res.send({msg: 'Ticket successfully deleted'})

}
module.exports = controller;
