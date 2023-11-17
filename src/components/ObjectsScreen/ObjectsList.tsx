import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { ObjectCard } from './ObjectCard'
import { redirect, useNavigate } from 'react-router-dom'
import Link from 'antd/es/typography/Link'
import { Avatar, Button, FloatButton, Input, List } from 'antd'
import { UserOutlined } from '@ant-design/icons'

export const ObjectsList = observer(() => {
	const linkTo = useNavigate()
	const { list, objectData, setObjectData, createObject, clearObjectData, getObjects } =
		store.objects
	useEffect(() => {
		getObjects()
	}, [])

	const [visibleAddButton, setVisibleAddButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const addObjectHandler = async () => {
		setVisibleAddButton(false)
	}
	const addObjectSubmit = async () => {
		setLoading(true)
		const newObject = await createObject(objectData)
		if (newObject instanceof Error) {
			console.log(newObject)
			setLoading(false)
		}
		setVisibleAddButton(true)
		setLoading(false)
		clearObjectData()
		getObjects()
	}
	const cancelHandler = () => {
		setVisibleAddButton(true)
	}
	const isActiveHandler = () => {
		setIsActive(!isActive)
		// setObjectData({ isActive: !isActive })
	}
	return (
		<>
			<div>
				<div>
					{list.map((object) => {
						return (
							<Link href={`/objects/${object.id}`} key={object.id}>
								<List.Item>
									<Avatar
										// title={object.name?.charAt(0).toUpperCase()}
										// containerStyle={{ backgroundColor: 'grey' }}
										icon={<UserOutlined />}
									/>
									<p>{object.name}</p>
									<p>{object.address}</p>
									<p>{object.contacts}</p>
								</List.Item>
							</Link>
						)
					})}
					{!visibleAddButton && (
						<>
							<div>
								<div>
									<Input
										placeholder='Наименование'
										value={objectData.name}
										onChange={(e) => setObjectData({ name: e.target.value })}
										disabled={loading}
									/>
								</div>
								<div>
									<Input
										placeholder='Контакты'
										value={objectData.contacts}
										onChange={(e) => {
											console.log(e)
											setObjectData({ contacts: e.target.value })
										}}
										disabled={loading}
									/>
								</div>
								<div>
									<Input
										placeholder='Адрес'
										value={objectData.address}
										onChange={(e) => setObjectData({ address: e.target.value })}
										disabled={loading}
									/>
								</div>
								{/* <div style={styles.inputsCell}>
									<Input
										placeholder='Комментарий'
										value={objectData.comment}
										onChangeText={(e) => setObjectData({ comment: e })}
										disabled={loading}
									/>
								</div> */}
								<div></div>
							</div>
							<div>
								<Button
									// style={styles.row}
									color={'green'}
									// icon={{ name: 'check', color: 'white' }}
									disabled={!objectData.name || loading}
									onClick={addObjectSubmit}
									loading={loading}
								/>
								<Button
									color={'red'}
									// icon={{ name: 'cancel', color: 'white' }}
									onClick={cancelHandler}
									disabled={loading}
								/>
							</div>
						</>
					)}
				</div>
			</div>
			<Link href={'/objects/new'}>
				<FloatButton
				// visible={visibleAddButton}
				// onClick={() => linkTo('/objects/new')}
				// placement='right'
				// icon={{ name: 'add', color: 'white' }}
				// color='green'
				/>
			</Link>
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
