const Plan = require('../models/Plan');
const Student = require('../models/Student');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const plans = await Plan.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(plans);
    },
 
    async show(req, res) {
        try {   
            const plan = await Plan.findById(req.params.id);
            
            res.json(plan);
        } catch (error) {
            return res.status(400).send({ error: 'plan.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;

            if (data.access_time.duration == '12') {
                data.period = "anual";
            } else if (data.access_time.duration == '6') {
                data.period = "semestral";
            } else {
                data.period = "trimestral";
            }
                
            const plan = await Plan.create(data);

            return res.send({ plan });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            if (data.access_time.duration == '12') {
                data.period = "anual";
            } else if (data.access_time.duration == '6') {
                data.period = "semestral";
            } else {
                data.period = "trimestral";
            }

            const plan = await Plan.findByIdAndUpdate(req.params.id, data, { new: true });

            if (req.body.education_type || req.body.access_time.duration) {
                Student.update({'plan._id': plan._id }, {$set: {'plan.name': `${plan.education_type} - ${plan.period}`}}, { multi: true }, (err, data) => {});
            }

            return res.json(plan);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Plan.findById(req.params.id);

        if (data.students) {
            return res.status(405).json({error: 'not.delete.plan.with.students'});
        }
        
        try {
            if (!data) {
                return res.status(404).send({ error: 'plan.not.found'});
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
    },

    async managerDisciplines(req, res) {
        const { action } = req.query;

        const disciplines = req.body.disciplines;

        try {
            if (action.toLowerCase() == 'add') {
                Object.keys(disciplines).map(async (index) => {
                    await Plan.update(
                        {'_id':req.params.id}, 
                        {$push: {'disciplines':{'_id':disciplines[index]._id, 'name': disciplines[index].name}}}
                    )
                })
            } else {
                Object.keys(disciplines).map(async (index) => {
                    Plan.update(
                        {'_id':req.params.id, 'disciplines._id': disciplines[index]._id }, 
                        {$pull: {'disciplines':{'_id':disciplines[index]._id}}}, 
                        {}, 
                        (err, data) => {}
                    )
                })
            }

            const plan = await Plan.findById(req.params.id);
            return res.json(plan);
        } catch (error) {
            return res.status(400).send({ error: error});
        }
    }
}