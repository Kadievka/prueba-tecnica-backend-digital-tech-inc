import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import userEmitter from '../events/user.emitter';
import userEventConstants from '../events/user.events.contants';
import Joi from '@hapi/joi';
import validateSchema from './validateSchema';
import User, { ADMIN_ROLE, SUBSIDIARY_USER_ROLE } from '../models/User';
import jwt from 'jsonwebtoken';
import throwError from '../utils/throwError';

const JoiPhone = Joi.extend(require('joi-phone-number'));

export default class UserService {

  static activateUser(email: string, password: string){
    const filter = { email };
    const update = {
      active: true,
      password
    };
    const options = { new: true };
    return User.findOneAndUpdate(filter, update, options);
  }

  static async createUser(user: CreateUserDto): Promise<typeof User> {
    this.validateNumberPhone(user.phone);
    this.validateDateFormat(user.birthdate);
    user.role = this.validateRole(user.role);
    userEmitter.emit(userEventConstants.CREATE, user);
    const filter = { email: user.email };
    const update = { ...user };
    const options = { new: true, upsert: true };
    return User.findOneAndUpdate(filter, update, options);
  }

  static async deleteUsers(userEmails: string[]): Promise<string[]>{
    const deletedUsers = []
    for (const email of userEmails) {
      const deleted = await User.findOneAndDelete({email});
      if(deleted){
        deletedUsers.push(email);
      }
    }
    return deletedUsers;
  }

  static async getAllUsers(userEmail: string, filter: {
      filterColumn: string,
      sort: string,
      limit: string,
      skip: string
    }) {
    const userRole = await this.getUserRole(userEmail);
    const findOptions = {};
    if(userRole !== ADMIN_ROLE){
      findOptions['email'] = userEmail;
    }
    const column = filter.filterColumn;
    let sort = 1;
    if(filter.sort) {
      sort = filter.sort.toLowerCase() === 'asc' ? 1 : -1
    }
    const sortOptions = {};
    sortOptions[column] = sort;
    const limit = filter.limit ? parseInt(filter.limit) : 10;
    const skip = filter.skip ? parseInt(filter.skip) : 0;
    userEmitter.emit(userEventConstants.GET_ALL);
    return User.find(findOptions).select({password: false}).sort(sortOptions).limit(limit).skip(skip);
  }

  static async getUserRole(email: string): Promise<number>{
    const user = await User.findOne({email});
    return user.role;
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({email});
    if(user){
      const valid = await user.verifyPassword(password);
      if(valid && user.active === true){
        return {
          token: jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET)
        };
      }
    }
    throwError('Invalid values');
  }

  static async updateUser(email: string, user: UpdateUserDto){
    this.validateNumberPhone(user.phone);
    this.validateDateFormat(user.birthdate);
    const filter = { email };
    const update = { ...user };
    const options = { new: true };
    return User.findOneAndUpdate(filter, update, options);
  }

  static validateDateFormat(date: string) {
    const schema = Joi.string()
      .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
      .message('birthdate format must to be YYY-MM-DD');
    validateSchema(schema, date);
  }

  static validateNumberPhone(phone: string) {
    const schema = JoiPhone.string().phoneNumber();
    validateSchema(schema, phone);
  }

  static validateRole(role: number) {
    if(role != ADMIN_ROLE && role != SUBSIDIARY_USER_ROLE){
      role = SUBSIDIARY_USER_ROLE;
    }
    return role;
  }

}