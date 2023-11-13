import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
// import { DrawerScreenProps } from '@react-navigation/drawer'
import { UserCard } from './UserCard'
import { Avatar, FloatButton, List } from 'antd'
import Link from 'antd/es/typography/Link'
import { UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const UsersList = observer(({ navigation }: any) => {
	const { list, userData, roles, setUserData, createUser, clearUserData, getUsers } = store.users
	const linkTo = useNavigate()
	useEffect(() => {
		getUsers()
	}, [])

	const [visibleAddButton, setVisibleAddButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const addUserHandler = async () => {
		linkTo('/users/new')
	}
	// const addUserSubmit = async () => {
	// 		setLoading(true)
	// 		const newUser = await createUser()
	// 		if (newUser instanceof Error) {
	// 			console.log(newUser)
	// 			setLoading(false)
	// 		}
	// 		setVisibleAddButton(true)
	// 		setLoading(false)
	// 		clearUserInput()
	// 		getUsers()
	// }
	const cancelHandler = () => {
		setVisibleAddButton(true)
	}
	const isActiveHandler = () => {
		setIsActive(!isActive)
		setUserData({ isActive: !isActive })
	}
	const memoizedRoleName = React.useMemo(() => {
		return (role: string | undefined) => {
			if (role === 'admin') return 'Администратор'
			if (role === 'manager') return 'Менеджер'
			return 'Водитель'
		}
	}, [])
	// const currentUser = navigation.getState().routes.find((r) => r.name === 'UsersList')
	// 	?.params?.id
	// const rolesList = [
	// 	...roles.map((role, key) => {
	// 		return {
	// 			key,
	// 			title: memoizedRoleName(role),
	// 			containerStyle: { backgroundColor: 'white' },
	// 			titleStyle: { color: 'black' },
	// 			onPress: async () => {
	// 				setUserData({ role })
	// 				setIsVisibleBS(false)
	// 			},
	// 		}
	// 	}),
	// 	{
	// 		title: 'Отмена',
	// 		containerStyle: { backgroundColor: 'red' },
	// 		titleStyle: { color: 'white' },
	// 		onPress: () => {
	// 			setIsVisibleBS(false)
	// 			setVisibleAddButton(true)
	// 		},
	// 	},
	// ]
	return (
		<>
			<List>
				{/* <StickyHeader titles={cols} /> */}
				<div>
					{list.map((user) => {
						return (
							<Link href={`/users/${user.id}`} key={user.id}>
								<List.Item>
									<Avatar size='small' icon={<UserOutlined />} />
									<p>{user.name}</p>
									<p>{memoizedRoleName(user.roles.map((role) => role.name).toString())}</p>
								</List.Item>
							</Link>
						)
					})}
					{/* {!visibleAddButton && (
						<>
							<div style={[styles.row]}>
								<div style={styles.inputsCell}>
									<Input
										placeholder='ФИО'
										value={userData.name}
										onChangeText={(e) => setUserData({ name: e })}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Телефон'
										value={userData.phone}
										onChangeText={(e) => {
											console.log(e)
											setUserData({ phone: e })
										}}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Псевдоним'
										value={userData.nickname}
										onChangeText={(e) => setUserData({ nickname: e })}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Комментарий'
										value={userData.comment}
										onChangeText={(e) => setUserData({ comment: e })}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Button
										title={userData.role || 'Роль'}
										onPress={() => setIsVisibleBS(true)}
										disabled={loading}
									/>
									<Button
										color={isActive ? 'gray' : 'warning'}
										icon={
											isActive
												? { name: 'check', color: 'white' }
												: { name: 'cancel', color: 'white' }
										}
										onPress={isActiveHandler}
										disabled={loading}
									/>
									<BottomSheet modalProps={{}} isVisible={isVisibleBS}>
										{rolesList.map((l, i) => (
											<ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
												<ListItem.Content>
													<ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
												</ListItem.Content>
											</ListItem>
										))}
									</BottomSheet>
								</div>
							</div>
							<div style={styles.inputsSubmitRow}>
								<Button
									// style={styles.row}
									color={'green'}
									icon={{ name: 'check', color: 'white' }}
									disabled={!userData.name || !userData.role || loading}
									onPress={addUserSubmit}
									loading={loading}
								/>
								<Button
									color={'red'}
									icon={{ name: 'cancel', color: 'white' }}
									onPress={cancelHandler}
									disabled={loading}
								/>
							</div>
						</>
					)} */}
				</div>
			</List>
			<FloatButton onClick={addUserHandler} />
		</>
	)
})

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		justifyContent: 'center',
// 		alignItems: 'stretch',
// 	},
// 	link: {
// 		display: 'flex',
// 		flex: 1,
// 	},
// 	title: {
// 		fontSize: 20,
// 		textAlign: 'center',
// 		marginVertical: 20,
// 	},
// 	table: {
// 		flex: 1,
// 		paddingHorizontal: 16, // добавили горизонтальный padding
// 	},
// 	row: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		// borderBottomWidth: 1,
// 		// borderColor: '#ddd',
// 	},
// 	header: {
// 		flex: 1,
// 		flexDirection: 'row',
// 		borderBottomWidth: 2, // увеличили толщину линии для заголовка
// 	},
// 	cell: {
// 		flex: 1,
// 		padding: 10,
// 		textAlign: 'left', // выравнивание по центру
// 	},
// 	cellHeader: {
// 		padding: 10,
// 		fontWeight: 'bold', // жирный шрифт
// 		textAlign: 'left',
// 	},
// 	inputsCell: {
// 		flex: 1,
// 		flexDirection: 'row',
// 	},
// 	inputsSubmitRow: {
// 		flexDirection: 'row',
// 		justifyContent: 'flex-end',
// 	},
// })

// const cols = [
// 	{ key: 'name', label: 'ФИО' },
// 	{ key: 'phone', label: 'Телефон' },
// 	{ key: 'nickname', label: 'Псевдоним' },
// 	{ key: 'comment', label: 'Комментарий' },
// 	{ key: 'role', label: 'Роль' },
// 	// { key: 'isActive', label: 'Активен' },
// ]
