import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import jwt from 'jsonwebtoken';
import emailService from '../services/email.service';
require('dotenv').config();

require('dotenv').config();
export default class UserHandler {
  static getAllUsers(){
    console.log('I hear a get all users');
  }
  static create(user){
    const handler = middy((ev, context) => {
      console.log(`send confirmation email to ${ev.body.email}`);
      console.log(`confirmation jwt: ${ev.jwt}`);
      const transporter = emailService.transporter();
      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: ev.body.email,
        subject: 'Jwt to activate your user',
        text : 'test message form mailgun',
        html : `<b>${ev.jwt}</b>`
      };
      transporter.sendMail(mailOptions, function (err, response) {
        if (err) {
          console.log(err);
        } else {
          console.log('send email success!');
        }
    });
    });
    handler.use(httpJsonBodyParser());
    const event = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
      jwt: jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
    }
    handler(event, undefined, ()=>{
      return 0;
    });
  }
}

