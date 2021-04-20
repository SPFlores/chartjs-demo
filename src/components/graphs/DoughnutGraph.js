import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import pattern from 'patternomaly'

const DoughnutGraph = ({ dataArr, total, colors, patterns, accessibilityMode, status }) => {
  const [accessibility, setAccessibility] = useState(accessibilityMode)
  useEffect(_ => setAccessibility(accessibilityMode), [accessibilityMode])

  let setType = 'type'

  const labels = dataArr.map(item => item[setType].charAt(0).toUpperCase() + item[setType].slice(1))

  let datasetData = dataArr.map(item => {
    let score = (item.number / total) * 100
    return Math.round((score + Number.EPSILON) * 10) / 10
  })

  let assignedColors = dataArr.map((item, index) => {
    if (status === 'candidate' && (index > colors.length - 1)) {
      let newIndex = index - colors.length
      if (newIndex > colors.length - 1) {
        let newestIndex = newIndex - colors.length
        return colors[newestIndex]
      } else return colors[newIndex]
    } else return colors[item.type ? item.type : index]
  })

  let assignedPatterns = dataArr.map((item, index) => {
    if (status === 'candidate' && (index > patterns.length - 1)) {
      let newIndex = index - patterns.length
      if (newIndex > patterns.length - 1) {
        let newestIndex = newIndex - patterns.length
        return pattern.draw(patterns[newestIndex], assignedColors[index])
      } else return pattern.draw(patterns[newIndex], assignedColors[newIndex])
    } else return pattern.draw(patterns[index], assignedColors[index])
  })

  const colorsOrPatterns = accessibility ? assignedPatterns : assignedColors

  let datalabelsOptions = status === 'job' ? {
    clamp: true,
    font: function (context) {
      return {
        size: `${context.chart.height * 0.064}`
      }
    },
    color: function (context) {
      if (context.dataIndex === assignedColors.indexOf(colors['inactive'])) {
        return '#F5F6F8'
      } else return '#19263E'
    },
    formatter: function (value) {
      return value + '%'
    }
  } : false

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
      fullWidth: false,
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
        datalabels: datalabelsOptions
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
            return '      ' + label + `${status === 'job' ? ' openings' : ' candidates'}`
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

export default DoughnutGraph
