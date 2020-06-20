const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async register(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({email}))
                return res.status(400).send({ error: 'User already registraded'});

            const user = await User.create(req.body);
            
            user.password = undefined;

            const token = generateToken({ id: user.id });

            return res.send({ user, token });
        } catch(err) {
            return res.status(400).send({error: 'Resgistration failed' });
        }
    },

    async login(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) 
            return res.status(400).send({ error: 'User not found'});

        if (!await bcrypt.compare(password, user.password))
            return res.status(400).send({ error: 'Invalid password'});
        
        user.password = undefined;

        const token =  generateToken({ id: user.id });

        res.send( { user, token } ); 
    },
}

function generateToken(params = {}) {
    return jwt.sign({ params }, process.env.SECRET, {
        expiresIn: 86400,
    });
}
