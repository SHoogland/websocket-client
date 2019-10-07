<template>
	<main class="page page--home">
		<section class="intro">
			<ul>
				<li v-for="(build, key) in builds" :key="key">
					<img
						v-if="build.pusher_email"
						:src="`https://s.gravatar.com/avatar/${md5(build.pusher_email)}?s=80`"
						alt="gravatar"
					/>
					<img v-else :src="`https://s.gravatar.com/avatar/${md5('email@example.com')}?s=80`" alt="gravatar" />
					{{ build.repo_name }}<br />
					{{ build.ref }}<br />
					{{ build.pusher_name }}<br />
					{{ build.message.substring(0, 100) }}
					{{ build.message.length > 100 ? ' ... ' : '' }}
					<TimeFrom :build-time="build.timestamp" :now="now" /> <br />
					<BuildEvents :key="build.id" :build-id="build.id"></BuildEvents>
				</li>
			</ul>
		</section>
	</main>
</template>

<script>
import { orderBy } from 'lodash';
import md5 from 'md5';
import TimeFrom from '~/components/time-from.vue';
import BuildEvents from '~/components/build-events.vue';

export default {
	components: {
		TimeFrom,
		BuildEvents
	},
	data: function() {
		return {
			now: Date.now()
		};
	},
	computed: {
		messages() {
			return this.$store.state.websocket.messages;
		},
		builds() {
			return orderBy(this.$store.state.builds.builds, 'timestamp', 'desc');
		}
	},
	created() {
		const _this = this;
		if (process.client) {
			setInterval(function() {
				_this.now = Date.now();
			}, 1000);
		}
	},
	mounted() {
		this.$store.dispatch('websocket/connectWebsocket');
		this.$store.dispatch('builds/getBuilds');
	},
	methods: {
		md5(value) {
			return md5(value);
		}
	}
};
</script>

<style lang="scss" scoped>
@import '~tools';

li {
	display: list-item;
}
</style>
