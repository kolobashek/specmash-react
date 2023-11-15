import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import type { LoaderFunctionArgs } from 'react-router-dom'
import {
	RegisterScreen,
	LoginScreen,
	ShiftScreen,
	InfoScreen,
	ContrAgentsList,
	UsersList,
	ContrAgentCard,
	MachinesList,
	MachineCard,
	MachineEdit,
	MachineNew,
	ScheduleScreen,
	ContrAgentEdit,
	ContrAgentNew,
} from './components'
import {
	Form,
	Link,
	Outlet,
	RouterProvider,
	createBrowserRouter,
	redirect,
	useActionData,
	useFetcher,
	useLocation,
	useNavigation,
	useRouteLoaderData,
} from 'react-router-dom'
import { Button, Drawer, Radio, Space, Layout } from 'antd'

import type { DrawerProps } from 'antd/es/drawer'
import type { RadioChangeEvent } from 'antd/es/radio'
import store from './store'
import { MenuOutlined } from '@ant-design/icons'

const { auth } = store
const { Header, Footer, Sider, Content } = Layout

const router = createBrowserRouter([
	{
		id: 'root',
		path: '/',
		loader() {
			// Our root route always provides the user, if logged in
			return { user: auth.isAuthenticated }
		},
		Component: AppLayout,
		children: [
			{
				index: true,
				Component: PublicPage,
			},
			{
				path: 'login',
				// action: loginAction,
				loader: loginLoader,
				Component: LoginScreen,
			},
			{
				path: 'register',
				// action: loginAction,
				loader: loginLoader,
				Component: RegisterScreen,
			},
			{
				path: 'protected',
				loader: protectedLoader,
				Component: ProtectedPage,
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
	return <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
}

function AppLayout() {
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
	return (
		<>
			<Layout>
				<Header style={headerStyle}>
					<Space>
						<Button type='text' size='large' onClick={showDrawer}>
							<MenuOutlined style={{ color: 'white' }} />
						</Button>
						Спецмаш
					</Space>
				</Header>
				<Layout>
					<Content style={contentStyle}>
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
			>
				<p>Some contents...</p>
				<p>
					<Link to='/' onClick={onClose}>
						Public Page
					</Link>
				</p>
				<p>
					<Link to='/protected' onClick={onClose}>
						Protected Page
					</Link>
				</p>
				<AuthStatus />
			</Drawer>
		</>
	)
}

const AuthStatus = () => {
	// Get our logged in user, if they exist, from the root route loader data
	// const { user } = useRouteLoaderData('root') as { user: string | null }
	const fetcher = useFetcher()
	const { isAuthenticated, currentUser } = store.auth
	if (!isAuthenticated) {
		return <p>You are not logged in.</p>
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
	if (!auth.isAuthenticated) {
		const params = new URLSearchParams()
		params.set('from', new URL(request.url).pathname)
		return redirect('/login?' + params.toString())
	}
	return null
}

function ProtectedPage() {
	return <h3>Protected</h3>
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

// // import React from 'react';
// // import logo from './logo.svg';
// import './App.css'

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.tsx</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useEffect, useState } from 'react'
// // import { StatusBar } from 'expo-status-bar'
// // import { createDrawerNavigator } from '@react-navigation/drawer'
// // import { createStackNavigator } from '@react-navigation/stack'
// // import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import {
// 	Form,
// 	Link,
// 	Outlet,
// 	RouterProvider,
// 	createBrowserRouter,
// 	redirect,
// 	useActionData,
// 	useFetcher,
// 	useLocation,
// 	useNavigation,
// 	useRouteLoaderData,
// } from 'react-router-dom'
// import * as ReactDOM from 'react-dom/client'
// import store from './store'
// import {
// 	RegisterScreen,
// 	LoginScreen,
// 	ShiftScreen,
// 	InfoScreen,
// 	ContrAgentsList,
// 	UsersList,
// 	ContrAgentCard,
// 	MachinesList,
// 	MachineCard,
// 	MachineEdit,
// 	MachineNew,
// 	ScheduleScreen,
// 	ContrAgentEdit,
// 	ContrAgentNew,
// } from './components'
// import { UserCard, UserEdit, UserNew } from './components/UsersScreen'
// // import * as Device from 'expo-device'
// import { ObjectCard, ObjectsList } from './components/ObjectsScreen'
// import { ObjectEdit } from './components/ObjectsScreen/ObjectEdit'
// import { ObjectNew } from './components/ObjectsScreen/ObjectNew'
// import { ShiftNew } from './components/TableScreen/ShiftNew'
// import { ShiftEdit } from './components/TableScreen/ShiftEdit'
// import { ShiftCard } from './components/TableScreen/ShiftCard'

// // const Stack = createStackNavigator<RootStackParamList>()
// // const AuthStack = createStackNavigator<AuthStackParamList>()
// // const Drawer = createDrawerNavigator<HomeDrawerParamList>()
// // const UsersStack = createStackNavigator<UsersStackParamList>()
// // const ContrAgentsStack = createStackNavigator<ContrAgentsStackParamList>()
// // const ObjectStack = createStackNavigator<ObjectStackParamList>()
// // const ObjectsTab = createBottomTabNavigator<WorkPlacesTabParamList>()
// // const MachinesStack = createStackNavigator<MachinesStackParamList>()
// // const ShiftStack = createStackNavigator<ShiftStackParamList>()
// // const prefix = Linking.createURL('/')

// const REGISTER_SCREEN = 'register'
// const LOGIN_SCREEN = 'login'
// const INFO_SCREEN = 'info'
// const CONTRAGENTS_SCREEN = 'contragents'
// const SHIFTS_SCREEN = 'shifts'
// const MACHINES_SCREEN = 'machines'
// const USERS_SCREEN = 'users'
// const WORK_PLACES_SCREEN = 'workplaces'
// const OBJECTS_SCREEN = 'objects'
// const AUTH_SCREEN = 'auth'
// const SCHEDULE_SCREEN = 'schedule'

// const App = observer(() => {
// 	// const url = Linking.useURL()
// 	const pathname = null
// 	const [loading, setLoading] = useState(false)
// const linking: LinkingOptions<RootStackParamList> = {
// 	prefixes: [prefix],
// 	config: {
// 		screens: {
// 			Спецмаш: {
// 				initialRouteName:
// 					pathname ===
// 					(MACHINES_SCREEN ||
// 						INFO_SCREEN ||
// 						CONTRAGENTS_SCREEN ||
// 						SHIFTS_SCREEN ||
// 						USERS_SCREEN ||
// 						WORK_PLACES_SCREEN ||
// 						MACHINES_SCREEN)
// 						? pathname
// 						: SHIFTS_SCREEN,
// 				path: '/',
// 				screens: {
// 					shifts: {
// 						path: SHIFTS_SCREEN,
// 						screens: {
// 							ShiftScreen: '',
// 							ShiftNew: 'new',
// 							ShiftDetails: {
// 								path: '/:id',
// 							},
// 							ShiftEdit: {
// 								path: '/:id/edit',
// 							},
// 						},
// 					},
// 					machines: {
// 						path: MACHINES_SCREEN,
// 						screens: {
// 							MachinesList: '',
// 							MachineNew: 'new',
// 							MachineDetails: {
// 								path: '/:id',
// 							},
// 							MachineEdit: {
// 								path: '/:id/edit',
// 							},
// 						},
// 					},
// 					users: {
// 						path: USERS_SCREEN,
// 						screens: {
// 							UsersList: '',
// 							UserNew: 'new',
// 							UserDetails: {
// 								path: '/:id',
// 							},
// 							UserEdit: {
// 								path: '/:id/edit',
// 							},
// 						},
// 					},
// 					workplaces: {
// 						path: WORK_PLACES_SCREEN,
// 						screens: {
// 							contragents: {
// 								path: CONTRAGENTS_SCREEN,
// 								screens: {
// 									ContrAgentsList: '',
// 									ContrAgentNew: 'new',
// 									ContrAgentDetails: {
// 										path: '/:id',
// 									},
// 									ContrAgentEdit: {
// 										path: '/:id/edit',
// 									},
// 								},
// 							},
// 							objects: {
// 								path: OBJECTS_SCREEN,
// 								screens: {
// 									ObjectsList: '',
// 									ObjectNew: 'new',
// 									ObjectDetails: {
// 										path: '/:id',
// 									},
// 									ObjectEdit: {
// 										path: '/:id/edit',
// 									},
// 								},
// 							},
// 						},
// 					},
// 					schedule: SCHEDULE_SCREEN,
// 					info: 'info',
// 				},
// 			},
// 			AuthStack: {
// 				path: AUTH_SCREEN,
// 				screens: {
// 					login: LOGIN_SCREEN,
// 					register: REGISTER_SCREEN,
// 				},
// 			},
// 		},
// 	},
// }
// 	const { isAuthenticated, getUserByAsyncStorage } = store.auth
// 	useEffect(() => {
// 		if (!isAuthenticated) {
// 			setLoading(true)
// 			getUserByAsyncStorage()
// 			setLoading(false)
// 		}
// 	}, [])
// 	if (loading) {
// 		return (
// 			<div style={styles.fullContainer}>
// 				<ActivityIndicator size='large' color='#0000ff' />
// 			</div>
// 		)
// 	}
// 	return (
// 		<Routes>
// 			<Route>
// 				{!isAuthenticated ? (
// 					<Stack.Screen name='AuthStack' component={Auth} />
// 				) : (
// 					<Stack.Screen name='Спецмаш' component={Home} />
// 				)}
// 			</Route>
// 		</Routes>
// 	)
// })

// const Home = observer(() => {
// 	const { hasRoles } = store.auth
// 	return (
// 		<Drawer.Navigator>
// 			<Drawer.Screen
// 				name={SHIFTS_SCREEN}
// 				component={Shifts}
// 				options={{ drawerLabel: 'Путевые', title: 'Путевые' }}
// 			/>
// 			{hasRoles('admin', 'manager') && (
// 				<Drawer.Screen
// 					name={MACHINES_SCREEN}
// 					component={Machines}
// 					options={{ drawerLabel: 'Техника', title: 'Техника' }}
// 				/>
// 			)}
// 			{hasRoles('admin', 'manager') && (
// 				<Drawer.Screen
// 					name={USERS_SCREEN}
// 					component={Users}
// 					options={{ drawerLabel: 'Водители', title: 'Водители' }}
// 				/>
// 			)}
// 			{hasRoles('admin', 'manager') && (
// 				<Drawer.Screen
// 					name={WORK_PLACES_SCREEN}
// 					component={WorkPlaces}
// 					options={{ drawerLabel: 'Объекты', title: 'Объекты' }}
// 				/>
// 			)}
// 			{hasRoles('driver') && (
// 				<Drawer.Screen
// 					name={SCHEDULE_SCREEN}
// 					component={ScheduleScreen}
// 					options={{ drawerLabel: 'График', title: 'График' }}
// 				/>
// 			)}
// 			<Drawer.Screen
// 				name={INFO_SCREEN}
// 				component={InfoScreen}
// 				options={{ drawerLabel: 'Info', title: 'Info' }}
// 			/>
// 		</Drawer.Navigator>
// 	)
// })
// const Auth = () => {
// 	return (
// 		<AuthStack.Navigator>
// 			<AuthStack.Screen name={LOGIN_SCREEN} component={LoginScreen} />
// 			<AuthStack.Screen
// 				name={REGISTER_SCREEN}
// 				component={RegisterScreen}
// 				options={{ headerShown: false }}
// 			/>
// 		</AuthStack.Navigator>
// 	)
// }
// const router = createBrowserRouter([
// 	{
// 		id: 'root',
// 		path: '/',
// 		loader() {
// 			// Our root route always provides the user, if logged in
// 			return { user: store.auth.currentUser }
// 		},
// 		Component: Auth,
// 	},
// 	{
// 		path: '/login',
// 		Component: LoginScreen,
// 	},
// ])
// const Users = () => {
// 	return (
// 		<UsersStack.Navigator>
// 			<UsersStack.Screen name='UsersList' component={UsersList} options={{ headerShown: false }} />
// 			<UsersStack.Screen name='UserDetails' component={UserCard} options={{ headerShown: false }} />
// 			<UsersStack.Screen name='UserEdit' component={UserEdit} options={{ headerShown: false }} />
// 			<UsersStack.Screen name='UserNew' component={UserNew} options={{ headerShown: false }} />
// 		</UsersStack.Navigator>
// 	)
// }
// const ContrAgents = () => {
// 	return (
// 		<ContrAgentsStack.Navigator>
// 			<ContrAgentsStack.Screen
// 				name='ContrAgentsList'
// 				component={ContrAgentsList}
// 				options={{ headerShown: false }}
// 			/>
// 			<ContrAgentsStack.Screen
// 				name='ContrAgentDetails'
// 				component={ContrAgentCard}
// 				options={{ headerShown: false }}
// 			/>
// 			<ContrAgentsStack.Screen
// 				name='ContrAgentEdit'
// 				component={ContrAgentEdit}
// 				options={{ headerShown: false }}
// 			/>
// 			<ContrAgentsStack.Screen
// 				name='ContrAgentNew'
// 				component={ContrAgentNew}
// 				options={{ headerShown: false }}
// 			/>
// 		</ContrAgentsStack.Navigator>
// 	)
// }
// const Objects = () => {
// 	return (
// 		<ObjectStack.Navigator>
// 			<ObjectStack.Screen
// 				name='ObjectsList'
// 				component={ObjectsList}
// 				options={{ headerShown: false }}
// 			/>
// 			<ObjectStack.Screen
// 				name='ObjectDetails'
// 				component={ObjectCard}
// 				options={{ headerShown: false }}
// 			/>
// 			<ObjectStack.Screen
// 				name='ObjectEdit'
// 				component={ObjectEdit}
// 				options={{ headerShown: false }}
// 			/>
// 			<ObjectStack.Screen name='ObjectNew' component={ObjectNew} options={{ headerShown: false }} />
// 		</ObjectStack.Navigator>
// 	)
// }
// const WorkPlaces = () => {
// 	return (
// 		<ObjectsTab.Navigator>
// 			<ObjectsTab.Screen
// 				name={OBJECTS_SCREEN}
// 				component={Objects}
// 				options={{ headerShown: false }}
// 			/>
// 			<ObjectsTab.Screen
// 				name={CONTRAGENTS_SCREEN}
// 				component={ContrAgents}
// 				options={{ headerShown: false }}
// 			/>
// 		</ObjectsTab.Navigator>
// 	)
// }
// const Machines = () => {
// 	return (
// 		<MachinesStack.Navigator>
// 			<MachinesStack.Screen
// 				name='MachinesList'
// 				component={MachinesList}
// 				options={{ headerShown: false }}
// 			/>
// 			<MachinesStack.Screen
// 				name='MachineDetails'
// 				component={MachineCard}
// 				options={{ headerShown: false }}
// 			/>
// 			<MachinesStack.Screen
// 				name='MachineEdit'
// 				component={MachineEdit}
// 				options={{ headerShown: false }}
// 			/>
// 			<MachinesStack.Screen
// 				name='MachineNew'
// 				component={MachineNew}
// 				options={{ headerShown: false }}
// 			/>
// 		</MachinesStack.Navigator>
// 	)
// }
// const Shifts = () => {
// 	return (
// 		<ShiftStack.Navigator>
// 			<ShiftStack.Screen
// 				name='ShiftScreen'
// 				component={ShiftScreen}
// 				options={{ headerShown: false }}
// 			/>
// 			<ShiftStack.Screen
// 				name='ShiftDetails'
// 				component={ShiftCard}
// 				options={{ headerShown: false }}
// 			/>
// 			<ShiftStack.Screen name='ShiftEdit' component={ShiftEdit} options={{ headerShown: false }} />
// 			<ShiftStack.Screen name='ShiftNew' component={ShiftNew} options={{ headerShown: false }} />
// 		</ShiftStack.Navigator>
// 	)
// }

// export default App

// export type RootStackParamList = {
// 	Спецмаш: NavigatorScreenParams<HomeDrawerParamList>
// 	AuthStack: NavigatorScreenParams<AuthStackParamList>
// }
// export type HomeDrawerParamList = {
// 	shifts: undefined
// 	machines: NavigatorScreenParams<MachinesStackParamList>
// 	users: NavigatorScreenParams<UsersStackParamList>
// 	workplaces: NavigatorScreenParams<WorkPlacesTabParamList>
// 	schedule: undefined
// 	info: undefined
// }
// export type UsersStackParamList = {
// 	UsersList: undefined
// 	UserDetails: { id: string }
// 	UserEdit: { id: string }
// 	UserNew: undefined
// }
// export type ContrAgentsStackParamList = {
// 	ContrAgentsList: undefined
// 	ContrAgentDetails: { id: string }
// 	ContrAgentEdit: { id: string }
// 	ContrAgentNew: undefined
// }
// export type ObjectStackParamList = {
// 	ObjectsList: undefined
// 	ObjectDetails: { id: string }
// 	ObjectEdit: { id: string }
// 	ObjectNew: undefined
// }
// export type MachinesStackParamList = {
// 	MachinesList: undefined
// 	MachineDetails: { id: string }
// 	MachineEdit: { id: string }
// 	MachineNew: undefined
// }
// export type WorkPlacesTabParamList = {
// 	objects: NavigatorScreenParams<ObjectStackParamList>
// 	contragents: NavigatorScreenParams<ContrAgentsStackParamList>
// }
// export type ShiftStackParamList = {
// 	ShiftScreen: undefined
// 	ShiftDetails: { id: string }
// 	ShiftEdit: { id: string }
// 	ShiftNew: undefined
// }
// type AuthStackParamList = {
// 	login: undefined
// 	register: undefined
// }

// // const styles = StyleSheet.create({
// // 	fullContainer: {
// // 		flex: 1,
// // 		justifyContent: 'center',
// // 	},
// // })
