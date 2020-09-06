const Plan = require('../models/Plan');
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
            const plan = await Plan.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.json(plan);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const plan = await Plan.findById(req.params.id);
        
        await plan.remove();

        return res.send();
    },
}