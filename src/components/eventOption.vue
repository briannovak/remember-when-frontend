<template>
  <option id="EventOption">
		{{data.name}}, {{convertedDate}}
  </option>
</template>

<script>
import moment from "moment";

export default {
  name: "EventOption",
	data() {
		return {
			convertedDate: ""
		}
	},
	props: ["data"],
	mounted(){
		this.convertDate();
	},
	methods: {
		convertDate(){
			this.convertedDate = moment(this.data.date).format('l')
		}
	}
}
</script>

<style scoped>
</style>
