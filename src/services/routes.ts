import { Outlet } from 'react-router-dom'
import {
	MachineCard,
	MachineEdit,
	MachineNew,
	MachinesList,
	PartnerCard,
	PartnerEdit,
	PartnerNew,
	PartnersList,
	ScreenInfo,
	ScreenLogin,
	ScreenRegister,
	ScreenSchedule,
	ScreenShift,
	UserCard,
	UserEdit,
	UserNew,
	UsersList,
	WorkPlaceCard,
	WorkPlaceEdit,
	WorkPlaceNew,
	WorkPlacesList,
} from '../components'
import { PublicPage } from './../App'

export const routerArray: IRouteMap[] = [
	{
		id: 'root',
		path: '/',
		// loader() {
		// 	// Our root route always provides the user, if logged in
		// 	return { user: auth.isAuthenticated }
		// },
		loader: 'rootLoader',
		children: [
			{
				index: true,
				Component: PublicPage,
			},
			{
				path: 'login',
				// action: loginAction,
				loader: 'loginLoader',
				Component: ScreenLogin,
			},
			{
				path: 'register',
				// action: loginAction,
				loader: 'loginLoader',
				Component: ScreenRegister,
			},
			{
				path: 'users',
				loader: 'protectedLoader',
				Component: Outlet,
				permission: ['admin', 'manager'],
				children: [
					{
						index: true,
						Component: UsersList,
					},
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: UserCard,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: UserEdit,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: UserNew,
					},
				],
			},
			{
				path: 'workPlaces',
				loader: 'protectedLoader',
				Component: Outlet,
				children: [
					{
						index: true,
						Component: WorkPlacesList,
					},
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: WorkPlaceCard,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: WorkPlaceEdit,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: WorkPlaceNew,
					},
				],
			},
			{
				path: 'contragents',
				loader: 'protectedLoader',
				Component: Outlet,
				children: [
					{
						index: true,
						Component: PartnersList,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: PartnerNew,
					},
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: PartnerCard,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: PartnerEdit,
					},
				],
			},
			{
				path: 'machines',
				loader: 'protectedLoader',
				Component: Outlet,
				children: [
					{
						index: true,
						Component: MachinesList,
					},
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: MachineCard,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: MachineEdit,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: MachineNew,
					},
				],
			},
			{
				path: 'shifts',
				loader: 'protectedLoader',
				Component: Outlet,
				children: [
					{
						index: true,
						Component: ScreenShift,
					},
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: ScreenShift,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: ScreenShift,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: ScreenShift,
					},
				],
			},
			{
				path: 'schedule',
				loader: 'protectedLoader',
				Component: ScreenSchedule,
				children: [
					{
						path: ':id',
						loader: 'protectedLoader',
						Component: ScreenSchedule,
					},
					{
						path: ':id/edit',
						loader: 'protectedLoader',
						Component: ScreenSchedule,
					},
					{
						path: 'new',
						loader: 'protectedLoader',
						Component: ScreenSchedule,
					},
				],
			},
			{
				path: 'info',
				loader: 'protectedLoader',
				Component: ScreenInfo,
			},
		],
	},
	{
		path: '/logout',
		// action() {
		// 	// We signout in a "resource route" that we can hit from a fetcher.Form
		// 	auth.signOut()
		// 	return redirect('/')
		// },
		loader: 'logoutLoader',
	},
]
export interface IRouteMap {
	path?: string
	loader?: string
	permission?: string[]
	component?: React.FC
	children?: IRouteMap[]
	index?: boolean
	action?: () => void
	id?: string
	[key: string]: any
}
