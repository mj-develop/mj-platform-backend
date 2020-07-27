const Course = require('../models/Course');

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
        } catch (error) {
            return res.status(400).send({ error: 'Course not found'});;
        }
    },

    async create (req, res) {
        const { name, description } = req.body;

        try { 
            const course = await Course.create(req.body);

            return res.send({ course });
        } catch(err) {
            return res.status(400).send({error: 'Registration failed'});
        }
    },

    async update(req, res) {
        try { 
            const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.json(course);
        } catch (error) {
            return res.status(400).send({ error: 'Was not possible to update'});;
        }
    },

    async destroy(req, res) {
        const course = await Course.findById(req.params.id);
        
        await course.remove();

        return res.send();
    }
}