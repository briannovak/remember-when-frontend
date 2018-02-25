<template>
  <div id="Events">
		<p>This is the Events Page</p>
		<EventList :events="events"/>
  </div>
</template>

<script>
import EventList from "@/components/EventList";

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
		loadPeople() {
			fetch("https://remember-when-backend.herokuapp.com/people")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people);
		},
		loadEvents() {
			fetch("https://remember-when-backend.herokuapp.com/events")
				.then(response => response.json())
				.then(eventsVar => this.events = eventsVar.events);
		}
	}
}


</script>

<style scoped>
</style>
