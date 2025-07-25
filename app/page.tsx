'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Globe,
  DollarSign,
  ShieldCheck,
  Headphones,
  Cpu,
  Server,
  CloudCog,
  Users,
  Mail,
  Twitter,
  Github,
  Linkedin,
  Star,
  MessageCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Countdown Timer Component
function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>();

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }

    updateTime();
    const timerId = setInterval(updateTime, 1000);

    return () => clearInterval(timerId);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="text-center text-3xl font-mono tracking-widest text-blue-700">
      <span>{timeLeft.days}d</span> : <span>{timeLeft.hours}h</span> : <span>{timeLeft.minutes}m</span> :{' '}
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}

export default function HomePage() {
  const mvpLaunchDate = new Date('2025-08-31T00:00:00');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center">
              <img src="/adhify_logo_full.svg" alt="Adhify Logo" className="h-20 w-20" />
            </div>
          </div>
          <div className="text-sm text-gray-600 font-medium">Coming Soon 🚀</div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Badge variant="secondary" className="mb-4">
            🇳🇵 Built for Nepal
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Empowering Nepali Developers <br /> To Own Their Cloud
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            The cloud should serve you — not the other way around. At Adhify, we envision a future where Nepal’s
            developers, students, and startups can deploy and control their applications on their own terms, with
            transparency, affordability, and local support.
          </p>
          <Button size="lg" asChild>
            <Link
              href="https://forms.zohopublic.com/adminadh1/form/AdhifyEarlyAccessandUpdateSubscription/formperma/Cxi7SR_zztlUKsiUTjlXL7EH8eM2Xp2fdGusjmKZAEw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Updates & Join Early Access
            </Link>
          </Button>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
              Early access & feedback driven
            </div>
          </div>
        </div>
      </section>

      {/* Why Adhify Section with Icons */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why We’re Building Adhify</h2>
            <p className="text-gray-700 text-lg max-w-3xl mx-auto">
              Nepal’s tech community faces unique challenges that make adopting existing global cloud platforms
              difficult:
            </p>
          </div>
          <ul className="space-y-8 text-gray-700 text-left text-lg max-w-3xl mx-auto">
            <li className="flex items-start space-x-4">
              <DollarSign className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <span>
                <strong>Costs That Don’t Match Local Budgets:</strong> Many cloud providers’ pricing models are
                complicated and expensive for students, freelancers, and startups here.
              </span>
            </li>
            <li className="flex items-start space-x-4">
              <ShieldCheck className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <span>
                <strong>Limited Control & Data Privacy:</strong> Hosting overseas raises concerns around latency, data
                sovereignty, and privacy compliance.
              </span>
            </li>
            <li className="flex items-start space-x-4">
              <Headphones className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <span>
                <strong>Lack of Localized Support & Community:</strong> Few platforms understand the specific needs of
                Nepal’s developers or provide local help.
              </span>
            </li>
            <li className="flex items-start space-x-4">
              <Cpu className="w-6 h-6 flex-shrink-0 text-blue-600 mt-1" />
              <span>
                <strong>Technical Barriers:</strong> Managing cloud infrastructure requires specialized DevOps skills
                that many learners and small teams find intimidating.
              </span>
            </li>
          </ul>
          <p className="mt-12 text-center text-gray-600 text-lg max-w-3xl mx-auto">
            Our mission is to create a cloud platform designed for Nepal — simple, transparent, and empowering — so our
            community can build with confidence and ownership.
          </p>
        </div>
      </section>

      {/* Local Alternative Section */}
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            A Local Alternative to Global Cloud Platforms
          </h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-700">
            Many global cloud platforms offer great convenience but come with hidden costs, data privacy concerns, and
            limited control — especially for developers in Nepal. Adhify is designed to fill that gap by providing a
            cloud platform tailored to local needs.
          </p>
          <div className="grid md:grid-cols-4 gap-10 max-w-6xl mx-auto text-center">
            <div className="flex flex-col items-center space-y-4">
              <Server className="w-12 h-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Full Control & Ownership</h3>
              <p className="text-gray-700">
                Unlike opaque managed platforms, you decide where and how your apps run — on servers you trust and
                control.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <DollarSign className="w-12 h-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Affordable & Transparent Pricing</h3>
              <p className="text-gray-700">
                No complicated billing or surprise charges. Pricing designed for Nepal’s developers, startups, and
                students.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <CloudCog className="w-12 h-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Simplified Deployment</h3>
              <p className="text-gray-700">
                Get the ease of deploying apps without needing to master complex DevOps tools or cloud vendor quirks.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <Users className="w-12 h-12 text-blue-600" />
              <h3 className="text-xl font-semibold">Built for Nepal’s Community</h3>
              <p className="text-gray-700">
                Local support, community-driven features, and infrastructure optimized for Nepal’s connectivity and
                regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopter Program Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Early Adopter Program</h2>
          <p className="text-lg text-gray-700 mb-6">
            Become one of the first users of Adhify! Help shape the platform, get free access during MVP, and enjoy
            direct support from our team.
          </p>
          <ul className="list-none text-left text-gray-700 max-w-md mx-auto mb-8 space-y-6">
            <li className="flex items-center space-x-4">
              <Users className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span>Exclusive free access for early adopters (limited slots)</span>
            </li>
            <li className="flex items-center space-x-4">
              <Star className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span>Be part of product development and give direct feedback</span>
            </li>
            <li className="flex items-center space-x-4">
              <MessageCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <span>Get priority support and community invites</span>
            </li>
          </ul>
          <Button size="lg" asChild>
            <Link
              href="https://forms.zohopublic.com/adminadh1/form/AdhifyEarlyAccessandUpdateSubscription/formperma/Cxi7SR_zztlUKsiUTjlXL7EH8eM2Xp2fdGusjmKZAEw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Early Access Now
            </Link>
          </Button>

          {/* Countdown */}
          {/* <div className="mt-12">
            <h3 className="text-xl font-semibold mb-2">MVP Launch Countdown</h3>
            <CountdownTimer targetDate={mvpLaunchDate} />
          </div> */}
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-20 px-4 bg-gray-100">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">What We’re Working On</h2>
          <p className="text-gray-700 mb-8">
            We’re early in the journey and want to build this platform with you. Here are some key focus areas:
          </p>
          <ul className="space-y-4 text-left text-gray-700 text-lg max-w-xl mx-auto">
            <li>✅ Understanding local challenges through community feedback</li>
            <li>⚙️ Designing a simple self-hosted cloud solution</li>
            <li>🧪 Preparing early access programs for students and startups</li>
            <li>🤝 Building a support network for Nepali developers</li>
          </ul>
          <div className="mt-6">
            <Link
              href="https://linkedin.com/company/adhify"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Follow Our Journey & Updates →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8 text-gray-700 text-lg max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold mb-2">What is Adhify?</h3>
              <p>
                Adhify is a cloud platform built for Nepal’s developers, startups, and students to deploy applications
                on infrastructure they control — with affordable pricing and local support.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">When will I get access?</h3>
              <p>
                We plan to launch our MVP in late August 2025. Early adopters will get free access and the chance to
                provide feedback during this period.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">How is Adhify different from other cloud platforms?</h3>
              <p>
                Unlike global platforms, Adhify prioritizes transparency, local needs, affordability, and gives you full
                control over where your apps run.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">What level of support will early adopters receive?</h3>
              <p>
                Early adopters get priority support, direct communication channels with our team, and access to
                exclusive community events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team & Social Proof Section
      <section className="py-20 px-4 bg-blue-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Meet the Team Behind Adhify</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-6">
            A passionate group of Nepali developers and tech enthusiasts committed to empowering local developers with
            modern cloud tools built for our unique environment.
          </p>
          <div className="flex justify-center space-x-8">
            {/* Replace these with real team member images and profiles if available */}
      {/* <div className="text-center">
              <div className="w-24 h-24 bg-blue-600 rounded-full inline-flex items-center justify-center text-white text-3xl font-bold">
                PP
              </div>
              <p className="mt-2 font-semibold">Pujan Poudyal</p>
              <p className="text-sm text-gray-600">Co-founder & Developer</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-600 rounded-full inline-flex items-center justify-center text-white text-3xl font-bold">
                SK
              </div>
              <p className="mt-2 font-semibold">Sita Koirala</p>
              <p className="text-sm text-gray-600">Product & UX</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 bg-indigo-600 rounded-full inline-flex items-center justify-center text-white text-3xl font-bold">
                RA
              </div>
              <p className="mt-2 font-semibold">Ramesh Acharya</p>
              <p className="text-sm text-gray-600">Community Lead</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Adhify</span>
              </div>
              <p className="text-gray-400">Nepal’s own cloud platform, built with love and purpose.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#why-adhify" className="hover:text-white">
                    Why Adhify
                  </Link>
                </li>
                <li>
                  <Link href="#early-adopter" className="hover:text-white">
                    Early Adopters
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-white">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#updates" className="hover:text-white">
                    Updates
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="flex space-x-4 text-gray-400 justify-start">
                <li>
                  <Link href="mailto:hello@adhify.com" className="hover:text-white" aria-label="Email">
                    <Mail className="w-5 h-5" />
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="https://twitter.com/adhify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </Link>
                </li> */}
                {/* <li>
                  <Link
                    href="https://github.com/adhify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </Link>
                </li> */}
                <li>
                  <Link
                    href="https://linkedin.com/company/adhify"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <p className="text-gray-400">Contact us at hello@adhify.com</p>
              <p className="text-gray-400 mt-2">Join our community on social media</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Adhify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
