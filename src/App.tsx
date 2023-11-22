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
} from 'react-router-dom'
import { Button, Drawer, Radio, Space, Layout, Breadcrumb } from 'antd'
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

const { auth } = store
const { Header, Footer, Sider, Content } = Layout
const setTitle = (title: string) => {
	document.title = title || ''
}
const AppLayout = observer(({ children }: { children?: React.ReactNode }) => {
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
	return (
		<>
			<Layout>
				<Header style={headerStyle}>
					<Space>
						<Button type='text' size='large' onClick={showDrawer}>
							<MenuOutlined style={{ color: 'white' }} />
						</Button>
					</Space>
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
})

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		loader() {
			// Our root route always provides the user, if logged in
			return { user: auth.isAuthenticated }
		},
		element: <AppLayout />,
		children: [
			{
				index: true,
				element: <PublicPage />,
			},
			{
				path: 'login',
				// action: loginAction,
				loader: loginLoader,
				element: <ScreenLogin />,
			},
			{
				path: 'register',
				// action: loginAction,
				loader: loginLoader,
				element: <ScreenRegister />,
			},
			{
				path: 'users',
				loader: protectedLoader,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <UsersList />,
					},
					{
						path: ':id',
						loader: protectedLoader,
						element: <UserCard />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <UserEdit />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <UserNew />,
					},
				],
			},
			{
				path: 'workPlaces',
				loader: protectedLoader,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <WorkPlacesList />,
					},
					{
						path: ':id',
						loader: protectedLoader,
						element: <WorkPlaceCard />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <WorkPlaceEdit />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <WorkPlaceNew />,
					},
				],
			},
			{
				path: 'contragents',
				loader: protectedLoader,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <PartnersList />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <PartnerNew />,
					},
					{
						path: ':id',
						loader: protectedLoader,
						element: <PartnerCard />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <PartnerEdit />,
					},
				],
			},
			{
				path: 'machines',
				loader: protectedLoader,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <MachinesList />,
					},
					{
						path: ':id',
						loader: protectedLoader,
						element: <MachineCard />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <MachineEdit />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <MachineNew />,
					},
				],
			},
			{
				path: 'shifts',
				loader: protectedLoader,
				element: <Outlet />,
				children: [
					{
						index: true,
						element: <ScreenShift />,
					},
					{
						path: ':id',
						loader: protectedLoader,
						element: <ScreenShift />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <ScreenShift />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <ScreenShift />,
					},
				],
			},
			{
				path: 'schedule',
				loader: protectedLoader,
				element: <ScreenSchedule />,
				children: [
					{
						path: ':id',
						loader: protectedLoader,
						element: <ScreenSchedule />,
					},
					{
						path: ':id/edit',
						loader: protectedLoader,
						element: <ScreenSchedule />,
					},
					{
						path: 'new',
						loader: protectedLoader,
						element: <ScreenSchedule />,
					},
				],
			},
			{
				path: 'info',
				loader: protectedLoader,
				element: <ScreenInfo />,
			},
		],
	},
	{
		path: '/logout',
		action() {
			// We signout in a "resource route" that we can hit from a fetcher.Form
			auth.signOut()
			return redirect('/')
		},
	},
])

export default function App() {
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
}

async function loginLoader({ request }: LoaderFunctionArgs) {
	if (auth.isAuthenticated) {
		const params = new URLSearchParams()
		params.set('from', new URL(request.url).pathname)
		return redirect('/login?' + params.toString())
	}
	return null
}

function PublicPage() {
	return <h3>Public</h3>
}

async function protectedLoader({ request }: LoaderFunctionArgs) {
	// If the user is not logged in and tries to access `/protected`, we redirect
	// them to `/login` with a `from` parameter that allows login to redirect back
	// to this page upon successful authentication
	const authStatus = await auth.getUserByAsyncStorage()
	if (!authStatus) {
		const params = new URLSearchParams()
		params.set('from', new URL(request.url).pathname)
		return redirect('/login?' + params.toString())
	}
	return null
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
