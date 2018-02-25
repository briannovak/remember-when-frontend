<template>
  <div id="AddFriend">
		<form class="form" @submit.prevent="postFriend()">
			<div class="form-group">
	      <label for="name">Add a Friend to Remember!</label>
	      <input v-model="person" type="text" class="form-control" placeholder="Enter Name">
				<small id="formHelp" class="form-text text-muted">Please provide your friend's full name. e.g. John Doe</small>
				<button type="submit" class="btn btn-success">Add Friend</button>
				<modal v-if="showModal" @close="showModal = false">
					<h3 slot="header">{{this.serverResponse}}</h3>
				</modal>
	    </div>
		</form>
  </div>
</template>

<script>
import AddModal from "@/components/AddModal";

export default {
  name: "AddFriend",
	data(){
		return {
			person: "",
			showModal: false,
			serverResponse: ""
		}
	},
	components: {
		AddModal
	},
	methods: {
		postFriend(){
			if (this.person === "") {
				alert("Please enter a friend's name!");
			} else {
				fetch("https://remember-when-backend.herokuapp.com/people", {
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
					}
				})
			}
		}
	}
}
</script>

<style scoped>

</style>
