"use client"

import { Linkedin, Twitter, MessageSquare } from "lucide-react"

export default function ContactSection() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Let&apos;s Get Connected</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with me on LinkedIn, Twitter, or Discord. I&apos;d love to hear from you!
          </p>
        </div>

        <div className="mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex flex-col items-center justify-center gap-6">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/codejediatuw/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-6 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-400 hover:bg-blue-100 transition-all group"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                  <Linkedin className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">LinkedIn</h3>
                  <p className="text-gray-600 text-sm">Connect with me on LinkedIn</p>
                </div>
              </a>

              {/* Twitter */}
              <a
                href="https://x.com/darsboi_cjd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-6 bg-sky-50 rounded-lg border border-sky-200 hover:border-sky-400 hover:bg-sky-100 transition-all group"
              >
                <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center group-hover:bg-sky-600 transition-colors">
                  <Twitter className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Twitter</h3>
                  <p className="text-gray-600 text-sm">Follow me on Twitter/X</p>
                </div>
              </a>

              {/* Discord */}
              <div className="flex items-center gap-4 w-full p-6 bg-indigo-50 rounded-lg border border-indigo-200">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Discord</h3>
                  <p className="text-gray-600 text-sm">d273liu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
