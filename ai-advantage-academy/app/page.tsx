'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle, Zap, Users, TrendingUp } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            AI Advantage Academy
          </div>
          <div className="flex gap-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-300 hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Take Quiz
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Master AI Before 2027
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            Turn trends into income & secure your future. Learn practical AI skills in weeks, not years.
          </p>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            AI isn{`'`}t replacing jobs—people who master it are replacing those who don{`'`}t. Join 20k+ learners building their AI edge.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/quiz">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 flex items-center gap-2">
                Start Free AI Assessment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="#programs">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-6 bg-transparent">
                View Programs
              </Button>
            </Link>
          </div>

          <p className="text-sm text-slate-500 pt-4">
            No credit card required • Takes ~10 minutes • Get personalized recommendations
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Zap,
              title: 'Quick Wins',
              description: 'Start using AI tools immediately. See results in your work within days.'
            },
            {
              icon: TrendingUp,
              title: 'Income Growth',
              description: 'Unlock new opportunities. Content creators earn more, businesses scale faster.'
            },
            {
              icon: Users,
              title: 'Cohort Support',
              description: 'Learn alongside peers. Join accountability groups and live Q&A sessions.'
            }
          ].map((item, i) => (
            <div key={i} className="bg-slate-800/50 backdrop-blur border border-slate-700/50 rounded-lg p-8 hover:bg-slate-800/80 transition">
              <item.icon className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">Programs Tailored to You</h2>
        <p className="text-center text-slate-400 mb-12">Complete our free quiz to get personalized recommendations</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Quick Start',
              duration: '1 Week',
              price: '$7–$12',
              description: 'Test the waters with AI basics',
              benefits: [
                'Quick wins & confidence boost',
                'Video tutorials & guides',
                'Beginner AI tools',
                'Certificate'
              ]
            },
            {
              name: 'Core Mastery',
              duration: '4 Weeks',
              price: '$25–$39',
              description: 'Solid foundation + first projects',
              benefits: [
                'Practical daily-use skills',
                'Hands-on projects',
                'Community access',
                'Private cohort group',
                'Certificate'
              ],
              featured: true
            },
            {
              name: 'Deep Transformation',
              duration: '12 Weeks',
              price: '$69–$99',
              description: '3x the depth, projects & mastery',
              benefits: [
                'Advanced AI techniques',
                'Real-world income projects',
                'Weekly live Q&A',
                'Private cohort community',
                'Mentorship access',
                'Premium certificate'
              ]
            }
          ].map((program, i) => (
            <div
              key={i}
              className={`rounded-lg border transition ${
                program.featured
                  ? 'bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/50 scale-105'
                  : 'bg-slate-800/50 border-slate-700/50 hover:border-slate-600/50'
              } p-8 flex flex-col`}
            >
              {program.featured && (
                <div className="text-sm font-semibold text-blue-400 mb-2">MOST POPULAR</div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{program.name}</h3>
              <div className="text-slate-400 text-sm mb-4">{program.duration}</div>
              <div className="text-3xl font-bold text-white mb-2">{program.price}</div>
              <p className="text-slate-400 text-sm mb-8">{program.description}</p>

              <ul className="space-y-3 mb-8 flex-1">
                {program.benefits.map((benefit, j) => (
                  <li key={j} className="flex items-start gap-2 text-slate-300 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link href="/quiz">
                <Button
                  className={`w-full ${
                    program.featured
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-slate-700 hover:bg-slate-600'
                  } text-white`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">What Learners Are Saying</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Amara',
              role: 'Content Creator, Nigeria',
              text: 'Went from 0 to 6 figures in 3 months using AI tools. Game-changer for my YouTube channel.'
            },
            {
              name: 'James',
              role: 'Freelancer, UK',
              text: 'Automated 70% of my workflow. Now I take fewer jobs but make more money.'
            },
            {
              name: 'Fatima',
              role: 'Business Owner, UAE',
              text: 'AI transformed my e-commerce business. This course showed me exactly how.'
            }
          ].map((testimonial, i) => (
            <div key={i} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-6">
              <p className="text-slate-300 mb-4">"{testimonial.text}"</p>
              <div>
                <p className="font-semibold text-white">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Your AI Edge?</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Take our free, personalized assessment and discover which program fits your goals.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6">
              Start Assessment Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 bg-slate-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Programs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li><Link href="mailto:hello@aiadvantage.com">hello@aiadvantage.com</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700/50 pt-8 text-center text-slate-500 text-sm">
            <p>&copy; 2026 AI Advantage Academy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
