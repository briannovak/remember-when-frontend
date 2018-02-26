<template>
  <div id="RemoveEvent">
		<p></p>
		<form class="form" @submit.prevent="removeEvent()">
			<div class="form-group">
				<label for="exampleSelect1">Select the event to remove.</label>
				<select v-model="eventToDelete" class="form-control" id="exampleSelect1">
					<EventOption v-for="oneEvent in events" :key="oneEvent.id" :data="oneEvent"/>1</EventOption>
				</select>
				<p></p>
			</div>
			<button type="submit" class="btn btn-danger">Remove Friend</button>
			<RemoveEventModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</RemoveEventModal>
		</form>
  </div>
</template>

<script>
import RemoveEventModal from "@/components/RemoveEventModal";
import EventOption from "@/components/EventOption";

export default {
  name: "RemoveEvent",
	components: {
		RemoveEventModal,
		EventOption
	},
	data() {
		return {
			events: [],
			eventToDelete: "",
			eventURL: "",
			showModal: false,
			serverResponse: ""
		}
	},
	mounted() {
		this.loadEvents();
	},
	methods: {
		loadEvents() {
			fetch("http://localhost:3000/events")
				.then(response => response.json())
				.then(eventVar => this.events = eventVar.events);
		},
		setEventURL() {
			for (var i = 0; i < this.events.length; i++) {
				if (this.eventToDelete === this.events[i].name){
					this.eventURL = "http://localhost:3000/events/" + this.events[i].id
				}
			}
		},
		removeEvent() {
			this.setEventURL();
			fetch(this.eventURL, {
				method: "delete"
			})
			.then(response => response.json())
			.then(response =>	{
				if (response) {
					this.eventToDelete = "";
					this.eventURL = "";
					this.showModal = true;
					this.serverResponse = response;
					this.loadEvents();
				}
			})
		}
	}
}
</script>

<style scoped>
</style>
