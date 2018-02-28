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
	      <input v-model="updatedName" type="text" class="form-control" placeholder="Enter the updated name.">
			</div>
			<div class="form-group">
	      <label for="date">Updated Date:</label>
	      <input v-model="updatedDate" type="date" id="date" class="form-control">
			</div>
			<div class="form-group">
	      <label for="exampleSelect1">Select Updated Type of Event</label>
	      <select v-model="updatedType" class="form-control" id="exampleSelect1">
	        <option>Brunch</option>
	        <option>Dinner</option>
					<option>Movie</option>
	        <option>Party</option>
	        <option>Play</option>
	      </select>
	    </div>
			<div class="form-group">
	      <label for="exampleSelect2">Updated Attendees:</label>
	      <select v-model="updatedAttendeesNames" multiple class="form-control" id="exampleSelect2" size="10">
	        <PersonOption v-for="person in people" :key="person.id" :data="person"/>1</PersonOption>
	      </select>
				<small id="formHelp" class="form-text text-muted">CMD + Click to select multiple names.</small>
	    </div>
			<p></p>
			<button type="submit" class="btn btn-warning">Update Event</button>
			<router-link class="btn btn-secondary" to="/events">Go Back</router-link>
			<p></p>
			<UpdateEventModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</UpdateEventModal>
		</form>
  </div>
</template>

<script>
import EventOption from "@/components/EventOption";
import PersonOption from "@/components/PersonOption";
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
			updatedAttendees: [],
			updatedAttendeesNames: [],
			updateURL: "",
			showModal: false,
			serverResponse: ""
		}
	},
	components: {
		EventOption,
		PersonOption,
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
		updatePlaceholder(){
			this.updatedName = this.eventToUpdate.split(",")[0];
		},
		setUpdateURL(){
			for (var i = 0; i < this.events.length; i++) {
				if (this.eventToUpdate.split(",")[0] === this.events[i].name){
					this.updateURL = "http://localhost:3000/events/" + this.events[i].id
				}
			}
		},
		convertAttendees() {
			this.updatedAttendees = [];
			for (var i = 0; i < this.updatedAttendeesNames.length; i++) {
				for (var j = 0; j < this.people.length; j++) {
					if (this.updatedAttendeesNames[i] === this.people[j].name){
						this.updatedAttendees.push(this.people[j].id)
					}
				}
			}
		},
		updateEvent(){
			this.setUpdateURL();
			console.log("you tried to set the URL");
			console.log(this.updateURL);
			this.convertAttendees();
			if (this.eventToUpdate === "" || this.updatedDate === "" || this.updatedType === "" || this.updatedAttendees === []) {
				alert("Please select an event to update and enter correct information!");
			} else {
				fetch(this.updateURL, {
					method: "put",
					body: JSON.stringify({
						name: `${this.updatedName}`,
						date: `${this.updatedDate}`,
						type: `${this.updatedType}`,
						attendees: `${this.updatedAttendees}`
					}),
					headers: new Headers({
						"Content-Type": "application/json"
					})
				})
				.then(response => response.json())
				.then(response =>	{
					if (response) {
						this.eventToUpdate = "";
						this.updatedName = "";
						this.updatedDate = "";
						this.updatedType = "";
						this.updatedAttendees = [];
						this.updatedAttendeesNames = [];
						this.updateURL = "";
						this.showModal = true;
						this.serverResponse = response;
						this.loadEvents();
					}
				})
			}
		}
	}
}
</script>

<style scoped>

</style>
