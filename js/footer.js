document.addEventListener("DOMContentLoaded", function() {
    const footer = document.getElementById("footer");

    footer.innerHTML = `
        <div class="footer-overlay">
            <div class="footer-container">
                <div class="footer-column">
                    <div class="footer-logo">
                        <a href="index.html">Logo<span class="highlight">Design</span></a>
                        <p class="tagline">Crafting brands with passion & precision</p>
                    </div>
                </div>

                <div class="footer-column">
                    <ul class="footer-links">
                        <li><a href="services.html">Services</a></li>
                        <li><a href="portfolio.html">Portfolio</a></li>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>

                <div class="footer-column">
                    <div class="footer-social">
                        <a href="#" class="social-icon"><img src="images/facebook.png" alt="Facebook"></a>
                        <a href="#" class="social-icon"><img src="images/twitter.png" alt="Twitter"></a>
                        <a href="#" class="social-icon"><img src="images/instagram.png" alt="Instagram"></a>
                        <a href="#" class="social-icon"><img src="images/linkedin.png" alt="LinkedIn"></a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; ${new Date().getFullYear()} Logo Design Studio. All Rights Reserved.</p>
            </div>
        </div>
    `;
});
