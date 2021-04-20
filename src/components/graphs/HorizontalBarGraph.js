import React, { useEffect, useState } from 'react'
import { HorizontalBar } from 'react-chartjs-2'
import pattern from 'patternomaly'

const HorizontalBarGraph = ({ height = 400, dataArr, total, colors, patterns, accessibilityMode }) => {
  const [accessibility, setAccessibility] = useState(accessibilityMode)
  useEffect(_ => setAccessibility(accessibilityMode), [accessibilityMode])

  let datasetData = dataArr.map(item => {
    let score = (item.number / total) * 100
    return Math.round((score + Number.EPSILON) * 10) / 10
  })
  let labels = dataArr.map(item => item.type)
  let colorsOrPatterns = accessibility ? pattern.draw(patterns, colors) : colors

  const data = {
    labels: labels,
    datasets: [{
      backgroundColor: colorsOrPatterns,
      data: datasetData,
      hoverBorderWidth: 3,
      hoverBorderColor: 'rgba(102, 119, 153, 0.3)',
      borderWidth: 1,
      maxBarThickness: 25
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
          left: 120,
          right: 20
        }
      },
      scales: {
        xAxes: [{
          gridLines: {
            drawOnChartArea: false,
            tickMarkLength: 0
          },
          ticks: {
            beginAtZero: true,
            max: 100,
            display: false
          }
        }],
        yAxes: [{
          gridLines: {
            drawOnChartArea: false
          },
          ticks: {
            fontColor: '#253755',
            fontSize: height >= 400 ? 16 : 14,
            // this padding *must* match the padding given above in the layout.padding.left
            padding: 120,
            mirror: true
          }
        }]
      },
      plugins: {
        datalabels: {
          clamp: true,
          align: function (context) {
            return 'right'
          },
          offset: 20,
          anchor: function (context) {
            return 'end'
          },
          font: function (context) {
            return {
              size: `${context.chart.height * 0.04}`
            }
          },
          color: function (context) {
            return '#253755'
          },
          formatter: function (value) {
            return value + '%'
          },
          clip: false
        }
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
        footerFontSize: 14,
        displayColors: false,
        backgroundColor: '#FFFFFF',
        footerFontFamily: 'Lato',
        footerFontStyle: 'normal',
        footerFontColor: '#667799',
        footerMarginTop: 10,
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
            let total = labelIndex && dataArr[tooltipItem[0].index].number
            return total + ' candidates'
          },
          beforeFooter: function (tooltipItem, data) {
            let labelData = data.datasets[0]
            let score = labelData && labelData.data[tooltipItem[0].index]
            return score + '%'
          }
        }
      }
    }
  }

  return (
    <div>
      <HorizontalBar data={data} options={data.options} height={height} />
    </div>
  )
}

export default HorizontalBarGraph
