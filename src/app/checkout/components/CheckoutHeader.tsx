'use client';

import Image from 'next/image';

export default function CheckoutHeader() {
  return (
    <div className="mb-8">
      <div className="relative bg-gradient-to-r from-green-600 to-green-700 rounded-lg overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Check_Out_Page_Banner.png"
            alt="Checkout Banner"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative px-6 py-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Secure Checkout
          </h1>
          <p className="text-green-100">
            Complete your order for fresh, organic microgreens
          </p>
        </div>
      </div>
    </div>
  );
}
