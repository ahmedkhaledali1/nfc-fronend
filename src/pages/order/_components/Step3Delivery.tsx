import CustomInput from '@/components/form/CustomInput';
import CustomSelect from '@/components/form/CustomSelect';
import CustomSwitch from '@/components/form/CustomSwitch';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const countries = [
  {
    code: 'JO',
    name: 'Jordan',
    cities: ['Amman', 'Irbid', 'Zarqa', 'Aqaba', 'Salt'],
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    cities: ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol'],
  },
];
function Step3Delivery() {
  const { watch } = useFormContext();
  const selectedCountry = countries.find(
    (c) => c.code === watch('deliveryInfo.country')
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          name="deliveryInfo.country"
          label="Country"
          required={true}
          options={countries.map((country) => ({
            value: country.code,
            label: country.name,
          }))}
          placeholder="Select country"
        />

        <CustomSelect
          name="deliveryInfo.city"
          label="City"
          required={true}
          options={
            selectedCountry?.cities.map((city) => ({
              value: city,
              label: city,
            })) || []
          }
          placeholder="Select city"
          disabled={!watch('deliveryInfo.country')}
        />
      </div>

      <CustomInput
        name="deliveryInfo.addressLine1"
        label="Address Line 1"
        placeholder="Street address, building number"
        required={true}
        type="text"
      />

      <CustomInput
        name="deliveryInfo.addressLine2"
        label="Address Line 2"
        placeholder="Apartment, suite, unit, etc."
        required={false}
        type="text"
      />

      <CustomSwitch
        name="deliveryInfo.useSameContact"
        label="Use same phone/email from personal info"
        required={false}
      />

      {!watch('deliveryInfo.useSameContact') && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            name="deliveryInfo.deliveryPhone"
            label="Delivery Phone Number"
            placeholder="+962 XX XXX XXXX"
            required={true}
            type="tel"
          />
          <CustomInput
            name="deliveryInfo.deliveryEmail"
            label="Delivery Email"
            placeholder="delivery@email.com"
            required={true}
            type="email"
          />
        </div>
      )}
    </div>
  );
}

export default Step3Delivery;
