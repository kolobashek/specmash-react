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
	const { id } = useParams()
	const userId = Number(id)
	const [allRoles, setAllRoles] = useState([] as IRole[])
	const { userData, setUserData, getUserById } = store.users
	useEffect(() => {
		const start = async () => {
			const rolesFromApi = await store.users.getRoles()
			if (rolesFromApi instanceof Error) {
				return
			}
			setAllRoles(rolesFromApi)
			if (userId) {
				const initialData = await getUserById(userId)
				setUserData(initialData)
			}
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
	)
}
