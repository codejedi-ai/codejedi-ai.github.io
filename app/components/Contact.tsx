"use client"

import { useState } from "react"
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react"
import * as LucideIcons from "lucide-react"
import { type LucideIcon } from "lucide-react"
import { CONTACTS_DATA, CONTACTS_DATABASE_ID, createNotionPage } from "@/lib/notion-morphic"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const getIconComponent = (iconName: string, className: string) => {
    const Icon = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName]
    return Icon ? <Icon className={className} /> : <Mail className={className} />
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    try {
      // Build Notion page properties
      const properties: any = {
        Name: {
          title: [
            {
              text: {
                content: formData.name
              }
            }
          ]
        },
        "Email Address": {
          email: formData.email
        },
        Platform: {
          select: {
            name: "Website Form"
          }
        }
      }

      const children = [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: formData.message
                }
              }
            ]
          }
        }
      ]

      await createNotionPage({
        parent: { database_id: CONTACTS_DATABASE_ID },
        properties,
        children
      })

      setSubmitStatus({
        type: "success",
        message: "Thank you! Your message has been sent successfully."
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      console.error("Submission error:", err)
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again later."
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-dark-lighter to-dark text-white relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(0,210,255,0.2)_0%,rgba(10,10,24,0)_60%)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(157,78,221,0.2)_0%,rgba(10,10,24,0)_60%)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-center mb-4 text-white">Let&apos;s Get Connected</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-6 text-primary-cyan">Social Channels</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {CONTACTS_DATA.map((contact) => (
                contact.href !== "#" ? (
                  <a
                    key={contact.id}
                    href={contact.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600 hover:border-primary-cyan hover:bg-gray-800 transition-all group"
                  >
                    <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center group-hover:bg-primary-cyan/20 transition-colors">
                      {getIconComponent(contact.icon, "h-5 w-5 text-white group-hover:text-primary-cyan transition-colors")}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{contact.name}</h4>
                      <p className="text-gray-400 text-xs">{contact.value}</p>
                    </div>
                  </a>
                ) : (
                  <div
                    key={contact.id}
                    className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-600"
                  >
                    <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center">
                      {getIconComponent(contact.icon, "h-5 w-5 text-white")}
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{contact.name}</h4>
                      <p className="text-gray-400 text-xs">{contact.value}</p>
                    </div>
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="gradient-card rounded-2xl p-8 border-gradient shadow-glow">
            <h3 className="text-2xl font-semibold mb-6 text-primary-cyan">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-dark-lighter border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-cyan transition-colors"
                  placeholder="Your Name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-dark-lighter border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-cyan transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-dark-lighter border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary-cyan transition-colors resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-cyan text-dark font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-dark"></div>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus.type && (
                <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
                  submitStatus.type === "success" ? "bg-green-900/20 text-green-400 border border-green-500/30" : "bg-red-900/20 text-red-400 border border-red-500/30"
                }`}>
                  {submitStatus.type === "success" ? <CheckCircle className="h-5 w-5 flex-shrink-0" /> : <AlertCircle className="h-5 w-5 flex-shrink-0" />}
                  <p className="text-sm">{submitStatus.message}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
