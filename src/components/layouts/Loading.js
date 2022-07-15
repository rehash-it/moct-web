import React from 'react'
import styles from '../../styles/spinner.module.scss'
export const DotLoading = () => {
  return (
    <div className={styles.spinner}>
      <div className="ball ball-1"></div>
      <div className="ball ball-2"></div>
      <div className="ball "></div>
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