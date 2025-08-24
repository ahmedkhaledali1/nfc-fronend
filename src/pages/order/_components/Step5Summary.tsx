import { getCountries } from '@/lib/service/endpoints';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function Step5Summary() {
  const { watch } = useFormContext();

  const { data: countriesData, isLoading: countriesLoading } = useQuery({
    queryKey: ['getCountries'],
    queryFn: () => getCountries(1, 1000),
  });

  const countries = countriesData?.data?.data?.data || [];

  const calculateTotal = () => {
    let total = 35;
    if (watch('cardDesign.includePrintedLogo')) total += 5;
    return total;
  };
  console.log('watch', watch());
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-semibold mb-3">Personal Information</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name:</span>{' '}
              {watch('personalInfo.firstName')} {watch('personalInfo.lastName')}
            </div>
            <div>
              <span className="text-muted-foreground">Position:</span>{' '}
              {watch('personalInfo.position')}
            </div>
            <div>
              <span className="text-muted-foreground">Organization:</span>{' '}
              {watch('personalInfo.organization')}
            </div>
            <div>
              <span className="text-muted-foreground">Phone:</span>{' '}
              {watch('personalInfo.phoneNumbers').join(', ')}
            </div>
            <div>
              <span className="text-muted-foreground">Email:</span>{' '}
              {watch('personalInfo.email')}
            </div>
            {watch('personalInfo.linkedinUrl') && (
              <div>
                <span className="text-muted-foreground">LinkedIn:</span>{' '}
                {watch('personalInfo.linkedinUrl')}
              </div>
            )}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Card Design</h4>
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-muted-foreground">Name on Card:</span>{' '}
              {watch('cardDesign.nameOnCard')}
            </div>
            <div>
              <span className="text-muted-foreground">Color:</span>{' '}
              {watch('cardDesign.color') === 'black' ? 'Black' : 'White'}
            </div>
            <div>
              <span className="text-muted-foreground">Company Logo:</span>{' '}
              {watch('cardDesign.includePrintedLogo') ? 'Yes (+5 JOD)' : 'No'}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Delivery Information</h4>
        <div className="space-y-2 text-sm">
          {/* <div>
            <span className="text-muted-foreground">Country:</span>{' '}
            {
              countries.find((c) => c.code === watch('deliveryInfo.country'))
                ?.name
            }
          </div> */}
          <div>
            <span className="text-muted-foreground">City Fee:</span>{' '}
            {watch('deliveryInfo.cityFee')}
          </div>
          <div>
            <span className="text-muted-foreground">Address:</span>{' '}
            {watch('deliveryInfo.addressLine1')}{' '}
            {watch('deliveryInfo.addressLine2')}
          </div>
          <div>
            <span className="text-muted-foreground">Contact:</span>{' '}
            {watch('deliveryInfo.useSameContact')
              ? watch('personalInfo.phoneNumbers')[0]
              : watch('deliveryInfo.deliveryPhone')}
          </div>
          <div>
            <span className="text-muted-foreground">Email:</span>{' '}
            {watch('deliveryInfo.useSameContact')
              ? watch('personalInfo.email')
              : watch('deliveryInfo.deliveryEmail')}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Payment Method</h4>
        <p className="text-sm text-muted-foreground">Cash on Delivery</p>
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="gradient-text">{calculateTotal()} JOD</span>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>City Fee:</span>
          <span className="gradient-text">
            {watch('deliveryInfo.cityFee')} JOD
          </span>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Final Total:</span>
          <span className="gradient-text">
            {calculateTotal() + watch('deliveryInfo.cityFee')} JOD
          </span>
        </div>
      </div>
    </div>
  );
}

export default Step5Summary;
