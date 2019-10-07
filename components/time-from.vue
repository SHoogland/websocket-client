<template>
	<div>
		{{ timeFrom }}
	</div>
</template>

<script>
import moment from 'moment';

export default {
	props: {
		buildTime: {
			type: String,
			default: () => {
				return '';
			}
		},
		now: {
			type: Number,
			default: () => {
				return 0;
			}
		}
	},
	computed: {
		timeFrom() {
			return moment(this.buildTime).from(this.now);
		}
	}
};
</script>
