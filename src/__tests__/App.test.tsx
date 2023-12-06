// app.test.js
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router-dom'
import { LocationDisplay, routesConfig } from 'services/routes'

test('должен показывать fallback при загрузке', async () => {
	const router = createMemoryRouter(routesConfig, {
		initialEntries: ['/users'],
	})

	const { findByText } = render(<RouterProvider router={router} />)

	expect(await findByText('Oops!')).toBeInTheDocument()
	// make assertions, await changes, etc...
})

test('rendering a component that uses useLocation', async () => {
	const route = '/'

	// use <MemoryRouter> when you want to manually control the history
	render(
		<MemoryRouter initialEntries={[route]}>
			<LocationDisplay />
		</MemoryRouter>
	)

	// verify location display is rendered
	expect(await screen.getByTestId('location-display')).toHaveTextContent(route)
})
