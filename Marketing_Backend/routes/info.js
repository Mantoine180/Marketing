const express = require('express');
const infos = express.Router();
const { Infos } = require('../db'); // Importer l'instance Sequelize

infos.put('/', async (req, res) => {
    try {
        const existingInfo = await Infos.findOne();
        if (existingInfo) {
            existingInfo.annonce = req.body.annonce;
            await existingInfo.save();
            return res.status(200).json({ message: 'Updated successfully!' });
        } else {
            return res.status(404).json({ message: 'Not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

infos.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const newInfo = await Infos.create({
            annonce: req.body.annonce
        });
        
        return res.status(201).json(newInfo);
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;