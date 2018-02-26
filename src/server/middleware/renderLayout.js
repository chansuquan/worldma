import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Helmet from 'react-helmet';
import App from 'app/components/App';

const html = (markup, helmet) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, minimum-scale=1.0">
        <link rel="shortcut icon" href="/favicon.ico">
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <link rel="stylesheet" href="/assets/app.css">
      </head>
      <body>
        <div id="app">${markup}</div>
        <script src="/assets/app.js"></script>
      </body>
    </html>
  `;
};

const render = (location) => {
  const context = {};
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={location} context={context}>
      <App />
    </StaticRouter>
  );
  
  const helmet = Helmet.rewind();

  const { url, status = 200 } = context;

  if (url) {
    return { status: status || 301, redirect: url };
  }

  // TODO: handle assets
  const body = html(markup, helmet);

  return { status, body };
};

export default () => {
  return (req, res, next) => {
    try {
      const { status, redirect, body } = render(req.url);

      res.status(status);

      if (redirect) {
        res.redirect(redirect);
      } else {
        res.send(body);
      }
    } catch (err) {
      next(err);
    }
  };
};
