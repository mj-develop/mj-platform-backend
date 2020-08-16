const Classe = require('../models/Class');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const classes = await Classe.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(classes);
    },
 
    async show(req, res) {
        try {   
            const clasx = await Classe.findById(req.params.id);
            
            res.json(clasx);
        } catch (error) {
            return res.status(400).send({ error: 'class.not.found'});;
        }
    },

    async create (req, res) {
        try { 
            const clasx = await Classe.create(req.body);

            return res.send({ clasx });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try { 
            const clasx = await Classe.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.json(clasx);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});;
        }
    },

    async destroy(req, res) {
        const clasx = await Classe.findById(req.params.id);
        
        await clasx.remove();

        return res.send();
    }
}