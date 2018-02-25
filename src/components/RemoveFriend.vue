<template>
  <div id="RemoveFriend">
		<p></p>
		<form class="form" @submit.prevent="showModal = true">
			<div class="form-group">
				<label for="exampleSelect1">Select the friend to Remove.</label>
				<select class="form-control" id="exampleSelect1">
					<eventOption v-for="person in people" :key="person.id" :data="person"/>1</eventOption>
				</select>
				<p></p>
				<button type="submit" class="btn btn-danger">Remove Friend</button>
				<RemoveModal v-if="showModal" @close="showModal = false">
					<h3 slot="header">Test {{this.serverResponse}}</h3>
				</RemoveModal>
			</div>
		</form>
  </div>
</template>

<script>
import RemoveModal from "@/components/RemoveModal";
import eventOption from "@/components/eventOption";

export default {
  name: "RemoveFriend",
	components: {
		RemoveModal,
		eventOption
	},
	data() {
		return {
			people: [],
			showModal: false
		}
	},
	mounted() {
		this.loadPeople();
	},
	methods: {
		loadPeople() {
			fetch("https://remember-when-backend.herokuapp.com/people")
				.then(response => response.json())
				.then(peopleVar => this.people = peopleVar.people);
		},
		removeFriend() {
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
