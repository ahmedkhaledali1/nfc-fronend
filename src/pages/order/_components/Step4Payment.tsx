import CustomRadioGroup from '@/components/form/CustomRadioGroup';
import { CreditCard, Truck } from 'lucide-react';
import React from 'react';

function Step4Payment() {
  return (
    <div className="space-y-6">
      <CustomRadioGroup
        name="paymentMethod"
        label="Payment Method"
        required={true}
        options={[
          {
            value: 'cash',
            label: 'Cash on Delivery',
            description: 'Payment will be collected upon delivery',
            icon: <Truck className="w-5 h-5 text-muted-foreground" />,
          },
          {
            value: 'online',
            label: 'Online Payment',
            description: 'Secure online payments coming soon!',
            icon: <CreditCard className="w-5 h-5 text-muted-foreground" />,
            disabled: true,
          },
        ]}
      />

      <div className="bg-muted p-4 rounded-lg">
        <p className="text-sm text-muted-foreground">
          📦 Standard delivery within 2–4 days. You will receive a confirmation
          by SMS or email.
        </p>
      </div>
    </div>
  );
}

export default Step4Payment;
