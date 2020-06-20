const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    async register(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({email}))
                return res.status(400).send({ error: 'User already registraded'});

            const user = await User.create(req.body);
            
            user.password = undefined;

            return res.send({ user });
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
        
        res.send( { user } ); 
    }
}
