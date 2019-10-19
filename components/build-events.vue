<template>
	<ul>
		<li v-for="(buildEvent, key) in buildEvents" :key="key">
			{{ buildEvent.type }}
			<pre>{{ buildEvent }}</pre>
		</li>
	</ul>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		buildId: {
			type: Number,
			default: () => {
				return 0;
			}
		}
	},
	data: function() {
		return {
			buildEvents: []
		};
	},
	computed: mapState({
		websocketMessage: (state) => state.websocket.message
	}),
	watch: {
		websocketMessage(val) {
			if (val.indexOf('build_id_' + this.buildId) > -1) {
				this.getBuildEvents();
			}
		}
	},
	async created() {
		if (this.buildId > 0) {
			this.getBuildEvents();
		}
	},
	methods: {
		async getBuildEvents() {
			const res = await this.$axios({
				method: 'get',
				url: 'build?id=' + this.buildId
			});
			this.buildEvents = res.data;
		}
	}
};
</script>

<style lang="scss" scoped>
li {
	display: list-item;
}
</style>
