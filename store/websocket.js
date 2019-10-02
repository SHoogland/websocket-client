let websocket;
const wsUri = 'wss://node-red.insoprojects.nl:8080/';

export const state = () => ({
	messages: [],
	websocketIsOn: false
});

export const mutations = {
	addMessage(state, message) {
		state.messages.push(message);
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
		setTimeout(function () {
			dispatch('startWebSocket');
		}, 2000);
	},
	onMessage({ commit }) {
		commit('addMessage', 'message');
	},
	onError() {
		console.log('error');
	}
};
