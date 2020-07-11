import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

import jwt from 'jsonwebtoken';

import { adjectives, nouns } from "./words";
import { isContext } from 'vm';
import { modifyObjectFields } from 'graphql-tools';
const nodemailer = require('nodemailer');
//const mgTransport = require('nodemailer-mailgun-transport');

export const generateSecret = () => {
    const adjRand = Math.floor(Math.random() * adjectives.length);
    const nounRand = Math.floor(Math.random() * nouns.length);
    return `${adjectives[adjRand]} ${nouns[nounRand]}`;
}


export const sendMail = (message) => {
    const transferEmailDetails = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    return transferEmailDetails.sendMail(message, (err, info) => {
        if(err) console.log(err);
    });

 /*    const auth = {
        auth: {
            api_key: process.env.MAILGUN_APIKEY,
            domain: process.env.MAILGUN_DOMAIN
        },
    };
    console.log(auth);
    const nodemailerMg = nodemailer.createTransport(mgTransport(auth));
    nodemailerMg.sendMail({
        from: 'mj.kim1102@khu.ac.kr',
        to: 'mj.kim1102@khu.ac.kr', // An array if you have multiple recipients.
        subject: 'Hey you, awesome!',
        //You can use "html:" to send HTML email content. It's magic!
        html: '<b>Wow Big powerful letters</b>',
        //You can use "text:" to send plain-text content. It's oldschool!
        text: 'Mailgun rocks, pow pow!'
    }, (err, info) => {
        if(err){
            console.log(err);
        }
    })
    console.log(message);
    return nodemailerMg.sendMail(message);*/
}

export const sendSecretMail = (email, secret) => {
    const message = {
        from: "merrill-jade@pengstagram.com",
        to: email,
        subject: "Login Secret for Pengstagram",
        html: `Hello! Your login secret is <b>${secret}</b>.<br/>Copy-and-paste on the app/web to log in.`
    };
    return sendMail(message);
}

export const generateToken = (id) => jwt.sign({id}, process.env.JWT_SECRET);