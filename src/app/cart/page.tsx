import { Metadata } from 'next';
import CartPageContent from './components/CartPageContent';

export const metadata: Metadata = {
  title: 'Shopping Cart - FuelFoods CPG',
  description:
    'Review your microgreens and subscription selections before checkout.',
};

export default function CartPage() {
  return <CartPageContent />;
}
