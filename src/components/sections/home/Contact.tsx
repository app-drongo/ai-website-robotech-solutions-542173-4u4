'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const DEFAULT_CONTACT = {
  title: 'Connect with Our Automation Experts',
  subtitle:
    'Ready to transform your operations? Our technical team is here to discuss your enterprise automation requirements and design intelligent solutions.',
  formTitle: 'Request Technical Consultation',
  formSubtitle: "Share your automation challenges and we'll provide expert guidance",
  nameLabel: 'Full Name',
  namePlaceholder: 'Enter your full name',
  emailLabel: 'Business Email',
  emailPlaceholder: 'your.email@company.com',
  companyLabel: 'Company Name',
  companyPlaceholder: 'Your organization',
  messageLabel: 'Project Requirements',
  messagePlaceholder: 'Describe your automation needs, current processes, and expected outcomes...',
  submitText: 'Schedule Consultation',
  successMessage: 'Thank you! Our technical team will contact you within 24 hours.',
  contactMethods: [
    {
      icon: 'phone',
      title: 'Technical Support',
      value: '+1 (555) 123-4567',
      description: '24/7 enterprise support',
    },
    {
      icon: 'mail',
      title: 'Business Inquiries',
      value: 'solutions@robotics.com',
      description: 'Partnership opportunities',
    },
    {
      icon: 'map',
      title: 'Innovation Center',
      value: 'San Francisco, CA',
      description: 'Visit our automation lab',
    },
  ],
  businessHours: [
    'Monday - Friday: 8:00 AM - 6:00 PM PST',
    'Saturday: 10:00 AM - 4:00 PM PST',
    'Sunday: Emergency support only',
  ],
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'mail':
        return <Mail className="h-5 w-5" />;
      case 'map':
        return <MapPin className="h-5 w-5" />;
      default:
        return <Mail className="h-5 w-5" />;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Form */}
          <Card className="bg-card text-card-foreground border-border">
            <CardHeader>
              <CardTitle className="text-2xl">
                <span data-editable="formTitle">{config.formTitle}</span>
              </CardTitle>
              <p className="text-muted-foreground">
                <span data-editable="formSubtitle">{config.formSubtitle}</span>
              </p>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    <span data-editable="successMessage">{config.successMessage}</span>
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  data-form-id="69585c8e3582779108968d4e"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        <span data-editable="nameLabel">{config.nameLabel}</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={e => handleInputChange('name', e.target.value)}
                        placeholder={config.namePlaceholder}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <span data-editable="emailLabel">{config.emailLabel}</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={e => handleInputChange('email', e.target.value)}
                        placeholder={config.emailPlaceholder}
                        required
                        className="bg-background border-border"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">
                      <span data-editable="companyLabel">{config.companyLabel}</span>
                    </Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={e => handleInputChange('company', e.target.value)}
                      placeholder={config.companyPlaceholder}
                      required
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      <span data-editable="messageLabel">{config.messageLabel}</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={e => handleInputChange('message', e.target.value)}
                      placeholder={config.messagePlaceholder}
                      rows={5}
                      required
                      className="bg-background border-border resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Processing...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="h-4 w-4" />
                        <span data-editable="submitText">{config.submitText}</span>
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6">
              {config.contactMethods.map((method, idx) => (
                <Card
                  key={idx}
                  className="bg-muted/50 border-border hover:bg-muted/70 transition-colors"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary text-primary-foreground p-3 rounded-lg">
                        {getIcon(method.icon)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">
                          <span data-editable={`contactMethods[${idx}].title`}>{method.title}</span>
                        </h3>
                        <p className="text-foreground font-medium mb-1">
                          <span data-editable={`contactMethods[${idx}].value`}>{method.value}</span>
                        </p>
                        <p className="text-muted-foreground text-sm">
                          <span data-editable={`contactMethods[${idx}].description`}>
                            {method.description}
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Business Hours */}
            <Card className="bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {config.businessHours.map((hours, idx) => (
                    <div key={idx} className="flex items-center justify-between py-1">
                      <span
                        data-editable={`businessHours[${idx}]`}
                        className="text-muted-foreground"
                      >
                        {hours}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  >
                    Currently Available
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
