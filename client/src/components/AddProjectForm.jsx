import {useState} from 'react';

export default function AddProjectForm ({state, userID}) {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [teamMembers, setTeamMembers] = useState([userID])

  return (
    <h1>some kind of form goes here</h1>
  )
}
