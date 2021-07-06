import React from 'react'
import NavBar from '../layouts/navbar'
import Footer from '../layouts/Footer'
import Logo from '../../images/moct-logo-2.png'
import { Link } from 'react-router-dom'
const History = () => {
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
                                            <h1>Ministry of Culture and Tourism- Historical Background</h1>
                                            <p class="my-2 h6 indent text-white justify-content">
                                                <p className="text-indent my-2 h6 text-white">
                                                    Beginning from the dawn of the 19th century, ‘modern European civilization gradually started taking momentum and grip in Ethiopia under the circumstances where power centralization of the central government was dominantly rampant in the country’, in which case modern management of culture has been addressed through the indirect management or administration of various Ministries and any other government agencies during the pre-and post-Fascist Italian Occupation, particularly in the post-independence/victory period.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">
                                                    The disentanglement of multifaceted cultural activities from the existing traditional and customary cultural management patterns as well as the association of such cultural activities with the modern cultural management processes were unsystematic and disorganized until the end of the Hailesellasie/Imperial Regime. Accordingly, the current National Archives and Libraries Agency, which was established in 1943 under the official name of “Public Library-Wemzeker”, was proven to have been a pioneer in this respect; this Agency, which underlies the initiatives to undertake contemporary heritage research and preservation activities, includes the Ethiopian Ancient Heritages Administration. The relevant historical accounts reveal that the “Ministry of Education and Arts” was subsequently established to have comprised ‘Addis Ababa Art School’, ‘Etege Handcrafts School’, ‘Tegbared School’ and ‘Yared Musical School’ thereby establishing and managing Amharic Linguistics/ Yeamargna Merhalisan/ apart from carrying out its formal education programs.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">
                                                    The Ministry of Information was established to, apart from conducting regular activities of information, set up and manage the Ethiopian Hager Fiker Theater, Haileselassie I Theater, National Theater of Ethiopia and various cinemas.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">
                                                    In spite of the fact that the commencement and subsequent activities of modern cultural institutions and management patterns were initiated in disorganized manners, the required level of advancement regarding this sector has not been realized as symbiotic interactions among multi-dimensional were not provided with favorable conditions. As such, the pertinent historical accounts witness that different scholars, including local and African minds, who were interested in admiring and honoring the peoples and cultures of Ethiopia, have come up with various concepts concerning modern cultural management.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">
                                                    The official letter written from the Ministry of Pen, the first Ministry regarding this sector, on 21/09/1974, stating “…following the establishment of the Ministry of Culture, it is hereby decided that all cultural offices or agencies shall be incorporated into this Ministry…”, has come up with the resolution on the incorporation of such agencies as Theaters and Cinemas of the Ministry of information, art department and Amharic linguistics of the Ministry of Education and Arts as well as national and historical archives of the Ministry of Pen, including the ancient heritages administration and national library-wemezeker, into such Ministry. Finally, the Proclamation No. 127/69 for Defining Mandates of Ministries, which was issued on 05/08/1977 after three years, has provided the Ministry of Culture and Sports with the relevant legal justification/Grounds further defining and strengthening the mandate of such Ministry, which was said to have officially kept functioning accordingly.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">

                                                    This process was reported to have been positive development entailing substantial change in light of modern management of cultures, in which case, however, the establishment of such Ministry without conducting the corresponding studies and helping the Ministry meet the required ministerial organization and structural aspects was reported to have entailed limitations.

                                                </p>
                                                <p className="text-indent my-2 h6 text-white">

                                                    Subsequently, as human and democratic rights of nations, nationalities and peoples are, as they have already been enshrined in the Charter of the transitional government, guaranteed and ratified in/by the FDRE Constitution, the dynamics of multifaceted spiritual and material cultures of peoples and the resultant modern management of cultures were reported to have markedly been active thereby regaining the momentum of modern organizational and management patterns. This was followed by the formulation of the Cultural Policy in 1997 in order to modernize and systematize the cultural management. The formulation and subsequent enactment of such cultural policy were/was proven to have been the second strongest achievement next to the establishment of the Ministry in the history of modern cultural management.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">
                                                    However, the failure to, given the involvement in formulation and enactment of cultural policy for modern cultural management, develop specific implementation strategies for the policy and establish joint sector development program through the relevant terms of joint implementation has rendered the policy characterized by internal and external challenges.
                                                </p>
                                                <p className="text-indent my-2 h6 text-white">

                                                    Furthermore, the review of internal and external dynamics surrounding the modern management of cultures indicates that, even if such management of disorganized and disarrayed nature has been centrally managed, such Ministry was characterized by occasional narrowing and broadening as well as annexation/merging and separation with/from other agencies throughout the period until the date of its reestablishment in 2005 as the Ministry of Cultures and Tourism as per the Proclamation No. 471/98. This trend has denied the Ministry of the opportunities for sustaining its stable organization.

                                                </p>
                                                <p className="text-indent my-2 h6 text-white">

                                                    Finally, although the cultural management is known for its former centralized perspective and supervision system thereby providing wider opportunities and guarantees for making cultures within the bounds of the federal government and national regional states be honored among the peoples, the lack of homogenously structured institutional organization by which the Cultural bureaus of national regional states are linked to the Federal Ministry of Culture, in due course of centrally and regionally integrating/managing the modern cultural management, is still proven to have repelled the initiatives of mutual operational planning and integration as well as of joint decision-making.

                                                </p>
                                            </p>
                                        </div>
                                        <div class="about__skills">
                                            <div class="row no-gutters mb-0 mb-sm-4">
                                                <div class="mb-4 mb-sm-0 pr-sm-3 col-sm-6">
                                                    <div class="media">
                                                        <i class="fab fa-js-square icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <Link to='/about'>
                                                                <h4 class="m-0 text-white">Vision </h4>
                                                            </Link>
                                                            <p class="m-0">
                                                                Know About our vision and Goals
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="mb-4 mb-sm-0 pl-sm-3 col-sm-6 ">
                                                    <div class="media">
                                                        <i class="fab fa-react icon-18 mr-3"></i>
                                                        <div class="media-body">
                                                            <Link to='/messageOfMoct'>
                                                                <h4 class="m-0 text-white">Message fro the minister</h4>
                                                            </Link>
                                                            <p class="m-0">
                                                                Read about our concerns and ideas
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row no-gutters mb-0 mb-sm-4">

                                                <div class="about-data">
                                                    <div class="row no-gutters pt-5 border-top">
                                                        <div class="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">

                                                        </div>

                                                        <div class="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                                            <div class="media">
                                                                <i class="fas fa-mug-hot icon-18 mr-2"></i>
                                                                <div class="media-body">
                                                                    <p class="data-number m-0 font-weight-bold">Country</p>
                                                                    <p class="m-0 text-uppercase">
                                                                        Ethiopia
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="mb-4 mb-md-0 pr-sm-3 p-md-0 col-sm-6 col-md-3">
                                                            <div class="media">
                                                                <i class="fas fa-mug-hot icon-18 mr-2"></i>
                                                                <div class="media-body">
                                                                    <p class="data-number m-0 font-weight-bold">City</p>
                                                                    <p class="m-0 text-uppercase">
                                                                        Addis Ababa@605
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
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

export default History
