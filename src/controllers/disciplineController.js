const Discipline = require('../models/Discipline');
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

            return res.json(discipline);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.to.update'});;
        }
    },

    async destroy(req, res) {
        const discipline = await Discipline.findById(req.params.id);
        
        await discipline.remove();

        return res.send();
    }
}