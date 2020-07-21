<template>
  <div class="container">
    <h1>Page 2</h1>
    <div class="card" >
      <p>LINE CHART</p>
      <CanvasChart chartName="timeData" :options="lineChart" :ready="lineChart.ready"></CanvasChart>
    </div>
  </div>
</template>

<script>
import CanvasChart from "@/components/ChartComponent.vue"
export default {
  data() {
    return {
      lineChart: {
        type: "line",
        url: "https://private-afe609-testefront.apiary-mock.com/time-data",
        ready: false,
        colors: ['#be4bfb', '#31429d'],
        datasets:[],
        options: {
        scales: {
            yAxes: [{
              stacked: true,
              ticks: {
                pointStyle: "cross",
                beginAtZero: true,
                offset: 20
              }
            }]
          }
        }
      }
    }
  },
  components: {
    CanvasChart
  },
  mounted() {
    this.getChartData(this.lineChart) 
  },
  methods:{
    async getChartData(obj) {
      const res = await fetch(obj.url);
      const data = await res.json();
      obj.labels = []
      obj.datasets = []
      Object.keys(data).forEach((category, ind) => {
          const _color = obj.colors[ind]
          const allLabels = Array.from(data[category]).reduce((labels, el) => {
            if(labels.indexOf(el.label) ==-1) {
              labels.push(el.label)
            }
            return labels
          }, obj.labels)
          obj.labels = allLabels
          
          const newDataset = {
            borderWidth: 2,
            backgroundColor: data[category].map(pt => (pt)? _color: 'rgba(0,0,0,0)'),
            borderColor: data[category].map(pt => (pt)? _color: 'rgba(0,0,0,0)'),
            spanGaps: 20,
            data: data[category].map(point=> {
              return {x: point.label, y:point.value}
              }),
            fill: false,
            label: category,
            }
          obj.datasets.push(newDataset)
        })
      obj.ready = true
    }
  }
}
</script>

<style scoped>
.card {
  max-width: 800px;
  width: 80%;
}
</style>
