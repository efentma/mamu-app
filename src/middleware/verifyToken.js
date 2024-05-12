import jwt, { decode } from "jsonwebtoken";

export const authToken = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization){
        return res.status(401).json({error: 'Need token!'})
    } 
    const token =  authorization && authorization.split(' ') [1];
    if (token == null) {
        return res.status(401).json({error: 'Unauthorized'})
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (error, decode) => {
        if (error){
            return res.status(403);
        }
        req.email = decode.email;
        next();
    })
}