const Teacher = require('../models/Teacher');
const User = require('../models/User');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const teachers = await Teacher.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(teachers);
    },

    async show(req, res) {
        try {   
            const teacher = await Teacher.findById(req.params.id);
            
            res.json(teacher);
        } catch (error) {
            return res.status(404).send({ error: 'user.not.found'});;
        }
    },

    async create (req, res) {
        const { email } = req.body;

        try {
            const teacher = await Teacher.create(req.body);

            if (await User.findOne({email}))
                return res.status(400).send({ error: 'user.already.registraded'});

            const user = await User.create(req.body);

            return res.send({ teacher });
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async update(req, res) {
        try { 
            const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.json(teacher);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});;
        }
    },

    async destroy(req, res) {
        const data = await Teacher.findById(req.params.id);
        
        try {
            if (!data) {
                return res.status(404).send({ error: 'teacher.not.found'});
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

        return res.send();
    }
}