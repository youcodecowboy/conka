export interface PaymentMethod {
  id: number;
  type: 'card' | 'paypal' | 'other';
  brand?: string;
  lastDigits?: string;
  expiryMonth?: number;
  expiryYear?: number;
  status: 'safe' | 'expired' | 'expiring_soon';
  isDefault?: boolean;
}
