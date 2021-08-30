import React from 'react';

import "./HomepageMyProjects.scss"
import ProjectNameDescription from "./ProjectNameDescription"

export default function HomepageMyProjects({ projects, state }) {

  const parsedProjects = projects.map(proj => {
    return(
      <ProjectNameDescription
        proj_name={proj.proj_name}
        proj_description={proj.proj_description}
        team_members={proj.team_members}
        state={state}
      />
      )
    })
    
  return (
    <div className='homepage-my-projects'>
      <h2><strong>My Projects</strong></h2>
      <div>
        {parsedProjects}
        {!projects[0] && <div>No projects</div>}
      </div>
    </div>
  );
}