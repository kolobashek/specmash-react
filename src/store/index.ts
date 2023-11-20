import { makeAutoObservable } from 'mobx'
import authStore from './authStore'
import shiftsStore from './shiftsStore'
import machinesStore from './machinesStore'
import usersStore from './usersStore'
import partnerStore from './partnerStore'
import workPlaceStore from './workPlaceStore'

class Store {
	auth = authStore
	shifts = shiftsStore
	machines = machinesStore
	users = usersStore
	partners = partnerStore
	workPlaces = workPlaceStore

	constructor() {
		makeAutoObservable(this)
	}
}

export default new Store()
