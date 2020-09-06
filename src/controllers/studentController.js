const Student = require('../models/Student');
const Class = require('../models/Class');
const User = require('../models/User');
const Plan = require('../models/Plan');

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
            return res.status(400).send({ error: 'user.not.found'});;
        }
    },

    async create (req, res) {
        const { email } = req.body;

        try { 
            const student = await Student.create(req.body);

            if (await User.findOne({email}))
                return res.status(400).send({ error: 'user.already.registraded'});

            const user = await User.create(req.body);

            return res.send(student);
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async update(req, res) {
        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
            
            if (req.body.name) {
                Class.update({'students._id': student._id }, {$set: {'students.$.name': req.body.name}}, { multi: true }, (err, data) => {});
            }

            return res.json(student);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const student = await Student.findById(req.params.id);
        
        await student.remove();

        Class.update({'students._id': student._id }, {$pull: {'students':{'_id':student._id}}}, {}, (err, data) => {});

        return res.send();
    },

    async register(req, res) {
        try {
            const student = await Student.findById(req.params.id);

            const plan = await Plan.update(
                {"_id": req.body.plan_id}, 
                {$push: 
                    {'students':{'_id':student._id, 'name': student.name}}
                }
            );

            const updt_student = Student.update({'_id': req.params.id}, {$set: {'plan.name': `${plan.education_type} - ${plan.period}`}}, {}, (err, data) => {});

            return res.send(200).send(updt_student);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.to.register'});
        }
    }
}