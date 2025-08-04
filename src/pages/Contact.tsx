import { useState } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Map, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(1, { message: "Please select a subject." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(data: any) {
    console.log(data);
    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    });
    setIsSubmitted(true);
  }
  
  const locations = [
    {
      city: "New York",
      address: "123 Financial Avenue, New York, NY 10001",
      phone: "+1 (212) 555-1234",
      email: "newyork@nivalusbank.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    },
    {
      city: "London",
      address: "456 Banking Street, London, EC2A 4BQ",
      phone: "+44 20 1234 5678",
      email: "london@nivalusbank.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    },
    {
      city: "Singapore",
      address: "789 Finance Road, Singapore 049315",
      phone: "+65 6123 4567",
      email: "singapore@nivalusbank.com",
      hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <div className="bg-indigo-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <h1 className="text-4xl font-extrabold sm:text-5xl mb-4 text-center">Contact Us</h1>
            <p className="text-xl max-w-3xl mx-auto text-center">
              Our team is here to help. Get in touch with us and we'll respond as soon as we can.
            </p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Methods</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Phone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Phone Support</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      General Inquiries: +1 (800) 123-4567 (line is down)<br />
                      Customer Service: +1 (800) 987-6543 (line is down)<br />
                      International: +1 (123) 456-7890
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      Available Monday through Friday, 8AM to 8PM ET
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      General Inquiries: info@nivalusbank.com<br />
                      Customer Support: support@nivalusbank.com<br />
                      Security Concerns: security@nivalusbank.com
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      We aim to respond to all email inquiries within 24 hours
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Map className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Headquarters</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Nivalus Bank, Inc.<br />
                      One Financial Plaza<br />
                      New York, NY 10004<br />
                      United States
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Clock className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Hours</h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400">
                      Monday - Friday: 9:00 AM - 6:00 PM ET<br />
                      Saturday: 10:00 AM - 2:00 PM ET<br />
                      Sunday: Closed
                    </p>
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                      Online banking available 24/7
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Thank you for your message!</h3>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">
                    We've received your inquiry and will get back to you as soon as possible, usually within 24 hours.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                    >
                      Send Another Message
                    </Button>
                  </div>
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input placeholder="john.doe@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone (Optional)</FormLabel>
                                <FormControl>
                                  <Input placeholder="+1 (555) 123-4567" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject</FormLabel>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a subject" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="general">General Inquiry</SelectItem>
                                  <SelectItem value="support">Account Support</SelectItem>
                                  <SelectItem value="billing">Billing Question</SelectItem>
                                  <SelectItem value="technical">Technical Issue</SelectItem>
                                  <SelectItem value="feedback">Feedback</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                Select the topic that best matches your inquiry
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="How can we help you?"
                                  className="min-h-[120px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full">Send Message</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Locations</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                Visit us at one of our branch locations around the world.
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <Map className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{location.city}</h3>
                    <div className="mt-4 space-y-3">
                      <p className="text-gray-600 dark:text-gray-400 flex">
                        <Map className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" /> 
                        {location.address}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 flex">
                        <Phone className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" /> 
                        {location.phone}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 flex">
                        <Mail className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" /> 
                        {location.email}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 flex">
                        <Clock className="h-5 w-5 mr-2 flex-shrink-0 text-indigo-500 dark:text-indigo-400" /> 
                        {location.hours}
                      </p>
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" className="w-full">Get Directions</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}