import React, { useState,useRef,useEffect } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleOrder = () => {
  const orderSection = document.getElementById('order');
  if (orderSection) {
    orderSection.scrollIntoView({ behavior: 'smooth' });
  }
};


  const gridRef = useRef(null);
  const scrollSpeed = 1; // pixels per frame

  useEffect(() => {
    const grid = gridRef.current;
    let animationFrame;

    const scroll = () => {
      if (!grid) return;

      grid.scrollLeft += scrollSpeed;

      // When we reach the duplicate set, reset to start
      if (grid.scrollLeft >= grid.scrollWidth / 2) {
        grid.scrollLeft = 0;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const images = Array.from({ length: 8 }, (_, i) => 
    `https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Fcelebrities%2F${(i % 15) + 1}.webp&w=3840&q=85`
  );

  const dishesRef = useRef(null);

  const dishes = [
    { img: "https://img.freepik.com/free-photo/high-angle-chicken-meal_23-2148825122.jpg?semt=ais_hybrid&w=740&q=80", name: "CHICKEN CHETTINAD", price: "$14.99" },
    { img: "https://img.freepik.com/premium-photo/traditional-indian-curry-chicken-masala-indian-chicken-curry-with-sweet-peppers-rice-bowl-spices-dark-background-traditional-indian-dish_2829-20885.jpg", name: "CHICKEN MASALA", price: "$13.99" },
    { img: "https://img.freepik.com/free-photo/meat-vegetable-stew-served-dark-bowl-grey-background_1220-6638.jpg?semt=ais_hybrid&w=740&q=80", name: "MUTTON MASALA", price: "$15.99" }
  ];

 useEffect(() => {
    const container = dishesRef.current;
    if (!container) return;

    // Duplicate items for seamless scroll
    const track = container.querySelector(".dishes-track");
    track.innerHTML += track.innerHTML;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    const startScroll = () => {
      const scrollSpeed = 0.5;
      let animationFrame;

      const scroll = () => {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= track.scrollWidth / 2) {
          container.scrollLeft -= track.scrollWidth / 2;
        }

        animationFrame = requestAnimationFrame(scroll);
      };

      animationFrame = requestAnimationFrame(scroll);

      // Cleanup on unmount
      return () => cancelAnimationFrame(animationFrame);
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) startScroll();
        };
      }
    });

    // If all images are already loaded
    if (loadedCount === images.length) {
      startScroll();
    }
  }, []);




  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot1.png&w=256&q=75" alt="T" />
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot2.png&w=256&q=75" alt="iffin" />
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot3.png&w=256&q=75" alt="Box" />
        </div>

        {/* Desktop Nav */}
        <nav className="nav-links">
          <a href="#home">Home</a>
          <a href="#menu">Menu</a>
          <a href="#about">About</a>
          <a href="#order">Order</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="hamburger" onClick={toggleMenu}>
          ☰
        </button>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <nav className="mobile-nav">
            <a href="#home" onClick={toggleMenu}>Home</a>
            <a href="#menu" onClick={toggleMenu}>Menu</a>
            <a href="#about" onClick={toggleMenu}>About</a>
            <a href="#order" onClick={toggleMenu}>Order</a>
            <a href="#contact" onClick={toggleMenu}>Contact</a>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>AUTHENTIC SOUTH INDIAN CUISINE</h1>
          <button className="cta-button" onClick={handleOrder} >Order Now →</button>
        </div>
        <div className="hero-image">
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Fbook%2Fbook.webp&w=3840&q=75" alt="Tiffin Box Dish" />
        </div>
      </section>

      <section className="aboutus" id="about">
        <div className="aboutus-image">
          <img src="https://f.hubspotusercontent00.net/hubfs/416759/KitchenTeam.jpg" alt="About The Tiffin Box" />
        </div>
        <div className="aboutus-content">
          <p className="section-subtitle">About Us</p>
          <h1>Experience Authentic South Indian Flavours at The Tiffin Box</h1>
          <button className="btn" >Know More</button>
        </div>
    </section>


      {/* Discover Our Most Popular Dishes */}
      <section className="popular-dishes" id='menu' >
        <div className='heading' >
          <p>Food menu</p>
        <h2>DISCOVER OUR MOST POPULAR DISHES</h2>
        </div>
        <div className="dishes-scroll" ref={dishesRef} >
        <div className="dishes-track">
          {dishes.map((dish, i) => (
            <div className="dish-card" key={i}>
              <img src={dish.img} alt={dish.name} />
              <h3>{dish.name}</h3>
              <p>{dish.price}</p>
            </div>
          ))}
        </div>
      </div>
        <button className="cta-button" >Explore Full Menu →</button>
      </section>

     {/* order section */}
      <section className="delivery-section order" id='order' >
        <div className="delivery-content">
          <h6>Online Order</h6>
          <h2>FRESH SOUTH INDIAN FLAVORS DELIVERED!</h2>
          <p>Catering to your needs is our passion. Whether it’s for a small gathering or a large event, we bring authentic South Indian cuisine right to your doorstep.</p>
          <button className="cta-button" >Order Online →</button>
        </div>
        <div className="delivery-image">
          <img src='/images/delivery.png' alt="Delivery" />
        </div>
      </section>

      {/* Planning a Meal? */}
      <section className="plan-meal">
        <div className="meal-image">
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Fprivatehire.webp&w=1920&q=75" alt="Dining Table" />
        </div>
        <div className="meal-content">
          <h6>Book Table</h6>
          <h2>PLANNING A MEAL AT THE TIFFIN BOX?</h2>
          <p>Whether it's an intimate dinner, corporate gathering, or celebration, we provide the perfect backdrop with authentic Indian cuisine and exceptional service.</p>
          <button className="cta-button">Book Now →</button>
        </div>
      </section>

      {/* Our Specialties */}
      <section className="specialties-section">
        <h3 className="why-tiffin">WHY TIFFIN BOX</h3>
        <h2 className="specialties-title">OUR SPECIALTIES</h2>

        <div className="specialties-circle-container">
          {/* Central Image */}
          <div className="central-dish">
            <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Fspecialities.webp&w=1920&q=75" alt="Specialty Dish" />
            <div className="center-button">
              <span>OUR SPECIALTIES</span>
            </div>
          </div>

          {/* Top Text Block */}
          <div className="text-block top">
            <h4>AUTHENTIC SOUTH INDIAN CUISINE</h4>
            <p>Our dishes are prepared using traditional recipes to bring you the true flavors of South India.</p>
          </div>

          {/* Right Text Block */}
          <div className="text-block right">
            <h4>COMFORTABLE DINING EXPERIENCE</h4>
            <p>Our restaurant offers a warm and welcoming ambiance for a relaxed and enjoyable dining experience.</p>
          </div>

          {/* Bottom Text Block */}
          <div className="text-block bottom">
            <h4>HEALTH-CONSCIOUS OPTIONS</h4>
            <p>From vegetarian to gluten-free dishes, we provide healthy options without compromising on flavor.</p>
          </div>

          {/* Left Text Block */}
          <div className="text-block left">
            <h4>EXPERT CHEFS</h4>
            <p>Our chefs have years of experience crafting exquisite South Indian dishes, ensuring every bite is a delight.</p>
          </div>

          {/* Bottom-Left Text Block */}
          <div className="text-block bottom-left">
            <h4>FRESH, QUALITY INGREDIENTS</h4>
            <p>We use only the finest, fresh ingredients to ensure the highest quality and authentic taste in every meal.</p>
          </div>

          {/* Bottom-Right Text Block */}
          <div className="text-block bottom-middle">
            <h4>ONLINE ORDERING & DELIVERY</h4>
            <p>Enjoy your favorite dishes at home with our easy online ordering and fast delivery service.</p>
          </div>
        </div>
      </section>

      {/* Our Brand Chef */}
      <section className="chef">
        <div className="heading">
          <p>CHEF</p>
          <h2>OUR BRAND CHEF</h2>
        </div>
        <div className='chef-section'>
          <div className="chef-image">
          <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Fchef%2Fchef2.jpg&w=3840&q=75" alt="Chef Jomon" />
        </div>
        <div className="chef-content">
          
          <h3>Chef Jomon</h3>
          <p>Director of Culinary</p>
          <p>
            My passion for food began in childhood, inspired by the comforting and flavourful dishes prepared by my mother. Memories of helping in the kitchen, smelling the rich aromas, and tasting the carefully crafted meals created a deep nostalgia.
            
          </p>
          <p>These early experiences ignited my love for cooking and instilled an appreciation for the artistry and care involved in creating delicious food. These cherished memories continue to drive my creativity and dedication to the culinary craft in every dish I prepare.</p>
        </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="testimonials">
        <h2>WHAT OUR CUSTOMERS SAY</h2>
        <div className="testimonial-grid">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <div className="customer-info">
                <img src="https://dummyimage.com/150x150/ff0000/ffffff&text=A" alt="Customer" />
                <div>
                  <h4>Aswathy Achu</h4>
                  <p>Google Review</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Find Us */}
      <section className="locations">
        <div className="locations-content">
          <h2>FIND US AT THESE CONVENIENT LOCATIONS</h2>
          <p>We serve across multiple cities. Visit us or order delivery from anywhere!</p>
          <button className="cta-button">View All →</button>
        </div>
        <div className="map-placeholder">
          <img src="https://media.newindianexpress.com/TNIE%2Fimport%2F2018%2F12%2F17%2Foriginal%2FDelhi_Google_Maps.JPG?w=1200&ar=40%3A21&auto=format%2Ccompress&ogImage=true&mode=crop&enlarge=true&overlay=false&overlay_position=bottom&overlay_width=100" alt="Map" />
        </div>
      </section>

      {/* Join Our Community */}
      <section className="community">
      <h2>JOIN OUR COMMUNITY</h2>
      <div className="community-grid-wrapper" ref={gridRef}>
        <div className="community-grid">
          {images.concat(images).map((src, i) => ( // duplicate images for seamless loop
            <img key={i} src={src} alt={`Event ${i + 1}`} loading="lazy" />
          ))}
        </div>
      </div>
    </section>

      {/* Footer */}
      <footer className="footer " id='contact'>
        <div className="footer-top">
          <div className="footer-logo">
            <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot1.png&w=256&q=75" alt="T" />
            <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot2.png&w=256&q=75" alt="iffin" />
            <img src="https://thetiffinboxgroup.com/_next/image?url=%2Fimages%2Fhome%2Ftiffinbox%2Flogot3.png&w=256&q=75" alt="Box" />
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#menu">Menu</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#order">Order</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>📧 info@thetiffinboxgroup.com</p>
            <p>📞 +91 123 456 7890</p>
            <p>📍 Coventry, UK</p>
          </div>
          <div className="footer-social">
            <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-x-twitter"></i> {/* X / Twitter */}
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} The Tiffin Box. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;