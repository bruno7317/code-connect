import './globals.css'

export const metadata = {
  title: "Code Connect",
  description: "A social network for devs!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
