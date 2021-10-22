import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
require('dotenv').config();

export default class EmailService {
  static transporter() {
    return nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
      }
    }));
  }
}