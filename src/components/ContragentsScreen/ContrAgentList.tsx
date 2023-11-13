// import React from 'react'
// import { observer } from 'mobx-react-lite'
// import store from '../../store'

// export const ContragentsScreen = observer(() => {
// 	return (
// 		<div>
// 			<p>
// 				{store.auth.registrationMessage.length
// 					? store.auth.registrationMessage
// 					: 'Ошибка. Перезагрузите приложение или дождитесь пока его исправят.'}
// 			</p>

// 			<Button
// 				title='Отменить регистрацию'
// 				onPress={() => {
// 					store.auth.setRegistrationMessage('')
// 				}}
// 			/>
// 		</div>
// 	)
// })
import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { ContrAgentCard } from './ContrAgentCard'
import { useNavigate } from 'react-router-dom'
import { Avatar, Button, FloatButton, List } from 'antd'
import Link from 'antd/es/typography/Link'
import { UserOutlined } from '@ant-design/icons'

export const ContrAgentsList = observer(({ navigation }: any) => {
	const navigate = useNavigate()
	const {
		list,
		contrAgentData,
		setContrAgentData,
		createContrAgent,
		clearContrAgentData,
		getContrAgents,
	} = store.contrAgents
	useEffect(() => {
		getContrAgents()
	}, [])

	const [visibleAddButton, setVisibleAddButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const addContrAgentHandler = async () => {
		setVisibleAddButton(false)
	}
	const addContrAgentSubmit = async () => {
		setLoading(true)
		const newDriver = await createContrAgent(contrAgentData)
		if (newDriver instanceof Error) {
			console.log(newDriver)
			setLoading(false)
		}
		setVisibleAddButton(true)
		setLoading(false)
		clearContrAgentData()
		getContrAgents()
	}
	const cancelHandler = () => {
		setVisibleAddButton(true)
	}
	const isActiveHandler = () => {
		setIsActive(!isActive)
		// setContrAgentInput({ isActive: !isActive })
	}
	// const memoizedRoleName = React.useMemo(() => {
	// 	return (role: string | undefined) => {
	// 		if (role === 'admin') return 'Администратор'
	// 		if (role === 'manager') return 'Менеджер'
	// 		return 'Водитель'
	// 	}
	// }, [])
	// const currentDriver = navigation.getState().routes.find((r) => r.name === 'DriversList')
	// 	?.params?.id
	// const rolesList = [
	// 	...roles.map((role, key) => {
	// 		return {
	// 			key,
	// 			title: memoizedRoleName(role),
	// 			containerStyle: { backgroundColor: 'white' },
	// 			titleStyle: { color: 'black' },
	// 			onPress: async () => {
	// 				setDriverInput({ role })
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
					{/* {list.map((contrAgent) => {
						return (
							<Link href={`/workplaces/contragents/${contrAgent.id}`} key={contrAgent.id}>
								<Avatar size='small' icon={<UserOutlined />} />
								<List.Item>
									<ListItem.Title>{contrAgent.name}</ListItem.Title>
									<ListItem.Subtitle>{contrAgent.address}</ListItem.Subtitle>
									<ListItem.Subtitle>{contrAgent.contacts}</ListItem.Subtitle>
								</List.Item>
							</Link>
						)
					})} */}
					<List
						dataSource={list}
						bordered
						renderItem={(contrAgent) => (
							<Link href={`/workplaces/contragents/${contrAgent.id}`} key={contrAgent.id}>
								<List.Item>
									<Avatar size='small' icon={<UserOutlined />} />
									<p>{contrAgent.name}</p>
									<p>{contrAgent.address}</p>
									<p>{contrAgent.contacts}</p>
								</List.Item>
							</Link>
						)}
					/>
					{!visibleAddButton && (
						<>
							<div>
								{/* <div style={styles.inputsCell}>
									<Input
										placeholder='Наименование'
										value={contrAgentData.name}
										onChangeText={(e) => setContrAgentData({ name: e })}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Контакты'
										value={contrAgentData.contacts}
										onChangeText={(e) => {
											console.log(e)
											setContrAgentData({ contacts: e })
										}}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Адрес'
										value={contrAgentData.address}
										onChangeText={(e) => setContrAgentData({ address: e })}
										disabled={loading}
									/>
								</div> */}
								{/* <div style={styles.inputsCell}>
									<Input
										placeholder='Комментарий'
										value={contrAgentData.comment}
										onChangeText={(e) => setContrAgentData({ comment: e })}
										disabled={loading}
									/>
								</div> */}
								{/* <div style={styles.inputsCell}> */}
								{/* <Button
										title={contrAgentInput.role || 'Роль'}
										onPress={() => setIsVisibleBS(true)}
										disabled={loading}
									/> */}
								{/* <Button
										color={isActive ? 'gray' : 'warning'}
										icon={
											isActive
												? { name: 'check', color: 'white' }
												: { name: 'cancel', color: 'white' }
										}
										onPress={isActiveHandler}
										disabled={loading}
									/> */}
								{/* <BottomSheet modalProps={{}} isVisible={isVisibleBS}>
										{rolesList.map((l, i) => (
											<ListItem key={i} containerStyle={l.containerStyle} onPress={l.onPress}>
												<ListItem.Content>
													<ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
												</ListItem.Content>
											</ListItem>
										))}
									</BottomSheet> */}
								{/* </div> */}
							</div>
							<div>
								<Button
									// style={styles.row}
									color={'green'}
									disabled={!contrAgentData.name || loading}
									onClick={addContrAgentSubmit}
									loading={loading}
								/>
								<Button color={'red'} onClick={cancelHandler} disabled={loading} />
							</div>
						</>
					)}
				</div>
			</List>
			<FloatButton
				// visible={visibleAddButton}
				onClick={() => navigate('/workplaces/contragents/new')}
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

const cols = [
	{ key: 'name', label: 'ФИО' },
	{ key: 'phone', label: 'Телефон' },
	{ key: 'nickname', label: 'Псевдоним' },
	{ key: 'comment', label: 'Комментарий' },
	{ key: 'role', label: 'Роль' },
	// { key: 'isActive', label: 'Активен' },
]
