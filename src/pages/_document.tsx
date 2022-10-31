/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
           <meta
            name="google-site-verification"
            content="JaOvv4PGZQU2cQeYSzzlbKZNqGIDS7u0rmRzAMMt1_4"
          />
          <title>iHold Bank</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
