import React from 'react'
import Footer from '../layouts/Footer'
import NavBar from '../layouts/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faFile } from '@fortawesome/free-solid-svg-icons'
const ResearchDetails = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <h1 className='text-center'>Lorem title</h1>
                    </div>
                    <div className="col-lg-9">
                        <p className="indent h6">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim cum, deleniti suscipit iure odio nobis accusamus eveniet ullam consequuntur placeat eaque, at sed eos ipsa quisquam perferendis. Quae fuga quam a ducimus nostrum corporis quo nihil nam! Asperiores delectus assumenda laboriosam vero, eligendi aspernatur inventore cum deserunt enim autem quod quae porro veritatis nemo aperiam fuga illum facilis minus ullam nam eaque amet sit harum recusandae. Eum esse labore rerum inventore cum nisi, excepturi tempora cumque temporibus iusto, enim rem. Omnis et voluptatum doloremque esse dicta voluptatem quia excepturi neque facere suscipit repellat qui deleniti id ex, quas minima delectus officia reiciendis consectetur cum sapiente reprehenderit quaerat? Necessitatibus, illum corporis aspernatur dolorum consectetur delectus eaque quidem enim facere, sint at veniam et atque eveniet rem saepe odit distinctio nisi cupiditate quis rerum adipisci debitis. Similique culpa atque eum eius assumenda recusandae eveniet facere iste neque aperiam fuga necessitatibus molestiae quos at temporibus distinctio sunt, reiciendis quam est possimus inventore accusantium sequi delectus consequuntur. Rerum voluptates voluptas tempora repudiandae quidem aliquam voluptatum labore iusto ab, vero adipisci fuga dolore odit, facere incidunt repellendus porro quo, modi dolores et. Deleniti at tenetur, voluptatem fugiat officiis aperiam laborum dignissimos ut, libero, quos quam.
                        </p>
                    </div>
                    <div className="col-lg-3 text-center">
                        <FontAwesomeIcon icon={faFile} className='text-white fa-4x' />
                        <h5>Document tile</h5>
                        <button className="btn btn-primary">
                            <FontAwesomeIcon icon={faDownload} />
                            Download
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ResearchDetails
