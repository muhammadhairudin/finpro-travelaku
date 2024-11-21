import React from 'react'
import Container from './Container'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="py-8 bg-primary">
      <Container>
        <div className="flex flex-col items-center">
          {/* Logo & Tagline */}
         

         

          {/* Copyright & Credits */}
          <div className="text-center">
            <p className="text-sm text-gray-300">
              © {new Date().getFullYear()} TravelAku. All rights reserved.
            </p>
            <p className="mt-2 text-sm text-gray-400">
              Created with{' '}
              <span className="mx-1 text-red-400">❤️</span>
              by{' '}
              <a 
                href="https://github.com/muhammadhairudin"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-secondary hover:text-secondary/80"
              >
                Muhammad Hairudin
              </a>
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Final Project Bootcamp Frontend Dibimbing Batch 19
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
} 