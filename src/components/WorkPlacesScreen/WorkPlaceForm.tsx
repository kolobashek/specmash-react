import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { localizedRoleName } from '../../utils'
import { IWorkPlaceData } from '../../store/workPlaceStore'
import { IWorkPlace } from '../../store/workPlaceStore'
import { IPartner } from '../../store/partnerStore'
import { Card, Divider, Input, List, Select } from 'antd'
import Title from 'antd/es/typography/Title'

type Props = {
	workPlaceId?: number
	// setWorkPlaceData: (workPlace: IWorkPlaceData) => void
	// partnerVariants: IPartner[]
	loading?: boolean
	error?: string
}

export const WorkPlaceForm = observer(({ workPlaceId, loading, error }: Props) => {
	const { setWorkPlaceData, workPlaceData, getWorkPlaceById } = store.workPlaces
	const { getPartners } = store.partners
	// const [name, setWorkPlaceName] = useState(workPlaceData.name)
	// const [contacts, setWorkPlaceContacts] = useState(workPlaceData.contacts)
	// const [address, setWorkPlaceAddress] = useState(workPlaceData.address)
	// // const [comment, setWorkPlaceComment] = useState(workPlaceData.comment)
	// const [partners, setWorkPlacePartners] = useState(workPlaceData.partners || [])
	const { name, contacts, address, partners } = workPlaceData
	const [allPartners, setAllPartners] = useState([] as IPartner[])
	const inputChange = (input: Partial<IWorkPlaceData>) => {
		setWorkPlaceData({
			...workPlaceData,
			...input,
		})
	}
	useEffect(() => {
		const start = async () => {
			const cAFromApi = await getPartners()
			if (cAFromApi instanceof Error) {
				return
			}
			setAllPartners(cAFromApi)
			if (workPlaceId) {
				const initialData = await getWorkPlaceById(workPlaceId)
				setWorkPlaceData(initialData)
			}
		}
	}, [])
	return (
		<Card
			title={
				`${workPlaceData.name}` +
				(workPlaceData.partners?.length
					? ` //${workPlaceData.partners.map((ca) => ca.name).join(', ')}`
					: '')
			}
		>
			<Divider />
			<div>
				<List.Item>
					<Title>Наименование:</Title>
					<Input
						placeholder={workPlaceData.name || 'Наименование'}
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
						options={allPartners}
						placeholder={partners.map((obj) => obj.name).join(', ') || 'Выберите контрагентов'}
						value={partners.map((obj) => obj.name)}
						onChange={(value: string[]) => {
							const selectedCAs = allPartners.filter((ca) => value.includes(String(ca.id)))
							if (selectedCAs.length > 0) {
								inputChange({ partners: selectedCAs })
							} else {
								inputChange({ partners: [] })
							}
						}}
						// optionRender={(item) => {
						// 	return (
						// 		<div >
						// 			<p >{item.name}</p>
						// 			{item.id === workPlaceData.partners?.find((obj) => obj.id === item.id)?.id}
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
						onChangeText={setWorkPlaceComment}
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
