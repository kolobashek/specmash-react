import React from 'react'
import { observer } from 'mobx-react-lite'
import store from '../store'

export const InfoScreen = observer(() => {
	return (
		<div>
			<p>INFO</p>

			<a
				href='#'
				title='Отменить регистрацию'
				// onPress={() => {
				// 	// store.setRegistrationMessage('')
				// }}
			/>
		</div>
	)
})
