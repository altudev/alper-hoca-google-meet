"use client"

import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Shield, Zap, Check, Loader2 } from "lucide-react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const plans = [
  {
    id: 1,
    name: "Başlangıç",
    description: "Küçük ekipler için ideal",
    price: 99,
    priceId: "price_1QnxYzP8j5Gl5rJ9XKqBZM5N",
    features: [
      "60 dakika toplantı süresi",
      "10 kişiye kadar katılım",
      "Ekran paylaşımı",
      "Temel güvenlik"
    ]
  },
  {
    id: 2,
    name: "Profesyonel",
    description: "Büyüyen işletmeler için",
    price: 199,
    priceId: "price_1QnxZ4P8j5Gl5rJ94VBX5nKH",
    popular: true,
    features: [
      "Sınırsız toplantı süresi",
      "100 kişiye kadar katılım",
      "Toplantı kaydı",
      "Gelişmiş güvenlik",
      "Özel arka planlar",
      "7/24 destek"
    ]
  },
  {
    id: 3,
    name: "Kurumsal",
    description: "Büyük organizasyonlar için",
    price: 499,
    priceId: "price_1QnxZ8P8j5Gl5rJ9YnQWP7Lz",
    features: [
      "Sınırsız toplantı süresi",
      "500 kişiye kadar katılım",
      "Bulut kayıt ve depolama",
      "SSO entegrasyonu",
      "API erişimi",
      "Özel hesap yöneticisi",
      "SLA garantisi"
    ]
  }
]

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState<number | null>(null)

  const handleCheckout = async (priceId: string, planId: number) => {
    setIsLoading(planId)
    
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          quantity: 1,
        }),
      })

      const { sessionId } = await response.json()
      
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error('Stripe failed to load')
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error('Stripe checkout error:', error)
        alert('Ödeme işlemi başlatılamadı. Lütfen tekrar deneyin.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Planınızı Seçin
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              İhtiyaçlarınıza en uygun planı seçin ve hemen kullanmaya başlayın.
            </p>
          </div>

          {/* Security Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-full">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">Güvenli Ödeme - 256-bit SSL Şifreleme</span>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {plans.map((plan) => (
              <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-xl' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      En Popüler
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">₺{plan.price}</span>
                    <span className="text-muted-foreground">/ay</span>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => handleCheckout(plan.priceId, plan.id)}
                    disabled={isLoading !== null}
                  >
                    {isLoading === plan.id ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        İşleniyor...
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" />
                        Hemen Başla
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Kabul edilen ödeme yöntemleri</p>
            <div className="flex justify-center items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Visa</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">Mastercard</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 border rounded-lg">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm">American Express</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Güvenli Ödeme</h3>
                    <p className="text-sm text-muted-foreground">
                      Stripe ile güvenli ödeme
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Zap className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">Anında Aktivasyon</h3>
                    <p className="text-sm text-muted-foreground">
                      Ödeme sonrası hemen kullanın
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Check className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold">İptal Garantisi</h3>
                    <p className="text-sm text-muted-foreground">
                      30 gün içinde iptal edebilirsiniz
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}