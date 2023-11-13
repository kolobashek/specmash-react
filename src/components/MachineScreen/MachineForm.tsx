import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IMachineData, MachineType } from '../../store/machinesStore'
import { Card, Divider, Input, List } from 'antd'
import Title from 'antd/es/typography/Title'

type Props = {
	machineData: IMachineData
	setMachineData: (machine: IMachineData) => void
	types: MachineType[]
	loading?: boolean
	error?: string
}

export const MachineForm = ({ machineData, setMachineData, types, loading, error }: Props) => {
	const [name, setMachineName] = useState(machineData.name)
	const [type, setMachineType] = useState(machineData.type)
	const [weight, setMachineWeight] = useState(machineData.weight)
	const [nickname, setMachineNickname] = useState(machineData.nickname)
	const [licensePlate, setMachineLicensePlate] = useState(machineData.licensePlate)
	useEffect(() => {
		setMachineData({
			...machineData,
			name,
			type,
			weight,
			nickname,
			licensePlate,
		})
	}, [name, type, weight, nickname, licensePlate])
	return (
		<Card>
			<Title>
				{`${machineData.name}` + (machineData.nickname ? `, ${machineData.nickname}` : '')}
			</Title>
			<Divider />
			<div>
				<List.Item>
					<Title>Наименование:</Title>
					<Input
						placeholder={machineData.name || 'Наименование'}
						value={name}
						onChange={(e) => setMachineName(e.target.value)}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Позывной:</Title>
					<Input
						placeholder={nickname || 'Позывной'}
						value={nickname}
						onChange={(e) => setMachineNickname(e.target.value)}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Вес, кг:</Title>
					<Input
						placeholder='12000'
						value={weight}
						onChange={(e) => setMachineWeight(e.target.value)}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
				<List.Item>
					<Title>Тип: </Title>
					{/* <Dropdown
						style={styles.dropdown}
						placeholderStyle={styles.placeholderStyle}
						selectedTextStyle={styles.selectedTextStyle}
						inputSearchStyle={styles.inputSearchStyle}
						iconStyle={styles.iconStyle}
						data={types.map((type) => {
							return { label: type.name, value: type.id }
						})}
						search
						maxHeight={300}
						labelField='label'
						valueField='value'
						placeholder={type || 'Выберите тип'}
						searchPlaceholder='Search...'
						value={machineData.type}
						onChange={(type) => setMachineType(type.label)}
						renderLeftIcon={() => {
							return <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
						}}
						renderItem={(item) => {
							return (
								<div style={styles.item}>
									<p style={styles.textItem}>{item.label}</p>
									{item.label === machineData.type && (
										<AntDesign style={styles.icon} color='black' name='Safety' size={20} />
									)}
								</div>
							)
						}}
						disable={loading}
					/> */}
				</List.Item>
				<List.Item>
					<Title>Гос. номер:</Title>
					<Input
						placeholder='А 000 АА 000'
						value={licensePlate}
						onChange={(e) => setMachineLicensePlate(e.target.value)}
						disabled={loading}
						style={{ textAlign: 'left' }}
					/>
				</List.Item>
			</div>
			{error && (
				<>
					<Divider />
					<p style={{ color: 'red' }}>{error}</p>
				</>
			)}
		</Card>
	)
}

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
