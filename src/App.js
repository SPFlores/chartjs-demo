import './App.css'
import React, { useState } from 'react'
import { DoughnutGraph, DoughnutGraph2, HorizontalBarGraph, LineGraph } from './components/graphs'
import { jobStatus, totalJobs, jobColors, jobPatterns, diversityProfile, totalDiversity, diversityColor, diversityPattern, candidateEngagement, engagementColor, engagementPattern, totalCandidates, candidateStatus, candidateColors, candidatePatterns } from './utils'
import 'chartjs-plugin-datalabels'
import { defaults } from 'react-chartjs-2'
defaults.global.defaultFontFamily = 'Lato'

const ChartJS = () => {
  const [accessibilityMode, setAccessibilityMode] = useState(false)
  const togglePatterns = _ => {
    setAccessibilityMode(!accessibilityMode)
  }

  return (
    <div className='App' style={{ textAlign: 'center', padding: '0 100px' }}>
      <h1>Let's build some charts!</h1>
      <h4>For the video accompanying this code, go <a href='https://drive.google.com/file/d/1nyNRE7D7rphQefSrhPI9wjfyQrD1NoxO/view?usp=sharing' target='_blank' rel='noreferrer'>here</a> to access the Google Drive video</h4>
      <p>
        React-Chartjs-2: <a href='https://www.npmjs.com/package/react-chartjs-2' target='_blank' rel='noreferrer'>here</a>
        <br />
        Chartjs: <a href='https://www.chartjs.org/docs/latest/' target='_blank' rel='noreferrer'>here</a>
        <br />
        Patternomaly: <a href='https://github.com/ashiguruma/patternomaly' target='_blank' rel='noreferrer'>here</a>
        <br />
        Chartjs Datalabels Plugin: <a href='https://chartjs-plugin-datalabels.netlify.app/guide/' target='_blank' rel='noreferrer'>here</a>
      </p>
      <br />
      <button onClick={togglePatterns}>Toggle patterns</button>
      <br />
      <br />
      <DoughnutGraph2 dataArr={candidateStatus} total={totalCandidates} colors={candidateColors} patterns={candidatePatterns} accessibilityMode={accessibilityMode} />
      <br />
      <br />
      <DoughnutGraph dataArr={jobStatus} total={totalJobs} colors={jobColors} patterns={jobPatterns} accessibilityMode={accessibilityMode} status={'job'} />
      <br />
      <br />
      <HorizontalBarGraph dataArr={diversityProfile} total={totalDiversity} colors={diversityColor} patterns={diversityPattern} accessibilityMode={accessibilityMode} />
      <br />
      <br />
      <LineGraph dataArr={candidateEngagement} colors={engagementColor} patterns={engagementPattern} accessibilityMode={accessibilityMode} />
      <br />
      <br />
    </div >
  )
}

export default ChartJS
