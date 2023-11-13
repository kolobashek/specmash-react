import React, { useEffect, useState } from 'react'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IObject } from '../../store/objectStore'
import { ObjectForm } from './ObjectForm'
import { IContrAgent } from '../../store/contrAgentStore'
import { FloatButton } from 'antd'

export const ObjectNew = observer(() => {
	const { createObject, clearObjectData, objectData } = store.objects

	const [loading, setLoading] = useState(false)
	const [updateError, setCreateError] = useState('')

	const cancelHandler = () => {
		// linkTo(`/workplaces/objects`)
	}
	const createObjectSubmit = async () => {
		setLoading(true)
		const createdObject = await createObject(objectData)
		if (createdObject instanceof Error) {
			console.log(createdObject)
			setCreateError(createdObject.message)
			setLoading(false)
			return createdObject
		}
		clearObjectData()
		setCreateError('')
		setLoading(false)
		// return linkTo(`/workplaces/objects/${createdObject.id}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<ObjectForm error={updateError} loading={loading} />
			<FloatButton
				// visible={!loading}
				onClick={createObjectSubmit}
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
