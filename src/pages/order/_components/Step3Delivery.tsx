import CustomInput from '@/components/form/CustomInput';
import CustomSelect from '@/components/form/CustomSelect';
import CustomSwitch from '@/components/form/CustomSwitch';
import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getCountries, getCitiesByCountry } from '@/lib/service/endpoints';

function Step3Delivery() {
  const { watch, setValue } = useFormContext();
  const selectedCountry = watch('deliveryInfo.country');

  // Fetch countries
  const { data: countriesData, isLoading: countriesLoading } = useQuery({
    queryKey: ['getCountries'],
    queryFn: () => getCountries(1, 1000),
  });

  // Fetch cities for selected country
  const { data: citiesData, isLoading: citiesLoading } = useQuery({
    queryKey: ['getCitiesByCountry', selectedCountry],
    queryFn: () => getCitiesByCountry(selectedCountry),
    enabled: !!selectedCountry, // Only fetch when country is selected
  });

  const countries = countriesData?.data?.data?.data || [];
  const cities = citiesData?.data?.data?.cities || [];

  // Reset city when country changes
  React.useEffect(() => {
    if (selectedCountry) {
      setValue('deliveryInfo.city', '');
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (watch('deliveryInfo.city')) {
      setValue(
        'deliveryInfo.cityFee',
        cities.find((city: any) => city._id === watch('deliveryInfo.city'))
          ?.deliveryFee
      );
    }
  }, [watch('deliveryInfo.city')]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomSelect
          name="deliveryInfo.country"
          label="Country"
          required={true}
          options={countries.map((country: any) => ({
            value: country._id || country.id,
            label: country.name,
          }))}
          placeholder={
            countriesLoading ? 'Loading countries...' : 'Select country'
          }
          disabled={countriesLoading}
        />

        <CustomSelect
          name="deliveryInfo.city"
          label="City"
          required={true}
          options={cities.map((city: any) => ({
            value: city._id || city.id,
            label: city.name,
          }))}
          placeholder={
            !selectedCountry
              ? 'Select country first'
              : citiesLoading
              ? 'Loading cities...'
              : 'Select city'
          }
          disabled={!selectedCountry || citiesLoading}
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
      <CustomInput
        name="deliveryInfo.postcode"
        label="Postcode"
        placeholder="12345"
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
