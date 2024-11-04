import { OAuthProvider } from './context/OAuthContext'; // Ensure correct import path

export const metadata = {
  title: 'Your App Title',
  description: 'Your app description',
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  // Avoid rendering anything that depends on client-specific code
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <OAuthProvider>
          {children}
        </OAuthProvider>
      </body>
    </html>
  );
};


export default Layout;
