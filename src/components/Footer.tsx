
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-hardware-blue text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">HardTech</h3>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted partner for quality hardware equipment and tools. We provide the best products for both professionals and DIY enthusiasts.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/inventory" className="text-gray-300 hover:text-white transition-colors">Inventory</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/shop?category=tools" className="text-gray-300 hover:text-white transition-colors">Tools</Link></li>
              <li><Link to="/shop?category=electrical" className="text-gray-300 hover:text-white transition-colors">Electrical</Link></li>
              <li><Link to="/shop?category=plumbing" className="text-gray-300 hover:text-white transition-colors">Plumbing</Link></li>
              <li><Link to="/shop?category=construction" className="text-gray-300 hover:text-white transition-colors">Construction</Link></li>
              <li><Link to="/shop?category=safety" className="text-gray-300 hover:text-white transition-colors">Safety Equipment</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">123 Hardware Street, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-300 hover:text-white transition-colors">(123) 456-7890</a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0" />
                <a href="mailto:info@hardtech.com" className="text-gray-300 hover:text-white transition-colors">info@hardtech.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {new Date().getFullYear()} HardTech. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
