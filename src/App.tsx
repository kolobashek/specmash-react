import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import {
	Link,
	Outlet,
	RouterProvider,
	createBrowserRouter,
	redirect,
	useFetcher,
	LoaderFunctionArgs,
	useLocation,
	RouteObject,
	DataRouteObject,
} from 'react-router-dom'
import { Button, Drawer, Radio, Space, Layout, Breadcrumb, Col, Row, Flex } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import store from './store'
import {
	ScreenRegister,
	ScreenLogin,
	ScreenShift,
	ScreenInfo,
	PartnersList,
	UsersList,
	PartnerCard,
	MachinesList,
	MachineCard,
	MachineEdit,
	MachineNew,
	ScreenSchedule,
	PartnerEdit,
	PartnerNew,
	UserNew,
	UserEdit,
	WorkPlacesList,
	WorkPlaceEdit,
	WorkPlaceNew,
	WorkPlaceCard,
	UserCard,
} from './components'
import { DefaultHeaderContent } from './components/UIkit'
import _ from 'lodash'
import { IRouteMap, routerArray } from './services/routes'

const { auth } = store
const { Header, Footer, Sider, Content } = Layout
// function isArrayWithLength(arr: Array<any>) {
// 	return Array.isArray(arr) && arr.length
// }
// const getAllowedRoutes = observer(() => {
// 	const roles = JSON.parse(localStorage.getItem('roles'))
// 	return routerArray.filter(({ permission }) => {
// 		if (!permission) return true
// 		else if (!isArrayWithLength(permission)) return true
// 		else return intersection(permission, roles).length
// 	})
// })

