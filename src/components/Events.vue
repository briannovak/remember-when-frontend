<template>
	<div class="container" id="Events">
		<p></p>
		<h3>Events</h3>
		<p>Review all of your events currently in the system. Add or remove events as your popularity change!</p>
		<router-link class="btn btn-success" to="/add-event">Add Event</router-link>
		<router-link class="btn btn-warning" to="/update-event">Update Event</router-link>
		<router-link class="btn btn-danger" to="/remove-event">Remove Event</router-link>
		<p></p>
		<EventList :events="events"/>
  </div>
</template>

<script>
import EventList from "@/components/EventList";
import moment from "moment";

export default {
  name: "Events",
	components: {
		EventList
	},
	data() {
		return {
			events: []
		}
	},
	mounted() {
		this.loadPeople();
		this.loadEvents();
	},
	methods: {
		sortEvents() {
			this.events.sort((left,right) => {
				return moment.utc(left.date).diff(moment.utc(right.date));
			})
		},
		loadPeople() {
			fetch("http://localhost:3000/people")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people);
		},
		loadEvents() {
			fetch("http://localhost:3000/events")
				.then(response => response.json())
				.then(eventsVar => {
					this.events = eventsVar.events;
					this.sortEvents();
				});
		}
	}
}


</script>

<style scoped>
</style>
