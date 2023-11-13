import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { localizedRoleName } from '../../utils'
import { IObjectData } from '../../store/objectStore'
import { IObject } from '../../store/objectStore'
import { IContrAgent } from '../../store/contrAgentStore'
import { Card, Divider, Input, List, Select } from 'antd'
import Title from 'antd/es/typography/Title'

type Props = {
	objectId?: number
	// setObjectData: (object: IObjectData) => void
	// contrAgentVariants: IContrAgent[]
	loading?: boolean
	error?: string
}

export const ObjectForm = observer(({ objectId, loading, error }: Props) => {
	const { setObjectData, objectData, getObjectById } = store.objects
	const { getContrAgents } = store.contrAgents
	// const [name, setObjectName] = useState(objectData.name)
	// const [contacts, setObjectContacts] = useState(objectData.contacts)
	// const [address, setObjectAddress] = useState(objectData.address)
	// // const [comment, setObjectComment] = useState(objectData.comment)
	// const [contrAgents, setObjectContragents] = useState(objectData.contrAgents || [])
	const { name, contacts, address, contrAgents } = objectData
	const [allContrAgents, setAllContrAgents] = useState([] as IContrAgent[])
	const inputChange = (input: Partial<IObjectData>) => {
		setObjectData({
			...objectData,
			...input,
		})
	}
	useEffect(() => {
		const start = async () => {
			const cAFromApi = await getContrAgents()
			if (cAFromApi instanceof Error) {
				return
			}
			setAllContrAgents(cAFromApi)
			if (objectId) {
				const initialData = await getObjectById(objectId)
				setObjectData(initialData)
			}
		}
	}, [])
	return (
		<Card
			title={
				`${objectData.name}` +
				(objectData.contrAgents?.length
					? ` //${objectData.contrAgents.map((ca) => ca.name).join(', ')}`
					: '')
			}
		>
			<Divider />
			<div>
				<List.Item>
					<Title>Наименование:</Title>
					<Input
						placeholder={objectData.name || 'Наименование'}
						value={name}
						onChange={(e) => inputChange({ name: e.target.value })}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Адрес:</Title>
					<Input
						placeholder='Введите адрес'
						value={address}
						onChange={(e) => {
							inputChange({ address: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Контакты:</Title>
					<Input
						placeholder='телефон, email, ФИО, должность'
						value={contacts}
						onChange={(e) => {
							inputChange({ contacts: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Контрагенты:</Title>
					<Select
						options={allContrAgents}
						placeholder={contrAgents.map((obj) => obj.name).join(', ') || 'Выберите контрагентов'}
						value={contrAgents.map((obj) => obj.name)}
						onChange={(value: string[]) => {
							const selectedCAs = allContrAgents.filter((ca) => value.includes(String(ca.id)))
							if (selectedCAs.length > 0) {
								inputChange({ contrAgents: selectedCAs })
							} else {
								inputChange({ contrAgents: [] })
							}
						}}
						// optionRender={(item) => {
						// 	return (
						// 		<div >
						// 			<p >{item.name}</p>
						// 			{item.id === objectData.contrAgents?.find((obj) => obj.id === item.id)?.id}
						// 		</div>
						// 	)
						// }}
						disabled={loading}
					/>
				</List.Item>
				{/* <ListItem>
					<ListItem.Title>Комментарий:</ListItem.Title>
					<ListItem.Input
						placeholder={comment || 'Комментарий'}
						value={comment}
						onChangeText={setObjectComment}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</ListItem> */}
			</div>
			{error && (
				<>
					<Divider />
					<p style={{ color: 'red' }}>{error}</p>
				</>
			)}
		</Card>
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
