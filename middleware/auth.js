import jwt from 'jsonwebtoken'
import tokenValue from '../utils/codeToken.js';

export const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const token_decoded = jwt.verify(token, tokenValue); // Make sure to replace 'your-secret-key' with your actual secret key
        console.log('la valeur du token : ', token_decoded);
        req.auth = { userId: token_decoded._id, email: token_decoded.email };
        console.log(req.auth.userId)
        next();
    } catch (err) {
        console.log('une erreur est survenue avec le token !!', err);
        res.status(400).json({ message: 'erreur au niveau du token', error: err.message });
    }
};