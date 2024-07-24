import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-700 py-6">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="text-sm text-center">
          &copy; {new Date().getFullYear()} mrnurihsann. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
