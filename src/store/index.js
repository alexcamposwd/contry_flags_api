import Vue from 'vue'
import Vuex from 'vuex'

import api from '../services/api'

Vue.use(Vuex)

export default new Vuex.Store({

	state: {
		all: [],
	},

	mutations: {
		setAll: (state, payload) => state.all = payload,
	},
	actions: {
		async fetchAll({
			commit
		}) {
			return await new Promise((resolve) => {
				api.get('/v2/all?fields=name')
					.then((response) => {
						const arr = response.data
						const temp = []
						for (let i of arr)
							i && temp.push(i);
						const arrUnique = [...new Set(temp)]
						arrUnique.sort(function (a, b) {
							if (a > b) return 1
							if (a < b) return -1
							return 0
						})
						commit('setAll', arrUnique)
						resolve()
					})
					.catch((error => {
						console.log(error.statusText);
					}))
			})
		},
	},
})