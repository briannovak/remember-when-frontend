<template>
  <div id="BubbleChart">

  </div>
</template>
<script>
import VueChartJS from "vue-chartjs"

export default {
  name: "BubbleChart",
	extends: VueChartJS.Bubble,
  data(){
		return {
			datacollection: {
          labels: ['Data'],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: [
                {
                  x: 100,
                  y: 0,
                  r: 10
                },
                {
                  x: 60,
                  y: 30,
                  r: 20
                },
                {
                  x: 40,
                  y: 60,
                  r: 25
                },
                {
                  x: 80,
                  y: 80,
                  r: 50
                },
                {
                  x: 20,
                  y: 30,
                  r: 25
                },
                {
                  x: 0,
                  y: 100,
                  r: 5
                }
              ]
            }
          ]
        },
			options: {
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
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
							return '$' + tooltipItems.yLabel;
						}
					}
				},
				responsive: true,
				maintainAspectRatio: false,
				height: 200
			}
		}
	},
	mounted () {
		// this.chartData is created in the mixin
		this.renderChart(this.datacollection, this.options)
	}
}
</script>

<style scoped>
</style>
