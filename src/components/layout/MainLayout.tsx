import { ReactNode } from "react";
import Navigation from "../ui/Navigation";
import Footer from "../ui/Footer";

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export default function MainLayout({
  children,
  className = "",
}: MainLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-black text-gray-200">
      <Navigation />

      <main className={`flex-1 ${className}`}>
        <div className="mx-auto max-w-4xl px-6 py-8">{children}</div>
      </main>

      <Footer />
    </div>
  );
}
