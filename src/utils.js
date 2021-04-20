const jobStatus = [
  {
    type: 'active',
    number: 60
  },
  {
    type: 'inactive',
    number: 40
  }
]

const totalJobs = 100

const jobColors = {
  'active': '#0FB5BA',
  'inactive': '#0B3B83'
}

const jobPatterns = [
  'cross',
  'dot-dash'
]

const diversityProfile = [
  {
    type: 'Black',
    number: 19
  },
  {
    type: 'East Asian',
    number: 17
  },
  {
    type: 'Latinx',
    number: 15
  },
  {
    type: 'South Asian',
    number: 8
  },
  {
    type: 'Southeast Asian',
    number: 14
  },
  {
    type: 'West Asian',
    number: 12
  },
  {
    type: 'White',
    number: 12
  }
]

const totalDiversity = 97

const diversityColor = '#3172E2'

const diversityPattern = 'zigzag'

const candidateEngagement = [
  {
    date: '07/10/2021',
    value: 10
  },
  {
    date: '07/11/2021',
    value: 60
  },
  {
    date: '07/12/2021',
    value: 100
  },
  {
    date: '07/13/2021',
    value: 50
  },
  {
    date: '07/14/2021',
    value: 40
  },
  {
    date: '07/15/2021',
    value: 70
  },
  {
    date: '07/16/2021',
    value: 80
  }
]

const engagementColor = '#3172E2'

const engagementPattern = 'zigzag'

const candidateStatus = [
  {
    status: 'Just Added',
    number: 10
  },
  {
    status: 'Screen Scheduled',
    number: 10
  },
  {
    status: 'Screened',
    number: 20
  },
  {
    status: 'Submitted',
    number: 40
  },
  {
    status: 'Client Screening',
    number: 10
  },
  {
    status: 'Client Screened',
    number: 20
  },
  {
    status: 'Onsite',
    number: 30
  },
  {
    status: 'Offer Made',
    number: 10
  },
  {
    status: 'Hired',
    number: 10
  },
  {
    status: 'Hired Elsewhere',
    number: 10
  },
  {
    status: 'Role Already Filled',
    number: 10
  },
  {
    status: 'Role On Hold',
    number: 20
  },
  {
    status: 'Withdrew',
    number: 10
  },
  {
    status: 'Round 1',
    number: 10
  }
]

const totalCandidates = 220

const candidateColors = [
  '#05606E',
  '#028392',
  '#1CD4D4',
  '#C1FEF6',
  '#0B3B83',
  '#1152BB',
  '#4D90F5',
  '#B8D9FF',
  '#E7F1FE',
  '#AA0936',
  '#AE6313',
  '#DB931F',
  '#FADB5F',
  '#FFF3C4'
]

const candidatePatterns = [
  'plus',
  'disc',
  'dash',
  'dot',
  'line',
  'square',
  'cross-dash',
  'triangle-inverted',
  'diagonal-right-left',
  'diamond',
  'line-vertical',
  'ring',
  'diagonal',
  'triangle',
  'zigzag-vertical',
  'diamond-box',
  'weave',
  'box',
  'diagonal-right-left'
]

export { jobStatus, totalJobs, jobColors, jobPatterns, diversityProfile, totalDiversity, diversityColor, diversityPattern, candidateEngagement, engagementColor, engagementPattern, totalCandidates, candidateStatus, candidateColors, candidatePatterns }
