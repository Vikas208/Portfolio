import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(path.dirname("."), "/config.env") });

export default createTransport({
       host: "smtp.gmail.com",
       port: 465,
       secure: true,
       auth: {
              user: process.env.MAIL,
              pass: process.env.PASSWORD
       },
});