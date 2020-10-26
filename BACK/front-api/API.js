import {Auth} from './APIInstance';

// userId, password
export const login = ({ token, body }) => {
	const authAPI = Auth.create(token)
	return authAPI.post('/login', body);
}

// email, password, studentId, name
export const regiter = ({ body }) => {
	const nonAuthAPI = Auth.create()
	return nonAuthAPI.post('/register', body);
}

// name, password
export const updateUser = ({ token, body }) => {
	const authAPI = Auth.create(token)
	return authAPI.put('/user', body);
}

// email 미완성
export const deleteUser = ({ token, body }) => {
	const authAPI = Auth.create(token)
	return authAPI.delete('/user');
}

// 
export const requestConfirmationCode = ({ token }) => {
	const authAPI = Auth.create(token)
	return authAPI.get('/confirmation-code');
}

// confirmation-code
export const Confirmed = ({ token, body }) => {
	const authAPI = Auth.create(token)
	return authAPI.put('/confirmation-code', body);
}

// email
export const checkEmail = ({ body }) => {
	const nonAuthAPI = Auth.create()
	authAPI.post('/checkEmail', body);
}

// studentId
export const checkStudentId = ({ body }) => {
	const nonAuthAPI = Auth.create()
	return nonAuthAPI.post('/checkStudentId', body);
}

// role
export const changeRoles = ({ token, body }) => {
	const authAPI = Auth.create(token)
	return authAPI.post('/changeRoles', body);
}

// 미완성
export const resetPassword = ({ body }) => {
	const nonAuthAPI = Auth.create()
	return nonAuthAPI.post('/find/reset-password', body);
}