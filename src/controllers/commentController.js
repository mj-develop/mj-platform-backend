const Comment = require('../models/Comments');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const comments = await Comment.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(comments);
    },
 
    async show(req, res) {
        try {   
            const comment = await Comment.findById(req.params.id);
            
            res.json(comment);
        } catch (error) {
            return res.status(400).send({ error: 'comment.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const comment = await Comment.create(data);

            return res.send({ comment });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const comment = await Comment.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(comment);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Comment.findById(req.params.id);
        
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