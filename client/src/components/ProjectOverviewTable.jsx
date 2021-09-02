import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FlagIcon from '@material-ui/icons/Flag';
import Avatar from '@material-ui/core/Avatar';

import TableFooter from '@material-ui/core/TableFooter';

// Refer to EditTaskForm
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Project Components
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import DeleteTaskForm from './DeleteTaskForm';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import '../styles/ProjectOverviewTable.scss'

// Helper function -- converts String Timestamp to String Date in DMY format
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
const convertTimestampStringToYMD = function(timestampString) {
  let timestampActual = Date.parse(timestampString);
  let dateActual = new Date(timestampActual);
  const day = dateActual.getDate().toString().length < 2 ? '0' + dateActual.getDate().toString(): dateActual.getDate().toString();
  const month = (dateActual.getMonth()+1).toString().length < 2 ? '0' + (dateActual.getMonth()+1).toString() : (dateActual.getMonth()+1).toString();
  const year = dateActual.getFullYear();
  let dateDMYString = `${year}-${month}-${day}`
  return dateDMYString;
}

// https://material-ui.com/customization/default-theme/ --> Use this to figure out how to navigate the theme.
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#155fa0',
    color: '#fcfcfc',
    padding: '15px 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px',
    // borderTopLeftRadius: '8px',
    // borderRightLeftRadius: '8px'
  },
  body: {
    backgroundColor: '#fcfcfc',
    fontSize: 16,
    padding: '5px 15px',
    align: 'center',
    border: '3px solid rgba(189, 189, 189, 0.5)'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableWrapper: {
    overflow: 'auto',
    height: '67vh',
    width: '58vw',
  },
  columnTasks: {
    padding: '0 10px 0 30px',
  },
  columnTaskTitle: {
    color: '#545454',
    borderLeft: 0
  },
  columnActions: {
    padding: '10px',
    borderRight: 0
  },
  icon: {
    margin: '2px'
  },
  rowAddTask: {
    border: 0,
    backgroundColor: '#155fa0',
    color: '#fcfcfc', 
  },
  rowAddTaskHyperlink: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
  input: {
    color: '#757575',
    width: '150px',
    fontSize: 16
  }
}));

const flagStyles = {
  High: {
    color: 'rgb(213, 60, 60)'
  },
  Low: {
    color: 'rgb(251, 175, 60)'
  },
  None: {
    display: 'none'
  }
};

const backgroundColor = {
  Late: 'rgb(213, 60, 60)',
  'To-Do': 'rgb(137, 118, 185)',
  'In Progress': 'rgb(251, 175, 60)',
  Done: 'rgb(106, 168, 79)'
};

export default function ProjectOverviewTable({ state, projectID, projectTasks, projectUsers, deleteTask, userID }) {
  const classes = useStyles();

  //how modal knows which task to pass in
  const [rowID, setRowID] = React.useState('')

  const changeRowID = (id) => {
    setRowID(id)
  }
  
  // modal state
  const [open, setOpen] = React.useState(false);

  // modal open function
  const handleOpen = () => {
    setOpen(true);
  };

  // modal close function
  const handleClose = () => {
    setOpen(false);
  };


  // Array of task objects in projectTasks
  function createData(projectTasks) {
    return { 
      id: projectTasks.id, 
      title: projectTasks.title, 
      users: projectTasks.task_users, 
      status: projectTasks.status, 
      priority_name: projectTasks.priority_name, 
      plan_start: projectTasks.plan_start, 
      plan_end: projectTasks.plan_end 
    };
  }
  
  const rows = projectTasks[0] && projectTasks.map(el => createData(el));

  return (
    <>
    <TableContainer component={Paper} elevation={0} className={classes.tableWrapper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell className={classes.columnTasks}>Tasks</StyledTableCell>
            <StyledTableCell align="center">Users</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Priority</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {projectTasks[0] && rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" className={[classes.columnTasks, classes.columnTaskTitle]} >
                {row.title}
              </StyledTableCell>
              <StyledTableCell >
                <AvatarGroup className='overview-table-avatar'>
                  {row.users.map((userID, index) => {
                    if (row.users.length === 1) {
                      return ( 
                        <>
                          <Avatar name={projectUsers[userID]['user_name']} key={index}/>
                          <p className='overview-table-avatar-name'>{projectUsers[userID]['user_name'].split(' ')[0]}</p>
                        </>
                      )
                    }

                    return (
                      <Avatar alt={projectUsers[userID]['user_name']} key={index}>
                        {projectUsers[userID]['user_name'][0]}
                      </Avatar>
                    )
                  })}
                </AvatarGroup>
              </StyledTableCell>
              {/* Afsan: Inline styling is one way to override the material-UI styles... doesn't look great.*/}
              <StyledTableCell align="center" style={{ backgroundColor: backgroundColor[row.status], color: '#fcfcfc' , fontSize: '15px'}}>{row.status.toUpperCase()}</StyledTableCell>
              <StyledTableCell align="center"><FlagIcon style={flagStyles[row.priority_name]} fontSize="medium" /></StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="date"
                  // label="Start Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(row.plan_start)}
                  size="small" 
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    className: classes.input
                  }}
                  onChange={() => console.log('Changed something in the start date table!')}
                />
                </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="date"
                  // label="End Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(row.plan_end)}
                  size="small" 
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    className: classes.input
                  }}
                  onChange={() => console.log('Changed something in the end date table!')}
                />
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.columnActions} >
                <IconButton size="small">
                  <EditOutlinedIcon 
                    className={classes.icon} 
                    fontSize='small' 
                    onClick={() => {console.log('go to edit task modal')}}
                  />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon 
                    className={classes.icon} 
                    fontSize='small' 
                    onClick={() => {
                      changeRowID(row.id)
                      handleOpen()
                    }}
                  />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          <StyledTableRow className={classes.rowAddTaskHyperlink} hover onClick={() => {console.log('go to add task modal')}}>
            <StyledTableCell className={classes.rowAddTask} style={{borderBottomLeftRadius: '5px'}}>
              <div className='overview-table-add-task'>
                <AddCircleIcon />
                <p><strong>Add a Task!</strong></p>
              </div>
            </StyledTableCell>
            <StyledTableCell className={classes.rowAddTask} />
            <StyledTableCell className={classes.rowAddTask} />
            <StyledTableCell className={classes.rowAddTask} />
            <StyledTableCell className={classes.rowAddTask} />
            <StyledTableCell className={classes.rowAddTask} />
            <StyledTableCell className={classes.rowAddTask} style={{borderBottomRightRadius: '5px'}}/>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>

    <Modal
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    >
      <Fade in={open}>
        <DeleteTaskForm 
          close={handleClose}
          userID={userID}
          projectID={projectID}
          task={state.tasks[rowID]}
          deleteTask={deleteTask}
        />
      </Fade>
    </Modal>
  </>
    
  );
}
