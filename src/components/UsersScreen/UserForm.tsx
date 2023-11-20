import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IRole, IUserData } from '../../store/usersStore'
import { Button, Divider, Form, Input, Select, Space } from 'antd'
import { useParams } from 'react-router-dom'

type Props = {
	submitHandler: (values?: any) => void
	loading?: boolean
	error?: string
}

export const UserForm = ({ loading, error, submitHandler }: Props) => {
	// const [name, setUserName] = useState(userData.name)
	// const [role, setUserRole] = useState(userData.roles)
	// const [phone, setUserPhone] = useState(userData.phone)
	// const [nickname, setUserNickname] = useState(userData.nickname)
	// const [comment, setUserComment] = useState(userData.comment)
	// useEffect(() => {
	// 	setUserData({
	// 		...userData,
	// 		name,
	// 		roles,
	// 		phone,
	// 		nickname,
	// 		comment,
	// 	})
	// }, [name, role, phone, nickname, comment])
	// const [allRoles, setAllRoles] = useState([] as string[])
	// useEffect(() => {
	// 	const start = async () => {
	// 		const rolesFromApi = await getRoles()
	// 		if (rolesFromApi instanceof Error) {
	// 			return
	// 		}
	// 		setAllRoles(rolesFromApi)
	// 	}
	// 	start()
	// },[])
	const { id } = useParams()
	const userId = Number(id)
	const [allRoles, setAllRoles] = useState([] as IRole[])
	const { userData, setUserData, getUserById } = store.users
	useEffect(() => {
		const start = async () => {
			if (userId) {
				const initialData = await getUserById(userId)
				setUserData(initialData)
			}
			const rolesFromApi = await store.users.getRoles()
			if (rolesFromApi instanceof Error) {
				return
			}
			setAllRoles(rolesFromApi)
		}
		start()
	}, [])
	const { name, phone, nickname, roles, comment } = userData
	const inputChange = (input: Partial<IUserData>) => {
		setUserData({
			...userData,
			...input,
		})
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	const changeRolesHandler = (value: any, options: any) => {
		setUserData({ roles: options })
	}
	return (
		<Form
			name='partner'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={submitHandler}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<h1>Пользователь</h1>
			<Form.Item>{userData.name}</Form.Item>
			<Divider />
			<div>
				<Form.Item label='ФИО:'>
					<Input
						placeholder={userData.name || 'ФИО'}
						value={name}
						onChange={(e) => inputChange({ name: e.target.value })}
						disabled={loading}
					/>
				</Form.Item>
				<Form.Item label='Телефон:'>
					<Input
						placeholder='Введите номер телефона'
						value={phone}
						onChange={(e) => inputChange({ phone: e.target.value })}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
				<Form.Item label='Позывной:'>
					<Input
						placeholder='Кличка'
						value={nickname}
						onChange={(e) => {
							inputChange({ nickname: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
				<Form.Item label='Роли:'>
					<Select
						mode='multiple'
						// size={size}
						placeholder='Выберите роли'
						value={roles.map((role) => role.id)}
						onChange={changeRolesHandler}
						style={{ width: '100%' }}
						options={allRoles}
						fieldNames={{ label: 'name', value: 'id' }}
					/>
					{/* <MultiSelect
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={allWorkPlaces}
						search
						searchField='name'
						maxHeight={300}
						labelField={'name'}
						valueField={'id'}
						placeholder={workPlaces.map((obj) => obj.name).join(', ') || 'Выберите объекты'}
						searchPlaceholder='Найти...'
						value={workPlaces?.map((obj) => obj.name || '')}
						onChange={(value: string[]) => {
							const selectedWorkPlaces = allWorkPlaces.filter((ca) => value.includes(String(ca.id)))
							if (selectedWorkPlaces.length > 0) {
								inputChange({ workPlaces: selectedWorkPlaces })
							} else {
								inputChange({ workPlaces: [] })
							}
						}}
						renderLeftIcon={() => {
							return <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
						}}
						renderItem={(item) => {
							return (
								<div style={styles.item}>
									<p style={styles.textItem}>{item.name}</p>
									{item.id === userData.workPlaces?.find((obj) => obj.id === item.id)?.id && (
										<AntDesign style={styles.icon} color='black' name='Safety' size={20} />
									)}
								</div>
							)
						}}
						disable={loading}
					/> */}
				</Form.Item>
				<Form.Item label='Комментарий:'>
					<Input
						placeholder={comment || 'Комментарий'}
						value={comment}
						onChange={(e) => {
							inputChange({ comment: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
			</div>
			{error && (
				<>
					<Divider />
					<p style={{ color: 'red' }}>{error}</p>
				</>
			)}
			<Form.Item>
				<Space>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						disabled={!userData.name?.length}
					>
						Записать
					</Button>
					<Button type='primary' htmlType='reset' className='login-form-button' danger>
						Отмена
					</Button>
				</Space>
			</Form.Item>
		</Form>
		// <Card>
		// 	<Card.Title>
		// 		{`${userData.name}` + (userData.nickname ? `, ${userData.nickname}` : '')}
		// 	</Card.Title>
		// 	<Card.Divider />
		// 	<div>
		// 		<ListItem>
		// 			<ListItem.Title>Наименование:</ListItem.Title>
		// 			<ListItem.Input
		// 				placeholder={userData.name || 'Наименование'}
		// 				value={name}
		// 				onChangeText={setUserName}
		// 				disabled={loading}
		// 				style={{ textAlign: 'left' }}
		// 			/>
		// 		</ListItem>
		// 		<ListItem>
		// 			<ListItem.Title>Позывной:</ListItem.Title>
		// 			<ListItem.Input
		// 				placeholder={nickname || 'Позывной'}
		// 				value={nickname}
		// 				onChangeText={setUserNickname}
		// 				disabled={loading}
		// 				style={{ textAlign: 'left' }}
		// 			/>
		// 		</ListItem>
		// 		<ListItem>
		// 			<ListItem.Title>Телефон:</ListItem.Title>
		// 			<ListItem.Input
		// 				placeholder='80000000000'
		// 				value={phone}
		// 				onChangeText={setUserPhone}
		// 				disabled={loading}
		// 				style={{ textAlign: 'left' }}
		// 			/>
		// 		</ListItem>
		// 		<ListItem>
		// 			<ListItem.Title>Тип: </ListItem.Title>
		// 			<Dropdown
		// 				style={styles.dropdown}
		// 				placeholderStyle={styles.placeholderStyle}
		// 				selectedTextStyle={styles.selectedTextStyle}
		// 				inputSearchStyle={styles.inputSearchStyle}
		// 				iconStyle={styles.iconStyle}
		// 				data={roles}
		// 				search
		// 				maxHeight={300}
		// 				labelField='label'
		// 				valueField='value'
		// 				placeholder={role || 'Выберите тип'}
		// 				searchPlaceholder='Search...'
		// 				value={userData.role}
		// 				onChange={(role) => setUserRole(role.label)}
		// 				renderLeftIcon={() => {
		// 					return <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
		// 				}}
		// 				renderItem={(item) => {
		// 					return (
		// 						<div style={styles.item}>
		// 							<p style={styles.textItem}>{item.label}</p>
		// 							{item.label === userData.role && (
		// 								<AntDesign style={styles.icon} color='black' name='Safety' size={20} />
		// 							)}
		// 						</div>
		// 					)
		// 				}}
		// 				disable={loading}
		// 			/>
		// 		</ListItem>
		// 		<ListItem>
		// 			<ListItem.Title>Гос. номер:</ListItem.Title>
		// 			<ListItem.Input
		// 				placeholder='А 000 АА 000'
		// 				value={comment}
		// 				onChangeText={setUserComment}
		// 				disabled={loading}
		// 				style={{ textAlign: 'left' }}
		// 			/>
		// 		</ListItem>
		// 	</div>
		// 	{error && (
		// 		<>
		// 			<Card.Divider />
		// 			<p style={{ color: 'red' }}>{error}</p>
		// 		</>
		// 	)}
		// </Card>
	)
}

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
