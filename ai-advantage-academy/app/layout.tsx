import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Advantage Academy - Master AI Before 2027',
  description: 'Learn practical AI skills to turn trends into income. Free personalized assessment. Programs starting at $7. Join 20k+ learners.',
  generator: 'v0.app',
  keywords: 'AI learning, ChatGPT, automation, income, skills, online course',
  openGraph: {
    title: 'AI Advantage Academy',
    description: 'Master AI before 2027 and secure your future',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
