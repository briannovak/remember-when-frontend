<template>
	<tr id="Event">
		<th scope="row">{{data.name}}</th>
		<td>{{this.convertDate(data.date)}}</td>
		<td>{{data.type}}</td>
		<td>{{data.attendees}}</td>
	</tr>
</template>

<script>
export default {
  name: "Event",
	props: ["data"],
	methods: {
		convertDate(dateToConvert) {
			var convertedDate = new Date(dateToConvert);
			var convertedEvent = ((convertedDate.getMonth() + 1) + '/' + convertedDate.getDate() + '/' +  convertedDate.getFullYear());
			return convertedEvent;
		}
	}
}
</script>

<style scoped>
</style>
