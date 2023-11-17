import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IObject } from '../../store/objectStore'
import { ObjectForm } from './ObjectForm'
import { IContrAgent } from '../../store/contrAgentStore'
import { FloatButton } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

export const ObjectEdit = observer(({ navigation }: any) => {
	const linkTo = useNavigate()
	const { id } = useParams()
	const {
		createObject,
		clearObjectData,
		setObjectData,
		objectData,
		getObjectById,
		setCurrentObject,
		updateObject,
	} = store.objects
	const objectId = Number(id)
	console.log(navigation.getState().routes)
	const [loading, setLoading] = useState(false)
	const [updateError, setCreateError] = useState('')
	const [allContAgents, setAllContAgents] = useState([] as IContrAgent[])
	const { getContrAgents } = store.contrAgents

	useEffect(() => {
		const start = async () => {
			const objFromApi = await getObjectById(objectId)
			if (objFromApi instanceof Error) {
				return linkTo(`/workplaces/objects/${objectId}`)
			}
			const contrAgentsFromApi = await getContrAgents()
			if (contrAgentsFromApi instanceof Error) {
				return
			}
			setAllContAgents(contrAgentsFromApi)
			setObjectData(objFromApi)
		}
		start()
	}, [])

	const cancelHandler = () => {
		linkTo(`/workplaces/objects/${objectId}`)
	}
	const createObjectSubmit = async () => {
		setLoading(true)
		const updatedObject = await updateObject({ id: objectId, ...objectData })
		if (updatedObject instanceof Error) {
			console.log(updatedObject)
			setCreateError(updatedObject.message)
			setLoading(false)
			return updatedObject
		}
		setCreateError('')
		setCurrentObject(updatedObject)
		setLoading(false)
		return linkTo(`/objects/${updatedObject.id}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<ObjectForm objectId={objectId} error={updateError} loading={loading} />
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
