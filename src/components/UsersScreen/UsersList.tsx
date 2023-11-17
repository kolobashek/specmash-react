import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
// import { DrawerScreenProps } from '@react-navigation/drawer'
import { UserCard } from './UserCard'
import { Avatar, Breadcrumb, FloatButton, List } from 'antd'
import { PlusCircleOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate, Link, Outlet } from 'react-router-dom'

export const UsersList = observer(({ navigation }: any) => {
	document.title = 'Список пользователей'
	const { list, userData, roles, setUserData, createUser, clearUserData, getUsers } = store.users
	const navigate = useNavigate()
	useEffect(() => {
		getUsers()
	}, [])

	const [visibleAddButton, setVisibleAddButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const addUserHandler = async () => {
		navigate('/users/new')
	}
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
	return (
		<>
			<Breadcrumb
				separator='>'
				items={[
					{
						title: 'Главная',
						href: '/',
					},
					{
						title: 'Пользователи',
					},
				]}
			/>
			<List
				itemLayout='horizontal'
				dataSource={list}
				renderItem={(user) => {
					return (
						<List.Item
							actions={[
								<Link key='1' to={`/users/${user.id}`}>
									Подробнее
								</Link>,
								<Link key='2' to={`/users/${user.id}/edit`}>
									Изменить
								</Link>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Avatar
										size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
										icon={<UserOutlined />}
									>
										{user.name[0]}
									</Avatar>
								}
								title={
									<Link to={`/users/${user.id}`} key={user.id}>
										{user.name}
									</Link>
								}
								description={`Роли: ${user.roles
									.map((role) => ' ' + memoizedRoleName(role.name))
									.toString()}`}
							/>
						</List.Item>
					)
				}}
			/>
			<Outlet />
			<FloatButton
				onClick={addUserHandler}
				icon={<PlusCircleOutlined />}
				tooltip='Добавить пользователя'
			/>
		</>
	)
})
