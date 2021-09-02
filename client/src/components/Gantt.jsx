import React from 'react';
import TimeLine from "libresky-gantt";
import '../styles/Gantt.scss'


const styleConfig = {
  header:{ //Targert the time header containing the information month/day of the week, day and time.
      top:{//Tartget the month elements
          style:{backgroundColor:"#333333"} //The style applied to the month elements
      },
      middle:{//Tartget elements displaying the day of week info
          style:{backgroundColor:"chocolate"}, //The style applied to the day of week elements
          selectedStyle:{backgroundColor:"#b13525"}//The style applied to the day of week elements when is selected
      },
      bottom:{//Tartget elements displaying the day number or time 
          style:{background:"grey",fontSize:9},//the style tp be applied 
          selectedStyle:{backgroundColor:"#b13525",fontWeight:  'bold'}//the style tp be applied  when selected
      }
  },
  taskList:{//the right side task list
      title:{//The title od the task list
          label:"Projects",//The caption to display as title
          style:{backgroundColor:  '#333333',borderBottom:  'solid 1px silver',
                 color:  'white',textAlign:  'center'}//The style to be applied to the title
      },
      task:{// The items inside the list diplaying the task
          style:{backgroundColor:  '#fbf9f9'}// the style to be applied
      },
      verticalSeparator:{//the vertical seperator use to resize he width of the task list
          style:{backgroundColor:  '#333333',},//the style
          grip:{//the four square grip inside the vertical separator
              style:{backgroundColor:  '#cfcfcd'}//the style to be applied
          }
      }
  },
  dataViewPort:{//The are where we display the task
      rows:{//the row constainting a task
          style:{backgroundColor:"#fbf9f9",borderBottom:'solid 0.5px #cfcfcd'}
          },
      task:{//the task itself
          showLabel:false,//If the task display the a lable
          style:{position:  'absolute',borderRadius:14,color:  'white',
                 textAlign:'center',backgroundColor:'grey'},
           selectedStyle:{}//the style tp be applied  when selected
      }
  },
  links:{//The link between two task
      color:'black',
      selectedColor:'#ff00fa'
  }
}

function Gantt({projectTasks}) {

  const tasks = projectTasks[0] && 
  projectTasks.map(el => {
    
    const endDate = Date.parse(el.plan_end) // Hard coded --> Remove when seeds are improved

    return {
      id: el.id,
      name: el.title,
      start: el.plan_start,
      end: endDate + 100000000, // Hard coded --> Remove when seeds are improved
      color: 'blue'
    }
  })
  ;
  

  return (
    <>
      {!projectTasks[0] ? <h1>Ha-ha no data for a Gantt!</h1> :
      <TimeLine data={tasks} config={styleConfig} />}
    </>
  )
}

export default Gantt;
