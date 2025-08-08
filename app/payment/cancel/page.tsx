"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { XCircle, ArrowLeft, RefreshCw, HelpCircle } from "lucide-react"
import Header from "@/components/Header"

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-background dark:from-red-950/20 dark:to-background">
      <Header />
      <div className="flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full">
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <XCircle className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-red-600 dark:text-red-400">
              Ödeme İptal Edildi
            </CardTitle>
            <CardDescription className="text-lg mt-2">
              Ödeme işleminiz iptal edildi. Hiçbir ücret alınmadı.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Info Message */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                Ödeme işlemini tamamlamadınız. Hesabınızdan herhangi bir ücret alınmamıştır. 
                İsterseniz tekrar deneyebilir veya farklı bir plan seçebilirsiniz.
              </p>
            </div>

            {/* Common Reasons */}
            <div className="space-y-3">
              <h3 className="font-semibold">Yaygın İptal Nedenleri</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Yanlışlıkla iptal butonuna tıklandı</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Farklı bir plan seçmek istendi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Ödeme bilgileri hazır değildi</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Daha fazla bilgi almak istendi</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button asChild className="flex-1">
                <Link href="/payment">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Tekrar Dene
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Ana Sayfaya Dön
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-2 mb-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Yardıma mı ihtiyacınız var?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Ödeme işlemi sırasında sorun yaşadıysanız veya sorularınız varsa, size yardımcı olmaktan mutluluk duyarız.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="secondary" size="sm" className="flex-1">
                  <Link href="/contact">
                    Destek Ekibiyle İletişime Geç
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm" className="flex-1">
                  <Link href="/faq">
                    SSS'ye Göz At
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-6 text-center text-sm text-muted-foreground">
          <p>
            Güvenliğiniz bizim için önemli.{" "}
            <Link href="/privacy" className="text-primary hover:underline">
              Gizlilik politikamızı inceleyin
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}