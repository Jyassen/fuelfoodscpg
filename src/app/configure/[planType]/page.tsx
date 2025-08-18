'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/form';
import { useCart, useFuelFoods } from '@/context';
import { 
  PlanType, 
  MicrogreensVarietySelection, 
  PlanConfiguration,
  PLAN_CONFIGURATIONS,
  MICROGREENS_VARIETIES 
} from '@/lib/types';
import { PlanHeader, VarietySelector, OrderSummary } from './components';
import { validatePlanConfiguration } from '@/lib/checkout-utils';

export default function PackageConfigurationPage() {
  const params = useParams();
  const router = useRouter();
  const { addSubscriptionPlan, addItem } = useCart();
  const { startCheckout } = useFuelFoods();
  
  const planType = params.planType as PlanType;
  
  // Validate plan type
  if (!planType || !['starter', 'pro', 'elite'].includes(planType)) {
    router.push('/');
    return null;
  }

  // Starter plan is handled here (no redirect)

  const planConfig = PLAN_CONFIGURATIONS[planType];
  
  // State for variety selections
  const [varietySelections, setVarietySelections] = useState<MicrogreensVarietySelection[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  // Initialize with empty selections
  useEffect(() => {
    const initialSelections: MicrogreensVarietySelection[] = [
      { varietyId: 'mega-mix', quantity: 0 },
      { varietyId: 'brassica-blend', quantity: 0 },
      { varietyId: 'sunnies-snacks', quantity: 0 }
    ];
    setVarietySelections(initialSelections);
  }, []);

  // Calculate totals
  const totalSelectedPacks = varietySelections.reduce((sum, selection) => sum + selection.quantity, 0);
  const remainingPacks = planConfig.packsRequired - totalSelectedPacks;

  // Handle variety quantity change
  const handleVarietyChange = (varietyId: 'mega-mix' | 'brassica-blend' | 'sunnies-snacks', quantity: number) => {
    setVarietySelections(prev => 
      prev.map(selection => 
        selection.varietyId === varietyId 
          ? { ...selection, quantity: Math.max(0, quantity) }
          : selection
      )
    );
    setErrors([]);
  };

  // Validate current configuration
  const validateConfiguration = (): boolean => {
    const newErrors: string[] = [];
    
    if (planType === 'starter') {
      if (totalSelectedPacks <= 0) {
        newErrors.push('Please select at least 1 pack');
      }
    } else {
    if (totalSelectedPacks !== planConfig.packsRequired) {
      newErrors.push(`Please select exactly ${planConfig.packsRequired} packs for the ${planConfig.name}`);
    }
    if (totalSelectedPacks > planConfig.packsRequired) {
      newErrors.push(`You've selected ${totalSelectedPacks} packs. Please remove ${totalSelectedPacks - planConfig.packsRequired} pack(s)`);
    }
    if (totalSelectedPacks < planConfig.packsRequired) {
      newErrors.push(`You need to select ${planConfig.packsRequired - totalSelectedPacks} more pack(s)`);
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  // Handle add to cart
  const handleAddToCart = async () => {
    if (!validateConfiguration()) {
      return;
    }

    setIsLoading(true);
    
    try {
      const selectedVarieties = varietySelections.filter(s => s.quantity > 0);
      if (planType === 'starter') {
        // Add each selected variety as individual cart items
        // Avoid new Date() during render path; just add items with stable fields
        selectedVarieties.forEach(sel => {
          const variety = MICROGREENS_VARIETIES[sel.varietyId];
          const normalize = (u: string) => (u?.startsWith('http') || u?.startsWith('data:')) ? u : (u?.startsWith('/') ? u : `/${u}`);
          const product = {
            id: `variety_${sel.varietyId}`,
            name: variety.name,
            slug: sel.varietyId,
            description: variety.description,
            shortDescription: variety.description,
            price: variety.price,
            images: [{ id: sel.varietyId, url: normalize(variety.image), alt: variety.name, width: 400, height: 400, isPrimary: true }],
            categories: [{ id: 'microgreens', name: 'Microgreens', slug: 'microgreens', type: 'microgreens' as const }],
            inStock: true,
            sku: `PACK-${sel.varietyId.toUpperCase()}`,
            attributes: [],
            variant: sel.varietyId as any,
            microgreenTypes: [] as any,
            nutritionalInfo: { vitamins: [], minerals: [], antioxidants: [] },
            subscriptionOptions: [],
            packageSizes: [],
            freshnessDuration: '7-10 days refrigerated'
          } as any;
          addItem(product, sel.quantity, 'individual');
        });
        startCheckout();
        router.push('/cart');
      } else {
      const configuration: PlanConfiguration = {
        planType,
        totalPacks: planConfig.packsRequired,
          varieties: selectedVarieties,
        isValid: true
      };

        await addSubscriptionPlan(planType as 'pro' | 'elite', configuration, 'weekly');
      startCheckout();
      router.push('/cart');
      }
      
    } catch (error) {
      setErrors(['Failed to add subscription to cart. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-fuelfoods-green-500 transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Back to Home</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 hidden sm:block" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">
                <span className="hidden lg:inline">Configure Your {planConfig.name}</span>
                <span className="lg:hidden">{planConfig.name}</span>
              </h1>
            </div>
            <Link 
              href="/cart"
              className="flex items-center text-gray-600 hover:text-fuelfoods-green-500 transition-colors flex-shrink-0 ml-4"
            >
              <ShoppingCart className="w-5 h-5 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Configuration Area */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Plan Header */}
            <PlanHeader 
              planType={planType}
              planConfig={planConfig}
              totalSelected={totalSelectedPacks}
              remainingPacks={remainingPacks}
            />

            {/* Variety Selector */}
            <VarietySelector
              planType={planType}
              varietySelections={varietySelections}
              onVarietyChange={handleVarietyChange}
              maxPacks={planType === 'starter' ? 99 : planConfig.packsRequired}
              errors={errors}
            />

            {/* Error Messages */}
            {errors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Please fix the following errors:
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc list-inside space-y-1">
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-4 lg:top-8">
              <OrderSummary
                planType={planType}
                planConfig={planConfig}
                varietySelections={varietySelections}
                onAddToCart={handleAddToCart}
                isLoading={isLoading}
                isValid={planType === 'starter' ? totalSelectedPacks > 0 : totalSelectedPacks === planConfig.packsRequired}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}