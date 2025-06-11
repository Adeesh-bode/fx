// components/HeroSection.tsx
import React from 'react';
import { Sparkles, Heart, Recycle } from 'lucide-react';
import './style.scss';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="subtitle">
          <Recycle className="icon" />
          Sustainable Fashion
        </p>
        <h1 className="title">
          Discover Hidden <span className="highlight">Treasures</span>
          <Sparkles className="sparkle-icon" />
        </h1>
        <p className="description">
          Shop unique, pre-loved items while helping the planet. Every purchase
          makes a difference for your wallet and the environment.
        </p>
        <div className="buttons">
          <button className="btn-primary">Start Shopping</button>
          <button className="btn-secondary">Learn More</button>
        </div>
        <div className="features">
          <div className="feature">
            <Heart className="feature-icon red" />
            <h3>Quality Items</h3>
            <p>Carefully curated pre-loved goods</p>
          </div>
          <div className="feature">
            <Recycle className="feature-icon green" />
            <h3>Eco-Friendly</h3>
            <p>Reduce waste, support sustainability</p>
          </div>
          <div className="feature">
            <Sparkles className="feature-icon yellow" />
            <h3>Affordable</h3>
            <p>Great prices for unique finds</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
