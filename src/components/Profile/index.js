import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

const apiStatusConstants = {
  failed: 'failed',
  success: 'success',
  loading: 'loading',
}

class Profile extends Component {
  state = {profile: '', profileApiStatus: 'loading'}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.loading})
    try {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('jwt_token')}`,
        },
      }
      const response = await fetch('https://apis.ccbp.in/profile', options)
      if (response.ok) {
        let data = await response.json()
        data = data.profile_details
        data = {
          name: data.name,
          profileImageUrl: data.profile_image_url,
          shortBio: data.short_bio,
        }
        this.setState({
          profile: data,
          profileApiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({profileApiStatus: apiStatusConstants.failed})
      }
    } catch (err) {
      this.setState({profileApiStatus: apiStatusConstants.failed})
    }
  }

  renderProfileCard = () => {
    const {profile} = this.state
    const {name, profileImageUrl, shortBio} = profile
    return (
      <div className="card  p-3 d-flex flex-column justify-content-around mt-3">
        <div className=" mb-2">
          <img src={profileImageUrl} alt="profile" className="profilePicCon" />
        </div>
        <h1 className="h3">{name}</h1>
        <p className="">{shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failureCon">
      <button
        type="button"
        className="btn btn-warning"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div
      className=" failureCon text-center"
      // eslint-disable-next-line react/no-unknown-property
      testid="loader"
    >
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {profileApiStatus} = this.state
    // console.log(apiStatusConstants.failed, profileApiStatus)
    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileCard()
      case apiStatusConstants.failed:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }
}

export default Profile
