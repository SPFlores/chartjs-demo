import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import pattern from 'patternomaly'

const DoughnutGraph2 = ({ dataArr, total, colors, patterns, accessibilityMode }) => {
  const [accessibility, setAccessibility] = useState(accessibilityMode)
  useEffect(_ => setAccessibility(accessibilityMode), [accessibilityMode])

  const labels = dataArr.map(item => item['status'])

  let datasetData = dataArr.map(item => {
    let score = (item.number / total) * 100
    return Math.round((score + Number.EPSILON) * 10) / 10
  })

  let assignedColors = dataArr.map((item, index) => colors[index])

  let assignedPatterns = dataArr.map((item, index) => pattern.draw(patterns[index], assignedColors[index]))

  const colorsOrPatterns = accessibility ? assignedPatterns : assignedColors

  const data = {
    labels: labels,
    datasets: [{
      backgroundColor: colorsOrPatterns,
      data: datasetData,
      hoverBorderWidth: 3,
      hoverBorderColor: 'rgba(102, 119, 153, 0.3)',
      borderWidth: 1,
      pointStyle: 'circle',
      total: total
    }],
    options: {
      animation: {
        duration: 1500
      },
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: 'right',
        onClick: function () { },
        labels: {
          usePointStyle: true,
          boxWidth: 15,
          fontSize: 14,
          fontFamily: 'Lato',
          padding: 10
        }
      },
      layout: {
        padding: {
          right: 5,
          top: 15,
          bottom: 15,
          left: 5
        }
      },
      plugins: {
        datalabels: false
      },
      tooltips: {
        borderWidth: 1,
        borderColor: 'rgba(102, 119, 153, 0.4)',
        xPadding: 16,
        yPadding: 8,
        caretPadding: 0,
        caretSize: 0,
        bodySpacing: 10,
        bodyFontSize: 14,
        footerFontSize: 14,
        displayColors: true,
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
            return ' ' + label
          },
          afterBody: function (tooltipItem, data) {
            let labelData = data.datasets[0]
            let labelIndex = labelData && tooltipItem[0]
            let label = labelIndex && dataArr[tooltipItem[0].index].number
            return '      ' + label + ' candidates'
          },
          beforeFooter: function (tooltipItem, data) {
            let labelData = data.datasets[0]
            let score = labelData && labelData.data[tooltipItem[0].index]
            return '      ' + score + '%'
          }
        }
      }
    }
  }

  return (
    <div>
      <Doughnut data={data} options={data.options} height={350} />
    </div>
  )
}

export default DoughnutGraph2
