<template>
	<main class="page page--home">
		<section class="intro">
			hoi
			<ul>
				<li v-for="(message, key) in messages" :key="key">
					{{ message }}
				</li>
			</ul>
			<ul>
				<li v-for="(build, key) in builds" :key="key">
					{{ build }}
				</li>
			</ul>
		</section>
	</main>
</template>

<script>
export default {
	components: {},
	computed: {
		messages() {
			return this.$store.state.websocket.messages;
		},
		builds() {
			return this.$store.state.builds.builds;
		}
	},
	mounted() {
		this.$store.dispatch('websocket/connectWebsocket');
		this.$store.dispatch('builds/getBuilds');
	}
};
</script>

<style lang="scss">
@import '~tools';

.intro {
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
