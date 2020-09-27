const Doubt = require('../models/Doubt');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const doubts = await Doubt.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(doubts);
    },
 
    async show(req, res) {
        try {   
            const doubt = await Doubt.findById(req.params.id);
            
            res.json(doubt);
        } catch (error) {
            return res.status(400).send({ error: 'doubt.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const doubt = await Doubt.create(data);

            return res.send({ doubt });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const doubt = await Doubt.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(doubt);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Doubt.findById(req.params.id);
        
        try {
            if (data.isDeleted) {
                data.isDeleted = false;
                data.deletedAt = null;
            } else {
                data.isDeleted = true;
                data.deletedAt = Date.now();
            }
            
            await data.save();
        } catch (error) {
            return res.status(400).send({ error: error});
        }
    
        return res.status(201).json();
    }
}