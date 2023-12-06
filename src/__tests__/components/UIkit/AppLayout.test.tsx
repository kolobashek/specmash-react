import React from 'react'
import { render, screen } from '@testing-library/react'
import { AppLayout } from 'components/UIkit/AppLayout'
import store from 'store'

describe('AppLayout', () => {
	it('renders correctly', () => {
		render(<AppLayout />)

		expect(screen.getByRole('header')).toBeInTheDocument()
		expect(screen.getByRole('contentinfo')).toBeInTheDocument()
	})

	it('calls getUserByAsyncStorage on mount', () => {
		const mockGetUser = jest.fn()
		jest.spyOn(store.auth, 'getUserByAsyncStorage').mockImplementation(mockGetUser)

		render(<AppLayout />)

		expect(mockGetUser).toHaveBeenCalledTimes(1)
	})
})
