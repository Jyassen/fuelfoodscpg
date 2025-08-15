import React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { ShoppingCart, Leaf, Award, Star } from 'lucide-react';

/**
 * Showcase component demonstrating shadcn/ui components
 * configured for FuelFoods CPG website
 */
export function ShadcnShowcase() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          FuelFoods UI Components
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Showcasing shadcn/ui components styled for our health food CPG brand
        </p>
      </div>

      {/* Buttons Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>
            Various button styles for different actions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button>Primary Action</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button size="sm">Small Button</Button>
            <Button size="lg">Large Button</Button>
          </div>
        </CardContent>
      </Card>

      {/* Product Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(item => (
          <Card key={item} className="overflow-hidden">
            <div className="aspect-square bg-secondary/20 flex items-center justify-center">
              <Leaf className="h-12 w-12 text-primary" />
            </div>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Organic Superfood {item}
                </CardTitle>
                <Badge variant="secondary">
                  <Award className="h-3 w-3 mr-1" />
                  Organic
                </Badge>
              </div>
              <CardDescription>
                Premium organic superfood blend with natural ingredients
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">
                  (24 reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-primary mt-2">$29.99</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Form Elements Section */}
      <Card>
        <CardHeader>
          <CardTitle>Form Elements</CardTitle>
          <CardDescription>
            Input fields and form controls for user interaction
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Product Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="superfoods">Superfoods</SelectItem>
                  <SelectItem value="proteins">Plant Proteins</SelectItem>
                  <SelectItem value="snacks">Healthy Snacks</SelectItem>
                  <SelectItem value="beverages">Organic Beverages</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>Tabbed content for product details</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">
                Our premium organic superfoods are carefully sourced from
                sustainable farms around the world. Each product is tested for
                purity and packed with essential nutrients to fuel your healthy
                lifestyle.
              </p>
            </TabsContent>
            <TabsContent value="ingredients" className="mt-4">
              <div className="space-y-2">
                <Badge variant="outline">Organic Quinoa</Badge>
                <Badge variant="outline">Chia Seeds</Badge>
                <Badge variant="outline">Spirulina</Badge>
                <Badge variant="outline">Goji Berries</Badge>
              </div>
            </TabsContent>
            <TabsContent value="nutrition" className="mt-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Calories: 120</div>
                <div>Protein: 8g</div>
                <div>Fiber: 5g</div>
                <div>Iron: 15% DV</div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-muted-foreground">
                4.8/5 stars based on 127 customer reviews. Customers love the
                taste and nutritional benefits of our superfoods.
              </p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Separator />

      {/* Dialog Example */}
      <Card>
        <CardHeader>
          <CardTitle>Interactive Elements</CardTitle>
          <CardDescription>Modals and interactive components</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">View Product Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Organic Superfood Blend</DialogTitle>
                <DialogDescription>
                  Get detailed information about this premium superfood product.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Key Benefits:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• High in plant-based protein</li>
                    <li>• Rich in antioxidants</li>
                    <li>• Supports immune system</li>
                    <li>• Sustainably sourced</li>
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button>Add to Cart - $29.99</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
