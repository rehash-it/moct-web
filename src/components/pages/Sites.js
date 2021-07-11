import React from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import monkey from '../../images/semine mountain national park.png'
import stones from '../../images/tiya stones.png'
import eritale from '../../images/erta ale the smoking mountain of afar.png'
import { withRouter } from 'react-router-dom'

import '../../styles/sites.css'
function Sites({ location }) {

    return (
        <>
            <NavBar />
            <h1 className='text-center mt-3'> Know The Land of Origins </h1>
            <div class="cont">

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >Semen mountain</h2>
                            <h3>Vista Grande Helicopter Tour</h3>
                            <p>Imagine San Francisco as you've never seen it before! On a San Francisco Vista Grande Helicopter Tour you'll see all the famous sites.</p>
                            <ul>
                                <li ><i class="fa fa-clock-o"></i><span>Duration: 25 - 30 minutes</span></li>
                                <li ><i class="fa fa-globe"></i><span>Type: Helicopter Tours</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={monkey} alt='' />
                </sec>

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >Tiya stones</h2>
                            <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus alias fugiat laudantium laboriosam consequuntur. Impedit consequuntur quibusdam provident mollitia cupiditate!</h3>
                            <p>Start your comprehensive tour of the Statue of Liberty National Monument off right with priority boarding on a ferry from Manhattan.</p>
                            <ul>
                                <li ><i class="fa fa-clock-o"></i><span>Duration: 7 hours</span></li>
                                <li ><i class="fa fa-globe"></i><span>Type: Exclusive Tours</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={stones} alt='' />
                </sec>

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >US Virgin Islands / St. John</h2>
                            <h3>Beach Day Pass at Honeymoon Beach in St John</h3>
                            <p>Delight in the breathtaking beauty of St John with a full-day beach pass to Honeymoon Beach. You'll have access to a variety of fun.</p>
                            <ul>
                                <li><i class="fa fa-clock-o"></i><span>Duration: 8 hours</span></li>
                                <li><i class="fa fa-globe"></i><span>Type: Scuba & Snorkelling</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={eritale} alt='' />
                </sec >
            </div >
            <div class="cont">

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >Semen mountain</h2>
                            <h3>Vista Grande Helicopter Tour</h3>
                            <p>Imagine San Francisco as you've never seen it before! On a San Francisco Vista Grande Helicopter Tour you'll see all the famous sites.</p>
                            <ul>
                                <li ><i class="fa fa-clock-o"></i><span>Duration: 25 - 30 minutes</span></li>
                                <li ><i class="fa fa-globe"></i><span>Type: Helicopter Tours</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={monkey} alt='' />
                </sec>

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >Tiya stones</h2>
                            <h3>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus alias fugiat laudantium laboriosam consequuntur. Impedit consequuntur quibusdam provident mollitia cupiditate!</h3>
                            <p>Start your comprehensive tour of the Statue of Liberty National Monument off right with priority boarding on a ferry from Manhattan.</p>
                            <ul>
                                <li ><i class="fa fa-clock-o"></i><span>Duration: 7 hours</span></li>
                                <li ><i class="fa fa-globe"></i><span>Type: Exclusive Tours</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={stones} alt='' />
                </sec>

                <sec class="programs">
                    <a href="#">
                        <div class="content">
                            <h2 >US Virgin Islands / St. John</h2>
                            <h3>Beach Day Pass at Honeymoon Beach in St John</h3>
                            <p>Delight in the breathtaking beauty of St John with a full-day beach pass to Honeymoon Beach. You'll have access to a variety of fun.</p>
                            <ul>
                                <li><i class="fa fa-clock-o"></i><span>Duration: 8 hours</span></li>
                                <li><i class="fa fa-globe"></i><span>Type: Scuba & Snorkelling</span></li>
                            </ul>
                        </div>
                    </a>
                    <img src={eritale} alt='' />
                </sec >
            </div >
            <div className="ml">
                <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                    <div className="ml-pnl__cntnt ml-flp__cntnt">
                        <img className="ml-flp__pnl ml-flp__pnl--frnt" src={monkey} alt='' />
                        <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                        </div>
                    </div>
                </div>
                <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                    <div className="ml-pnl__cntnt ml-flp__cntnt">
                        <img className="ml-flp__pnl ml-flp__pnl--frnt" src={monkey} alt='' />
                        <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                        </div>
                    </div>
                </div>
                <div className="ml-pnl ml-flp--md ml-flp ml-clstr--hrz">
                    <div className="ml-pnl__cntnt ml-flp__cntnt">
                        <img className="ml-flp__pnl ml-flp__pnl--frnt" src={monkey} alt='' />
                        <div className="ml-flp__pnl ml-flp__pnl--bck text-raise">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur fugit maiores reiciendis? Sit ullam ipsa consectetur ratione obcaecati architecto! Cupiditate?</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default withRouter(Sites)
