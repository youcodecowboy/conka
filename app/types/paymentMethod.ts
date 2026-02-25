export interface PaymentMethod {
  id: number;
  type: string;
  brand: string | null;
  lastDigits: string | null;
  expiryMonth: number | null;
  expiryYear: number | null;
  status: 'safe' | 'expired' | 'expiring_soon' | string;
}
