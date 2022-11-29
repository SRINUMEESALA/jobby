/* eslint-disable import/no-cycle */
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import JobItemCard from '../JobItemCard'
import './index.css'

class AllJobsList extends Component {
  render() {
    const {jobItems} = this.props
    return (
      <ul className="list-unstyled">
        {jobItems.length !== 0 &&
          jobItems.map(eachJob => (
            <li key={uuidv4()}>
              <JobItemCard key={uuidv4()} eachJob={eachJob} />
            </li>
          ))}
        {jobItems.length === 0 && (
          <div className="mt-5 w-100 d-flex justify-content-center">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="w-50 h-100"
            />
          </div>
        )}
      </ul>
    )
  }
}

export default AllJobsList
