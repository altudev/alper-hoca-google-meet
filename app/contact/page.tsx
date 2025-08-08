"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Mail, Phone, MapPin, Send, Clock, Globe, Loader2 } from "lucide-react"
import { useState } from "react"
import { contactFormSchema, type ContactFormValues } from "@/lib/validations/contact"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  })

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true)
    try {
      console.log("Form submitted:", data)
      await new Promise(resolve => setTimeout(resolve, 2000))
      form.reset()
      alert("Mesajınız başarıyla gönderildi!")
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Bir hata oluştu. Lütfen tekrar deneyin.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              İletişime Geçin
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sorularınız, önerileriniz veya işbirliği talepleriniz için bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>İletişim Bilgileri</CardTitle>
                  <CardDescription>
                    Size ulaşabileceğimiz tüm kanallar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">E-posta</p>
                      <p className="text-sm text-muted-foreground">destek@googlemeet-clone.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-sm text-muted-foreground">+90 (555) 123 45 67</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-sm text-muted-foreground">
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Çalışma Saatleri</p>
                      <p className="text-sm text-muted-foreground">
                        Pazartesi - Cuma: 09:00 - 18:00
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Sosyal Medya</p>
                      <div className="flex gap-2 mt-1">
                        <a href="#" className="text-sm text-primary hover:underline">Twitter</a>
                        <span className="text-muted-foreground">•</span>
                        <a href="#" className="text-sm text-primary hover:underline">LinkedIn</a>
                        <span className="text-muted-foreground">•</span>
                        <a href="#" className="text-sm text-primary hover:underline">GitHub</a>
                      </div>
                    </div>
                  </div>
                </div>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card>
                <CardHeader>
                  <CardTitle>Sıkça Sorulan Sorular</CardTitle>
                </CardHeader>
                <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm">Ücretsiz mi kullanabilirim?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Evet, temel özellikler ücretsizdir.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Kaç kişi katılabilir?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Toplantılara 100 kişiye kadar katılım sağlanabilir.
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Kayıt özelliği var mı?</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Premium üyelikle toplantıları kaydedebilirsiniz.
                    </p>
                  </div>
                </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Mesaj Gönderin</CardTitle>
                  <CardDescription>
                    Formu doldurarak bize ulaşabilirsiniz. En kısa sürede size dönüş yapacağız.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Adınız Soyadınız</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>E-posta Adresiniz</FormLabel>
                              <FormControl>
                                <Input placeholder="john@example.com" type="email" {...field} />
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
                            <FormLabel>Konu</FormLabel>
                            <FormControl>
                              <Input placeholder="Destek talebi, öneri, vb." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mesajınız</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Mesajınızı buraya yazın..."
                                className="resize-none"
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          * Tüm alanlar zorunludur
                        </p>
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Gönderiliyor...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Gönder
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>

              {/* Additional Info Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-green-500/10 rounded-lg">
                        <div className="h-5 w-5 bg-green-500 rounded-full animate-pulse" />
                      </div>
                      <h3 className="font-semibold">Canlı Destek</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Hafta içi 09:00-18:00 saatleri arasında canlı destek hizmeti sunuyoruz.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Mail className="h-5 w-5 text-blue-500" />
                      </div>
                      <h3 className="font-semibold">Hızlı Yanıt</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      E-posta ile gönderdiğiniz mesajlara 24 saat içinde dönüş yapıyoruz.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}