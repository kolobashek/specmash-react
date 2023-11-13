import { Button, Input } from 'antd'
import React, { useState } from 'react'
// import { registerUser } from '../services/api/auth'

const RegisterScreen = () => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')
	const [role, setRole] = useState('user')
	const registerUser = async ({
		name,
		phone,
		password,
		role,
	}: {
		name: string
		phone: string
		password: string
		role: string
	}) => {
		console.log({ name, phone, password, role })
	}

	return (
		<div>
			<div>
				<h1>РЕГИСТРАЦИЯ</h1>

				<Input onChange={(e) => setName(e.target.value)} placeholder='Введите ФИО' />
				<Input
					style={{}}
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					inputMode='tel'
				/>
				<Input style={{}} value={password} onChange={(e) => setPassword(e.target.value)} />

				{/* <Picker
          selectedValue={role}
          onValueChange={(itemValue) => setRole(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Пользователь" value="user" />
          <Picker.Item label="Админ" value="admin" />
        </Picker> */}

				<Button
					title='Зарегистрироваться'
					onClick={() => registerUser({ name, phone, password, role })}
				/>
			</div>
		</div>
	)
}

// const styles = StyleSheet.create({
// 	container: {
// 		// flex: 1,
// 		marginTop: '2%',
// 		justifyContent: 'center',
// 		alignItems: 'center',
// 		minWidth: 300,
// 		maxWidth: 400,
// 		marginHorizontal: 'auto',
// 	},
// 	title: {
// 		fontSize: 24,
// 		fontWeight: 'bold',
// 		marginBottom: 20,
// 	},
// 	inputContainer: {
// 		width: '80%',
// 		marginBottom: 20,
// 	},
// 	input: {
// 		borderWidth: 1,
// 		borderColor: '#777',
// 		padding: 8,
// 		marginBottom: 10,
// 		width: '100%',
// 	},
// 	label: {
// 		fontSize: 16,
// 		marginBottom: 8,
// 	},
// 	linkButton: {},
// 	passIcons: {
// 		flexDirection: 'row',
// 	},
// 	inputContainerStyle: {},
// 	passIcon: {
// 		paddingLeft: 5,
// 	},
// })

export { RegisterScreen }
