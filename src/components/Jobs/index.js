/* eslint-disable import/no-cycle */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiSearch} from 'react-icons/bi'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {v4 as uuidv4} from 'uuid'
import Header from '../Header'
import Profile from '../Profile'

import {employmentTypesList, salaryRangesList} from '../../App'
import './index.css'
import AllJobsList from '../AllJobsList'

export const renderHoriz = () => (
  <div>
    <hr className="bg-light" />
  </div>
)

const apiConstants = {
  success: 'success',
  fail: 'fail',
  load: 'load',
}

class Jobs extends Component {
  state = {
    employmentTypesSelected: [],
    salary: '',
    searchInput: '',
    jobItems: [],
    apiStatus: 'load',
  }

  componentDidMount() {
    this.callGetAllJobs()
  }

  callGetAllJobs = () => {
    this.getAllJobs()
  }

  getAllJobs = async () => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }
    const {employmentTypesSelected, salary, searchInput} = this.state
    const joinedList = employmentTypesSelected.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${joinedList}&minimum_package=${salary}&search=${searchInput}`
    // const url = 'https://apis.ccbp.in/jobs'

    const response = await fetch(url, options)
    if (response.ok) {
      let data = await response.json()
      data = data.jobs
      data = data.map(obj => ({
        companyLogoUrl: obj.company_logo_url,
        employmentType: obj.employment_type,
        jobDescription: obj.job_description,
        id: obj.id,
        location: obj.location,
        rating: obj.rating,
        title: obj.title,
        packagePerAnnum: obj.package_per_annum,
      }))

      this.setState({jobItems: data, apiStatus: apiConstants.success})
    } else {
      this.setState({apiStatus: apiConstants.fail})
    }
  }

  searching = event => {
    this.setState({searchInput: event.target.value}, this.callGetAllJobs)
  }

  employmentTypesChanged = event => {
    const {employmentTypesSelected} = this.state
    const targetValue = event.target.value
    if (employmentTypesSelected.includes(targetValue)) {
      const ind = employmentTypesSelected.indexOf(targetValue)
      employmentTypesSelected.pop(ind)
      this.setState({employmentTypesSelected}, this.callGetAllJobs)
    } else {
      employmentTypesSelected.push(targetValue)
      this.setState({employmentTypesSelected}, this.callGetAllJobs)
    }
  }

  renderEmploymentType = heading => {
    const {employmentTypesSelected} = this.state
    return (
      <div className="employmentTypesCon">
        <h1 className="h5 text-light">{heading}</h1>
        <ul className="list-unstyled mb-0">
          {employmentTypesList.map(obj => (
            <li
              key={uuidv4()}
              className="typeItems"
              onChange={this.employmentTypesChanged}
            >
              <input
                type="checkbox"
                className="mr-2"
                id={`${obj.employmentTypeId}k`}
                value={obj.employmentTypeId}
                onChange={this.filterSelection}
                defaultChecked={employmentTypesSelected.includes(
                  obj.employmentTypeId,
                )}
              />
              <label htmlFor={`${obj.employmentTypeId}k`}>{obj.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  salaryChanged = event => {
    this.setState({salary: event.target.value}, this.callGetAllJobs)
  }

  renderSalary = heading => {
    const {salary} = this.state
    return (
      <div className="employmentTypesCon">
        <h1 className="h5 text-light">{heading}</h1>
        <ul className="list-unstyled mb-0">
          {salaryRangesList.map(obj => (
            <li
              key={uuidv4()}
              className="typeItems"
              onChange={this.salaryChanged}
            >
              <input
                type="radio"
                className="mr-2"
                id={`${obj.salaryRangeId}k`}
                value={obj.salaryRangeId}
                onChange={this.filterSelection}
                name="salary"
                defaultChecked={salary === obj.salaryRangeId}
              />
              <label htmlFor={`${obj.salaryRangeId}k`}>{obj.label}</label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderFilterSection = () => (
    <div className="">
      {renderHoriz()}
      {this.renderEmploymentType('Type of Employment')}
      {renderHoriz()}
      {this.renderSalary('Salary Range')}
      {renderHoriz()}
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

  renderFailureView = () => (
    <div className="mt-5 w-100 d-flex justify-content-center">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="w-50 h-100"
      />
    </div>
  )

  decideWhatToShow = () => {
    const {apiStatus, jobItems} = this.state
    switch (apiStatus) {
      case apiConstants.success:
        return <AllJobsList jobItems={jobItems} key={uuidv4()} />

      case apiConstants.fail:
        return this.renderFailureView()

      default:
        return this.renderLoadingView()
    }
  }

  jobsDisplay = () => {
    const {searchInput} = this.state
    return (
      <div className="jobsContainer col-md-8 pt-3 d-flex flex-column">
        <div className="input-group mb-3 w-50 align-self-end">
          <input
            type="search"
            className="form-control"
            aria-label="Text input with checkbox"
            onChange={this.searching}
            value={searchInput}
          />
          <div className="input-group-append">
            <button
              className="input-group-text"
              type="button"
              // eslint-disable-next-line react/no-unknown-property
              testid="searchButton"
            >
              <BiSearch />
            </button>
          </div>
        </div>
        {this.decideWhatToShow()}
        {/* {jobItems.length === 0 ? (
          this.renderLoadingView()
        ) : (
          <AllJobsList jobItems={jobItems} key={uuidv4()} />
        )} */}
      </div>
    )
  }

  render() {
    // console.log(this.state)
    return (
      <div className="jobsParentCon d-flex flex-column min-vh-100 bg-dark">
        <Header />
        <div className="jobsInfoCon d-flex align-self-center">
          <div className="ProfileCon col-md-4  d-flex flex-column ">
            <Profile />
            {this.renderFilterSection()}
          </div>
          {this.jobsDisplay()}
        </div>
      </div>
    )
  }
}

export default Jobs
