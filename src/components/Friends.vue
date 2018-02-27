<template>
  <div class="container" id="Friends">
		<p></p>
		<h3>Friends</h3>
		<p>Review all of your friends currently in the system, noting the date of the last event where you saw them and how many total events you share with them. Add or remove friends as your relationships change!</p>
		<router-link class="btn btn-success" to="/add-friend">Add Friend</router-link>
		<router-link class="btn btn-warning" to="/update-friend">Update Friend</router-link>
		<router-link class="btn btn-danger" to="/remove-friend">Remove Friend</router-link>
		<p></p>
		<FriendList :people="people"/>
  </div>
</template>

<script>
import FriendList from "@/components/FriendList";

export default {
  name: "Friends",
	components: {
		FriendList
	},
	data() {
		return {
			people: []
		}
	},
	mounted() {
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
		}
	}
}
</script>

<style scoped>
</style>
