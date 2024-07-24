import UpdateForm from "@/components/editForm";
import { getContactById } from "@/lib/data";
import { notFound } from "next/navigation";
const updateContactPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const contacts = await getContactById(id);

  if (!contacts) {
    notFound();
  }

  return (
    <div className="max-w-md mx-auto mt-5">
      <h1 className="text-2xl text-center mb-2">Update Contact</h1>
      <UpdateForm contacts={contacts} />
    </div>
  );
};

export default updateContactPage;
