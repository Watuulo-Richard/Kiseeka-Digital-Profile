'use client'

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Instagram, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { EmailFormTypes } from '@/schema/schema';
import { useState } from 'react';
import { Portfolio } from '@prisma/client';
import { baseUrl } from '@/types/type';
import { toast } from 'sonner';

export default function Contact({ fetchedProfile }: { fetchedProfile: Portfolio }) {
  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      value: 'kisekapius45@gmail.com',
      link: 'mailto:kisekapius45@gmail.com',
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Location',
      value: 'Kawempe, Bwaise',
      link: 'https://maps.google.com/?q=Kampala,Uganda',
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Phone',
      value: 'Available on request',
      link: null,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormTypes>({
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  async function handleEmailOnSubmit(EmailFormData: EmailFormTypes) {
    EmailFormData.portfolioId = fetchedProfile.id;
    setIsSubmitting(true);
    try {
      const response = await fetch(`${baseUrl}/api/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(EmailFormData),
      });
      console.log(response);
      if (response.ok) {
        setIsSubmitting(false);
        toast.success('Email Has Been Sent Successfully');
        reset(); // Reset form after successful submission
      } else {
        setIsSubmitting(false);
        console.log(response);
        toast.error('Failed To Send Email, Please Try Again...🥺');
      }
    } catch (error) {
      setIsSubmitting(false);
      console.log(error);
      toast.error(
        '❌ Error! Something went wrong while processing your request. Please try again or contact support. ⚠️',
      );
    }
  }

  return (
    <div className="w-full bg-muted/30">
      <section id="contact" className="py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="space-y-12">
            <div className="space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get In Touch
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or want to discuss opportunities? I'd
                love to hear from you!
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
              <div className="lg:col-span-2">
                <Card>
                  <CardContent className="p-6">
                    <form
                      onSubmit={handleSubmit(handleEmailOnSubmit)}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input
                            {...register('name', { required: true })}
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                          />
                          {errors.name && (
                            <span className="text-sm text-destructive">
                              Name is required...
                            </span>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium"
                          >
                            Email
                          </label>
                          <Input
                            {...register('email', { required: true })}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your email"
                            required
                          />
                          {errors.email && (
                            <span className="text-sm text-destructive">
                              Email is required...
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="subject"
                          className="text-sm font-medium"
                        >
                          Subject
                        </label>
                        <Input
                          {...register('subject', { required: true })}
                          id="subject"
                          name="subject"
                          placeholder="Subject of your message"
                          required
                        />
                        {errors.subject && (
                          <span className="text-sm text-destructive">
                            Subject is required...
                          </span>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Message
                        </label>
                        <Textarea
                          {...register('message', { required: true })}
                          id="message"
                          name="message"
                          placeholder="Your message"
                          className="min-h-[150px]"
                          required
                        />
                        {errors.message && (
                          <span className="text-sm text-destructive">
                            Institution name is required...
                          </span>
                        )}
                      </div>
                      {isSubmitting ? (
                        <Button
                          type="submit"
                          className="w-full opacity-75 cursor-not-allowed"
                        >
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                          Sending...
                        </Button>
                      ) : (
                        <Button type="submit" className="w-full">
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </Button>
                      )}

                      <noscript>
                        <p className="text-sm text-center text-muted-foreground mt-2">
                          Please enable JavaScript to use the form, or email me
                          directly.
                        </p>
                      </noscript>
                    </form>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        {info.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{info.title}</h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            target={
                              info.title === 'Location' ? '_blank' : undefined
                            }
                            rel={
                              info.title === 'Location'
                                ? 'noopener noreferrer'
                                : undefined
                            }
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-medium mb-2">Connect with me</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Find me on these platforms
                    </p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href="https://github.com/maskeynihal"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Instagram className="h-6 w-6 text-gray-600 hover:text-pink-500 transition-colors cursor-pointer" />
                          <span className="sr-only">Instagram</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a
                          href="https://www.linkedin.com/in/kiseka-pius-064b651a7/"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                            <rect width="4" height="12" x="2" y="9"></rect>
                            <circle cx="4" cy="4" r="2"></circle>
                          </svg>
                          <span className="sr-only">LinkedIn</span>
                        </a>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <a href="mailto:kisekapius45@gmail.com">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-5 w-5"
                          >
                            <rect
                              width="20"
                              height="16"
                              x="2"
                              y="4"
                              rx="2"
                            ></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                          </svg>
                          <span className="sr-only">Email</span>
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
