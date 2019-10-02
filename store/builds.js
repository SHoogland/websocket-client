export const state = () => ({
	builds: []
});

export const mutations = {
	setBuilds(state, builds) {
		state.builds = builds || [];
	}
};

export const actions = {
	async getBuilds({ commit }) {
		if (!process.server) {
			const res = await this.$axios({
				method: 'get',
				url: 'builds'
			});
			commit('setBuilds', res.data);
		}
	}
};
