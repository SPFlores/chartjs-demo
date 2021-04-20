import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import pattern from 'patternomaly'

const LineGraph = ({ height = 400, dataArr, colors, patterns, accessibilityMode }) => {
  const [accessibility, setAccessibility] = useState(accessibilityMode)
  useEffect(_ => setAccessibility(accessibilityMode), [accessibilityMode])

  let datasetData = dataArr.map(item => item.value)
  let labels = dataArr.map(item => new Date(item.date).toString().split(' ').slice(1, 3).join(' '))
  let colorsOrPatterns = accessibility ? pattern.draw(patterns, colors) : colors

  const data = {
    labels: labels,
    datasets: [{
      borderCapStyle: 'round',
      borderColor: '#B8D9FF',
      borderWidth: 2,
      hoverBorderWidth: 1,
      hoverBorderColor: 'rgba(102, 119, 153, 0.3)',
      data: datasetData,
      fill: false,
      pointBackgroundColor: colorsOrPatterns,
      pointBorderColor: colors,
      pointBorderWidth: 0,
      pointRadius: 7
    }],
    options: {
      animation: {
        duration: 1500
      },
      responsive: true,
      maintainAspectRatio: false,
      fullWidth: false,
      legend: {
        display: false
      },
      layout: {
        padding: {
          left: 10,
          right: 30,
          top: 20,
          bottom: 10
        }
      },
      scales: {
        xAxes: [{
          ticks: {
            fontSize: 14,
            fontColor: '#667799'
          },
          gridLines: {
            drawOnChartArea: false,
            color: '#F5F6F8'
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            max: 100,
            fontSize: 14,
            beginAtZero: true,
            fontColor: '#667799'
          },
          gridLines: {
            drawOnChartArea: true,
            color: '#F5F6F8'
          },
          scaleLabel: {
            display: true,
            labelString: 'Engagement Rate (%)',
            fontColor: '#667799',
            fontFamily: 'Lato',
            fontSize: 14
          }
        }]
      },
      plugins: {
        datalabels: false
      },
      tooltips: {
        borderWidth: 1,
        borderColor: 'rgba(102, 119, 153, 0.4)',
        xPadding: 10,
        yPadding: 10,
        caretPadding: 0,
        caretSize: 0,
        bodySpacing: 10,
        bodyFontSize: 14,
        displayColors: false,
        backgroundColor: '#FFFFFF',
        callbacks: {
          title: function (context) {
            return ''
          },
          labelTextColor: function (tooltipItem, chart) {
            return '#667799'
          },
          label: function (tooltipItem, data) {
            let labelData = data.datasets[0]
            let label = labelData && data.labels[tooltipItem.index]
            return label
          },
          afterBody: function (tooltipItem, data) {
            let labelData = data.datasets[0]
            let labelIndex = labelData && tooltipItem[0]
            let total = labelIndex && data.datasets[0].data[tooltipItem[0].index]
            return total + '%'
          }
        }
      }
    }
  }

  return (
    <div>
      <Line data={data} options={data.options} height={height} />
    </div>
  )
}

export default LineGraph
