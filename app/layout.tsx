import { UserProvider } from "@auth0/nextjs-auth0/client";
import ClientProvider from "./ClientProvider";
import "../styles/globals.css";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <UserProvider>
        <ClientProvider>
          <body>{children}</body>
        </ClientProvider>
      </UserProvider>
    </html>
  );
}
