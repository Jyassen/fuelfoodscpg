import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Leaf, Package, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Premium Microgreens &{' '}
            <span className="text-green-600">Pet Grass</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Fresh, organic microgreens and pet grass delivered weekly to your
            door. Nutrient-dense superfoods for you and your beloved pets.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link href="/configure/starter">
                <Package className="mr-2 h-5 w-5" />
                Shop Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Link href="/about-us">Learn More</Link>
            </Button>
          </div>
          <div className="mt-6 flex justify-center">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <Leaf className="mr-1 h-4 w-4" />
              100% Organic Certified
            </Badge>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Fresh & Organic</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Grown with love using organic methods, harvested at peak
                freshness for maximum nutrition.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Weekly Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Convenient weekly deliveries ensure you always have fresh greens
                on hand.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-xl">Premium Quality</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Carefully cultivated microgreens and pet grass that meet the
                highest quality standards.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of customers who trust FuelFoods CPG for their fresh
            microgreens and pet grass needs.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-6"
          >
            <Link href="/configure/starter">
              <Package className="mr-2 h-5 w-5" />
              Explore Products
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
