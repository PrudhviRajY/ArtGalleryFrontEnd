import React, { Component } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../css/ProjectHomePage.css';

export class ProjectHomePage extends Component {
  // Use Vite environment variable for API base URL so builds (including Jenkins) can set it at build time.
  // Set VITE_API_URL during build (example: VITE_API_URL=https://api.example.com)
  // Default falls back to localhost:8080 to keep local dev working.
  API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  state = {
    showSignup: false,
    showSignin: false,
    isLoggedIn: false,
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
  };

  toggleSignup = () => {
    this.setState({ showSignup: !this.state.showSignup });
  };

  toggleSignin = () => {
    this.setState({ showSignin: !this.state.showSignin });
  };

  handleSignout = () => {
    this.setState({ isLoggedIn: false });
    alert("You have signed out.");
  };
handleSignup = async (e) => {
    e.preventDefault();
    const { fullname, email, password, confirmPassword, role } = this.state;

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${this.API_BASE}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullname, email, password, role }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // ✅ Only display message, NOT token
        this.setState({
          isLoggedIn: false,
          showSignup: false,
          fullname: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
        });
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("An error occurred while signing up: " + error.message);
    }
};

  handleSignin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
    const response = await fetch(`${this.API_BASE}/api/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json(); // Parse JSON response

        if (response.ok) {
            localStorage.setItem("token", result.token); // Store JWT token for authentication
            alert(`Welcome back, ${result.message}!`);
            this.setState({
                isLoggedIn: true,
                fullname: result.fullname, // Assuming fullname is returned
                showSignin: false,
                email: "",
                password: "",
            });
        } else {
            alert(result.message); // Show server error message
        }
    } catch (error) {
        alert("An error occurred while signing in: " + error.message);
    }
};


  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };

    return (
      <div className="base">
        <header className="navbar">
          <div className="logo-container">
            <img className="logo" src="../images/logo.jpg" alt="Art Gallery Logo" />
            <span className="brand">House of Serene Kunst</span>
          </div>
          <nav className="nav-links">
            <a href="/homepage">Home</a>
            <a href="#">Artists</a>
            <a href="#">Artworks</a>
            <a href="#">Auctions</a>
            <a href="#">Contact</a>
          </nav>
          <div className="auth-links">
            {this.state.isLoggedIn ? (
              <button className="auth-link" onClick={this.handleSignout}>Sign Out</button>
            ) : (
              <>
                <button className="auth-link" onClick={this.toggleSignin}>Sign In</button>
                <button className="auth-link" onClick={this.toggleSignup}>Sign Up</button>
              </>
            )}
          </div>
        </header>

        <div className="hero">
          <Slider {...settings} className="carousel-container">
            <div><img className="slide-image" src="../images/a1.webp" alt="Art 1" /></div>
            <div><img className="slide-image" src="../images/a2.jpg" alt="Art 2" /></div>
            <div><img className="slide-image" src="../images/a3.jpg" alt="Art 3" /></div>
          </Slider>
          <div className="hero-text">
            <h1>Welcome to the Art Gallery</h1>
            <p>Discover and collect artworks from world-renowned artists.</p>
            <a href="#"><button className="explore-btn">Explore Collection</button></a>
          </div>
        </div>

        {/* Signup Modal */}
        {this.state.showSignup && (
          <div className="modal-overlay">
            <div className="signup-modal">
              <span className="close-btn" onClick={this.toggleSignup}>&times;</span>
              <h2>Sign up</h2>
              <form onSubmit={this.handleSignup}>
                <input type="text" name="fullname" placeholder="Full Name" value={this.state.fullname} onChange={this.handleChange} required />
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                <select name="role" value={this.state.role} onChange={this.handleChange} required>
                  <option value="">Select Role</option>
                  <option value="artist">Artist</option>
                  <option value="curator">Curator</option>
                  <option value="buyer">Buyer</option>
                </select>
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange} required />
                <button type="submit" className="signup-btn">Sign up</button>
              </form>
            </div>
          </div>
        )}

        {/* Signin Modal */}
        {this.state.showSignin && (
          <div className="modal-overlay">
            <div className="signin-modal">
              <span className="close-btn" onClick={this.toggleSignin}>&times;</span>
              <h2>Sign in</h2>
              <form onSubmit={this.handleSignin}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required />
                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required />
                <button type="submit" className="signin-btn">Sign in</button>
              </form>
            </div>
          </div>
        )}

        <footer className="footer">
          <div className="footer-content">
            <p>&copy; 2025 Art Gallery | All Rights Reserved</p>
            <p>Follow us on:
              <a href="#" className="fa fa-facebook">Facebook 
              <img className='socialmediaIcon' src='./images/facebook.jpg' alt="Facebook" /></a> |
              <a href="#" className="fa fa-twitter">Instagram 
              <img className='socialmediaIcon' src='./images/instagram.png' alt="Instagram" /></a> |
              <a href="#" className="fa fa-instagram">Twitter 
              <img className='socialmediaIcon' src='./images/twitter.jpg' alt="Twitter" /></a>
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default ProjectHomePage;