// Write your code here
import {Link} from 'react-router-dom'

import './index.css'

const TeamCard = props => {
  const {eachTeamDetails} = props

  const {id, name, teamImageUrl} = eachTeamDetails

  return (
    <Link to={`/team-matches/${id}`} className="link-container">
      <li className="list-container teams-link">
        <img src={teamImageUrl} alt={name} className="team-logo" />
        <div>
          <p className="team-name"> {name}</p>
        </div>
      </li>
    </Link>
  )
}

export default TeamCard
