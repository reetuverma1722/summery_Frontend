import React from "react";
import "../../SAAS/AboutUs/ABOUTuS.css";
const AboutUs = () => {
    return (
        <>
            <div className="AboutUs-container-fluid">
                <div className="AboutUs-container">
                    <div className="AboutUs-heading-portion">
                        <h1 className="AboutUs-Heading">About Us</h1>
                        <h3 className="AboutUs-sub-title">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo adipisci nesciunt saepe ratione porro omnis mollitia? Autem dolor eos sequi repellat iure excepturi iste facilis, laboriosam, maxime incidunt minima mollitia!</h3>
                    </div>

                    <div className="About-Us-Content-Comtainer">
                        <div className="content items">


                            <div className="About-us-Content-Item">
                                <div className="item-image">
                                    <img src="./img/AboutImg-1.jpg" alt="Image"/>
                                </div>
                                <div className="item-content">
                                    <h1 className="item-content-heading">Generative AI</h1>
                                    <h3 className="item-content-subTitle">Scale generative AI with the most cost-effective infrastructure. </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo adipisci nesciunt saepe ratione porro omnis mollitia? Autem dolor eos sequi repellat iure excepturi iste facilis, laboriosam, maxime incidunt minima mollitia!</p>

                                </div>
                            </div>

                            <div className="About-us-Content-Item About-us-Content-Item-rev">
                                <div className="item-content">
                                    <h1 className="item-content-heading">Large Language Model</h1>
                                    <h3 className="item-content-subTitle">Choose the right model for your use case. </h3>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo adipisci nesciunt saepe ratione porro omnis mollitia? Autem dolor eos sequi repellat iure excepturi iste facilis, laboriosam, maxime incidunt minima mollitia!</p>
                                </div>

                                <div className="item-image">
                                    <img src="./img/AboutImg-2.jpg" alt="Image"/>
                                </div>
                            </div>

                            <div className="About-us-Content-Item">
                                <div className="item-image">
                                    <img src="./img/AboutImg-3.jpg" alt="Image"/>
                                </div>
                                <div className="item-content">
                                    <h1 className="item-content-heading">Deep Learning</h1>
                                    <h3 className="item-content-subTitle">Security and privacy from day one.</h3>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo adipisci nesciunt saepe ratione porro omnis mollitia? Autem dolor eos sequi repellat iure excepturi iste facilis, laboriosam, maxime incidunt minima mollitia!</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AboutUs;