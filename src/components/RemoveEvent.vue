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
			<button type="submit" class="btn btn-danger">Remove Event</button>
			<router-link class="btn btn-secondary" to="/events">Go Back</router-link>
			<RemoveEventModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</RemoveEventModal>
		</form>
  </div>
</template>

<script>
import RemoveEventModal from "@/components/RemoveEventModal";
import EventOption from "@/components/EventOption";
import moment from "moment";

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
		sortEvents() {
			this.events.sort((left,right) => {
				return moment.utc(left.date).diff(moment.utc(right.date));
			})
		},
		loadEvents() {
			fetch("https://remember-when-backend.herokuapp.com/events")
				.then(response => response.json())
				.then(eventVar => {
					this.events = eventVar.events;
					this.sortEvents();
				});
		},
		setEventURL() {
			var eventToDeleteShort= this.eventToDelete.split(",")[0]
			for (var i = 0; i < this.events.length; i++) {
				if (eventToDeleteShort === this.events[i].name){
					this.eventURL = "https://remember-when-backend.herokuapp.com/events/" + this.events[i].id
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
