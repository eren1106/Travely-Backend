"use strict";

import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const key = "123456";

// 创建一个SMTP客户端对象
let transporter = nodemailer.createTransport({
    host: "smtp.qq.com", // 发送方邮箱 qq 通过lib/wel-konw
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: '1342502141@qq.com', // 发送方邮箱地址
      pass: 'hgqqgquqnndcigcc' // mtp 验证码 这个有了才可以发送邮件，可以qq邮箱去查看自己的码
    }
})
  
function send(email, code) {

    // Read the HTML file
    const htmlContent = fs.readFileSync(path.resolve(__dirname, './mail.html'), 'utf8');

    // Define the variable values
    // Replace placeholders in the HTML content with variable values
    const modifiedHtmlContent = htmlContent.replace('{{email}}', email).replace('{{code}}', code);

    // 邮件信息
    let mailobj = {
      from: '"Traverly Admin" <1342502141@qq.com>', // sender address
      to: email, // list of receivers
      subject: "Travely Email Verification", // Subject line
      //text: `您的验证码是${code}，有效期5分钟`
      html:  modifiedHtmlContent
      //attachments: [{}, {}, ...]
    }
  
    return new Promise((reslove, reject) => {
    // 发送邮件
      transporter.sendMail(mailobj, (error, data) => {
        if (error) {
          reject()
        } else {
          reslove()
        }
      })
    })
   
  }
  
export default send;