"use client";

import { saveContact } from "@/lib/action";
import useFormState from "@/lib/useFormState";
import { SubmitButton } from "@/components/buttons";
import { useState } from "react";

// Definisikan tipe data untuk form state
interface FormState {
  name: string;
  phone: string;
  message: string;
}

const CreateForm = () => {
  const [state, handleChange, handleSubmit] = useFormState<FormState>({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (formData: FormState) => {
    const formDataObj = new FormData();

    // Tambahkan key-value ke FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormState]) {
        formDataObj.append(key, formData[key as keyof FormState]);
      }
    });

    setIsSubmitting(true);
    try {
      await saveContact(formDataObj);
    } catch (error) {
      console.error("Failed to save contact:", error);
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-900"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={state.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Full Name..."
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-900"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={state.phone}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Phone Number..."
          />
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        </div>
        <SubmitButton label="Save" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default CreateForm;
