import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import { prisma } from '../generated/prisma-client';

import passport from 'passport';
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
    try{
        const user = await prisma.user({id: payload.id});
        if(user !== null){
            return done(null, user)
        }else{
            return done(null, false)
        }
    }catch{
        return done(error, false);
    }
};

export const authenticateJwt = (req, res, next) => 
passport.authenticate("jwt", {sessions: false}, (err, user) => {
    if(user){
        req.user = user;
    }
    next();
})(req, res, next);

passport.use(new JwtStrategy(jwtOptions, verifyUser));
passport.initialize();