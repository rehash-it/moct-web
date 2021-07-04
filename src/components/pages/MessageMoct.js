import React from 'react'
import NavBar from '../layouts/navbar'
import Footer from '../layouts/Footer'
import { Link } from 'react-router-dom'
import Logo from '../../images/moct-logo-2.png'
function MessageMoct() {
    return (
        <>
            <NavBar />
            <section class="about-section">
                <div class="container-fluid p-0">
                    <div class="row no-gutters position-relative">
                        <div class="left-header d-none d-lg-block col-lg-2 col-xl-3">
                            <div class="v-center-box d-flex align-items-end text-uppercase">
                                <h2 class="mb-0">About us</h2>
                            </div>
                        </div>
                        <div class="col-lg-9 col-xl-8">
                            <div class="main-content p-5">
                                <div class="main-header mb-4">
                                    <h6 class="sub-heading text-uppercase d-block mb-2"></h6>
                                    <h1 class="main-heading d-inline-block text-uppercase pb-3 border-bottom">
                                        &lt; Moct &gt;</h1>
                                </div>

                                <div class="row mb-5">
                                    <div class="mb-5 mb-sm-4 col-md-4">
                                        <img src={Logo} alt="Colorful Wall" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="about__text mb-5 mb-sm-4 mb-md-4">
                                            <h3>Message from the minister</h3>
                                            <p class="m-0">

                                                &nbsp  &nbsp At the outset allow me to earnestly express my gratitude for your interest to visit Ethiopia and invest in the sector of culture and tourism. It is our hope that this website would meet your satisfactions and expectations.

                                                In Ethiopia, nature, culture and history merge to form a timeless appeal. Ethiopia, with its impressive tourism potentials, is truly a land of contrasts and extremes, a land of remote and wild places, and of spectacular alpine terrain - including the Semien Mountains National Park with its 4261 meters peak at Ras Dashen one of the nine UNESCO world heritage sites; and at the other end of the spectrum, the Danakil depression 121 meters below sea level is among the lowest places on earth and extremely hot. The latter depicts a fascinating sulphur fumaroles and a lunar like landscape.

                                                This was the cradle of humankind where humans first began to walk upright, including our celebrated ancestors - Lucy (3.4 million years old), Salam, (3.5.million years old) and Ardi (4.4. million years old) that are among Ethiopia’s rich prehistoric and paleo-archeological heritage. So Ethiopia is our common ancestral home on our beautiful planet .Welcome therefore to Ethiopia to walk on the foot prints of your ancestors.

                                                In terms of history, Ethiopia is old; old beyond imaginations going back to over 3000 years. The Axumite kingdom was one of the great civilizations of the ancient world and has left behind the mystery of the great Axum stele. In the late Middle Ages great religious civilization flourished in Lalibela, where churches hewn out of massive monolithic rock testify not only great faith but also great architectural skills. The 1000 years old Walled City of Harar (Jugol) makes Ethiopia one of the four ancient Islamic cities in the world, The 17th century castles found in Gondar speak of the same legacy. The Konso cultural landscapes are perhaps one of the few living testimonies of ancient agricultural terracing and environmental protection. Together with Tiya stele in the central part of Ethiopia, The lower Omo and the Middle Awash valleys of archeology, Ethiopia is home of 9 Unesco World heritage sites and 12 world literary and manuscript heritages

                                                Ethiopia’s numerous national parks enable visitors to enjoy the country’s wildlife and biodiversity preserved in their natural habitats with an opportunity for adventure travel unparalleled in Africa.

                                                Ethiopia is a land of ethnic diversity. More than 80 nations and nationalities with their own unique languages, cultures and traditions live in peace together. It’s beautiful and friendly people assure our dear visitors a warm welcome and unparalleled hospitality.

                                                It is indeed a great honour and privilege, against this background, to cordially invite you, to visit and invest in the endless wealth of Ethiopia’s culture and tourism, so that we can mutually benefit, while we conserve a safer, beautiful and greener nature at this part of the planet where it all began - Ethiopia.

                                                Our ministry will go an extra mile to provide you with a set of support, incentive as well as a wide range of facilitations.

                                                Welcome to Ethiopia, The Cradle of Humankind, The Origin of Coffee, The Origin of Africa’s Only Alphabet, The Capital of Africa, The Land of Diversity

                                                H.E Dr. Hirut Kassaw

                                                Ministry of Culture and Tourism
                                            </p>
                                        </div>
                                        <div class="about__skills">
                                            <div class="row no-gutters mb-0 mb-sm-4">
                                                <div class="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                                    <div class="media">
                                                        <i class="fab fa-js-square icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <Link to='/history'>
                                                                <h4 class="m-0 text-white">History</h4>
                                                            </Link>
                                                            <p class="m-0">Quasea minus animi sequi sit nostrum? Lorem ipsum
                                                                dolor sit amet
                                                                consectetur adipisicing elit.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                    <div class="media">
                                                        <i class="fab fa-react icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <Link to='/history'>
                                                                <h4 class="m-0 text-white">History</h4>
                                                            </Link>
                                                            <p class="m-0">Ducimus facere vitae sapiente ab sit. Lorem ipsum
                                                                dolor sit amet
                                                                consectetur adipisicing elit.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row no-gutters mb-0 mb-sm-4">
                                                <div class="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                                    <div class="media">
                                                        <i class="fab fa-sass icon-18 mr-2"></i>
                                                        <div class="media-body">
                                                            <Link to='/structure'>
                                                                <h4 class="m-0 text-white">
                                                                    Organization structure</h4>
                                                            </Link>
                                                            <p class="m-0">Eaque voluptatibus dolores. Quod. Lorem dolor sit
                                                                amet
                                                                consectetur. Minus, asperiores.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-0 pl-sm-3 col-sm-6">
                                                    <div class="media">
                                                        <i class="fab fa-node-js icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <h4 class="m-0"></h4>
                                                            <p class="m-0">Numquam saepe deserunt obcaecati? Doloribus. Lorem
                                                                ipsum dolor
                                                                sit amet adipisicing elit.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="about-data">
                                    <div class="row no-gutters pt-5 border-top">
                                        <div class="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                            <div class="media">
                                                <i class="fas fa-mug-hot icon-18 mr-2"></i>
                                                <div class="media-body">
                                                    <p class="data-number m-0 font-weight-bold">10,950</p>
                                                    <p class="m-0 text-uppercase">Cups of coffee</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-4 mb-md-0 pl-sm-3 p-md-0 col-sm-6 col-md-3">
                                            <div class="media">
                                                <i class="fas fa-code icon-18 mr-2"></i>
                                                <div class="media-body">
                                                    <p class="data-number m-0 font-weight-bold">8,475,000</p>
                                                    <p class="m-0 text-uppercase">Lines of code</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                            <div class="media">
                                                <i class="fas fa-bus icon-18 mr-2"></i>
                                                <div class="media-body">
                                                    <p class="data-number m-0 font-weight-bold">8,214</p>
                                                    <p class="m-0 text-uppercase">Buses taken</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="mb-4 mb-md-0 pl-sm-3 p-md-0 col-sm-6 col-md-3">
                                            <div class="media">
                                                <i class="far fa-smile-wink icon-18 mr-2"></i>
                                                <div class="media-body">
                                                    <p class="data-number m-0 font-weight-bold">3,165</p>
                                                    <p class="m-0 text-uppercase">Awkward winks</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>

    )
}

export default MessageMoct
