const Module = require('../models/Module');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const modules = await Module.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(modules);
    },
 
    async show(req, res) {
        try {   
            const module = await Module.findById(req.params.id);
            
            res.json(module);
        } catch (error) {
            return res.status(400).send({ error: 'module.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const module = await Module.create(data);

            return res.send({ module });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const module = await Module.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(module);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Module.findById(req.params.id);
        
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