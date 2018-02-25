<template>
  <div id="Remember">
		<p>This is the Remember Page</p>
  </div>
</template>

<script>
export default {
  name: "Remember",
	mounted(){
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
