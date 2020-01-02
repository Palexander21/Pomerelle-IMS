const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    equipment = mongoose.model('Equipment');

let controller = {};

controller.get_equipment = async (req, res, next) => {
    let equip = await equipment.find()
        .catch(err => {
            console.error(`Failed to get equipment: ${err.message}`);
            return res.status(404).send({
                message: err.message || "Failed to get equipment."
            });
        });
    if (equip){
        return res.send(equip);
    }
    else
        return res.status(404).send('Failed to get equipment.')
};

controller.add_equipment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let equip = await equipment.findOne({number: req.body.number});
        if (equip) {
            return res.status(409).send({
                msg: 'Equipment already exists',
            });
        }
        else {
            equip = new equipment(req.body);
            await equip.save()
                .catch(err => {
                    return res.status(500).send({
                        msg: err.message || 'Failed to create new equipment'
                    })
                });
            return res.status(201).send({
                msg: `Equipment successfully added.`
            })
        }
    } else {
        console.error('Failed to validate POST request: ' + errors.array());
        return res.status(400).send({
            msg: 'Failed to validate POST, ensure all fields are filled',
        });
    }
};

controller.update_equipment = async (req, res, next) => {

};

controller.delete_equipment = async (req, res, next) => {

};

module.exports = controller;

