import { ConstructionIcon } from "lucide-react"
import { Button } from '@/components/ui/button';
import Link from "next/link";
export default function MaintenancePage() {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
        <div className="text-center max-w-md">
          <div className="mb-8 animate-bounce">
            <ConstructionIcon size={100} className="mx-auto text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Under Construction</h1>
          <p className="text-muted-foreground mb-6">
            We're currently upgrading our platform to serve you better. 
            Check back soon for exciting new features!
          </p>
          <Button variant="default">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }