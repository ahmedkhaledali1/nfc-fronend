import { getCountries } from '@/lib/service/endpoints';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function Step5Summary({ product }: { product: any }) {
  const { watch, formState } = useFormContext();

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
              {watch('cardDesign.color')}
            </div>
            <div>
              <span className="text-muted-foreground">Company Logo:</span>{' '}
              {watch('cardDesign.includePrintedLogo') ? 'Yes ' : 'No'}
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
            <span className="text-muted-foreground">Delivery Fee:</span>{' '}
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
          <div>
            <span className="text-muted-foreground">Postcode:</span>{' '}
            {watch('deliveryInfo.postcode')}
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Payment Method</h4>
        <p className="text-sm text-muted-foreground">
          {watch('paymentMethod') === 'cash'
            ? 'Cash on Delivery'
            : 'Online Payment'}
        </p>
        {watch('paymentMethod') === 'online' && (
          <div className="text-sm text-muted-foreground">
            <span className="text-muted-foreground">
              Deposite Transaction Image:
            </span>{' '}
            {watch('despositeTransactionImg') && (
              <img
                src={`${import.meta.env.VITE_BACKEND_DOMAIN}${watch(
                  'despositeTransactionImg'
                )}`}
                crossOrigin="anonymous"
                alt="Deposite Transaction Image"
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total:</span>
          <span className="gradient-text">{product?.price} JOD</span>
        </div>
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Delivery Fee:</span>
          <span className="gradient-text">
            {watch('deliveryInfo.cityFee')} JOD
          </span>
        </div>

        {watch('addons').length > 0 && (
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Add-ons:</span>
            <span className="gradient-text">
              {watch('addons').reduce(
                (total: number, addon: any) => total + addon.price,
                0
              )}{' '}
              JOD
            </span>
          </div>
        )}
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Final Total:</span>
          <span className="gradient-text">
            {product?.price +
              watch('deliveryInfo.cityFee') +
              watch('addons').reduce(
                (total: number, addon: any) => total + addon.price,
                0
              )}{' '}
            JOD
          </span>
        </div>
      </div>
    </div>
  );
}

export default Step5Summary;
