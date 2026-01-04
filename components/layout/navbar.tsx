"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-gray-900">
            Darcy Liu
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Projects
            </a>
            <a
              href="#skills"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Skills
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              <a
                href="#about"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#experience"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Experience
              </a>
              <a
                href="#projects"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Projects
              </a>
              <a
                href="#skills"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Skills
              </a>
              <a
                href="#contact"
                className="text-gray-700 hover:text-blue-600 font-medium py-2 text-left"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}