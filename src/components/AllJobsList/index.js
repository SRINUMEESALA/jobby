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
        {jobItems.map(eachJob => (
          <li key={uuidv4()}>
            <JobItemCard key={uuidv4()} eachJob={eachJob} />
          </li>
        ))}
      </ul>
    )
  }
}

export default AllJobsList
