export default function Footer() {
    return (
        <div style={{ padding: "4px 0", backgroundColor: "#1c1c1e", color: "#fff", textAlign: "center", width: "100%", height: "93px", bottom: "0", left: "0", right: "0", zIndex: "999", fontFamily: "'Poppins', sans-serif" }}>
            
            <div>
                <h5 style={{  fontSize: "12px" }}>
                    <a href="#" style={{ textDecoration: "none", color: "#f9a826" }}>
                        Explore More Projects!
                    </a>
                </h5>
            </div>

            <div style={{ margin: "10px 0" }}>
                <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                    <i className="bi bi-linkedin mx-3" style={{ fontSize: "24px", color: "#0077b5" }}></i>
                </a>

                <a href="https://yourwebsite.com" target="_blank" rel="noreferrer">
                    <i className="bi bi-globe mx-3" style={{ fontSize: "24px", color: "#f9a826" }}></i>
                </a>

                <a href="https://github.com" target="_blank" rel="noreferrer">
                    <i className="bi bi-github mx-3" style={{ fontSize: "24px", color: "#6e5494" }}></i>
                </a>

                <a href="mailto:example@email.com" target="_blank" rel="noreferrer">
                    <i className="bi bi-envelope-fill mx-3" style={{ fontSize: "24px", color: "#ff4d4d" }}></i>
                </a>
            </div>

            <div style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
                © 2024 Your Name. All Rights Reserved.
            </div>
        </div>
    );
}
