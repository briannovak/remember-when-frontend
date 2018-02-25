<template>
	<tr id="FriendRow">
		<th scope="row col">{{data.name}}</th>
		<td scope="col">{{this.convertDate(data.last_event)}}</td>
		<td scope="col">{{data.count}}</td>
	</tr>
</template>

<script>
export default {
  name: "FriendRow",
	props: ["data"],
	methods: {
		convertDate(dateToConvert) {
			var convertedDate = new Date(dateToConvert);
			var convertedBirth = ((convertedDate.getMonth() + 1) + '/' + convertedDate.getDate() + '/' +  convertedDate.getFullYear());
			return convertedBirth;
		}
	}
}
</script>

<style scoped>

</style>
