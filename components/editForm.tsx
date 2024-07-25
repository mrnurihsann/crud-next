"use client";

import { updateContact } from "@/lib/action";
import useFormState from "@/lib/useFormState";
import { SubmitButton } from "@/components/buttons";
import type { Contact } from "@prisma/client";
import { useState } from "react";

// Definisikan tipe data untuk form state
interface FormState {
  name: string;
  phone: string;
  message: string;
}

// Definisikan tipe data untuk form errors
interface FormErrors {
  [key: string]: string;
}

const UpdateForm = ({ contacts }: { contacts: Contact }) => {
  // Gunakan tipe FormState dengan nilai awal dari props
  const [state, handleChange, handleSubmit] = useFormState<FormState>({
    name: contacts.name,
    phone: contacts.phone,
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const onSubmit = handleSubmit(async (formData: FormState) => {
    setIsSubmitting(true);
    try {
      // Mengonversi formData ke FormData
      const formDataObj = new FormData();
      formDataObj.append("name", formData.name);
      formDataObj.append("phone", formData.phone);

      // Reset form errors sebelum submit
      setFormErrors({});

      // Mengirim data ke updateContact
      const response = await updateContact(contacts.id, formDataObj);

      if (response.Error) {
        // Menangani error dengan format yang diharapkan
        const errors: FormErrors = {};
        for (const [key, value] of Object.entries(response.Error)) {
          if (Array.isArray(value)) {
            errors[key] = value.join(", ");
          } else {
            errors[key] = value as string;
          }
        }
        setFormErrors(errors);
      }
    } catch (error) {
      console.error("Failed to update contact:", error);
      // Menangani error yang tidak diharapkan di luar response.Error
      setFormErrors({ message: "An unexpected error occurred." });
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
          <div id="name-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">{formErrors.name || ""}</p>
          </div>
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
          <div id="phone-error" aria-live="polite" aria-atomic="true">
            <p className="mt-2 text-sm text-red-500">
              {formErrors.phone || ""}
            </p>
          </div>
        </div>
        <div id="message-error" aria-live="polite" aria-atomic="true">
          <p className="mt-2 text-sm text-red-500">
            {formErrors.message || ""}
          </p>
        </div>
        <SubmitButton label="Update" isSubmitting={isSubmitting} />
      </form>
    </div>
  );
};

export default UpdateForm;
