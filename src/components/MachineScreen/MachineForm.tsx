import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IMachineData, MachineType } from '../../store/machinesStore'
import { Button, Card, Divider, Form, Input, List, Select, Space } from 'antd'
import Title from 'antd/es/typography/Title'
import { useNavigate, useParams } from 'react-router-dom'

export const MachineForm = observer(() => {
	const { id } = useParams()
	const machineId = Number(id)
	const linkTo = useNavigate()
	const {
		machineData,
		setMachineData,
		getMachineById,
		getMachineTypes,
		createMachine,
		clearMachineData,
	} = store.machines
	const [loading, setLoading] = useState(false)
	const [formError, setFormError] = useState('')
	const [name, setMachineName] = useState(machineData.name)
	const [types, setMachineTypes] = useState([] as MachineType[])
	const [weight, setMachineWeight] = useState(machineData.weight)
	const [nickname, setMachineNickname] = useState(machineData.nickname)
	const [licensePlate, setMachineLicensePlate] = useState(machineData.licensePlate)
	useEffect(() => {
		const start = async () => {
			const allTypes = await getMachineTypes()
			if (allTypes instanceof Error) {
				setFormError(allTypes.message)
				return
			}
			setMachineTypes(allTypes)
			if (machineId) {
				const currentMachine = await getMachineById(machineId)
				if (currentMachine instanceof Error) {
					return
				}
				setMachineData(currentMachine)
			}
		}
		start()
	}, [machineId])
	const inputChange = (input: Partial<IMachineData>) => {
		setMachineData({
			...machineData,
			...input,
		})
	}
	const submitHandler = async (e: any) => {
		setLoading(true)
		const createdMachine = await createMachine(machineData)
		if (createdMachine instanceof Error) {
			console.log(createdMachine)
			setFormError(createdMachine.message)
			setLoading(false)
			return createdMachine
		}
		clearMachineData()
		setFormError('')
		setLoading(false)
		return linkTo(`/machines/${createdMachine.id}`)
	}
	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}
	const changeTypeHandler = (value: any, options: any) => {
		// console.log(value, options)
		setMachineData({ type: options })
	}
	return (
		<Form
			name='machine'
			labelCol={{ span: 8 }}
			wrapperCol={{ span: 16 }}
			style={{ maxWidth: 600 }}
			initialValues={{ remember: true }}
			onFinish={submitHandler}
			onFinishFailed={onFinishFailed}
			autoComplete='off'
		>
			<h1>
				{`${machineData.name || 'Новая машина'}` +
					(machineData.nickname.length ? `, ${machineData.nickname}` : '')}
			</h1>
			<Form.Item>{machineData.name}</Form.Item>
			<Divider />
			<div>
				<Form.Item label='Наименование:'>
					<Input
						placeholder={machineData.name || 'Наименование'}
						value={machineData.name}
						onChange={(e) => inputChange({ name: e.target.value })}
						disabled={loading}
					/>
				</Form.Item>
				{/* <Form.Item label='Телефон:'>
					<Input
						placeholder='Введите номер телефона'
						value={phone}
						onChange={(e) => inputChange({ phone: e.target.value })}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item> */}
				<Form.Item label='Позывной:'>
					<Input
						placeholder='Кличка'
						value={machineData.nickname}
						onChange={(e) => {
							inputChange({ nickname: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item>
				<Form.Item label='Тип техники:'>
					<Select
						// mode='multiple'
						// size={size}
						placeholder='Выберите тип'
						value={machineData.type.id || null}
						onChange={changeTypeHandler}
						style={{ width: '100%' }}
						options={types}
						fieldNames={{ label: 'name', value: 'id' }}
					/>
				</Form.Item>
				{/* <Form.Item label='Комментарий:'>
					<Input
						placeholder={comment || 'Комментарий'}
						value={comment}
						onChange={(e) => {
							inputChange({ comment: e.target.value })
						}}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</Form.Item> */}
			</div>
			{formError && (
				<>
					<Divider />
					<p style={{ color: 'red' }}>{formError}</p>
				</>
			)}
			<Form.Item>
				<Space>
					<Button
						type='primary'
						htmlType='submit'
						className='login-form-button'
						disabled={!machineData.name?.length}
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
