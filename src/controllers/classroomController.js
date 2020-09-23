const Classroom = require('../models/Classroom');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const classrooms = await Classroom.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(classrooms);
    },
 
    async show(req, res) {
        try {   
            const classroom = await Classroom.findById(req.params.id);
            
            res.json(classroom);
        } catch (error) {
            return res.status(400).send({ error: 'classroom.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const classroom = await Classroom.create(data);

            return res.send({ classroom });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const classroom = await Classroom.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(classroom);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Classroom.findById(req.params.id);
        
        try {
            if (!data) {
                return res.status(404).send({ error: 'classroom.not.found'});
            }

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