const App = observer(() => {
	const AppLayout = ({ children }: { children?: React.ReactNode }) => {
		const { headerContent } = store
		useEffect(() => {
			const checkAuth = async () => {
				await store.auth.getUserByAsyncStorage()
			}
			checkAuth()
		}, [])
		const [open, setOpen] = useState(false)

		const showDrawer = () => {
			setOpen(true)
		}

		const onClose = () => {
			setOpen(false)
		}
		const AuthStatus = () => {
			// Get our logged in user, if they exist, from the root route loader data
			// const { user } = useRouteLoaderData('root') as { user: string | null }
			const fetcher = useFetcher()
			const { isAuthenticated, currentUser } = store.auth
			if (!isAuthenticated) {
				return (
					<Link to='/login'>
						<Button type='primary' onClick={onClose}>
							Войти
						</Button>
					</Link>
				)
			}
			const isLoggingOut = fetcher.formData != null

			return (
				<div>
					<p>Welcome {currentUser.name}!</p>
					<fetcher.Form method='post' action='/logout'>
						<Button type='primary' htmlType='submit' disabled={isLoggingOut}>
							{isLoggingOut ? 'Signing out...' : 'Sign out'}
						</Button>
					</fetcher.Form>
				</div>
			)
		}
		const HeaderContent = () => {
			return (
				<Row>
					<Col span={2}>
						<Button type='text' size='large' onClick={showDrawer}>
							<MenuOutlined style={{ color: 'white' }} />
						</Button>
					</Col>
					<Col span={22}>
						<DefaultHeaderContent />
					</Col>
				</Row>
			)
		}
		return (
			<>
				<Layout>
					<Header style={headerStyle}>
						<HeaderContent />
					</Header>
					<Layout>
						<Content style={contentStyle}>
							{children}
							<Outlet />
						</Content>
					</Layout>
					<Footer style={footerStyle}>Footer</Footer>
				</Layout>
				<Drawer
					title='СПЕЦМАШ'
					placement={'left'}
					width={500}
					onClose={onClose}
					open={open}
					extra={
						<Space>
							<Button onClick={onClose}>Cancel</Button>
							<Button type='primary' onClick={onClose}>
								OK
							</Button>
						</Space>
					}
					footer={<AuthStatus />}
				>
					{/* <p>Some contents...</p> */}
					<p>
						<Link to='/' onClick={onClose}>
							На главную
						</Link>
					</p>
					{auth.hasRoles('admin', 'manager') && (
						<>
							<p>
								<Link to='/users' onClick={onClose}>
									Пользователи
								</Link>
							</p>
							<p>
								<Link to='/machines' onClick={onClose}>
									Машины
								</Link>
							</p>
							<p>
								<Link to='/contragents' onClick={onClose}>
									Контрагенты
								</Link>
							</p>
							<p>
								<Link to='/workPlaces' onClick={onClose}>
									Объекты
								</Link>
							</p>
						</>
					)}
					{auth.hasRoles('admin', 'manager', 'driver') && (
						<>
							<p>
								<Link to='/shifts' onClick={onClose}>
									Смены
								</Link>
							</p>
							<p>
								<Link to='/schedule' onClick={onClose}>
									Расписание
								</Link>
							</p>
							<p>
								<Link to='/info' onClick={onClose}>
									Информация
								</Link>
							</p>
						</>
					)}
				</Drawer>
			</>
		)
	}
	const RoutesToRouteObjectsParse = (): DataRouteObject[] => {
		const traverse = (data: IRouteMap): DataRouteObject => {
			if (data && typeof data === 'object') {
				if (data.id === 'root')
					_.assign(data, {
						Component: AppLayout,
						loader() {
							return { user: auth.isAuthenticated }
						},
					})
				if (data.loader === 'loginLoader') _.assign(data, { loader: loginLoader })
				if (data.loader === 'protectedLoader') _.assign(data, { loader: protectedLoader })
				if (data.loader === 'logoutLoader')
					_.assign(data, {
						loader: undefined,
						action() {
							// We signout in a "resource route" that we can hit from a fetcher.Form
							auth.signOut()
							return redirect('/')
						},
					})
				// console.log(data.path, typeof data.loader)
				return {
					...data,
					children: data.children ? data.children.map(traverse) : undefined,
				} as DataRouteObject
			}
			console.log('neponyatnaya data', data)
			return data
		}
		const result = routerArray.map(traverse)
		console.log(result)
		if (Array.isArray(result)) return result
		else return [result]
	}
	const router = createBrowserRouter(RoutesToRouteObjectsParse())
	return (
		<RouterProvider
			router={router}
			fallbackElement={
				<AppLayout>
					<p>Initial Load...</p>
				</AppLayout>
			}
		/>
	)
})

async function loginLoader({ request, params, context }: LoaderFunctionArgs) {
	if (auth.isAuthenticated) {
		const params = new URLSearchParams()
		params.set('from', new URL(request.url).pathname)
		return redirect('/login?' + params.toString())
	}
	return null
}

export function PublicPage() {
	return <h3>Public</h3>
}
export default App

async function protectedLoader({ request }: LoaderFunctionArgs) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	const authStatus = await auth.getUserByAsyncStorage()
	if (authStatus instanceof Error) {
		const params = new URLSearchParams()
		params.set('from', new URL(request.url).pathname)
		return redirect('/login?' + params.toString())
	}
	// const result = _.some(authStatus.roles, (item) => {
	// 	return _.includes(context.roles as string[], item.name)
	// })
	if (authStatus) {
		return null
	}
	return redirect('/public')
}

const headerStyle: React.CSSProperties = {
	// textAlign: 'center',
	color: '#fff',
	height: 64,
	paddingInline: 10,
	lineHeight: '64px',
	backgroundColor: '#7dbcea',
}

const contentStyle: React.CSSProperties = {
	textAlign: 'center',
	minHeight: window.innerHeight - 64 - 66,
	lineHeight: '120px',
	// color: '#fff',
	// backgroundColor: '#108ee9',
}

const footerStyle: React.CSSProperties = {
	textAlign: 'center',
	color: '#fff',
	backgroundColor: '#7dbcea',
}
