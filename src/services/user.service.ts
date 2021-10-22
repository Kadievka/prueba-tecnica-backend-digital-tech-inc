import { CreateUserDto } from '../dtos/user.dto';
import userEmitter from '../events/user.emitter';
import userEventConstants from '../events/user.events.contants';
import Joi from '@hapi/joi';
import validateSchema from './validateSchema';

const JoiPhone = Joi.extend(require('joi-phone-number'));

const ADMIN_ROLE = 1000;
const SUBSIDIARY_USER_ROLE = 2000;

export default class UserService {

  static async createUser(user: CreateUserDto) {
    this.validateNumberPhone(user.phone);
    this.validateBirthdate(user.birthdate);
    this.validateRole(user.role);
    userEmitter.emit(userEventConstants.CREATE, user);
    return user;
  }

  static getAllUsers() {
    userEmitter.emit(userEventConstants.GET_ALL);
    return [];
  }

  static validateBirthdate(birthdate: string) {
    const schema = Joi.string()
      .regex(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/)
      .message('birthdate format must to be YYY/MM/DD');
    validateSchema(schema, birthdate);
  }

  static validateNumberPhone(phone: string) {
    const schema = JoiPhone.string().phoneNumber();
    validateSchema(schema, phone);
  }

  static validateRole(role: number) {
    if(role !== ADMIN_ROLE && role !== SUBSIDIARY_USER_ROLE){
      role = SUBSIDIARY_USER_ROLE;
    }
    return role;
  }

}