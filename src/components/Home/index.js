// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

class Home extends Component {
  state = {iplTeamsDetailsList: [], isLoading: true}

  componentDidMount() {
    this.getIplTeamDetails()
  }

  getIplTeamDetails = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    console.log(data)

    const formattedData = data.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({iplTeamsDetailsList: formattedData, isLoading: false})
  }

  render() {
    const {iplTeamsDetailsList, isLoading} = this.state
    console.log(iplTeamsDetailsList)
    console.log(isLoading)

    return (
      <div className="home-container">
        <div className="team-list-container">
          <div className="ipl-dashboard-heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-dashboard-heading"> IPL Dashboard </h1>
          </div>

          {isLoading ? (
            <div testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            iplTeamsDetailsList.map(eachTeam => (
              <TeamCard eachTeamDetails={eachTeam} key={eachTeam.id} />
            ))
          )}
        </div>
      </div>
    )
  }
}

export default Home
