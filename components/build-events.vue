<template>
	<ul>
		<h5 v-if="statusses.length">
			Statusses
		</h5>
		<li v-for="(status, key) in statusses" :key="'status' + key">
			{{ status.message.sender }}<br />
			{{ status.message.description }}<br />
			{{ status.prettyTime }}
		</li>
		<h5 v-if="checkRuns.length">
			CheckRuns
		</h5>
		<li v-for="(checkRun, key) in checkRuns" :key="'checkRun' + key">
			{{ checkRun.message.appName }}<br />
			Check run <strong>{{ checkRun.message.name }}</strong> {{ checkRun.message.action }}<br />
			{{ checkRun.prettyTime }}
			<span v-if="checkRun.message.action === 'completed'"><br />result: {{ checkRun.message.conclusion }}</span>
			<!-- <pre>{{ checkRun }}</pre> -->
		</li>
		<h5 v-if="checkSuites.length">
			CheckSuites
		</h5>
		<li v-for="(checkSuite, key) in checkSuites" :key="'checkSuite' + key">
			{{ checkSuite.type }}<br />
			{{ checkSuite.prettyTime }}
		</li>
	</ul>
</template>

<script>
import { orderBy } from 'lodash';
import moment from 'moment';

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
			checkRuns: [],
			checkSuites: [],
			statusses: []
		};
	},
	created() {
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
			console.log(res);
			this.checkRuns = [];
			this.checkSuites = [];
			this.statusses = [];
			for (let i = 0; i < res.data.length; i++) {
				const buildEvent = res.data[i];
				buildEvent.prettyTime = moment(buildEvent.timestamp).format('HH:mm:ss');
				switch (buildEvent.type) {
					case 'status':
						buildEvent.message = JSON.parse(buildEvent.message);
						this.statusses.push(buildEvent);
						break;
					case 'check_run':
						buildEvent.message = JSON.parse(buildEvent.message);
						this.checkRuns.push(buildEvent);
						break;
					case 'check_suite':
						this.checkSuites.push(buildEvent);
						break;
					default:
						console.log('unknown type', buildEvent);
						break;
				}
			}
			this.statusses = orderBy(this.statusses, ['timestamp'], ['asc']);
			this.checkRuns = orderBy(this.checkRuns, ['timestamp'], ['asc']);
			this.checkSuites = orderBy(this.checkSuites, ['timestamp'], ['asc']);
		}
	}
};
</script>

<style lang="scss" scoped>
li {
	display: list-item;
	border-bottom: 1px solid black;
}
</style>
