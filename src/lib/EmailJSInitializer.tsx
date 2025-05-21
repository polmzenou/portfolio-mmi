'use client';

import { useEffect } from 'react';
import emailjs from '@emailjs/browser';

// Replace this with your actual EmailJS public key
// You can get it from your EmailJS dashboard
const EMAILJS_PUBLIC_KEY = 'sSovYO-ZMu8z5S7CQ';

export default function EmailJSInitializer() {
  useEffect(() => {
    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized successfully');
    } catch (error) {
      console.error('Error initializing EmailJS:', error);
    }
  }, []);

  return null;
} 