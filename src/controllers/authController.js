const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../modules/mailer');

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

    async forgot_password(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            
            if (!user)
                return res.status(400).send({ error: 'User nor found' });

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);
    
            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: email,
                from: 'thiago.oliveira@tap4mobile.com.br',
                template: 'auth/forgot_password',
                context:{ token }
            }, (err) => {
                if (err)
                    return res.status(400).send({ error: 'Cannot send forgot password email' });
    
                return res.send();
            });
        } catch (err) {
            res.status(400).send({ error: 'Error on forgot password, try again' });
        }
    },

    async reset_password(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');
        
            if (!user)
                return res.status(400).send({ error: 'User not found'});

            if (token !== user.passwordResetToken)
                return res.status(400).send({ error: 'Token invalid' });

            const now = new Date();

            if (now > user.passwordResetExpires)
                return res.status(400).send({ error: 'Token expired, get a new one' });
            
            user.password = password;

            res.send();

        } catch (error) {
            res.status(400).send({ error: 'Cannot reset password, try again' });
        }
    }
}

function generateToken(params = {}) {
    return jwt.sign({ params }, process.env.SECRET, {
        expiresIn: 86400,
    });
}
