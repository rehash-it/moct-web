import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'

const ErrorLoading = () => {
  return (
    <div className="col-lg-12 ">

      <div className="card bg-dark" style={{ minHeight: '100vh' }}>
        <h3 className='mt-5 text-center text-danger'>
          <FontAwesomeIcon icon={faWindowClose} className='fa-2x' />
          <br />
          ...oops loading failed the server is down or not active
          please try later
        </h3>
      </div>
    </div>
  )
}

export default ErrorLoading
