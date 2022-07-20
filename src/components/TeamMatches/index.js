import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl/'

class TeamMatches extends Component {
  state = {
    isLoading: true,
    iplTeamsMatchesData: {},
  }

  componentDidMount() {
    this.getIplTeamMatches()
  }

  getIplTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}${id}`)
    const data = await response.json()
    console.log(data)
    const formattedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(recentMatch => ({
        id: recentMatch.id,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        date: recentMatch.date,
        firstInnings: recentMatch.first_innings,
        manOfTheMatch: recentMatch.man_of_the_match,
        matchStatus: recentMatch.match_status,
        result: recentMatch.result,
        secondInnings: recentMatch.second_innings,
        umpires: recentMatch.umpires,
        venue: recentMatch.venue,
      })),
    }

    this.setState({
      iplTeamsMatchesData: formattedData,
      isLoading: false,
    })
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {iplTeamsMatchesData, isLoading} = this.state
    const {
      teamBannerUrl,
      latestMatchDetails,
      recentMatches,
    } = iplTeamsMatchesData

    const className = `team-matches-container ${this.getRouteClassName()}`

    return (
      <div className={className}>
        {isLoading ? (
          <div testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} />{' '}
          </div>
        ) : (
          <div className="responsive-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchData={latestMatchDetails} />{' '}
            <ul className="recent-matches-list">
              {recentMatches.map(recentMatch => (
                <MatchCard matchDetails={recentMatch} key={recentMatch.id} />
              ))}
            </ul>
          </div>
        )}{' '}
      </div>
    )
  }
}

export default TeamMatches
