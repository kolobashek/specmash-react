import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { localizedRoleName } from '../../utils'
import { IObject } from '../../store/objectStore'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Divider, FloatButton, Input, List } from 'antd'
import Title from 'antd/es/typography/Title'

export const ObjectCard = observer(({ navigation }: any) => {
	const linkTo = useNavigate()
	const { id } = useParams()
	const {
		currentObject,
		setCurrentObject,
		getObjectById,
		getObjects,
		updateObject,
		clearObjectData,
		setObjectData,
		objectData,
	} = store.objects
	const objectId = Number(id)
	useEffect(() => {
		const user = async () => {
			const input = await getObjectById(objectId)
			if (input instanceof Error) {
				return new Error('Unable to fetch user')
			}
			setObjectData(input)
		}
		user()
	}, [])

	const [visibleEditButton, setVisibleEditButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [isVisibleBS, setIsVisibleBS] = useState(false)
	const [isActive, setIsActive] = useState(false)
	const [updateError, setUpdateError] = useState('')

	const editObjectHandler = () => {
		linkTo(`/workplaces/objects/${objectId}/edit`)
	}
	const editObjectSubmit = async (id: number) => {
		setLoading(true)
		const newObject = await updateObject({ id, ...objectData })
		if (newObject instanceof Error) {
			console.log(newObject)
			setUpdateError(newObject.message)
			setLoading(false)
			return null
		}
		setUpdateError('')
		setCurrentObject(newObject)
		setVisibleEditButton(true)
		setLoading(false)
		clearObjectData()
		return newObject
	}
	// const isActiveHandler = () => {
	// 	setIsActive(!isActive)
	// 	setObjectInput({ isActive: !isActive })
	// }
	if (!currentObject) return <p>Что-то пошло не так.</p>
	if (!visibleEditButton)
		return (
			<>
				<Card title={currentObject.name}>
					<Divider />
					<div>
						<List.Item>
							<Title>Контакты:</Title>
							<Input
								placeholder='Контакты'
								value={objectData.contacts}
								onChange={(text) => setObjectData({ contacts: text.target.value })}
								disabled={loading}
								style={{ textAlign: 'left' }}
							/>
						</List.Item>
						<List.Item>
							{/* <ListItem.Title>Роль: </ListItem.Title>
							<Dropdown
								style={styles.dropdown}
								placeholderStyle={styles.placeholderStyle}
								selectedTextStyle={styles.selectedTextStyle}
								inputSearchStyle={styles.inputSearchStyle}
								iconStyle={styles.iconStyle}
								data={roles.map((role) => {
									return { label: roleName(role), value: role }
								})}
								search
								maxHeight={300}
								labelField='label'
								valueField='value'
								placeholder='Select item'
								searchPlaceholder='Search...'
								value={objectInput.role}
								onChange={(role) => setObjectInput({ role: role.value })}
								renderLeftIcon={() => {
									return <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
								}}
								renderItem={(item) => {
									return (
										<div style={styles.item}>
											<p style={styles.textItem}>{item.label}</p>
											{item.value === objectInput.role && (
												<AntDesign style={styles.icon} color='black' name='Safety' size={20} />
											)}
										</div>
									)
								}}
								disable={loading}
							/> */}
							<Title>Адрес:</Title>
							<Input
								placeholder='Адрес'
								value={objectData.address}
								onChange={(text) => setObjectData({ address: text.target.value })}
								disabled={loading}
								style={{ textAlign: 'left' }}
							/>
						</List.Item>
						{/* <ListItem>
							<ListItem.Title>Комментарий:</ListItem.Title>
							<ListItem.Input
								placeholder='Комментарии'
								value={objectInput.comment}
								onChangeText={(text) => setObjectInput({ comment: text })}
								disabled={loading}
								style={{ textAlign: 'left' }}
							/>
						</ListItem> */}
					</div>
					{updateError && (
						<>
							<Divider />
							<p style={{ color: 'red' }}>{updateError}</p>
						</>
					)}
				</Card>
				<FloatButton
					// visible={!visibleEditButton || !loading}
					onClick={() => editObjectSubmit(objectId)}
					// placement='left'
					// icon={{ name: 'check', color: 'white' }}
					// color='green'
				/>
				<FloatButton
					// visible={!visibleEditButton || !loading}
					onClick={editObjectHandler}
					// placement='right'
					// icon={{ name: 'cancel', color: 'white' }}
					// color='red'
				/>
			</>
		)
	return (
		<>
			<Card>
				<Title>{currentObject.name}</Title>
				<Divider />
				<div>
					<List.Item>
						<Title>Контакты:</Title>
						<p>{currentObject.contacts}</p>
					</List.Item>
					<List.Item>
						<Title>Адрес: </Title>
						<p>{currentObject.address}</p>
					</List.Item>
					{/* <ListItem>
						<ListItem.Title>Комментарий:</ListItem.Title>
						<ListItem.Subtitle>{`${
							currentObject.comment ? currentObject.comment : ''
						}`}</ListItem.Subtitle>
					</ListItem> */}
				</div>
			</Card>
			<FloatButton
				// visible={visibleEditButton}
				onClick={editObjectHandler}
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
