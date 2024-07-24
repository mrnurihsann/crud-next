"use client";

import Link from "next/link";
import { IoAddSharp, IoPencil, IoTrashOutline } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import clsx from "clsx";
import { deleteContact } from "@/lib/action";
export const Button = () => {
  return (
    <Link
      href="/contact/create"
      className="inline-flex items-center px-5 py-[9px] text-base font-medium text-sm text-white rounded-sm bg-blue-600 hover:bg-blue-700 space-x-1"
    >
      <IoAddSharp size={20} />
      Create
    </Link>
  );
};

export const EditButton = ({ id }: { id: string }) => {
  return (
    <Link
      href={`/contact/edit/${id}`}
      className="rounded-sm border p-1 hover:bg-gray-200"
    >
      <IoPencil size={20} />
    </Link>
  );
};

export const DeleteButton = ({ id }: { id: string }) => {
  const deleteContactWithId = deleteContact.bind(null, id);
  return (
    <form action={deleteContactWithId}>
      <button className="rounded-sm border p-1 hover:bg-gray-200">
        <IoTrashOutline size={20} />
      </button>
    </form>
  );
};

export const SubmitButton = ({ label }: { label: string }) => {
  const { pending } = useFormStatus();

  const className = clsx(
    "text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-5 py-3 text-center",
    {
      "opacity-50 cursor-progress": pending,
    }
  );

  return (
    <button className={className} type="submit" disabled={pending}>
      {label === "save" ? (
        <span>{pending ? "Saving..." : "Save"}</span>
      ) : (
        <span>{pending ? "Updating..." : "Update"}</span>
      )}
    </button>
  );
};
