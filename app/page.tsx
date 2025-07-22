'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/supabase/hooks';
import { ArrowRight, CheckCircle, Cloud, Database, Globe, Server, Zap, Users, Shield, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: <Cloud className="h-6 w-6" />,
    title: 'Self-Hosted Infrastructure',
    description: 'Run your apps on your own servers or VPS using Coolify, powered by Docker and open-source tools.',
  },
  {
    icon: <Database className="h-6 w-6" />,
    title: 'Managed Databases',
    description: 'Host PostgreSQL, MongoDB, Redis and more — with minimal setup and daily automated backups.',
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: 'Coolify Integration',
    description: 'Built around Coolify for easy app and service deployment from Git. No complex DevOps setup needed.',
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: '1-Click Deployments',
    description: 'Launch production-ready apps in seconds. Support for Node.js, Laravel, Python, and more.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Built for Nepal',
    description:
      'Optimized for Nepali developers, students, freelancers, and startup founders who value affordability and control.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Secure and Open',
    description: 'Data stays in your control. Open-source stack with built-in encryption, backups, and monitoring.',
  },
];

const plans = [
  {
    name: 'Free',
    price: 'Rs. 0',
    period: 'forever',
    description: 'Ideal for students and hobby projects in Nepal',
    features: ['1 project', '1 app', '1 database', 'Community support', 'Manual deploys'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'Rs. 999',
    period: 'per month',
    description: 'Perfect for freelancers and indie projects',
    features: ['Up to 10 projects', 'Unlimited apps', 'Multiple databases', 'Custom domains', 'Basic monitoring'],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Team',
    price: 'Contact Us',
    period: '',
    description: 'For agencies, teams, and education orgs',
    features: ['Unlimited projects', 'Team collaboration', 'Role management', 'Email support', 'Dedicated onboarding'],
    cta: 'Talk to Us',
    popular: false,
  },
];

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">Adhify</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            🇳🇵 Built for Nepal
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your Cloud,
            <br />
            On Your Terms
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Adhify lets you deploy modern web apps and databases on your own infrastructure, with no lock-in and zero
            DevOps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/signup">
                Start Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline">
              View Docs
            </Button>
          </div>
          <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Coolify compatible
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
              Free forever tier
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build and scale</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From idea to production, we provide all the tools and infrastructure you need to build modern
              applications.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10M+</div>
              <div className="text-blue-100">Deployments</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-blue-100">Developers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-blue-100">Uptime</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start free and scale as you grow. No hidden fees, no surprises.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card key={index} className={`relative ${plan.popular ? 'border-blue-500 shadow-xl scale-105' : ''}`}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? 'default' : 'outline'} asChild>
                    <Link href="/auth/signup">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to deploy your next project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of developers who trust CloudDeploy for their production applications.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/signup">
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">CloudDeploy</span>
              </div>
              <p className="text-gray-400">The modern cloud platform for developers.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    API Reference
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Status
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CloudDeploy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// 'use client';

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { useUser } from '@/lib/supabase/hooks';
// import { ArrowRight, CheckCircle, Cloud, Database, Globe, Server, Zap, Users, Shield, BarChart3 } from 'lucide-react';

// const features = [
//   {
//     icon: <Cloud className="h-6 w-6" />,
//     title: 'Cloud Infrastructure',
//     description: 'Deploy your applications on scalable cloud infrastructure with automatic scaling and load balancing.',
//   },
//   {
//     icon: <Database className="h-6 w-6" />,
//     title: 'Managed Databases',
//     description: 'PostgreSQL, MongoDB, Redis, and more. Fully managed with automated backups and monitoring.',
//   },
//   {
//     icon: <Server className="h-6 w-6" />,
//     title: 'Container Orchestration',
//     description: 'Deploy containerized applications with Kubernetes orchestration and service mesh.',
//   },
//   {
//     icon: <Zap className="h-6 w-6" />,
//     title: 'Instant Deployments',
//     description: 'Deploy from Git with zero-downtime deployments and automatic rollbacks.',
//   },
//   {
//     icon: <Users className="h-6 w-6" />,
//     title: 'Team Collaboration',
//     description: 'Invite team members, manage permissions, and collaborate on projects seamlessly.',
//   },
//   {
//     icon: <Shield className="h-6 w-6" />,
//     title: 'Enterprise Security',
//     description: 'SOC 2 compliant with end-to-end encryption, VPC isolation, and audit logs.',
//   },
// ];

// const plans = [
//   {
//     name: 'Starter',
//     price: '$0',
//     period: 'forever',
//     description: 'Perfect for personal projects and learning',
//     features: ['1 project', '2 apps per project', '1 database', 'Community support', 'Basic monitoring'],
//     cta: 'Get Started',
//     popular: false,
//   },
//   {
//     name: 'Pro',
//     price: '$29',
//     period: 'per month',
//     description: 'Ideal for growing teams and production apps',
//     features: [
//       '10 projects',
//       'Unlimited apps',
//       '5 databases per project',
//       'Priority support',
//       'Advanced monitoring',
//       'Custom domains',
//       'Team collaboration',
//     ],
//     cta: 'Start Free Trial',
//     popular: true,
//   },
//   {
//     name: 'Enterprise',
//     price: 'Custom',
//     period: 'pricing',
//     description: 'For large organizations with advanced needs',
//     features: [
//       'Unlimited projects',
//       'Unlimited everything',
//       'Dedicated support',
//       'SLA guarantees',
//       'Advanced security',
//       'Custom integrations',
//       'On-premise options',
//     ],
//     cta: 'Contact Sales',
//     popular: false,
//   },
// ];

// export default function HomePage() {
//   const { user, loading } = useUser();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && user) {
//       router.push('/dashboard');
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (user) {
//     return null; // Will redirect to dashboard
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
//       {/* Header */}
//       <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
//         <div className="container mx-auto px-4 py-4 flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
//               <Globe className="w-5 h-5 text-white" />
//             </div>
//             <span className="text-xl font-bold">CloudDeploy</span>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" asChild>
//               <Link href="/auth/login">Sign In</Link>
//             </Button>
//             <Button asChild>
//               <Link href="/auth/signup">Get Started</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="container mx-auto text-center">
//           <Badge variant="secondary" className="mb-4">
//             🚀 Now with Kubernetes support
//           </Badge>
//           <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Deploy Anything,
//             <br />
//             Anywhere, Instantly
//           </h1>
//           <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
//             The modern cloud platform for developers. Deploy applications, databases, and services with zero
//             configuration. Scale automatically. Monitor everything.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <Button size="lg" asChild>
//               <Link href="/auth/signup">
//                 Start Building Free
//                 <ArrowRight className="ml-2 h-5 w-5" />
//               </Link>
//             </Button>
//             <Button size="lg" variant="outline">
//               View Documentation
//             </Button>
//           </div>
//           <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//               No credit card required
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//               Deploy in seconds
//             </div>
//             <div className="flex items-center">
//               <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
//               Free tier forever
//             </div>
//           </div>
//         </div>
//       </section>

//   );
// }
