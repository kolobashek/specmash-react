import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IUser } from '../../store/usersStore'
import { UserForm } from './UserForm'
import { FloatButton } from 'antd'
import { useNavigate } from 'react-router-dom'

export const UserNew = observer(() => {
	const rolesFormatter = (roles: { id: number; name: string }[]) =>
		roles.map((role) => ({ label: roleName(role.name), value: role.name }))
	const linkTo = useNavigate()
	const { createUser, clearUserData, setUserData, roles, getRoles, userData, roleName } =
		store.users
	const [formattedRoles, setFormattedRoles] = useState(roles)
	useEffect(() => {
		const Roles = async () => {
			const rolesFromApi = await getRoles()
			if (rolesFromApi instanceof Error) {
				return rolesFromApi
			}
			setFormattedRoles(rolesFromApi)
		}
		Roles()
	}, [])

	const [loading, setLoading] = useState(false)
	const [updateError, setCreateError] = useState('')

	const cancelHandler = (e: any) => {
		e.preventDefault()
		console.log('go back')
	}
	const createUserSubmit = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		const createdUser = await createUser(userData)
		if (createdUser instanceof Error) {
			console.log(createdUser)
			setCreateError(createdUser.message)
			setLoading(false)
			return createdUser
		}
		clearUserData()
		setCreateError('')
		setLoading(false)
		return linkTo(`/users/${createdUser.id}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<UserForm error={updateError} loading={loading} submitHandler={createUserSubmit} />
		</>
	)
})

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'stretch',
// 	},
// 	dropdown: {
// 		margin: 16,
// 		height: 50,
// 		backgroundColor: 'white',
// 		borderRadius: 12,
// 		padding: 12,
// 		shadowColor: '#000',
// 		shadowOffset: {
// 			width: 0,
// 			height: 1,
// 		},
// 		shadowOpacity: 0.2,
// 		shadowRadius: 1.41,

// 		elevation: 2,
// 	},
// 	icon: {
// 		marginRight: 5,
// 	},
// 	item: {
// 		padding: 17,
// 		flexDirection: 'row',
// 		justifyContent: 'space-between',
// 		alignItems: 'center',
// 	},
// 	textItem: {
// 		flex: 1,
// 		fontSize: 16,
// 	},
// 	placeholderStyle: {
// 		fontSize: 16,
// 	},
// 	selectedTextStyle: {
// 		fontSize: 16,
// 	},
// 	iconStyle: {
// 		width: 20,
// 		height: 20,
// 	},
// 	inputSearchStyle: {
// 		height: 40,
// 		fontSize: 16,
// 	},
// })
