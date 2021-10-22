import events from 'events';
import userEventConstants from './user.events.contants';
import userHandler from './user.handler';

const userEmitter = new events.EventEmitter();

userEmitter.on(userEventConstants.GET_ALL, userHandler.getAllUsers);

userEmitter.on(userEventConstants.CREATE, (user) =>{userHandler.create(user)});

export default userEmitter;