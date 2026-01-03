'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight, Zap, Building2, Rocket } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_PRICING = {
  title: 'Enterprise Automation Pricing',
  subtitle:
    'Scalable robotic solutions designed for measurable ROI and seamless enterprise integration',
  billingToggle: {
    monthly: 'Monthly',
    annual: 'Annual',
    annualSavings: 'Save 20%',
  },
  plans: [
    {
      id: 'starter',
      name: 'Automation Starter',
      description: 'Perfect for small-scale operations ready to embrace intelligent automation',
      monthlyPrice: 2499,
      annualPrice: 23990,
      icon: 'zap',
      features: [
        'Up to 5 robotic units',
        'Basic process automation',
        'Standard integration support',
        'Email support',
        'Monthly performance reports',
      ],
      ctaText: 'Start Automation',
      ctaHref: '/contact?plan=starter',
      popular: false,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Scale',
      description: 'Comprehensive automation suite for large-scale business transformation',
      monthlyPrice: 7999,
      annualPrice: 76790,
      icon: 'building2',
      features: [
        'Unlimited robotic units',
        'Advanced AI-driven automation',
        'Custom system integration',
        '24/7 priority support',
        'Real-time analytics dashboard',
        'Dedicated success manager',
      ],
      ctaText: 'Transform Operations',
      ctaHref: '/contact?plan=enterprise',
      popular: true,
    },
    {
      id: 'custom',
      name: 'Custom Solutions',
      description: 'Tailored robotic automation for complex enterprise requirements',
      monthlyPrice: null,
      annualPrice: null,
      icon: 'rocket',
      features: [
        'Fully customized automation',
        'Enterprise-grade security',
        'On-premise deployment options',
        'White-glove implementation',
        'Custom training programs',
        'SLA guarantees',
      ],
      ctaText: 'Discuss Requirements',
      ctaHref: '/contact?plan=custom',
      popular: false,
    },
  ],
} as const;

type PricingProps = Partial<typeof DEFAULT_PRICING>;

export default function Pricing(props: PricingProps) {
  const config = { ...DEFAULT_PRICING, ...props };
  const navigate = useSmartNavigation();
  const [isAnnual, setIsAnnual] = useState(false);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'building2':
        return <Building2 className="h-6 w-6" />;
      case 'rocket':
        return <Rocket className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };

  const formatPrice = (price: number | null) => {
    if (price === null) return 'Custom';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span
              className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.monthly">{config.billingToggle.monthly}</span>
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              role="switch"
              aria-checked={isAnnual}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-primary transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              <span data-editable="billingToggle.annual">{config.billingToggle.annual}</span>
            </span>
            {isAnnual && (
              <Badge variant="secondary" className="ml-2">
                <span data-editable="billingToggle.annualSavings">
                  {config.billingToggle.annualSavings}
                </span>
              </Badge>
            )}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {config.plans.map((plan, idx) => (
            <Card
              key={plan.id}
              className={`relative bg-card text-card-foreground transition-all duration-300 hover:shadow-lg ${
                plan.popular ? 'border-primary shadow-lg scale-105' : 'border-border'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    {getIcon(plan.icon)}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  <span data-editable={`plans[${idx}].name`}>{plan.name}</span>
                </h3>
                <p className="text-muted-foreground mb-6">
                  <span data-editable={`plans[${idx}].description`}>{plan.description}</span>
                </p>
                <div className="text-center">
                  {plan.monthlyPrice ? (
                    <>
                      <div className="text-4xl font-bold">
                        {formatPrice(isAnnual ? plan.annualPrice : plan.monthlyPrice)}
                      </div>
                      <div className="text-muted-foreground">per {isAnnual ? 'year' : 'month'}</div>
                    </>
                  ) : (
                    <div className="text-4xl font-bold">Custom</div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">
                        <span data-editable={`plans[${idx}].features[${featureIdx}]`}>
                          {feature}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => navigate(plan.ctaHref)}
                  data-editable-href={`plans[${idx}].ctaHref`}
                  data-href={plan.ctaHref}
                  className={`w-full group ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  <span data-editable={`plans[${idx}].ctaText`}>{plan.ctaText}</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-muted-foreground">
            All plans include enterprise-grade security, compliance support, and scalable
            infrastructure.
          </p>
        </div>
      </div>
    </section>
  );
}
