import middy from '@middy/core'
import httpJsonBodyParser from '@middy/http-json-body-parser'


export default class UserHandler {
  static getAllUsers(){
    console.log('I hear a get all users');
  }
  static create(user){
    console.log('I hear a create user');
    const handler = middy((ev, context) => {
      console.log('ev', ev)
    });
    handler.use(httpJsonBodyParser());
    const event = {
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    handler(event, undefined, ()=>{
      console.log('usando el handler')
    });
  }
}

