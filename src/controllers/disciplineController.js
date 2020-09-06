const Discipline = require('../models/Discipline');
const Plan = require('../models/Plan');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const disciplines = await Discipline.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(disciplines);
    },
 
    async show(req, res) {
        try {   
            const discipline = await Discipline.findById(req.params.id);
            
            res.json(discipline);
        } catch (error) {
            return res.status(404).send({ error: 'discipline.not.found'});;
        }
    },

    async create (req, res) {
        const { name, description } = req.body;

        try { 
            const discipline = await Discipline.create(req.body);

            return res.send({ discipline });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try { 
            const discipline = await Discipline.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (req.body.name) {
                Plan.update({'disciplines._id': discipline._id }, {$set: {'disciplines.$.name': req.body.name}}, { multi: true }, (err, data) => {});
            }

            return res.json(discipline);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.to.update'});;
        }
    },

    async destroy(req, res) {
        try {
            const data = await Discipline.findOne({'_id': req.params.id});

            if (!data) {
                return res.status(404).send({ error: 'discipline.not.found'});
            }

            if (data.isDeleted) {
                data.isDeleted = false;
                data.deletedAt = null;
            } else {
                data.isDeleted = true;
                data.deletedAt = Date.now();
            }
            
            await data.save();

            Plan.update({'disciplines._id': data._id }, {$pull: {'disciplines':{'_id':data._id}}}, {}, (err, data) => {});           
        } catch (error) {
            return res.status(400).send({ error: error});
        }
    
        return res.status(201).json();
    }
}