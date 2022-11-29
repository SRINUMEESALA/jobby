/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
// eslint-disable-next-line import/no-cycle
import {renderHoriz} from '../Jobs/index'
import './index.css'
import Header from '../Header'

const apiStatusConstants = {
  success: 'success',
  failed: 'failed',
  loading: 'loading',
}

class JobItemDetails extends Component {
  state = {similarJobs: [], jobDetails: [], apiStatus: 'initial'}

  componentDidMount() {
    this.getJobDet()
  }

  getJobDet = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
    if (response.ok) {
      const data = await response.json()

      let jobDetails = data.job_details
      jobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: jobDetails.life_at_company,
        skills: jobDetails.skills,
        id: jobDetails.id,
        location: jobDetails.location,
        rating: jobDetails.rating,
        title: jobDetails.title,
        packagePerAnnum: jobDetails.package_per_annum,
      }

      let similarJobs = data.similar_jobs
      similarJobs = similarJobs.map(obj => ({
        companyLogoUrl: obj.company_logo_url,
        employmentType: obj.employment_type,
        jobDescription: obj.job_description,
        id: obj.id,
        location: obj.location,
        rating: obj.rating,
        title: obj.title,
      }))

      this.setState({
        similarJobs,
        jobDetails,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failed})
    }
  }

  renderDetailedDescription = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      packagePerAnnum,
      lifeAtCompany,
      skills,
      companyWebsiteUrl,
      title,
    } = jobDetails
    // console.log(this.state)
    return (
      <>
        <div className="conHead d-flex">
          <div className="">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobImage"
            />
          </div>
          <div className="d-flex flex-column">
            <h1 className="h3 ml-2">{title}</h1>
            {/* <p className="h3 ml-2">{employmentType}</p> */}
            <div className="d-flex">
              <AiFillStar className="h4 text-warning mr-1 ml-2" />
              <p className="">{rating}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="d-flex ">
            <div className="d-flex">
              <MdLocationOn className="ml-2 mr-1 h6" />
              <p className="m-0">{location}</p>
            </div>
            <div className="d-flex">
              <BsFillBagFill className="ml-3 mr-1 h6" />
              <p className="m-0">{employmentType}</p>
            </div>
          </div>
          <p className="h4 m-0">{packagePerAnnum}</p>
        </div>
        {renderHoriz()}
        <h1 className="h5">Description</h1>
        <p className="paraDesc">{jobDescription}</p>
        <h1 className="h5">Skills</h1>
        <ul className="skillsCon list-unstyled d-flex flex-wrap">
          {skills !== undefined &&
            skills.map(obj => (
              <li className="d-flex align-items-center mr-5" key={uuidv4()}>
                <img src={obj.image_url} alt={obj.name} className="skillImg" />
                <p className="m-0 ml-2 mr-2 ">{obj.name}</p>
              </li>
            ))}
        </ul>
        <div className="d-flex">
          <div className="d-flex flex-column">
            <h1 className="">Life at Company</h1>
            <p className="">
              {lifeAtCompany !== undefined && lifeAtCompany.description}
            </p>
          </div>
          <div className="">
            <img
              src={lifeAtCompany !== undefined && lifeAtCompany.image_url}
              alt="life at company"
            />
          </div>
        </div>
        <a href={companyWebsiteUrl}>Visit</a>
      </>
    )
  }

  renderSimilarCards = () => {
    const {similarJobs} = this.state
    // console.log(similarJobs)
    return (
      <>
        <h1 className="h3 mt-3">Similar Jobs</h1>
        <ul className="list-unstyled d-flex flex-wrap mt-2">
          {similarJobs.map(obj => (
            <li key={uuidv4()} className="col-4 ">
              <Link to={`/jobs/${obj.id}`} className="linkStyle">
                <div className="card jobItemParent text-white p-3 mb-3 border border-white">
                  <div className="conHead d-flex">
                    <div className="">
                      <img
                        src={obj.companyLogoUrl}
                        alt="similar job company logo"
                        className="jobImage"
                      />
                    </div>
                    <div className="d-flex flex-column">
                      {/* <p className="h3 ml-2">{obj.employmentType}</p> */}
                      <div className="d-flex">
                        <AiFillStar className="h4 text-warning mr-1 ml-2" />
                        <p className="">{obj.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="d-flex ">
                      <div className="d-flex">
                        <MdLocationOn className="ml-2 mr-1 h6" />
                        <p className="m-0">{obj.location}</p>
                      </div>
                      <div className="d-flex">
                        <BsFillBagFill className="ml-3 mr-1 h6" />
                        <p className="m-0">{obj.employmentType}</p>
                      </div>
                    </div>
                    <h1 className="h4 m-0">{obj.title}</h1>
                  </div>
                  {renderHoriz()}
                  <h1 className="h5">Description</h1>
                  <p className="paraDesc">{obj.jobDescription}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderSuccessView = () => (
    <div className="card jobItemParent text-white p-5 m-4 min-vh-100 d-flex flex-column justify-content-around">
      {this.renderDetailedDescription()}
      {this.renderSimilarCards()}
    </div>
  )

  renderLoadingView = () => (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      testid="loader"
    >
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failureCaseCon d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="">
        <div className="">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
            alt="failure view"
            className="failureImg"
          />
        </div>
        <h1 className="">Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button
          type="button"
          className="btn btn-warning"
          onClick={this.getJobDet}
        >
          Retry
        </button>
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return (
          <>
            <Header />
            {this.renderSuccessView()}
          </>
        )

      case apiStatusConstants.failed:
        return (
          <>
            <Header />
            {this.renderFailureView()}
          </>
        )

      default:
        return (
          <>
            <Header />
            {this.renderLoadingView()}
          </>
        )
    }
  }
}

export default JobItemDetails
