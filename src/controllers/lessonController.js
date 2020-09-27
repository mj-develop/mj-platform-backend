const Lesson = require('../models/Lesson');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const lessons = await Lesson.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(lessons);
    },
 
    async show(req, res) {
        try {   
            const lesson = await Lesson.findById(req.params.id);
            
            res.json(lesson);
        } catch (error) {
            return res.status(400).send({ error: 'lesson.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const lesson = await Lesson.create(data);

            return res.send({ lesson });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const lesson = await Lesson.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(lesson);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Lesson.findById(req.params.id);
        
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