import React, { useEffect, useState } from 'react'
import store from '../../store'
import { useNavigate, useParams } from 'react-router-dom'
import { FloatButton } from 'antd'
import { observer } from 'mobx-react-lite'
import { ContrAgentForm } from './ContrAgentForm'

export const ContrAgentEdit = observer(() => {
	const navigate = useNavigate()
	const { id } = useParams()
	const contrAgentId = Number(id)
	const { updateContrAgent, contrAgentData } = store.contrAgents
	const [loading, setLoading] = useState(false)
	const [updateError, setUpdateError] = useState('')

	const createContrAgentSubmit = async () => {
		setLoading(true)
		const updatedContrAgent = await updateContrAgent({ id: contrAgentId, ...contrAgentData })
		if (updatedContrAgent instanceof Error) {
			console.log(updatedContrAgent)
			setUpdateError(updatedContrAgent.message)
			setLoading(false)
			return updatedContrAgent
		}
		setUpdateError('')
		// setCurrentContrAgent(updatedContrAgent)
		setLoading(false)
		return navigate(`/workplaces/contragents/${updatedContrAgent.id}`)
	}
	const cancelHandler = () => {
		navigate(`/workplaces/contragents/${contrAgentId}`)
	}
	if (loading) return <p>Loading...</p>
	return (
		<>
			<ContrAgentForm contrAgentId={contrAgentId} error={updateError} loading={loading} />
			<FloatButton onClick={createContrAgentSubmit} />
			<FloatButton onClick={cancelHandler} />
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
