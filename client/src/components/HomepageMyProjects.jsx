import React from 'react';

import "./HomepageMyProjects.scss"
import ProjectNameDescription from "./ProjectNameDescription"

export default function HomepageMyProjects(props) {

  const { userProjects } = props;

  // //this assumes that this component will recieve a prop containing all projects cross-referenced by user
  const parsedProjects = userProjects.map(proj => {
    return(
      <ProjectNameDescription
        proj_name={proj.proj_name}
        proj_description={proj.proj_description}
        proj_users={proj.proj_users}
      />
      )
    })
    
  return (
    <div className='homepage-my-projects'>
      <h2><strong>My Projects</strong></h2>
      <div>
        {parsedProjects}
      </div>
    </div>
  );
}