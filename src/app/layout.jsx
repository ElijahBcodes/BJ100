import './globals.css';

export const metadata = {
  metadataBase: new URL('https://elijahbcodes.github.io/BJ100/'),
  title: 'The Brice Jernigan 100 | Ultra Marathon vs. Mountain Bike Charity Race | San Diego, CA',
  description: 'A 100-mile endurance showdown pitting Ultra Runners against Mountain Bikers in San Diego\'s Los Peñasquitos Canyon. Honoring the life of Brice Jernigan and raising funds for suicide prevention.',
  keywords: 'Brice Jernigan 100, San Diego Ultramarathon, PQ Canyon, Los Peñasquitos Canyon, Mountain Bike 100 miler, Suicide Prevention, Charity Race',
  openGraph: {
    title: 'The Brice Jernigan 100 | Runners vs. Riders for Suicide Prevention',
    description: '100 Miles. Two Disciplines. One Cause. In honor of Brice Jernigan in San Diego\'s PQ Canyon.',
    url: 'https://elijahbcodes.github.io/BJ100/',
    siteName: 'The Brice Jernigan 100',
    images: [
      {
        url: '/assets/hero.jpg',
        width: 1200,
        height: 675,
        alt: 'The Brice Jernigan 100 in Los Peñasquitos Canyon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Rock+Salt&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
