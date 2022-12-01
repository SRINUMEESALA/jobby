import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import JobItemCard from '../JobItemCard'
import './index.css'

class AllJobsList extends Component {
  renderFailureView = () => (
    <div className="text-white failureCaseCon d-flex justify-content-center align-items-center text-center min-vh-100">
      <div className="">
        <div className="">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="failureImg"
          />
        </div>
        <h1 className="">No Jobs Found</h1>
        <p>We could not find any jobs. Try other filters</p>
      </div>
    </div>
  )

  render() {
    const {jobItems} = this.props
    return (
      <ul className="list-unstyled">
        {jobItems.length === 0
          ? this.renderFailureView()
          : jobItems.map(eachJob => (
              <li key={uuidv4()}>
                <JobItemCard key={uuidv4()} eachJob={eachJob} />
              </li>
            ))}
      </ul>
    )
  }
}

export default AllJobsList
