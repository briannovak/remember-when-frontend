<template>
  <div id="FriendList">
		<table class="table table-hover">
		  <thead>
		    <tr>
		      <th scope="col">Name</th>
		      <th scope="col">Last Event</th>
		      <th scope="col">Event Count</th>
		    </tr>
		  </thead>
		  <tbody>
				<FriendRow v-for="person in people" :key="person.id" :data="person"/>
			</tbody>
	</table>
  </div>
</template>

<script>
import FriendRow from "@/components/FriendRow"

export default {
  name: "FriendList",
	props: ["people"],
	components: {
		FriendRow
	}
}
</script>

<style scoped>
</style>
