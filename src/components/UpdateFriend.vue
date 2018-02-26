<template>
  <div id="UpdateFriend">
		<p></p>
		<form class="form" @submit.prevent="updateFriend()">
			<div class="form-group">
				<label for="exampleSelect1">Select the friend to update.</label>
				<select v-model="personToUpdate" class="form-control" id="exampleSelect1" @change="updatePlaceholder()">
					<PersonOption v-for="person in people" :key="person.id" :data="person"/>1</PersonOption>
				</select>
			</div>
			<div class="form-group">
	      <label for="name">Enter their updated information!</label>
	      <input v-model="updatedInformation" type="text" class="form-control" placeholder="Select the friend to update.">
				<small id="formHelp" class="form-text text-muted">Please provide your friend's full name. e.g. John Doe</small>
			</div>
			<p></p>
			<button type="submit" class="btn btn-warning">Update Friend</button>
			<p></p>
			<UpdateFriendModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</UpdateFriendModal>
		</form>
  </div>
</template>

<script>
import PersonOption from "@/components/PersonOption";
import UpdateFriendModal from "@/components/UpdateFriendModal";

export default {
  name: "UpdateFriend",
	data(){
		return {
			people: [],
			personToUpdate: "",
			updatedInformation: "",
			updateURL: "",
			showModal: false,
			serverResponse: ""
		}
	},
	components: {
		PersonOption,
		UpdateFriendModal
	},
	mounted() {
		this.loadPeople();
	},
	methods: {
		loadPeople() {
			fetch("http://localhost:3000/people/")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people);
		},
		updatePlaceholder(){
			this.updatedInformation = this.personToUpdate;
		},
		setUpdateURL(){
			for (var i = 0; i < this.people.length; i++) {
				if (this.personToUpdate === this.people[i].name){
					this.updateURL = "http://localhost:3000/people/" + this.people[i].id
				}
			}
		},
		updateFriend(){
			this.setUpdateURL();
			if (this.personToUpdate === "") {
				alert("Please select a friend to update and enter correct information!");
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
