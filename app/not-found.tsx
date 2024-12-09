import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Layers, ArrowLeft, Search } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl w-full items-center">
        {/* Visual Element */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-2 bg-primary/10 rounded-xl blur-xl"></div>
            <Layers 
              size={280} 
              className="relative text-primary/50 animate-pulse" 
              strokeWidth={1} 
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-primary/20">
              404
            </div>
          </div>
        </div>

        {/* Content Section */}
        <Card className="border-none shadow-lg bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-foreground">
              Lost in Translation
            </CardTitle>
            <CardDescription className="text-lg">
              The page you're searching for seems to have vanished into the digital abyss.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Don't worry, our digital compass can help you navigate back to safety.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/" className="flex items-center justify-center gap-2">
                    <ArrowLeft size={18} />
                    Return Home
                  </Link>
                </Button>
                
                <Button asChild variant="secondary" className="w-full">
                  <Link href="/search" className="flex items-center justify-center gap-2">
                    <Search size={18} />
                    Search Creatify
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}