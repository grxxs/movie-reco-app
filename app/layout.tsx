import Footer from "./components/footer";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="flex min-h-dvh flex-col">
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
