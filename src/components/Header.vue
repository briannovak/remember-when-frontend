<template>
  <div id="Header">
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<router-link class="nav-link navbar-brand" to="/"><img src= "../../static/rememberwhenlogo.png"/></router-link>
		  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

		  <div class="collapse navbar-collapse" id="navbarColor02">
		    <ul class="navbar-nav mr-auto">
					<li class="nav-link"><router-link to="/remember">Remember!</router-link></li>
					<li><router-link class="nav-link" to="/friends">Friends</router-link></li>
					<li><router-link class="nav-link" to="/events">Events</router-link></li>
					<li><router-link class="nav-link" to="/remember">About</router-link></li>
		    </ul>
		  </div>
		</nav>

  </div>
</template>

<script>
export default {
  name: "Header",
}
</script>

<style scoped>
img {
	height: 75px;
	width: 75px
}
</style>
