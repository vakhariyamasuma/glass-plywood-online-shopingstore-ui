import React from 'react'
import { Link } from 'react-router-dom'
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, GithubOutlined, LinkedinOutlined, YoutubeOutlined } from '@ant-design/icons';

export default function Footer() {
    return (
        <div>
            <div className="container"></div>
            <footer>
                <section className="ft-main">
                    <div className="ft-main-item">
                        <h2 className="ft-title">About</h2>
                        <ul>
                            <li><Link to="#">Services</Link></li>
                            <li><Link to="#">Portfolio</Link></li>
                            <li><Link to="#">Pricing</Link></li>
                            <li><Link to="#">Customers</Link></li>
                            <li><Link to="#">Careers</Link></li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h2 className="ft-title">Resources</h2>
                        <ul>
                            <li><Link to="#">Docs</Link></li>
                            <li><Link to="#">Blog</Link></li>
                            <li><Link to="#">eBooks</Link></li>
                            <li><Link to="#">Webinars</Link></li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h2 className="ft-title">Contact</h2>
                        <ul>
                            <li><Link to="#">Help</Link></li>
                            <li><Link to="#">Sales</Link></li>
                            <li><Link to="#">Advertise</Link></li>
                        </ul>
                    </div>
                    <div className="ft-main-item">
                        <h2 className="ft-title">Stay Updated</h2>
                        <p>Subscribe to our newsletter to get our latest news.</p>
                        <form classNameName="inputForm" >
                            <input type="email" name="email" data="text" placeholder="Enter email address" />
                            <input type="submit" data="button" value="Subscribe" />
                        </form>
                    </div>
                </section>

                <section className="ft-social">
                    <ul className="ft-social-list">
                        <li><Link to="#"><FacebookOutlined /></Link></li>
                        <li><Link to="#"><TwitterOutlined /></Link></li>
                        <li><Link to="#"><InstagramOutlined /></Link></li>
                        <li><Link to="#"><GithubOutlined /></Link></li>
                        <li><Link to="#"><LinkedinOutlined /></Link></li>
                        <li><Link to="#"><YoutubeOutlined /></Link></li>
                    </ul>
                </section>

                <section className="ft-legal">
                    <ul className="ft-legal-list">
                        <li><Link to="#">Terms &amp; Conditions</Link></li>
                        <li><Link to="#">Privacy Policy</Link></li>
                        <li>&copy; 2019 Copyright Nowrap Inc.</li>
                    </ul>
                </section>
            </footer>
        </div>
    )
}
