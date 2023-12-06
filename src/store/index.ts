import { makeAutoObservable, runInAction } from 'mobx'
import authStore from './authStore'
import shiftsStore from './shiftsStore'
import machinesStore from './machinesStore'
import usersStore from './usersStore'
import partnerStore from './partnerStore'
import workPlaceStore from './workPlaceStore'
import UIStore from './UIStore'

class Store {
	auth = authStore
	shifts = shiftsStore
	machines = machinesStore
	users = usersStore
	partners = partnerStore
	workPlaces = workPlaceStore
	uiStore = UIStore
	headerContent = ''

	constructor() {
		makeAutoObservable(this)
	}
	setHeaderContent = (headerContent: string) => {
		runInAction(() => {
			this.headerContent = headerContent
		})
	}
}

export default new Store()
