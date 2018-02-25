<template>
  <div id="app" class="container">
		<body>
			<Header/>
			<router-view class="container"/>
			<Footer/>
		</body>
  </div>
</template>

<script>
import Header from "./components/Header"
import Footer from "./components/Footer"

export default {
  name: 'App',
	components: {
		Header,
		Footer
	}
}
</script>

<style>

</style>
