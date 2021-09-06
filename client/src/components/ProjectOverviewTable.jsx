import React, { useContext, useEffect, useRef, useState } from 'react';
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

// Refer to EditTaskForm
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Tooltip } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Project Components
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import EditTaskForm from './EditTaskForm';
import DeleteTaskForm from './DeleteTaskForm';

//For the edit and delete modals
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import '../styles/ProjectOverviewTable.scss';
import AddTaskForm from './AddTaskForm';

//helper functions
import { getProjectsForUser } from '../helpers/selectors';
import avatarBGColor from '../helpers/avatarBG';

import { imageContext } from '../providers/ImagePorvider';

// Helper function -- converts String Timestamp to String Date in DMY format
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
// https://www.delftstack.com/howto/javascript/javascript-convert-timestamp-to-date/
// const convertTimestampStringToYMD = function (timestampString) {
//   let timestampActual = Date.parse(timestampString);
//   let dateActual = new Date(timestampActual);
//   const day = dateActual.getDate().toString().length < 2 ? '0' + dateActual.getDate().toString() : dateActual.getDate().toString();
//   const month = (dateActual.getMonth() + 1).toString().length < 2 ? '0' + (dateActual.getMonth() + 1).toString() : (dateActual.getMonth() + 1).toString();
//   const year = dateActual.getFullYear();
//   let dateDMYString = `${year}-${month}-${day}`;
//   return dateDMYString;
// };

