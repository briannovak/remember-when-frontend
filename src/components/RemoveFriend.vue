<template>
  <div id="RemoveFriend">
		<p></p>
		<form class="form" @submit.prevent="removeFriend()">
			<div class="form-group">
				<label for="exampleSelect1">Select the friend to remove.</label>
				<select v-model="person" class="form-control" id="exampleSelect1">
					<PersonOption v-for="person in people" :key="person.id" :data="person"/>1</PersonOption>
				</select>
				<p></p>
			</div>
			<button type="submit" class="btn btn-danger">Remove Friend</button>
			<RemoveFriendModal v-if="showModal" @close="showModal = false">
				<h3 slot="header">{{this.serverResponse}}</h3>
			</RemoveFriendModal>
		</form>
  </div>
</template>

<script>
import RemoveFriendModal from "@/components/RemoveFriendModal";
import PersonOption from "@/components/PersonOption";

export default {
  name: "RemoveFriend",
	components: {
		RemoveFriendModal,
		PersonOption
	},
	data() {
		return {
			people: [],
			person: "",
			showModal: false,
			friendURL: "",
			serverResponse: ""
		}
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
		setFriendURL() {
			for (var i = 0; i < this.people.length; i++) {
				if (this.person === this.people[i].name){
					this.friendURL = "http://localhost:3000/people/" + this.people[i].id
				}
			}
		},
		removeFriend() {
			this.setFriendURL();
			fetch(this.friendURL, {
				method: "delete"
			})
			.then(response => response.json())
			.then(response =>	{
				if (response) {
					this.person = "";
					this.friendURL = "";
					this.showModal = true;
					this.serverResponse = response;
					this.loadPeople();
				}
			})
			}
	}
}
</script>

<style scoped>
</style>
