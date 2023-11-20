import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IWorkPlace } from '../../store/workPlaceStore'
import { WorkPlaceForm } from './WorkPlaceForm'
import { IPartner } from '../../store/partnerStore'
import { FloatButton } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

export const WorkPlaceEdit = observer(({ navigation }: any) => {
	const linkTo = useNavigate()
	const { id } = useParams()
	const {
		createWorkPlace,
		clearWorkPlaceData,
		setWorkPlaceData,
		workPlaceData,
		getWorkPlaceById,
		setCurrentWorkPlace,
		updateWorkPlace,
	} = store.workPlaces
	const workPlaceId = Number(id)
	console.log(navigation.getState().routes)
	const [loading, setLoading] = useState(false)
	const [updateError, setCreateError] = useState('')
	const [allContAgents, setAllContAgents] = useState([] as IPartner[])
	const { getPartners } = store.partners

	useEffect(() => {
		const start = async () => {
			const objFromApi = await getWorkPlaceById(workPlaceId)
			if (objFromApi instanceof Error) {
				return linkTo(`/workplaces/workPlaces/${workPlaceId}`)
			}
			const partnersFromApi = await getPartners()
			if (partnersFromApi instanceof Error) {
				return
			}
			setAllContAgents(partnersFromApi)
			setWorkPlaceData(objFromApi)
		}
		start()
	}, [])

	const cancelHandler = () => {
		linkTo(`/workplaces/workPlaces/${workPlaceId}`)
	}
	const createWorkPlaceSubmit = async () => {
		setLoading(true)
		const updatedWorkPlace = await updateWorkPlace({ id: workPlaceId, ...workPlaceData })
		if (updatedWorkPlace instanceof Error) {
			console.log(updatedWorkPlace)
			setCreateError(updatedWorkPlace.message)
			setLoading(false)
			return updatedWorkPlace
		}
		setCreateError('')
		setCurrentWorkPlace(updatedWorkPlace)
		setLoading(false)
		return linkTo(`/workPlaces/${updatedWorkPlace.id}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<WorkPlaceForm workPlaceId={workPlaceId} error={updateError} loading={loading} />
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
