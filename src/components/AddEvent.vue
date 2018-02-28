<template>
  <div id="AddEvent">
		<p></p>
		<form class="form" @submit.prevent="postEvent()">
			<div class="form-group">
	      <label for="name">Add an Event to Remember!</label>
	      <input v-model="eventName" type="text" class="form-control" placeholder="Name of Event">
			</div>
			<div class="form-group">
	      <label for="date">Event Date:</label>
	      <input v-model="eventDate" type="date" id="date" class="form-control">
			</div>
			<div class="form-group">
	      <label for="exampleSelect1">Select Type of Event</label>
	      <select v-model="eventType" class="form-control" id="exampleSelect1">
	        <option>Brunch</option>
	        <option>Dinner</option>
					<option>Movie</option>
	        <option>Party</option>
	        <option>Play</option>
	      </select>
	    </div>
			<div class="form-group">
	      <label for="exampleSelect2">Attendees</label>
	      <select v-model="eventAttendeesNames" multiple class="form-control" id="exampleSelect2" size="10">
	        <PersonOption v-for="person in people" :key="person.id" :data="person"/>1</PersonOption>
	      </select>
				<small id="formHelp" class="form-text text-muted">CMD + Click to select multiple names.</small>
	    </div>
		<button type="submit" class="btn btn-success">Add Event</button>
		<router-link class="btn btn-secondary" to="/events">Go Back</router-link>
		<AddEventModal v-if="showModal" @close="showModal = false">
			<h3 slot="header">{{this.serverResponse}}</h3>
		</AddEventModal>
		</form>
  </div>
</template>

<script>
import AddEventModal from "@/components/AddEventModal";
import PersonOption from "@/components/PersonOption";

export default {
  name: "AddEvent",
	data(){
		return {
			eventName: "",
			eventDate: "",
			eventType: "",
			eventAttendees: [],
			eventAttendeesNames: [],
			showModal: false,
			serverResponse: "",
			people: [],
		}
	},
	components: {
		AddEventModal,
		PersonOption
	},
	mounted() {
		this.loadPeople();
	},
	methods: {
		postEvent(){
			this.convertAttendees();
			if (this.eventName === "" || this.eventDate === "" || this.eventType === "" || this.eventAttendees === []) {
				alert("Please enter all fields for your event!");
			} else {
				fetch("https://remember-when-backend.herokuapp.com/events", {
					method: "post",
					body: JSON.stringify({
						name: `${this.eventName}`,
						date: `${this.eventDate}`,
						type: `${this.eventType}`,
						attendees: `${this.eventAttendees}`
					}),
					headers: new Headers({
						"Content-Type": "application/json"
					})
				})
				.then(response => response.json())
				.then(response =>	{
					if (response) {
						this.eventName = "";
						this.eventDate = "";
						this.eventType = "";
						this.eventAttendees = [];
						this.eventAttendeesNames = [];
						this.showModal = true;
						this.serverResponse = response;
					}
				})
			}
		},
		loadPeople() {
			fetch("https://remember-when-backend.herokuapp.com/people")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people)
		},
		convertAttendees() {
			this.eventAttendees = [];
			for (var i = 0; i < this.eventAttendeesNames.length; i++) {
				for (var j = 0; j < this.people.length; j++) {
					if (this.eventAttendeesNames[i] === this.people[j].name){
						this.eventAttendees.push(this.people[j].id)
					}
				}
			}
		}
	}
}
</script>

<style scoped>

</style>
