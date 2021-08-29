import React from 'react'

import HomepageChartA from './HomepageChartA'
import HomepageChartB from './HomepageChartB'

import './HomepageCharts.scss'

function HomepageCharts() {
  return (
    <div className='homepage-charts'>
      <HomepageChartA chartInformation={5} chartTitle='Projects Managing:' chartColor='#0099ff' />
      <HomepageChartA chartInformation={1} chartTitle='Projects Working On:' chartColor='#ff6699' />
      <HomepageChartB chartInformation={[1,2,3,4]} />
    </div>
  )
}

export default HomepageCharts
