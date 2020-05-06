const { body, validationResult } = require('express-validator/check'),
    mongoose = require('mongoose'),
    Equipment = mongoose.model('Equipment');

let controller = {};

controller.get_all = async (req, res, next) => {
    let equip = await Equipment.find()
        .catch(err => {
            console.error(`Failed to get Equipment: ${err.message}`);
            return res.status(404).send({
                message: err.message || "Failed to get Equipment."
            });
        });
    if (equip){
        return res.send(equip);
    }
    else
        return res.status(404).send('Failed to get Equipment.')
};

controller.get_equipment = async (req, res, next) => {
    let equip = await Equipment.findOne({number: req.params.number})
        .catch(err => {
            console.error(`Failed to get Equipment: ${err.message}`);
            return res.status(404).send({
                message: err.message || "Failed to get Equipment."
            });
        });
    if (equip){
        return res.send(equip);
    }
    else
        return res.status(404).send('Failed to get Equipment.')
};

controller.add_equipment = async (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        let equip = await Equipment.findOne({number: req.body.number});
        if (equip) {
            return res.status(409).send({
                msg: 'Equipment already exists',
            });
        }
        else {
            equip = new Equipment(req.body);
            await equip.save()
                .catch(err => {
                    return res.status(500).send({
                        msg: err.message || 'Failed to create new Equipment'
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
    let equip = await Equipment.updateOne({number: req.params.number}, req.body)
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find Equipment: ${req.params.number}`
                })
            }
            return res.status(500).send({
                msg: `Could not update Equipment: ${req.params.number}`
            })
        });
    if (!equip) {
        return res.status(404).send({
            msg: `Could not find Equipment: ${req.params.number}`
        })
    }
    let equipment = await Equipment.findOne({number:req.params.number});
    return res.send({
        msg: 'Equipment successfully updated',
        equipment
    })
};

controller.delete_equipment = async (req, res, next) => {
    let equip = await Equipment.deleteOne({number: req.params.number})
        .catch(err => {
            if (err.name === 'NotFound') {
                return res.status(404).send({
                    msg: `Could not find Equipment: ${req.params.number}`
                })
            }
            return res.status(500).send({
                msg: `Could not delete Equipment: ${req.params.number}`
            })
        });
    if (!equip) {
        return res.status(404).send({
            msg: `Could not find Equipment: ${req.params.number}`
        })
    }
    return res.send({msg: 'Equipment successfully deleted'})
};

module.exports = controller;

