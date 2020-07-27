const Student = require('../models/Student');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const students = await Student.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(students);
    },

    async show(req, res) {
        try {   
            const student = await Student.findById(req.params.id);
            
            res.json(student);
        } catch (error) {
            return res.status(400).send({ error: 'User not found'});;
        }
    },

    async create (req, res) {
        const { name, email, registration } = req.body;

        try { 
            if (await Student.findOne({email}))
                return res.status(400).send({ error: 'Student already registration with the email filled'});

            const student = await Student.create(req.body);

            return res.send({ student });
        } catch(err) {
            return res.status(400).send({error: 'Registration failed'});
        }
    },

    async update(req, res) {
        try { 
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.json(student);
        } catch (error) {
            return res.status(400).send({ error: 'Was not possible to update'});;
        }
    },

    async destroy(req, res) {
        const student = await Student.findById(req.params.id);
        
        await student.remove();

        return res.send();
    }
}