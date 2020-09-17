const Comments = require('../models/Comments');
const Post = require('../models/Post');
const utils = require('../util/utils');

module.exports = {

    async index(req, res) {
        const { page, limit } = req.query;

        const posts = await Post.paginate({}, { page: page, limit: parseInt(limit) });
        
        return res.json(posts);
    },
 
    async show(req, res) {
        try {   
            const post = await Post.findById(req.params.id);
            
            res.json(post);
        } catch (error) {
            return res.status(400).send({ error: 'post.not.found'});;
        }
    },

    async create (req, res) {
        try {
            let data = req.body;
                
            const post = await Post.create(data);

            return res.send({ post });
        } catch(err) {
            return res.status(400).send({error: utils.errors(err)});
        }
    },

    async update(req, res) {
        try {

            let data = req.body;

            const post = await Post.findByIdAndUpdate(req.params.id, data, { new: true });

            return res.json(post);
        } catch (error) {
            return res.status(400).send({ error: 'was.not.possible.update'});
        }
    },

    async destroy(req, res) {
        const data = await Post.findById(req.params.id);
        
        try {
            if (!data) {
                return res.status(404).send({ error: 'post.not.found'});
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

    async getComments(req, res) {
        try {
            let data = await Comments.find({'post_id': req.params.id, 'isDeleted': false});

            if (!data) {
                return res.status(404).send({ error: 'comments.not.exists'});
            }
            
            return res.status(200).json(data);
        } catch (error) {
            return res.status(400).send({ error: error});
        }
    }
}