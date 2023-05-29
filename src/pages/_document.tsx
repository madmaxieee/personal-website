import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

import { env } from '@/env/client.mjs';

export const Document = () => {
  return (
    <Html lang="en-US">
      <Head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${env.NEXT_PUBLIC_GTM_ID}');`,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{
              display: 'none',
              visibility: 'hidden',
            }}
          ></iframe>
        </noscript>
      </body>
    </Html>
  );
};

export default Document;
