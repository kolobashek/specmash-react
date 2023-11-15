import { IUser } from './usersStore'
import { makeAutoObservable } from 'mobx'
import Queries from '../services/api/queries'
import { graphqlRequest, setAuthTokenHeader } from '../services/api/graphql'

class AuthStore {
	isAuthenticated = false
	registrationMessage = ''
	token = ''
	currentUser = {
		id: 0,
		phone: '',
		name: '',
		roles: [
			{
				id: 0,
				name: '',
			},
		],
	}

	constructor() {
		makeAutoObservable(this)
	}
	getUserByToken = async (token: string): Promise<IUser | Error> => {
		try {
			setAuthTokenHeader(token)
			const request = (await graphqlRequest(Queries.me, {}, { token })) as UserResponse
			const user = request.me
			if (user) {
				this.setCurrentUser(user)
				this.setIsAuthenticated(true)
				return user
			} else {
				this.setIsAuthenticated(false)
				return new Error('Токен не действителен')
			}
		} catch (error) {
			return new Error(error as string)
		}
	}
	getUserByAsyncStorage = async (): Promise<IUser | Error> => {
		if (this.isAuthenticated) {
			return this.currentUser
		} else {
			try {
				const token = window.localStorage.getItem('token')
				if (!token) {
					this.isAuthenticated = false
					return new Error('Токен не найден')
				} else {
					setAuthTokenHeader(token)
					const request = (await graphqlRequest(Queries.me, {}, { token })) as UserResponse
					const user = request.me
					if (user) {
						this.setCurrentUser(user)
						this.setIsAuthenticated(true)
						return user
					} else {
						this.setIsAuthenticated(false)
						return new Error('Токен не действителен')
					}
				}
			} catch (error) {
				return new Error(error as string)
			}
		}
	}

	login = async (phone: string, password: string) => {
		try {
			const { login } = (await graphqlRequest(Queries.login, {
				phone,
				password,
			})) as Login
			this.token = login.token
			this.setCurrentUser(login.user)
			this.setIsAuthenticated(true)
			window.localStorage.setItem('token', login.token)
			return login.user
		} catch (error) {
			return new Error('Неверный логин или пароль')
		}
	}

	setIsAuthenticated = (authorized: boolean) => {
		this.isAuthenticated = authorized
	}

	getRegistrationMessage = () => {
		return this.registrationMessage
	}

	setRegistrationMessage = (message: string) => {
		this.registrationMessage = message
	}

	setCurrentUser = (user: IUser) => {
		if (user) this.currentUser = user
	}

	hasRoles = (...roleNames: string[]) => {
		const roles = this.currentUser.roles
		if (roles) {
			for (const roleName of roleNames) {
				if (roles.some((role) => role.name === roleName)) {
					return true
				}
			}
		}
		return false
	}

	signOut = () => {
		window.localStorage.removeItem('token')
		this.setIsAuthenticated(false)
	}
}

export default new AuthStore()

interface UserResponse {
	me: IUser
}

interface Login {
	login: {
		token: string
		user: IUser
	}
}
