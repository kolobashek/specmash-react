import { makeAutoObservable } from 'mobx'

class UIStore {
	drawerOpened = false

	constructor() {
		makeAutoObservable(this)
	}
	showDrawer = () => {
		this.drawerOpened = true
	}
	hideDrawer = () => {
		this.drawerOpened = false
	}
}

export default new UIStore()
