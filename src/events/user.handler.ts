import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'
import jwt from 'jsonwebtoken';
require('dotenv').config();
export default class UserHandler {
  static getAllUsers(){
    console.log('I hear a get all users');
  }
  static create(user){
    console.log('I hear a create user');
    const handler = middy((ev, context) => {
      //TODO implement nodemailer to send email
      console.log('ev', ev);
      console.log(`send confirmation email to ${ev.body.email}`);
      console.log(`confirmation jwt: ${ev.jwt}`);
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

