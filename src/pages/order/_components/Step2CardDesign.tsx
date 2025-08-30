import CustomCheckbox from '@/components/form/CustomCheckbox';
import CustomFileUpload from '@/components/form/CustomFileUpload';
import CustomInput from '@/components/form/CustomInput';
import CustomRadioGroup from '@/components/form/CustomRadioGroup';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Palette } from 'lucide-react';

function Step2CardDesign({ product }: { product: any }) {
  const { watch } = useFormContext();

  return (
    <div className="space-y-6">
      <div>
        <CustomInput
          name="cardDesign.nameOnCard"
          label="How should your Name appear on the card?"
          placeholder="ex: Your Name"
          required={true}
          type="text"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Examples: "Your Name", "Your Name & Position", "Your Name &
          Organization"
        </p>
      </div>

      <div>
        <CustomRadioGroup
          name="cardDesign.color"
          label="Choose Your Card Color"
          required={true}
          options={product?.cardDesigns?.map((design: any) => ({
            value: design.color,

            icon: (
              <div className="flex items-end flex-col justify-end gap-2">
                <div
                  className="w-6 h-6 rounded-full border-2 border-border"
                  style={{ backgroundColor: design.color }}
                />
                <div>{design.color}</div>
              </div>
            ),
          }))}
        />
      </div>

      <div className="space-y-4">
        <CustomCheckbox
          name="cardDesign.includePrintedLogo"
          label="Add Company Logo (+5 JOD for printed logo)"
          required={false}
        />

        {watch('cardDesign.includePrintedLogo') && (
          <CustomFileUpload
            name="cardDesign.companyLogo"
            label="Company Logo Upload"
            required={false}
            preview={true}
          />
        )}
      </div>
    </div>
  );
}

export default Step2CardDesign;
