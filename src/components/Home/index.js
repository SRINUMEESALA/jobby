import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    return (
      <div className="bg-dark vh-100 text-white d-flex flex-column overflow-auto">
        <Header />
        <div className="homeScreenSection">
          <div className="introSection d-flex flex-column justify-content-center">
            <div className="col-6 offset-1 align-self-start d-flex flex-column justify-content-around">
              <h1 className="h1 mainHead">Find The Job That Fits Your Life</h1>
              <p className="h5">
                Millions of people are searching for jobs,salary,information and
                company reviews.Find the job that fits your abilities and
                potential.
              </p>
              <Link className="linkComp" to="/jobs">
                <button type="button" className="btn btn-info align-self-start">
                  Find Jobs
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
