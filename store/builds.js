export const state = () => ({
	builds: []
});

export const mutations = {
	setBuilds(state, builds) {
		state.builds = builds || [];
	},
	addBuild(state, build) {
		state.builds.unshift(build);
		if (state.builds.length > 20) {
			state.builds.pop();
		}
	},
	updateBuild(state, updatedBuild) {
		const index = state.builds.findIndex(
			(build) => build.id === updatedBuild.id
		);
		state.builds[index] = updatedBuild;
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
	},
	async getBuild({ commit }, buildMessage) {
		const buildId = buildMessage.substring(10);
		const res = await this.$axios({
			method: 'get',
			url: 'build/' + buildId
		});
		commit('addBuild', res.data[0]);
	},
	async updateBuild({ commit }, buildMessage) {
		const buildId = buildMessage.substring(10);
		const res = await this.$axios({
			method: 'get',
			url: 'build/' + buildId
		});
		commit('updateBuild', res.data[0]);
	}
};
