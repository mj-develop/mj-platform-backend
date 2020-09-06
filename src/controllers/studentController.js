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
        const data = req.body;

        try { 
            if (await User.findOne({email}))
                return res.status(400).send({ error: 'user.already.registraded'});
            
            const user = await User.create(req.body);

            data.user._id = user._id;
            data.user.username = user.username;

            const student = await Student.create(data);

            return res.send(student);
        } catch(err) {
            return res.status(400).send({error: err});
        }
    },

    async update(req, res) {
        try {
            const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });

            if (req.body.name) {
                Plan.update({'disciplines._id': discipline._id }, {$set: {'disciplines.$.name': req.body.name}}, { multi: true }, (err, data) => {});
            }

            return res.json(student);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Student.findById(req.params.id);
        
        try {
            if (!data) {
                return res.status(404).send({ error: 'student.not.found'});
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

        Plan.update({'students._id': data._id }, {$pull: {'students':{'_id':data._id}}}, {}, (err, data) => {});

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