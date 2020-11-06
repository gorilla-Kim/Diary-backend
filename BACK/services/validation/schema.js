import joi from 'joi';

const Joi = require('joi');
const { EMAIL_DOMAIN } = process.env;

export const userSchema = Joi.object({
	email: Joi.string()
		.pattern(new RegExp(EMAIL_DOMAIN + '+.ac+.kr$'))
		.required(),
	studentId: Joi.string().alphanum().min(3).max(30).required(),
	name: Joi.string().required(),
	confirmation_code: Joi.string(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
	repeat_password: Joi.ref('password'),
	access_token: [Joi.string(), Joi.number()],
}).xor('password', 'access_token');
// .with('password', 'repeat_password');

export const emailSchema = Joi.object({
	email: Joi.string()
		.pattern(new RegExp(EMAIL_DOMAIN + '+.ac+.kr$'))
		.required(),
})

export const boardSchema = Joi.object({
	type: Joi.string().alphanum().min(3).max(10),
	title: Joi.string().min(0).max(30),
	contents: Joi.string(),
	email: Joi.string()
		.pattern(new RegExp(EMAIL_DOMAIN + '+.ac+.kr$'))
		.required(),
	tags: Joi.array().items(Joi.string()),
	isSecret: Joi.boolean(),
	password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
}).with('isSecret', 'password');

export const boardCommentsSchema = Joi.object({
	boardType: Joi.string().alphanum().min(3).max(10),
	email: Joi.string()
		.pattern(new RegExp(EMAIL_DOMAIN + '+.ac+.kr$'))
		.required(),
	comments: Joi.string(),
	_id: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});