import { Prompt } from 'next/font/google'

import { Aside } from './components/Aside';
import './globals.css'
import { SearchForm } from './components/SearchForm';

export const metadata = {
  title: "Code Connect",
  description: "A social network for devs!",
};

const prompt = Prompt({
  weight: ['400', '600'],
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={prompt.className}>
      <body>
        <div className='app-container'>
          <Aside />
          <div>
            <SearchForm />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
