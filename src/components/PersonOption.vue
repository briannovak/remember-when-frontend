<template>
  <option id="PersonOption">
		{{data.name}}
  </option>
</template>

<script>
export default {
  name: "PersonOption",
	props: ["data"]
}
</script>

<style scoped>
</style>
