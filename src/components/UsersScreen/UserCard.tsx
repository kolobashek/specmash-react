import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Divider, FloatButton } from 'antd'

export const UserCard = observer(() => {
	const {
		currentUser,
		setCurrentUser,
		getUserById,
		getUsers,
		updateUser,
		clearUserData,
		setUserData,
		roles,
		userData,
		roleName,
	} = store.users
	const linkTo = useNavigate()
	const { id } = useParams()
	const userId = Number(id)
	useEffect(() => {
		const user = async () => {
			const input = await getUserById(userId)
			if (input instanceof Error) {
				return new Error('Unable to fetch user')
			}
			setUserData(input)
		}
		user()
	}, [])

	const [visibleEditButton, setVisibleEditButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [updateError, setUpdateError] = useState('')

	const editUserHandler = () => {
		linkTo(`/users/${userId}/edit`)
	}
	// const editUserSubmit = async (id: number) => {
	// 	setLoading(true)
	// 	const newUser = await updateUser({ id, ...userData })
	// 	if (newUser instanceof Error) {
	// 		console.log(newUser)
	// 		setUpdateError(newUser.message)
	// 		setLoading(false)
	// 		return null
	// 	}
	// 	setUpdateError('')
	// 	setCurrentUser(newUser)
	// 	setVisibleEditButton(true)
	// 	setLoading(false)
	// 	clearUserData()
	// 	return newUser
	// }
	if (!currentUser) return <p>Что-то пошло не так.</p>
	return (
		<>
			<Card
				title={`${currentUser.name}` + (currentUser.nickname ? `, ${currentUser.nickname}` : '')}
			>
				<Divider />
				<div>
					<p>Телефон:</p>
					<p>{`${currentUser.phone}`}</p>
					{/* <ListItem>
						<ListItem.Title>Роль: </ListItem.Title>
						<ListItem.Subtitle>{`${roleName(currentUser.role)}`}</ListItem.Subtitle>
					</ListItem>
					<ListItem>
						<ListItem.Title>Комментарий:</ListItem.Title>
						<ListItem.Subtitle>{`${
							currentUser.comment ? currentUser.comment : ''
						}`}</ListItem.Subtitle>
					</ListItem> */}
				</div>
			</Card>
			<FloatButton
				// visible={visibleEditButton}
				onClick={editUserHandler}
				// placement='right'
				// icon={{ name: 'edit', color: 'white' }}
				// color='green'
			/>
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
