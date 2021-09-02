import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { DragDropContext } from "react-beautiful-dnd";

import { getTasksForProject } from "../helpers/selectors";

// import component
import KanbanBoard from "../components/KanbanBoard";
import LinkIconContainer from "../components/LinkIconContainer";

// import css
import "../styles/ProjectKanban.scss";

const ProjectKanban = ({ state, addTask, updateTaskStatus, getKanbanStatus, kanbanStatus }) => {
  // Taking it from Params causes issues with projects that don't have tasks. To remove the error, put projectID in state and comment out below lines.
  let { projectID } = useParams();
  projectID = Number(projectID);
  // get kanban status from api

  useEffect(() => {
    getKanbanStatus(projectID);
  }, [projectID, state.projects[projectID].project_tasks]);

  const moveInArray = function (arr, from, to) {
    if (Object.prototype.toString.call(arr) !== "[object Array]") {
      throw new Error("Please provide a valid array");
    }

    const item = arr.splice(from, 1);

    if (!item.length) {
      throw new Error("There is no item in the array at index" + from);
    }

    arr.splice(to, 0, item[0]);
  };

  const initialData = {
    tasks: {},
    columns: {
      "column-1": {
        id: "column-1",
        title: "Late",
        taskIds: [],
      },
      "column-2": {
        id: "column-2",
        title: "To-Do",
        taskIds: [],
      },
      "column-3": {
        id: "column-3",
        title: "In Progress",
        taskIds: [],
      },
      "column-4": {
        id: "column-4",
        title: "Done",
        taskIds: [],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3", "column-4"],
  };

  const [kanbanState, setKanbanState] = useState(initialData);

  useEffect(() => {
    const projectTasks = getTasksForProject(state, projectID).map((i) => state.tasks[i]);

    projectTasks.forEach((task) => {
      if (task) {
        initialData.tasks[task.id] = task;
      }
    });
    if (kanbanStatus[1]) {
      initialData.columns["column-1"].taskIds = kanbanStatus[1].task_id;
    }
    if (kanbanStatus[0]) {
      initialData.columns["column-2"].taskIds = kanbanStatus[0].task_id;
    }
    if (kanbanStatus[2]) {
      initialData.columns["column-3"].taskIds = kanbanStatus[2].task_id;
    }
    if (kanbanStatus[3]) {
      initialData.columns["column-4"].taskIds = kanbanStatus[3].task_id;
    }
    setKanbanState((prev) => ({ ...prev, ...initialData }));
  }, [kanbanStatus]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const start = kanbanState.columns[source.droppableId];
    const finish = kanbanState.columns[destination.droppableId];

    const statusToID = {
      "To-Do": 1,
      Late: 2,
      "In Progress": 3,
      Done: 4,
    };

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...kanbanState,
        columns: {
          ...kanbanState.columns,
          [newColumn.id]: newColumn,
        },
      };

      newTaskIds.forEach((id, index) => {
        updateTaskStatus({ status: finish.title, status_id: statusToID[finish.title], kanban_order: index }, id);
      });

      setKanbanState(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    const currentTask = startTaskIds[source.index];
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    console.log(startTaskIds, statusToID[start.title], finishTaskIds, statusToID[finish.title]);
    startTaskIds.forEach((id, index) => {
      updateTaskStatus({ status: start.title, status_id: statusToID[start.title], kanban_order: index }, Number(id));
    });
    finishTaskIds.forEach((id, index) => {
      updateTaskStatus({ status: finish.title, status_id: statusToID[finish.title], kanban_order: index }, Number(id));
    });

    const columnToStatus = {
      "column-1": {
        status: "Late",
        status_id: 2,
      },
      "column-2": {
        status: "To-Do",
        status_id: 1,
      },
      "column-3": {
        status: "In Progress",
        status_id: 3,
      },
      "column-4": {
        status: "Done",
        status_id: 4,
      },
    };

    const newState = {
      ...kanbanState,
      columns: {
        ...kanbanState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
      tasks: {
        ...kanbanState.tasks,
        [currentTask]: {
          ...kanbanState.tasks[currentTask],
          ...columnToStatus[destination.droppableId],
        },
      },
    };

    setKanbanState((prev) => ({ ...prev, ...newState }));
  };

  const projectTitle = state.projects[projectID].proj_name;
  const projectDescription = state.projects[projectID].proj_description;

  return (
    <div className="project-kanban">
      <div className="project-kanban-header">
        <div className="project-kanban-title">
          <h1>{projectTitle}</h1>
          <LinkIconContainer projectID={projectID} text />
        </div>
        <p>{projectDescription}</p>
      </div>

      <div className="project-kanban-body">
        <div className="project-kanban-body-div">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="project-kanban-board">
              {kanbanState.columnOrder.map((columnId) => {
                const column = kanbanState.columns[columnId];
                const tasks = column.taskIds.map((taskId) => kanbanState.tasks[taskId]);
                console.log(tasks);
                return (
                  <KanbanBoard
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    state={state}
                    projectID={projectID}
                    addTask={addTask}
                  />
                );
              })}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
};

export default ProjectKanban;
