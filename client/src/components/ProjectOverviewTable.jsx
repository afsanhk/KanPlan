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
// Refer to EditTaskForm
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

// Project Components
import TeamMemberName from './TeamMemberName';

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
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  icon: {
    margin: '5px'
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
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

export default function ProjectOverviewTable({projectTasks}) {
  const classes = useStyles();

  // Array of task objects in projectTasks
  function createData(projectTasks) {
    return { id: projectTasks.id, title: projectTasks.title, users: projectTasks.task_users, status: projectTasks.status, priority_name: projectTasks.priority_name, plan_start: projectTasks.plan_start, plan_end: projectTasks.plan_end };
  }
  
  const rows = projectTasks[0] && projectTasks.map(el => createData(el));

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Tasks</StyledTableCell>
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
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              {/* Afsan: Must be a better way to do this horizontal view of users. */}
              <StyledTableCell align="center" style={{display:'flex', flexDirection:'row'}}>
                {row.users.map((name,index) => <TeamMemberName key={index}/>)}
              </StyledTableCell>
              {/* Afsan: Inline styling is one way to override the material-UI styles... doesn't look great.*/}
              <StyledTableCell align="center" style={{ backgroundColor: backgroundColor[row.status], color: 'white' }}>{row.status.toUpperCase()}</StyledTableCell>
              <StyledTableCell align="center"><FlagIcon style={flagStyles[row.priority_name]} /></StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="date"
                  label="Start Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(row.plan_start)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={() => console.log('Changed something in the start date table!')}
                />
                </StyledTableCell>
              <StyledTableCell align="center">
                <TextField
                  id="date"
                  label="End Date"
                  type="date"
                  defaultValue={convertTimestampStringToYMD(row.plan_end)}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                  onChange={() => console.log('Changed something in the end date table!')}
                />
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton size="small">
                  <EditOutlinedIcon />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {/* This might need to change */}
          <StyledTableRow>
            <StyledTableCell>Add a Task!</StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