// https://material-ui.com/customization/default-theme/ --> Use this to figure out how to navigate the theme.
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#155fa0',
    color: '#fcfcfc',
    padding: '15px 10px',
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '10px'
    // borderTopLeftRadius: '8px',
    // borderRightLeftRadius: '8px'
  },
  body: {
    backgroundColor: '#fcfcfc',
    fontSize: 16,
    padding: '5px 15px',
    align: 'center',
    border: '1px solid rgba(189, 189, 189, 0.5)'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

const useStyles = makeStyles((theme) => ({
  tableWrapper: {
    overflow: 'auto',
    maxHeight: '700px',
    width: '100%'
  },
  columnTasks: {
    padding: '0 10px 0 30px',
    minWidth: '270px',
    maxWidth: '270px'
  },
  columnTaskTitle: {
    color: '#545454',
    borderLeft: 0
    // overflowWrap: 'break-word'
  },
  columnActions: {
    padding: '10px',
    borderRight: 0,
    minWidth: '80px'
  },
  icon: {
    margin: '2px'
  },
  rowAddTask: {
    border: 0,
    backgroundColor: '#155fa0',
    color: '#fcfcfc'
  },
  rowAddTaskHyperlink: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  input: {
    color: '#757575',
    width: '150px',
    fontSize: 16
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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

export default function ProjectOverviewTable({ state, projectID, projectTasks, projectUsers, deleteTask, editTask, userID, addTask, updateTaskStatus, updateTaskPriority }) {
  const classes = useStyles();
  const { imageSrc, imageUserID } = useContext(imageContext);

  //how modal knows which task to pass in
  const [rowID, setRowID] = useState('');

  // status to status_id
  const statusToID = {
    'To-Do': 1,
    Late: 2,
    'In Progress': 3,
    Done: 4
  };

  // status_id to status
  const IDToStatus = {
    1: 'To-Do',
    2: 'Late',
    3: 'In Progress',
    4: 'Done'
  };

  // priority to priority_id
  const priorityToID = {
    None: 1,
    Low: 2,
    High: 3
  };

  const IDToPriority = {
    1: 'None',
    2: 'Low',
    3: 'High'
  };

  const changeRowID = (id) => {
    setRowID(id);
  };

  // modal state
  const [openEdit, setOpenEdit] = useState(false); // modal state -- edit modal
  const [openDelete, setOpenDelete] = useState(false); // modal state -- delete modal
  const [openAddTask, setOpenAddTask] = useState(false); // add task modal state

  const projectsArray = getProjectsForUser(state, userID).map((key) => state.projects[key]);

  // modal open function - edit modal
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };
  // add task modal open function
  const handleOpenAddTask = () => {
    setOpenAddTask(true);
  };

  // modal close function - edit modal
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // modal open function - delete modal
  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  // add task modal close function
  const handleCloseAddTask = () => {
    setOpenAddTask(false);
  };
  // modal close function - delete modal
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  // Array of task objects in projectTasks
  function createData(projectTasks) {
    return {
      id: projectTasks.id,
      title: projectTasks.title,
      task_description: projectTasks.task_description,
      task_users: projectTasks.task_users,
      status: projectTasks.status,
      priority_name: projectTasks.priority_name,
      plan_start: projectTasks.plan_start,
      plan_end: projectTasks.plan_end
    };
  }

  // Because projectTasks come in as [null] for new projects in state. With new tasks it's [null, task, task]... filter out the null.
  // const rows = projectTasks.filter((el) => el).map((el) => createData(el));
  const rows = projectTasks.filter((el) => el).map((el) => createData(el));

  const statusClickHandler = (row, index) => {
    let nextStatus;
    if (row.status === 'Done') {
      nextStatus = 'To-Do';
    } else {
      nextStatus = IDToStatus[statusToID[row.status] + 1];
    }
    updateTaskStatus({ status: nextStatus, status_id: statusToID[nextStatus] }, row.id);
  };

  const priorityClickHandler = (row, index) => {
    let nextPriority;
    if (row.priority_name === 'High') {
      nextPriority = 'None';
    } else {
      nextPriority = IDToPriority[priorityToID[row.priority_name] + 1];
    }
    updateTaskPriority({ priority_name: nextPriority, priority_id: priorityToID[nextPriority] }, row.id);
  };

  return (
    <>
      <TableContainer component={Paper} elevation={0} className={classes.tableWrapper}>
        <Table stickyHeader className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell className={classes.columnTasks}>
                <div className="overview-table-task-name-column">
                  Tasks
                  <IconButton size="small" onClick={handleOpenAddTask}>
                    <AddCircleIcon className="overview-table-task-name-column-button" />
                  </IconButton>
                </div>
              </StyledTableCell>
              <StyledTableCell align="center">Users</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Priority</StyledTableCell>
              <StyledTableCell align="center">Start Date</StyledTableCell>
              <StyledTableCell align="center">End Date</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" className={[classes.columnTasks, classes.columnTaskTitle]}>
                  <Tooltip title={row.title} placement="top-start">
                    <div className="overview-table-task-name">{row.title}</div>
                  </Tooltip>
                </StyledTableCell>
                <StyledTableCell>
                  <AvatarGroup className="overview-table-avatar" style={{ minWidth: '135px' }}>
                    {row.task_users.map((userID, index) => {
                      let avatarBG = avatarBGColor(userID);
                      if (row.task_users.length === 1) {
                        return (
                          <>
                            {projectUsers[userID] && (
                              <>
                                {userID === imageUserID ? (
                                  <Avatar name={projectUsers[userID]['user_name']} key={index} src={imageSrc} style={{ 'background-color': avatarBG }} />
                                ) : (
                                  <Avatar name={projectUsers[userID]['user_name']} key={index} src={`https://robohash.org/${userID}`} style={{ 'background-color': avatarBG }} />
                                )}
                                <p className="overview-table-avatar-name">{projectUsers[userID]['user_name'].split(' ')[0]}</p>
                              </>
                            )}
                          </>
                        );
                      }

                      return (
                        <Tooltip title={projectUsers[userID]['user_name']}>
                          {userID === imageUserID ? (
                            <Avatar alt={projectUsers[userID]['user_name']} src={imageSrc} style={{ 'background-color': avatarBG }} />
                          ) : (
                            <Avatar alt={projectUsers[userID]['user_name']} src={`https://robohash.org/${userID}`} style={{ 'background-color': avatarBG }} />
                          )}
                        </Tooltip>
                      );
                    })}
                  </AvatarGroup>
                </StyledTableCell>
                {/* Afsan: Inline styling is one way to override the material-UI styles... doesn't look great.*/}
                <StyledTableCell
                  align="center"
                  style={{ backgroundColor: backgroundColor[row.status], color: '#fcfcfc', fontSize: '15px', minWidth: '110px' }}
                  onClick={() => statusClickHandler(row, index)}
                >
                  {row.status && row.status.toUpperCase()}
                </StyledTableCell>
                <StyledTableCell align="center" onClick={() => priorityClickHandler(row, index)}>
                  <FlagIcon style={flagStyles[row.priority_name]} fontSize="medium" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id="date"
                    // label="Start Date"
                    type="date"
                    value={row.plan_start}
                    size="small"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      className: classes.input
                    }}
                    onChange={(event) => {
                      editTask({ ...row, plan_start: event.target.value }, row.id);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField
                    id="date"
                    // label="End Date"
                    type="date"
                    value={row.plan_end}
                    size="small"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    InputProps={{
                      className: classes.input
                    }}
                    onChange={(event) => {
                      editTask({ ...row, plan_end: event.target.value }, row.id);
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.columnActions}>
                  <IconButton size="small">
                    <EditOutlinedIcon
                      className={classes.icon}
                      fontSize="small"
                      onClick={() => {
                        changeRowID(row.id);
                        handleOpenEdit();
                      }}
                    />
                  </IconButton>
                  <IconButton size="small">
                    <DeleteIcon
                      className={classes.icon}
                      fontSize="small"
                      onClick={() => {
                        changeRowID(row.id);
                        handleOpenDelete();
                      }}
                    />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}

            {/* <StyledTableRow className={classes.rowAddTaskHyperlink} hover onClick={handleOpenAddTask}>
              <StyledTableCell className={classes.rowAddTask} style={{ borderBottomLeftRadius: '5px' }}>
                <div className="overview-table-add-task">
                  <AddCircleIcon />
                  <p>
                    <strong>Add a Task!</strong>
                  </p>
                </div>
              </StyledTableCell>
              <StyledTableCell className={classes.rowAddTask} />
              <StyledTableCell className={classes.rowAddTask} />
              <StyledTableCell className={classes.rowAddTask} />
              <StyledTableCell className={classes.rowAddTask} />
              <StyledTableCell className={classes.rowAddTask} />
              <StyledTableCell className={classes.rowAddTask} style={{ borderBottomRightRadius: '5px' }} />
            </StyledTableRow> */}
          </TableBody>
        </Table>
      </TableContainer>

      {/* add task modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openAddTask}
        onClose={handleCloseAddTask}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openAddTask}>
          <AddTaskForm
            proj_name={state.projects[projectID].proj_name}
            team_members={state.projects[projectID].team_members}
            users={state.users}
            close={handleCloseAddTask}
            projectID={projectID}
            addTask={addTask}
          />
        </Fade>
      </Modal>

      {/* edit modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openEdit}
        onClose={handleCloseEdit}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openEdit}>
          <EditTaskForm
            close={handleCloseEdit}
            editTask={editTask}
            tasks={state.tasks[rowID]} //data about only this task
            users={state.users}
            projects={projectsArray}
          />
        </Fade>
      </Modal>

      {/* delete modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        // className={classes.modal}
        open={openDelete}
        onClose={handleCloseDelete}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={openDelete}>
          <DeleteTaskForm close={handleCloseDelete} userID={userID} projectID={projectID} task={state.tasks[rowID]} deleteTask={deleteTask} />
        </Fade>
      </Modal>
    </>
  );
}
