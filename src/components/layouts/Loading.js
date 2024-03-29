import React from 'react'
import '../../styles/layout.css'
export const DotLoading = () => {
  return (
    <div className="spinner">
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}
export const SpinnerLoading = () => {
  return (
    <div className="col-lg-12 text-center">
      <div className="spinner-border text-white text-center" role="status">
        <span className="sr-only text-center text-white">Loading...</span>
      </div>
    </div>
  )
}