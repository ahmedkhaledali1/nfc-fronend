import CustomFileUpload from '@/components/form/CustomFileUpload';
import CustomInput from '@/components/form/CustomInput';
import MultiPhoneInput from '@/components/MultiPhoneInput';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function Step1PersosnalDet() {
  const {
    watch,
    setValue,
    formState: { errors },
    clearErrors,
  } = useFormContext();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomInput
          name="personalInfo.firstName"
          label="First Name"
          placeholder="Name"
          required={true}
          type="text"
        />
        <CustomInput
          name="personalInfo.lastName"
          label="Last Name"
          placeholder="Last Name"
          required={true}
          type="text"
        />
      </div>

      <CustomInput
        name="personalInfo.position"
        label="Position & Organization"
        placeholder="Position & Organization"
        required={true}
        type="text"
      />

      <CustomInput
        name="personalInfo.organization"
        label="Organization"
        placeholder="Organization"
        required={true}
        type="text"
      />

      <MultiPhoneInput
        label="Phone Numbers"
        value={watch('personalInfo.phoneNumbers')}
        onChange={(phones) => {
          setValue('personalInfo.phoneNumbers', phones);
        }}
        required
      />

      <CustomInput
        name="personalInfo.email"
        label="Email Address"
        placeholder="your@email.com"
        required={true}
        type="email"
      />
      <CustomInput
        name="personalInfo.businessEmail"
        label="Business Email"
        placeholder="your@business.com"
        required={false}
        type="email"
      />

      <CustomInput
        name="personalInfo.linkedinUrl"
        label="LinkedIn Profile URL"
        placeholder="https://linkedin.com/in/yourprofile"
        required={false}
        type="url"
      />
      <CustomInput
        name="personalInfo.instagramUrl"
        label="Instagram Profile URL"
        placeholder="https://instagram.com/yourprofile"
        required={false}
        type="url"
      />

      {/* <CustomFileUpload
        name="personalInfo.personalPicture"
        label="Upload Personal Picture"
        required={false}
        preview={true}
      /> */}
    </div>
  );
}

export default Step1PersosnalDet;
