let websocket;
const wsUri = 'wss://node-red.insoprojects.nl:8080/';

export const state = () => ({
	message: '',
	websocketIsOn: false
});

export const mutations = {
	setMessage(state, message) {
		state.message = message;
	},
	websocketOn(state, value) {
		state.websocketIsOn = value;
	}
};

export const actions = {
	connectWebsocket({ dispatch, state }) {
		if (!process.server && !state.websocketIsOn) {
			dispatch('startWebSocket');
		}
	},
	startWebSocket({ dispatch, commit }) {
		websocket = new WebSocket(wsUri);
		websocket.onopen = (evt) => dispatch('onOpen', evt);
		websocket.onclose = (evt) => dispatch('onClose', evt);
		websocket.onmessage = (evt) => dispatch('onMessage', evt);
		websocket.onerror = (evt) => dispatch('onError', evt);
		commit('websocketOn', true);
	},
	onOpen() {
		console.log('connected');
	},
	onClose({ dispatch }) {
		console.log('closed');
		setTimeout(function() {
			dispatch('startWebSocket');
		}, 2000);
	},
	onMessage({ commit, dispatch }, evt) {
		console.log(evt);
		if (evt.data.indexOf('new_build') > -1) {
			dispatch('builds/getBuild', evt.data, { root: true });
		} else {
			commit('setMessage', evt.data);
		}
	},
	onError() {
		console.log('error');
	}
};
