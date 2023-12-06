import { AuthStore } from 'store/authStore'
import { IUser } from 'store/usersStore'

jest.mock('services/api/graphql', () => ({
	graphqlRequest: jest.fn(),
	setAuthTokenHeader: jest.fn(),
}))
import { graphqlRequest } from 'services/api/graphql'
const mockedGraphqlRequest = jest.mocked(graphqlRequest)
describe('AuthStore', () => {
	// const auth = { ...store.auth }
	let auth: AuthStore
	beforeEach(() => {
		auth = new AuthStore()
	})
	const mockUser: IUser = {
		id: expect.any(Number),
		name: expect.any(String),
		phone: expect.any(String),
		roles: [{ id: expect.any(Number), name: expect.any(String) }],
	}
	const mockedMeResponse = {
		me: {
			id: 1,
			name: 'John Doe',
			phone: '87946213',
			roles: [{ id: 1, name: 'User' }],
		},
	}

	describe('getUserByToken', () => {
		it('should call graphqlRequest with token and return user', async () => {
			// Mock graphql request
			mockedGraphqlRequest.mockResolvedValueOnce(mockedMeResponse)

			// Call method
			const user = (await graphqlRequest('123')) as { me: IUser }

			// Assertions
			expect(mockedGraphqlRequest).toBeCalledTimes(1)
			expect(user.me).toEqual(mockUser)
		})

		it('should set user and isAuthenticated when valid token provided', async () => {
			mockedGraphqlRequest.mockResolvedValueOnce(mockedMeResponse)
			await auth.getUserByToken('valid token')

			expect(auth.currentUser).toStrictEqual(mockUser)
			expect(auth.getIsAuthenticated()).toBe(true)
		})

		it('should return user from async storage if authenticated', async () => {
			auth.isAuthenticated = true
			auth.currentUser = mockUser

			const result = await auth.getUserByAsyncStorage()

			expect(result).toEqual(mockUser)
		})
		it('should not set user and isAuthenticated when invalid token provided', async () => {
			// mock failed API response
			mockedGraphqlRequest.mockRejectedValueOnce('Invalid token')

			// Call method
			await auth.getUserByToken('Invalid token')

			expect(auth.isAuthenticated).toBe(false)
			expect(auth.currentUser).toEqual({ roles: [{}] })
		})
	})
})
