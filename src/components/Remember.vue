<template>
  <div id="Remember">
		<p></p>
		<vue-chart type="bubble" :data="chartData" :options="options"></vue-chart>
		<p>In the Remember! chart above, friends with larger bubbles indicate more time since you have seen that friend. Highlight a bubble to see the friend and date of last event you shared with that friend. </p>
		<p></p>
  </div>
</template>

<script>
import VueChart from "vue-chart-js";
import moment from "moment";

export default {
  name: "Remember",
	components: {
		VueChart
	},
	data() {
		return {
			people: [],
			hexOptions: ["A", "B", "C", "D", "E", "F", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
			hexCode: "",
			chartData: {
          labels: ['Data'],
          datasets: []
			},
			options: {
				scales: {
					yAxes: [{
						display: false,
						ticks: {
							beginAtZero: false,
							suggestedMax: 5.05,
							suggestedMin: -.25
						},
						gridLines: {
							display: false
						}
					}],
					xAxes: [{
						display: false,
						ticks: {
							beginAtZero: false,
							suggestedMax: 5.05,
							suggestedMin: -.25
						},
						gridLines: {
							display: false
						}
					}]
				},
				legend: {
					display: false
				},
				tooltips: {
					enabled: true,
					mode: 'single',
					callbacks: {
						label: function(tooltipItems, data) {
							// console.log(tooltipItems);
							// console.log(data.datasets);
							// console.log(data.datasets[tooltipItems.datasetIndex].label);
							return data.datasets[tooltipItems.datasetIndex].label;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200,
				scaleOverride: true
			}
		}
	},
	mounted(){
		this.loadPeople();
	},
	methods: {
		loadPeople() {
			fetch("https://remember-when-backend.herokuapp.com/people")
				.then(response => response.json())
				.then(peopleVar => {
					this.people = peopleVar.people;
					this.createChartDatasets();
				}
			);
		},
		createRandomHexCode(){
			this.hexCode = "#";
			for (let i=0; i<6; i++){
			  this.hexCode += this.hexOptions[Math.floor(Math.random()*16)]
			};
		},
		createChartDatasets(){
			for (var i = 0; i < this.people.length; i++) {
				let chartDataToInsert= {data:[{}]};
				this.createRandomHexCode();
				chartDataToInsert.label = this.people[i].name;
				chartDataToInsert.backgroundColor = this.hexCode;
				chartDataToInsert.data[0].x = Math.floor(Math.random()*5);
				chartDataToInsert.data[0].y = Math.floor(Math.random()*5);
				chartDataToInsert.data[0].r = Math.floor(Math.random()*50);
				this.chartData.datasets.push(chartDataToInsert);
			}
		}
	}
}
</script>

<style scoped>
</style>
