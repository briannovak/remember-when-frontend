<template>
  <div id="EventList">
		<table class="table table-hover">
		  <thead>
		    <tr>
		      <th scope="col">Name</th>
		      <th scope="col">Date</th>
		      <th scope="col">Type</th>
		      <th scope="col">Attendees</th>
		    </tr>
		  </thead>
		  <tbody>
				<Event v-for="oneEvent in events" :key="oneEvent.id" :data="oneEvent"/>
			</tbody>
	</table>
  </div>
</template>

<script>
import Event from "@/components/Event"

export default {
  name: "EventList",
	props: ["events"],
	components: {
		Event
	}
}
</script>

<style scoped>
</style>
