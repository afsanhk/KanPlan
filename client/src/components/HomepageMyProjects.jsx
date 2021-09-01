import React from 'react';
import { NavLink } from 'react-router-dom';


import "../styles/HomepageMyProjects.scss"
import ProjectNameDescription from "./ProjectNameDescription"

export default function HomepageMyProjects({ projects, state }) {

  const parsedProjects = projects.map(proj => {
    return(
      <NavLink key={proj.id} to={`/project/${proj.id}/overview`} className="navlink">
        <ProjectNameDescription
          proj_name={proj.proj_name}
          proj_description={proj.proj_description}
          team_members={proj.team_members}
          state={state}
        />
      </NavLink>
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