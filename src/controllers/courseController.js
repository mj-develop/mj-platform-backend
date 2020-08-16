const Course = require('../models/Course');
const Class = require('../models/Class');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const courses = await Course.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(courses);
    },

    async show(req, res) {
        try {   
            const courses = await Course.findById(req.params.id);
            
            res.json(courses);
        } catch (err) {
            return res.status(404).send({ error: 'course.not.found'});;
        }
    },

    async create (req, res) {
        try { 
            const course = await Course.create(req.body);

            return res.send({ course });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try { 
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (req.body.name) {
                let conditions = {'course._id': data._id};
                let update = {
                    $set : {
                        'course.name' : req.body.name
                    }
                };
                let options = { multi: true };

                Class.update(conditions, update, options, (err, numUpdated) => {});
            }

            return res.json(course);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});;
        }
    },

    async destroy(req, res) {
        const course = await Course.findById(req.params.id);

        const classe = await Class.find({'course._id': data._id}).select('_id');
        
        if (classe.length > 0) {
            return res.status(405).json({error: 'not.delete.course.with.classes'});
        }
        
        await course.remove();

        return res.send();
    }
}