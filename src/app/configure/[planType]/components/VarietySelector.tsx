'use client';

import { useState } from 'react';
import { Plus, Minus, Info } from 'lucide-react';
import { Button } from '@/components/form';
import { 
  PlanType, 
  MicrogreensVarietySelection, 
  MICROGREENS_VARIETIES 
} from '@/lib/types';

interface VarietySelectorProps {
  planType: PlanType;
  varietySelections: MicrogreensVarietySelection[];
  onVarietyChange: (varietyId: 'mega-mix' | 'brassica-blend' | 'sunnies-snacks', quantity: number) => void;
  maxPacks: number;
  errors: string[];
}

export function VarietySelector({ 
  planType, 
  varietySelections, 
  onVarietyChange, 
  maxPacks,
  errors 
}: VarietySelectorProps) {
  const [expandedVariety, setExpandedVariety] = useState<string | null>(null);
  const [imageIndexByVariety, setImageIndexByVariety] = useState<Record<string, number>>({
    'mega-mix': 0,
    'brassica-blend': 0,
    'sunnies-snacks': 0
  });
  const [lightbox, setLightbox] = useState<{ open: boolean; src: string }|null>(null);

  const totalSelected = varietySelections.reduce((sum, selection) => sum + selection.quantity, 0);
  const remainingPacks = Math.max(0, maxPacks - totalSelected);

  const VARIETY_IMAGES: Record<string, string[]> = {
    'mega-mix': [
      '/images/megamixsidebyside.jpg',
      '/images/imgpsh_fullsize_anim-1-4.png'
    ],
    'brassica-blend': [
      '/images/brassicablendsidebyside.jpg',
      '/images/brassicalearnmorecircle.jpg'
    ],
    'sunnies-snacks': [
      '/images/sunniessidebyside.jpg',
      '/images/imgpsh_fullsize_anim-2.jpg'
    ]
  };

  const setImageIdx = (varietyId: string, idx: number) => {
    setImageIndexByVariety(prev => ({ ...prev, [varietyId]: idx }));
  };

  const getVarietyTheme = (varietyId: string) => {
    const variety = MICROGREENS_VARIETIES[varietyId as keyof typeof MICROGREENS_VARIETIES];
    
    switch (variety.theme) {
      case 'orange':
        return {
          gradient: 'from-orange-50 to-orange-100',
          border: 'border-orange-200',
          button: 'bg-orange-500 hover:bg-orange-600 text-white',
          buttonSecondary: 'border-orange-300 text-orange-700 hover:bg-orange-50',
          accent: 'text-orange-600',
          badge: 'bg-orange-100 text-orange-800'
        };
      case 'purple':
        return {
          gradient: 'from-purple-50 to-purple-100',
          border: 'border-purple-200',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          buttonSecondary: 'border-purple-300 text-purple-700 hover:bg-purple-50',
          accent: 'text-purple-600',
          badge: 'bg-purple-100 text-purple-800'
        };
      case 'yellow':
        return {
          gradient: 'from-yellow-50 to-yellow-100',
          border: 'border-yellow-200',
          button: 'bg-yellow-500 hover:bg-yellow-600 text-white',
          buttonSecondary: 'border-yellow-300 text-yellow-700 hover:bg-yellow-50',
          accent: 'text-yellow-600',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          gradient: 'from-gray-50 to-gray-100',
          border: 'border-gray-200',
          button: 'bg-gray-600 hover:bg-gray-700 text-white',
          buttonSecondary: 'border-gray-300 text-gray-700 hover:bg-gray-50',
          accent: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  const handleQuantityChange = (
    varietyId: 'mega-mix' | 'brassica-blend' | 'sunnies-snacks', 
    change: number
  ) => {
    const currentSelection = varietySelections.find(s => s.varietyId === varietyId);
    const currentQuantity = currentSelection?.quantity || 0;
    const newQuantity = currentQuantity + change;
    
    // Prevent negative quantities and exceeding max packs
    if (newQuantity >= 0 && (change < 0 || totalSelected < maxPacks)) {
      onVarietyChange(varietyId, newQuantity);
    }
  };

  const toggleVarietyDetails = (varietyId: string) => {
    setExpandedVariety(expandedVariety === varietyId ? null : varietyId);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
      {lightbox?.open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox.src} alt="Preview" className="max-w-[90vw] max-h-[90vh] object-contain" />
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Choose Your Varieties</h3>
      <p className="text-gray-600 mb-6">{planType === 'starter' ? 'Select any number of packs.' : `Select exactly ${maxPacks} packs.`}</p>

      <div className="space-y-6">
        {Object.entries(MICROGREENS_VARIETIES).map(([varietyId, variety]) => {
          const selection = varietySelections.find(s => s.varietyId === varietyId);
          const quantity = selection?.quantity || 0;
          const theme = getVarietyTheme(varietyId);
          const isExpanded = expandedVariety === varietyId;

          return (
            <div key={varietyId} className={`border rounded-xl p-5 ${quantity > 0 ? 'ring-1 ring-fuelfoods-green-500' : 'border-gray-200'}`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  {/* Preview Image Tabs */}
                  <div className="mb-4 lg:mb-0 lg:mr-5">
                    <div className="w-28 md:w-32 mx-auto">
                      <div className="w-full h-28 md:h-32 rounded-xl border border-gray-200 bg-white overflow-hidden flex items-center justify-center">
                        <img
                          src={(VARIETY_IMAGES[varietyId] || [variety.image])[imageIndexByVariety[varietyId] || 0]}
                          alt={`${variety.name} preview`}
                          className="w-full h-full object-contain cursor-zoom-in"
                          onClick={() => setLightbox({ open: true, src: (VARIETY_IMAGES[varietyId] || [variety.image])[imageIndexByVariety[varietyId] || 0] })}
                        />
                      </div>
                      <div className="mt-2 flex items-center justify-center gap-2">
                        {(VARIETY_IMAGES[varietyId] || []).map((src, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setImageIdx(varietyId, idx)}
                            className={`w-8 h-8 rounded-md border ${
                              (imageIndexByVariety[varietyId] || 0) === idx
                                ? 'border-gray-900 ring-2 ring-gray-900/10'
                                : 'border-gray-300 hover:border-gray-400'
                            } overflow-hidden bg-white`}
                            aria-label={`Show ${variety.name} image ${idx + 1}`}
                          >
                            <img src={src} alt="" className="w-full h-full object-cover" />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Variety Info */}
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-xl font-bold text-gray-900">{variety.name}</h4>
                    </div>
                    
                    <p className="text-gray-600 mb-3 max-w-2xl">
                      {variety.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {variety.nutritionalHighlights.map((highlight, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>

                    <button
                      onClick={() => toggleVarietyDetails(varietyId)}
                      className={`inline-flex items-center text-sm font-medium text-fuelfoods-green-700 hover:underline`}
                    >
                      <Info className="w-4 h-4 mr-1" />
                      {isExpanded ? 'Hide Details' : 'View Nutritional Details'}
                    </button>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center lg:items-end space-y-4">
                    <div className="text-center lg:text-right">
                      <div className="text-xs text-gray-500">Price per pack</div>
                      <div className="text-lg font-bold text-gray-900">${variety.price}</div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleQuantityChange(varietyId as any, -1)}
                        disabled={quantity === 0}
                        className={`w-9 h-9 rounded-full ${theme.buttonSecondary} border flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <div className="w-16 text-center">
                        <div className="text-xl font-bold text-gray-900">{quantity}</div>
                        <div className="text-xs text-gray-500">pack{quantity !== 1 ? 's' : ''}</div>
                      </div>

                      <button
                        onClick={() => handleQuantityChange(varietyId as any, 1)}
                        disabled={remainingPacks <= 0 && quantity === 0}
                        className={`w-9 h-9 rounded-full ${theme.button} flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {quantity > 0 && (
                      <div className="text-center lg:text-right">
                        <div className="text-xs text-gray-500">Subtotal</div>
                        <div className="text-base font-bold text-gray-900">
                          ${(quantity * variety.price).toFixed(2)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Nutritional Benefits:</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {variety.nutritionalHighlights.map((benefit, index) => (
                            <li key={index} className="flex items-start">
                              <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-3">Perfect For:</h5>
                        <ul className="space-y-2 text-sm text-gray-700">
                          {varietyId === 'mega-mix' && (
                            <>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Smoothies and juices
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Salad toppers
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-orange-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Daily nutrition boost
                              </li>
                            </>
                          )}
                          {varietyId === 'brassica-blend' && (
                            <>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Detox support
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Cancer prevention
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-purple-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Anti-inflammatory meals
                              </li>
                            </>
                          )}
                          {varietyId === 'sunnies-snacks' && (
                            <>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Healthy snacking
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Sandwich and wrap filling
                              </li>
                              <li className="flex items-start">
                                <svg className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Smoothie bowl toppers
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          );
        })}
      </div>
    </div>
  );
}