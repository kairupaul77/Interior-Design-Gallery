import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const AboutPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>About Us</h1>
      
      <section>
        <p>
          We specialize in creating inspiring and functional interior designs for every room, 
          focusing on both aesthetics and practicality. Whether you're looking to transform your 
          living room, kitchen, or office space, our team of experts is here to bring your vision to life.
        </p>
        <p>we are passionate about creating parametric designs and productions that bring commercial and residential spaces to life.<br/> Our team of experts is dedicated to providing you with eccentric decors, furniture, and accessories that are not only functional but also aesthetically pleasing.<br/>

​

From modern geometric patterns to traditional Islamic wall decor, our designs seamlessly blend form and function, creating spaces that are both visually stunning and functionally captivating

​

We believe that every space has the potential to be transformed into something extraordinary, and we work tirelessly to help you achieve that. <br/>Whether you're looking to renovate your office, redesign your living room, or add a touch of personality to your space, <br/>Interior Galleries has got you covered. Let us help you create a space that reflects your unique style and personality.</p>
      </section>
      
      <section>
        <h2>Watch Our Interior Design Process</h2>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <iframe 
            width="560" 
            height="315" 
            src="https://www.youtube.com/embed/WFZPoa_Pg0w?start=29" 
            title="Interior Design Process" 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Add the button to navigate to Products Page */}
      <section style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link to="/products">
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            View Our Products
          </button>
        </Link>
      </section>

      {/* Additional content sections */}
    </div>
  );
};

export default AboutPage;
