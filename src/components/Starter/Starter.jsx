import React from "react";
import "../../SAAS/Starter/Starter.css"

const Starter=()=>{
    return(
        <>
        <div className="home-container-fluid">
        <div className="home-container">
          <div className="heading-contents" id="home-contents">
            <h1 className="heading">The Generative AI for the Summarization</h1>
            <h3 className="Model-small-description">

              Experience a groundbreaking approach to creating summaries using AI by harnessing the capabilities of Generative AI. <br /> With this, you can generate a summary  with content tailored to your needs.
            </h3>
            <h2 className="free-service">
              And for a limited time, the service is Free.
            </h2>
          </div>


          <div className="intro-home-buttons">
            <button className="get-started">Get Started</button>
            <button className="Learn-Generative-AI">Learn AI</button>
          </div>

          
        </div>
      </div>
        </>
    )
}

export default Starter;