import React from "react";
import "../../SAAS/Footer/footer.css"
const Footer=()=>{
    return(
        <>
        <div className="footer-container-fluid">
            <div className="footer-container">
                <div className="copyright">
                    <p>Copyright &copy; Transcriber. All Rights Reserved.</p>
                </div>
                <div className="term-services">
                    <ul className="term-services-list">
                        <li className="term-services-list-items">Terms of Use</li>
                        <li className="term-services-list-items">Privacy</li>
                        <li className="term-services-list-items">Cookies</li>
                    </ul>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;