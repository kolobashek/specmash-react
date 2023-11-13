import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IShift } from '../../store/shiftsStore'
import { ShiftForm } from './ShiftForm'
import { IContrAgent } from '../../store/contrAgentStore'
import { useNavigate, useParams } from 'react-router-dom'
import { FloatButton } from 'antd'

export const ShiftEdit = observer(() => {
	const {
		createShift,
		clearShiftData,
		setShiftData,
		shiftData,
		getShiftById,
		setCurrentShift,
		updateShift,
	} = store.shifts
	const { id } = useParams()
	const shiftId = Number(id)
	const linkTo = useNavigate()
	const [loading, setLoading] = useState(false)
	const [updateError, setCreateError] = useState('')
	const [allContAgents, setAllContAgents] = useState([] as IContrAgent[])
	const { getContrAgents } = store.contrAgents

	useEffect(() => {
		const start = async () => {
			const objFromApi = await getShiftById(shiftId)
			if (objFromApi instanceof Error) {
				return linkTo(`/workplaces/shifts/${shiftId}`)
			}
			const contrAgentsFromApi = await getContrAgents()
			if (contrAgentsFromApi instanceof Error) {
				return
			}
			setAllContAgents(contrAgentsFromApi)
			setShiftData(objFromApi)
		}
		start()
	}, [])

	const cancelHandler = () => {
		linkTo(`/workplaces/shifts/${shiftId}`)
	}
	const createShiftSubmit = async () => {
		setLoading(true)
		const updatedShift = await updateShift({ id: shiftId, ...shiftData })
		if (updatedShift instanceof Error) {
			console.log(updatedShift)
			setCreateError(updatedShift.message)
			setLoading(false)
			return updatedShift
		}
		setCreateError('')
		setCurrentShift(updatedShift)
		setLoading(false)
		return linkTo(`/shifts/${updatedShift.id}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<ShiftForm shiftId={shiftId} error={updateError} loading={loading} />
			<FloatButton
				// visible={!loading}
				onClick={createShiftSubmit}
				// placement='left'
				// icon={{ name: 'check', color: 'white' }}
				// color='green'
			/>
			<FloatButton
				// visible={!loading}
				onClick={cancelHandler}
				// placement='right'
				// icon={{ name: 'cancel', color: 'white' }}
				// color='red'
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
