import { register as registerService } from '@services/auth';
import { sendConfirmationCode } from '@services/utils/Mailer';
import User from '@db/model/users';
import jwt from 'jsonwebtoken';
import winston from '@config/winston';
require('dotenv').config();

export function register(req, res) {
	const { body } = req;
	registerService({ data: body })
		.then((response) => {
			if (response.error) {
				res.status = response.status;
				res.send(response.message);
				return;
			}
			res.send(response.data);
		})
		.catch((err) => {
			winston.error(`Register Failed... ::: ${err.message}`);
		});
}

export function sendConfirmationCodeMail(req, res) {
	const bearerHeader = req.headers['authorization'];
	const bearer = bearerHeader.split(' ');
	const bearerToken = bearer[1];
	const data = jwt.verify(bearerToken, process.env.JWT_SECRET);

	const emailData = {
		toEmail: data.email,
		subject: `${process.env.WEB_SITE_NAME} 회원가입 인증코드입니다.`,
		html: `인증코드 : ${data.confirmation_code}`,
	};

	sendConfirmationCode(emailData)
		.then((data) => {
			res.json({
				message: 'Mail send success!',
			});
		})
		.catch((err) => {
			res.json({
				data: null,
				error: '1002',
				message: 'Send Confirmation-code mail failed',
			});
		});
	//
}

export function updateProfile(req,res) {
	const { body, user } = req;
		try {
			let updatedData = User.updateProfile(user, body)
			res.json ({
				data: updatedData,
				message: 'update complete',
			})
		}
		catch(err) {
			res.json ({
				data: null,
				error: '1003',
				message: 'update fail',
			});
		}

}
export function checkEmail (req, res) {
	const { email } = req.body;
	
	User.checkEmail({ email })
		.then((duplicate) => {
			if (duplicate) {
				res.json ({
					data: null,
					message: "email is duplicated"
				})
			} 
			else {
				res.json ({
					data: null,
					message: "not duplicated"
				})
			}
		})
		.catch((err)=> {
			res.json ({
				data: null,
				error : '1004',
				message: 'email checking error'
			})	
	})
}


export function checkStudentId (req, res) {
	const { studentId } = req.body;
	
	User.checkStudentId({ studentId })
		.then((duplicate) => {
			if (duplicate) {
				res.json ({
					data: null,
					message: "studentId is duplicated"
				})
			}
			else {
				res.json ({
					data: null,
					message: "not duplicated"
				})
			}
		})
		.catch((err)=> {
			res.json ({
				data: null,
				error : '1005',
				message: 'studentId checking error'
			})	
		})
}