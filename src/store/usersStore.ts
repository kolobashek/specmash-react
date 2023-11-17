import { makeAutoObservable } from 'mobx'
import Queries from '../services/api/queries'
import { graphqlRequest } from '../services/api/graphql'

class UsersStore {
	list: IUser[] | [] = []
	userData: IUser = {
		id: 0,
		phone: '',
		name: '',
		nickname: '',
		comment: '',
		roles: [{ id: 0, name: '' }],
		isActive: false,
	}
	roles: IRole[] = []
	currentUser: IUser | null = null

	constructor() {
		makeAutoObservable(this)
		this.getRoles()
	}
	getUsers = async (payload: GetUsersPayloadInput = {}) => {
		try {
			const users = (await graphqlRequest(Queries.getUsers, { input: payload })) as
				| UsersResponse
				| Error
			if (users instanceof Error) {
				return users
			}
			this.list = users.users
			return users.users
		} catch (error) {
			return new Error(error as string)
		}
	}
	roleName = (role: string | undefined) => {
		if (role === 'admin') return 'Администратор'
		if (role === 'manager') return 'Менеджер'
		if (role === 'user') return 'Водитель'
		return 'Не назначена'
	}
	getUserById = async (id: number) => {
		try {
			const user = (await graphqlRequest(Queries.getUserById, { id })) as UserResponse | Error
			if (user instanceof Error) {
				return user
			}
			this.currentUser = user.user
			return user.user
		} catch (error) {
			return new Error(error as string)
		}
	}
	getRoles = async () => {
		try {
			const roles = (await graphqlRequest(Queries.getRoles)) as RolesResponse | Error
			// console.log(types)
			if (roles instanceof Error) {
				return roles
			}
			this.roles = roles.roles
			return roles.roles
		} catch (error) {
			return new Error(error as string)
		}
	}
	setUserData = ({ phone, name, nickname, comment, roles, isActive }: IUserData) => {
		// console.log(comment)
		phone = phone ?? this.userData.phone ?? ''
		name = name ?? this.userData.name ?? ''
		nickname = nickname ?? this.userData.nickname ?? ''
		comment = comment ?? this.userData.comment ?? ''
		roles = roles ?? this.userData.roles ?? [{ id: 0, name: '' }]
		isActive = isActive ?? this.userData.isActive ?? false

		this.userData.phone = phone
		this.userData.name = name
		this.userData.nickname = nickname
		this.userData.comment = comment
		this.userData.roles = roles
		this.userData.isActive = isActive
	}
	setCurrentUser(user: IUser | null) {
		this.currentUser = user
	}
	clearUserData = () => {
		this.userData = {
			id: 0,
			phone: '',
			name: '',
			nickname: '',
			comment: '',
			roles: [{ id: 0, name: '' }],
			isActive: false,
		}
	}
	createUser = async (userData: IUserData) => {
		try {
			let payload = { ...userData, roles: [] as number[] }
			if (userData.roles?.length) {
				const roles = userData.roles.map((role) => role.id)
				payload = { ...userData, roles }
			}
			const response = (await graphqlRequest(Queries.createUser, payload)) as
				| ICreateUserResponse
				| Error
			if (response instanceof Error) {
				return response
			}
			return response.createUser
		} catch (error) {
			return new Error(error as string)
		}
	}
	updateUser = async (input: IUser) => {
		try {
			const response = (await graphqlRequest(Queries.updateUser, { input })) as
				| UpdateUserResponse
				| Error
			if (response instanceof Error) {
				return response
			}
			return response.updateUser
		} catch (error) {
			return new Error(error as string)
		}
	}
}

export default new UsersStore()

export interface IUser extends IUserData {
	id: number
	phone: string
	name: string
	roles: IRole[]
}
interface UsersResponse {
	users: IUser[]
}
interface UserResponse {
	user: IUser
}
interface UpdateUserResponse {
	updateUser: IUser
}
interface ICreateUserResponse {
	createUser: IUser
}
interface RolesResponse {
	roles: IRole[]
}
export interface IUserData {
	phone?: string
	name?: string
	nickname?: string
	comment?: string
	roles?: IRole[]
	isActive?: boolean
}
export interface IRole {
	id: number
	name: string
}
interface GetUsersPayload {
	input: GetUsersPayloadInput
}
interface GetUsersPayloadInput {
	id?: number
	phone?: string
	name?: string
	limit?: number
	offset?: number
	roles?: number[]
}
