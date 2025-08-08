"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Mail, FileText } from "lucide-react"

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // Burada normalde session detaylarını backend'den alırdık
      // Şimdilik sadece session ID'yi gösteriyoruz
      console.log('Payment successful for session:', sessionId)
    }
  }, [sessionId])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-background dark:from-green-950/20 dark:to-background flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600 dark:text-green-400">
              Ödeme Başarılı!
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Ödemeniz başarıyla alındı ve hesabınız aktif edildi.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Order Details */}
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold mb-3">Sipariş Detayları</h3>
              {sessionId && (
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">İşlem No:</span>
                    <span className="font-mono text-xs">{sessionId.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tarih:</span>
                    <span>{new Date().toLocaleDateString('tr-TR')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Durum:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Onaylandı</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next Steps */}
            <div className="space-y-3">
              <h3 className="font-semibold">Sonraki Adımlar</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Mail className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">E-posta Onayı</p>
                    <p className="text-sm text-muted-foreground">
                      Fatura ve hesap bilgileriniz e-posta adresinize gönderildi.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Faturanız Hazır</p>
                    <p className="text-sm text-muted-foreground">
                      Faturanızı hesap ayarlarından indirebilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/dashboard">
                  Kontrol Paneline Git
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Sorularınız mı var?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Destek ekibimizle iletişime geçin
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}