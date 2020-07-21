<template>
  <div class="container">
    <h1>Page 1</h1>
    <div class="row">
        <div class="card">
          <p>BARS CHART</p>
          <CanvasChart chartName="anualResult" :options="barsChart" :ready="barsChart.ready"></CanvasChart>
        </div>
        <div class="card">
          <p>PIE CHART</p>
          <CanvasChart chartName="anualPercentage" :options="pieChart" :ready="pieChart.ready"></CanvasChart>
        </div>
    </div>
  </div>
</template>

<script>
import CanvasChart from "@/components/ChartComponent.vue";
export default {
  data() {
    return {
      barsChart: {
        type: "bar",
        url: "https://private-afe609-testefront.apiary-mock.com/anual-result",
        ready: false,
        width: "400",
        height: "300",
        datasets: [
          {
            backgroundColor: [
              "#03a9f4",
              "#03a9f4",
              "#03a9f4",
              "#03a9f4",
              "#03a9f4",
              "#03a9f4"
            ],
            borderWidth: 0,
            barThickness: 35,
            minBarLength: 5,
            data: []
          }
        ],
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          legend: {
            display: false
          },
          responsive: true,
          tooltips: {
            backgroundColor: "rgb(244,246,249)",
            bodyAlign: "center",
            bodySpacing: 2,
            borderColor: "rgb(222,226,234)",
            callbacks: {
              label: function(tooltipItem) {
                return tooltipItem.value;
              },
              title: function() {
                return "";
              }
            },
            bodyFontColor: "rgb(180,180,180)",
            displayColors: false,
            footerFontStyle: "bold"
          },
          scales: {
            drawBorder: false,
            yAxes: [
              {
                gridLines: {
                  color: "rgb(245,245,245)",
                  display: true,
                  zeroLineColor: "rgb(245,245,245)",
                  zeroLineWidth: 1
                },
                ticks: {
                  beginAtZero: true,
                  padding: 10
                }
              }
            ],
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  beginAtZero: true,
                  padding: 10,
                  callback: function(value) {
                    let newValue = value.substring(0, 3).split("");
                    newValue[0] = newValue[0].toUpperCase();
                    return newValue.join("");
                  }
                }
              }
            ]
          }
        }
      },
      pieChart: {
        type: "pie",
        url:
          "https://private-afe609-testefront.apiary-mock.com/anual-percentage",
        ready: false,
        width: 400,
        height: 300,
        datasets: [
          {
            backgroundColor: ["#2c82be", "#32b88b", "#dbecf8"],
            borderWidth: 0,
            barThickness: 35,
            minBarLength: 5
          }
        ],
        options: {
          layout: {
            padding: { bottom: 0, left: 0, right: 0, top: 0 }
          },
          responsive: true,
          tooltips: {
            bodyAlign: "center",
            bodySpacing: 2,
            borderColor: "red",
            caretSize: 0,
            displayColors: true,
            bodyFontStyle: "bold",
            position: "nearest",
            xPadding: 10,
            yPadding: 10
          }
        }
      }
    };
  },
  components: {
    CanvasChart
  },
  mounted() {
    this.getChartData(this.barsChart)
    this.getChartData(this.pieChart)
  },
  methods: {
    async getChartData(obj) {
      const res = await fetch(obj.url)
      const data = await res.json()
      obj.labels = await data.map(el => el.label).slice(0, 6)
      obj.datasets[0].data = await data.map(el => el.value).slice(0, 6)
      obj.ready = true
    }
  }
};
</script>
