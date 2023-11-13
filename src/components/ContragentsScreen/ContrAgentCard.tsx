import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FloatButton, Card, List, Typography } from 'antd'
import store from '../../store'
import { observer } from 'mobx-react-lite'
import { StickyHeader } from '../UIkit'
import { localizedRoleName } from '../../utils'
import { IContrAgent } from '../../store/contrAgentStore'

export const ContrAgentCard = observer(() => {
	const navigate = useNavigate()
	const { id } = useParams()
	const { Text } = Typography
	const {
		// currentContrAgent,
		// setCurrentContrAgent,
		getContrAgentById,
		getContrAgents,
		updateContrAgent,
		clearContrAgentData,
		setContrAgentData,
		contrAgentData,
	} = store.contrAgents
	const contrAgentId = Number(id)
	useEffect(() => {
		const contrAgent = async () => {
			const input = await getContrAgentById(contrAgentId)
			if (input instanceof Error) {
				return new Error('Unable to fetch user')
			}
			setContrAgentData(input)
		}
		contrAgent()
	}, [])

	const [visibleEditButton, setVisibleEditButton] = useState(true)
	const [loading, setLoading] = useState(false)
	const [updateError, setUpdateError] = useState('')

	const editContrAgentHandler = () => {
		navigate(`/workplaces/contragents/${contrAgentId}/edit`)
	}
	const editContrAgentSubmit = async (id: number) => {
		setLoading(true)
		const newContrAgent = await updateContrAgent({ id, ...contrAgentData })
		if (newContrAgent instanceof Error) {
			console.log(newContrAgent)
			setUpdateError(newContrAgent.message)
			setLoading(false)
			return null
		}
		setUpdateError('')
		// setCurrentContrAgent(newContrAgent)
		setVisibleEditButton(true)
		setLoading(false)
		clearContrAgentData()
		return newContrAgent
	}
	if (!contrAgentData) return <p>Что-то пошло не так.</p>
	return (
		<>
			<Card title={`${contrAgentData.name}`}>
				<p>
					<Text>Адрес:</Text>
					<Text>{`${contrAgentData.address ? contrAgentData.address : ''}`}</Text>
				</p>
			</Card>
			{/* <FloatButton
				visible={visibleEditButton}
				onPress={editContrAgentHandler}
				placement='right'
				color='green'
			/> */}
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
