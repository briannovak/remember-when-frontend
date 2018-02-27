<template>
  <div id="UpdateEvent">
		<p></p>
		<form class="form" @submit.prevent="updateEvent()">
			<div class="form-group">
				<label for="exampleSelect1">Select the event to update.</label>
				<select v-model="eventToUpdate" class="form-control" id="exampleSelect1" @change="updatePlaceholder()">
					<EventOption v-for="oneEvent in events" :key="oneEvent.id" :data="oneEvent"/>1</EventOption>
				</select>
			</div>
			<div class="form-group">
	      <label for="name">Updated Name:</label>
	      <input v-model="updatedInformation" type="text" class="form-control" placeholder="Select the friend to update.">
			</div>
			<div class="form-group">
	      <label for="date">Updated Date:</label>
	      <input v-model="eventDate" type="date" id="date" class="form-control">
			</div>
			<div class="form-group">
	      <label for="exampleSelect1">Select Updated Type of Event</label>
	      <select v-model="eventType" class="form-control" id="exampleSelect1">
	        <option>Brunch</option>
	        <option>Dinner</option>
					<option>Movie</option>
	        <option>Party</option>
	        <option>Play</option>
	      </select>
	    </div>
			<div class="form-group">
	      <label for="exampleSelect2">Updated Attendees:</label>
	      <select v-model="eventAttendeesNames" multiple class="form-control" id="exampleSelect2" size="10">
	        <PersonOption v-for="person in people" :key="person.id" :data="person"/>1</PersonOption>
	      </select>
				<small id="formHelp" class="form-text text-muted">CMD + Click to select multiple names.</small>
	    </div>
			<p></p>
			<button type="submit" class="btn btn-warning">Update Friend</button>
			<p></p>
			<UpdateEventModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</UpdateEventModal>
		</form>
  </div>
</template>

<script>
import EventOption from "@/components/EventOption";
import UpdateEventModal from "@/components/UpdateEventModal";
import moment from "moment";

export default {
  name: "UpdateEvent",
	data(){
		return {
			people: [],
			events: [],
			eventToUpdate: "",
			updatedName: "",
			updatedDate: "",
			updatedType: "",
			updatedAttendees: "",
			updateURL: "",
			showModal: false,
			serverResponse: ""
		}
	},
	components: {
		EventOption,
		UpdateEventModal
	},
	mounted() {
		this.loadEvents();
		this.loadPeople();
	},
	methods: {
		sortPeople(){
			return this.people.sort((a,b) => {
				if (a.name > b.name) return 1;
				if (a.name < b.name) return -1;
				return 0;
			})
		},
		loadPeople() {
			fetch("http://localhost:3000/people/")
				.then(response => response.json())
				.then(peopleVar => {
					this.people = peopleVar.people
					this.sortPeople();
				});
		},
		sortEvents() {
			this.events.sort((left,right) => {
				return moment.utc(left.date).diff(moment.utc(right.date));
			})
		},
		loadEvents() {
			fetch("http://localhost:3000/events/")
				.then(response => response.json())
				.then(eventsVar => {
					this.events = eventsVar.events
					this.sortEvents();
				});
		},
		updatePlaceholders(){
			this.updatedInformation = this.personToUpdate;
		},
		setUpdateURL(){
			for (var i = 0; i < this.events.length; i++) {
				if (this.eventToUpdate === this.events[i].name){
					this.updateURL = "http://localhost:3000/events/" + this.events[i].id
				}
			}
		},
		UpdateEvent(){
			this.setUpdateURL();
			if (this.eventToUpdate === "") {
				alert("Please select an event to update and enter correct information!");
			} else {
				fetch(this.updateURL, {
					method: "put",
					body: JSON.stringify({
						name: `${this.updatedInformation}`
					}),
					headers: new Headers({
						"Content-Type": "application/json"
					})
				})
				.then(response => response.json())
				.then(response =>	{
					if (response) {
						this.person = "";
						this.showModal = true;
						this.serverResponse = response;
					}
				})
			}
		}
	}
}
</script>

<style scoped>

</style>
