import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IContrAgentData } from '../../store/contrAgentStore'
import { IObject } from '../../store/objectStore'
import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'

type Props = {
	contrAgentId?: number
	loading: boolean
	error: string
}

export const ContrAgentForm = observer(({ contrAgentId, loading, error }: Props) => {
	const {
		createContrAgent,
		clearContrAgentData,
		setContrAgentData,
		contrAgentData,
		getContrAgentById,
		// setCurrentContrAgent,
		updateContrAgent,
	} = store.contrAgents
	const { getObjects } = store.objects
	const [allObjects, setAllObjects] = useState([] as IObject[])
	const { name, contacts, address, comments, objects } = contrAgentData
	const inputChange = (input: Partial<IContrAgentData>) => {
		setContrAgentData({
			...contrAgentData,
			...input,
		})
	}
	useEffect(() => {
		const start = async () => {
			const objectsFromApi = await getObjects()
			if (objectsFromApi instanceof Error) {
				return
			}
			setAllObjects(objectsFromApi)
			if (contrAgentId) {
				const initialData = await getContrAgentById(contrAgentId)
				setContrAgentData(initialData)
			}
		}
		start()
	}, [])
	console.log(contrAgentData)
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	const handleChangeObject = (value: string[]) => {
		const selectedObjects = allObjects.filter((ca) => value.includes(String(ca.id)))
		if (selectedObjects.length > 0) {
			inputChange({ objects: selectedObjects })
		} else {
			inputChange({ objects: [] })
		}
	}
	return (
		<Form
			name='contrAgent'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<Form.Item>
				{`${contrAgentData.name}` +
					(contrAgentData.objects?.length
						? ` //${contrAgentData.objects.map((obj) => obj.name).join(', ')}`
						: '')}
			</Form.Item>
			<Divider />
			<div>
				<Form.Item label='Наименование:'>
					<Input
						placeholder={contrAgentData.name || 'Наименование'}
						value={name}
						onChange={(e) => inputChange({ name: e.target.value })}
						disabled={loading}
					/>
				</Form.Item>
				<Form.Item label='Адрес:'>
					<Input
						placeholder='Введите адрес - физический или юридический'
						value={address}
						onChange={(e) => inputChange({ address: e.target.value })}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
				<Form.Item label='Контакты:'>
					<Input
						placeholder='телефон, email, ФИО, должность'
						value={contacts}
						onChange={(e) => {
							inputChange({ contacts: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
				<Form.Item label='Тип:'>
					<Select
						mode='multiple'
						// size={size}
						placeholder='Please select'
						defaultValue={['a10', 'c12']}
						onChange={handleChangeObject}
						style={{ width: '100%' }}
						options={allObjects}
					/>
					{/* <MultiSelect
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={allObjects}
						search
						searchField='name'
						maxHeight={300}
						labelField={'name'}
						valueField={'id'}
						placeholder={objects.map((obj) => obj.name).join(', ') || 'Выберите объекты'}
						searchPlaceholder='Найти...'
						value={objects?.map((obj) => obj.name || '')}
						onChange={(value: string[]) => {
							const selectedObjects = allObjects.filter((ca) => value.includes(String(ca.id)))
							if (selectedObjects.length > 0) {
								inputChange({ objects: selectedObjects })
							} else {
								inputChange({ objects: [] })
							}
						}}
						renderLeftIcon={() => {
							return <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
						}}
						renderItem={(item) => {
							return (
								<div style={styles.item}>
									<p style={styles.textItem}>{item.name}</p>
									{item.id === contrAgentData.objects?.find((obj) => obj.id === item.id)?.id && (
										<AntDesign style={styles.icon} color='black' name='Safety' size={20} />
									)}
								</div>
							)
						}}
						disable={loading}
					/> */}
				</Form.Item>
				<Form.Item label='Комментарий:'>
					<Input
						placeholder={comments || 'Комментарий'}
						value={comments}
						onChange={(e) => {
							inputChange({ comments: e.target.value })
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
		</Form>
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
