import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IUserData } from '../../store/usersStore'

type Props = {
	userData: IUserData
	setUserData: (user: IUserData) => void
	roles: { id: number; name: string }[]
	loading?: boolean
	error?: string
}

export const UserForm = ({ userData, setUserData, roles, loading, error }: Props) => {
	const [name, setUserName] = useState(userData.name)
	const [role, setUserRole] = useState(userData.roles)
	const [phone, setUserPhone] = useState(userData.phone)
	const [nickname, setUserNickname] = useState(userData.nickname)
	const [comment, setUserComment] = useState(userData.comment)
	useEffect(() => {
		setUserData({
			...userData,
			name,
			roles,
			phone,
			nickname,
			comment,
		})
	}, [name, role, phone, nickname, comment])
	return (
		<div>
			<p>hello</p>
		</div>
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
