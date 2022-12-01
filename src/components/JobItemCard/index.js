import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBagFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const JobItemCard = props => {
  const renderHoriz = () => (
    <div>
      <hr className="bg-light" />
    </div>
  )
  const {eachJob} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    rating,
    packagePerAnnum,
  } = eachJob
  return (
    <Link to={`/jobs/${id}`} className="linkStyle bg-dark">
      <div className="card jobItemParent text-white p-3 mb-3">
        <div className="conHead d-flex">
          <div className="">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="jobImage"
            />
          </div>
          <div className="d-flex flex-column">
            <p className="h3 ml-2">{employmentType}</p>
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
      </div>
    </Link>
  )
}
export default JobItemCard
