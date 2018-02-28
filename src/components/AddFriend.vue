<template>
  <div id="AddFriend">
		<form class="form" @submit.prevent="postFriend()">
			<div class="form-group">
	      <label for="name">Add a Friend to Remember!</label>
	      <input v-model="person" type="text" class="form-control" placeholder="Enter Name">
				<small id="formHelp" class="form-text text-muted">Please provide your friend's full name. e.g. John Doe</small>
				<p></p>
				<button type="submit" class="btn btn-success">Add Friend</button>
				<router-link class="btn btn-secondary" to="/friends">Go Back</router-link>
				<AddFriendModal v-if="showModal" @close="showModal = false">
					<h3 slot="header">{{this.serverResponse}}</h3>
				</AddFriendModal>
	    </div>
		</form>
  </div>
</template>

<script>
import AddFriendModal from "@/components/AddFriendModal";

export default {
  name: "AddFriend",
	data(){
		return {
			people: [],
			person: "",
			showModal: false,
			serverResponse: ""
		}
	},
	components: {
		AddFriendModal
	},
	mounted(){
		this.loadPeople();
	},
	methods: {
		loadPeople(){
			fetch("https://remember-when-backend.herokuapp.com/people/")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people);
		},
		verifyFriendNotListed(){
			for (var i = 0; i < this.people.length; i++) {
				if (this.people[i].name === this.person){
					return false;
				}
			}
			return true;
		},
		postFriend(){
			if (!this.verifyFriendNotListed()){
				alert("Friend already listed! Please enter someone else.");
			} else {
				if (this.person === "") {
					alert("Please enter a friend's name!");
				} else {
					fetch("https://remember-when-backend.herokuapp.com/people/", {
						method: "post",
						body: JSON.stringify({
							name: `${this.person}`,
							last_event: "1900-01-01",
							count: 0
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
							this.loadPeople();
						}
					})
				}
			}
		}
	}
}
</script>

<style scoped>

</style>
