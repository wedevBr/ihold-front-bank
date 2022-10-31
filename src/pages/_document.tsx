/* eslint-disable @next/next/no-title-in-document-head */
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="google-site-verification"
            content="JaOvv4PGZQU2cQeYSzzlbKZNqGIDS7u0rmRzAMMt1_4"
          />
          <link rel="shortcut icon" href="/favicon.ico" />
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
