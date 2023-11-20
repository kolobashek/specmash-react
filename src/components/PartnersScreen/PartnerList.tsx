// import React from 'react'
// import { observer } from 'mobx-react-lite'
// import store from '../../store'

// export const PartnersScreen = observer(() => {
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
import { PartnerCard } from './PartnerCard'
import { Outlet, useNavigate } from 'react-router-dom'
import { Avatar, Button, FloatButton, List } from 'antd'
import Link from 'antd/es/typography/Link'
import { UserOutlined } from '@ant-design/icons'

export const PartnersList = observer(({ navigation }: any) => {
	const navigate = useNavigate()
	const { list, partnerData, setPartnerData, createPartner, clearPartnerData, getPartners } =
		store.partners
	useEffect(() => {
		getPartners()
	}, [])

	const [visibleAddButton, setVisibleAddButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const addPartnerHandler = async () => {
		setVisibleAddButton(false)
	}
	const addPartnerSubmit = async () => {
		setLoading(true)
		const newDriver = await createPartner(partnerData)
		if (newDriver instanceof Error) {
			console.log(newDriver)
			setLoading(false)
		}
		setVisibleAddButton(true)
		setLoading(false)
		clearPartnerData()
		getPartners()
	}
	const cancelHandler = () => {
		setVisibleAddButton(true)
	}
	const isActiveHandler = () => {
		setIsActive(!isActive)
		// setPartnerInput({ isActive: !isActive })
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
					{/* {list.map((partner) => {
						return (
							<Link href={`/workplaces/contragents/${partner.id}`} key={partner.id}>
								<Avatar size='small' icon={<UserOutlined />} />
								<List.Item>
									<ListItem.Title>{partner.name}</ListItem.Title>
									<ListItem.Subtitle>{partner.address}</ListItem.Subtitle>
									<ListItem.Subtitle>{partner.contacts}</ListItem.Subtitle>
								</List.Item>
							</Link>
						)
					})} */}
					<List
						dataSource={list}
						bordered
						renderItem={(partner) => (
							<Link href={`/contragents/${partner.id}`} key={partner.id}>
								<List.Item>
									<Avatar size='small' icon={<UserOutlined />} />
									<p>{partner.name}</p>
									<p>{partner.address}</p>
									<p>{partner.contacts}</p>
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
										value={partnerData.name}
										onChangeText={(e) => setPartnerData({ name: e })}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Контакты'
										value={partnerData.contacts}
										onChangeText={(e) => {
											console.log(e)
											setPartnerData({ contacts: e })
										}}
										disabled={loading}
									/>
								</div>
								<div style={styles.inputsCell}>
									<Input
										placeholder='Адрес'
										value={partnerData.address}
										onChangeText={(e) => setPartnerData({ address: e })}
										disabled={loading}
									/>
								</div> */}
								{/* <div style={styles.inputsCell}>
									<Input
										placeholder='Комментарий'
										value={partnerData.comment}
										onChangeText={(e) => setPartnerData({ comment: e })}
										disabled={loading}
									/>
								</div> */}
								{/* <div style={styles.inputsCell}> */}
								{/* <Button
										title={partnerInput.role || 'Роль'}
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
									disabled={!partnerData.name || loading}
									onClick={addPartnerSubmit}
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
				onClick={() => navigate('/contragents/new')}
			/>
			<Outlet />
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
