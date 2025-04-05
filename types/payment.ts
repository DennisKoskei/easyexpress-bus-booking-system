// @/types/payment.ts

export type PaymentMethod =
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PAYPAL"
  | "BANK_TRANSFER"
  | "CASH"; // You can expand this based on actual methods

export type PaymentStatus = "PENDING" | "SUCCESSFUL" | "FAILED" | "REFUNDED"; // You can expand this based on actual statuses

export interface Payment {
  id: string;
  bookingId: string;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  transactionId: string;
  status: PaymentStatus;
  paymentDate: string; // You can use Date if you're dealing with Date objects
}

export type EditablePaymentKeys =
  | "amountPaid"
  | "paymentMethod"
  | "transactionId"
  | "status"
  | "paymentDate"; // These are the editable keys
