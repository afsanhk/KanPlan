import Chart from "react-google-charts";

export default function GoogleGantt ({projectTasks}) {

  const tasks = projectTasks[0] && 
  projectTasks.map(el => {

    const startDate = new Date(Date.parse(el.plan_start))
    const endDate = new Date(Date.parse(el.plan_end)) // Hard coded --> Remove when seeds are improved

    return [
      el.id.toString(), // ID: String
      el.title.toString(), // Name: String
      startDate, // Start Date: Date
      endDate, // End Date: Date Hard coded --> Remove when seeds are improved
      null, // Duration -- Out of scope
      100, // Progress
      null // Dependencies -- Out of scope
    ]
  
  });

  // https://developers.google.com/chart/interactive/docs/gallery/ganttchart#data-format
  const ganttStyle = {
    width: "90vw",
    height: "200px",
    gantt: {
      criticalPathEnabled: false,
      innerGridHorizLine: {
        stroke: 'grey',
        strokeWidth: 0.5,
      },
      barCornerRadius: 20,
      innerGridTrack: { fill: 'white' },
      innerGridDarkTrack: { fill: 'white' },
      trackHeight: 70
    },
  }

  return (
    <Chart
    chartType="Gantt"

    loader={<div>Loading Chart</div>}
    data={[
      [
        { type: 'string', label: 'Task ID' },
        { type: 'string', label: 'Task Name' },
        { type: 'date', label: 'Start Date' },
        { type: 'date', label: 'End Date' },
        { type: 'number', label: 'Duration' },
        { type: 'number', label: 'Percent Complete' },
        { type: 'string', label: 'Dependencies' },
      ], 
      ...tasks
    ]}
    options={ganttStyle}
  />
  )
};