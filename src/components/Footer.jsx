export default function Footer() {
  return (
    <footer className="bg-blue-600 dark:bg-blue-700 text-gray-50 text-sm p-4 text-center">
      © {new Date().getFullYear()} AI Resume & Portfolio Builder. All rights reserved.
    </footer>
  );
}