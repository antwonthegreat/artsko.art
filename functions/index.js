/* eslint-disable max-len */
const functions = require('firebase-functions');
const express = require('express');
// const fetch = require('node-fetch');

const app = express();
// app.get('/timestamp', (request, response)=>{
//   response.send(`${Date.now()}`);
// });


// app.get('/commissions', (request, response, next)=>{
//   let htmlData = indexHtml;
//   console.log(`htmlData:${htmlData.substring(0, 20)}`);
//   // get post info
//   const commissionId = request.query.id;
//   console.log(`commissionId:${commissionId}`);

//   try {
//     // eslint-disable-next-line no-undef
//     fetch(
//         `https://workoutapi2.azurewebsites.net/Commissions?$select=Name,Description&$filter=Id eq ${commissionId}&$expand=CommissionImages($orderBy=IsMain desc,Id asc;$filter=not NSFW;$select=Height,Width,Url;$top=1),Options($select=CurrentPrice;$filter=not IsArchived),Artist($select=Username,ProfileUrl),Category($select=Name)`,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             'X-AppName': 'Artsko',
//           },
//         }
//     ).then((r) => r.json())
//         .then(
//             (data)=>{
//               const commission = data.value[0];
//               console.log(`commission:${commission}`);
//               if (!commission) return response.status(404).send('Commission not found');

//               // inject meta tags
//               htmlData = htmlData.replace(
//                   '<title>Artsko</title>',
//                   `<title>${commission.Name}</title>`
//               )
//                   .replace('__META_OG_TITLE__', commission.Name)
//                   .replace('__META_OG_DESCRIPTION__', commission.Description)
//                   .replace('__META_DESCRIPTION__', commission.Description)
//                   .replace('__META_OG_IMAGE__', ((((commission || {}).CommissionImages)||[])[0]||{}).Url || '');
//               return response.send(htmlData);
//             }

//         );
//   } catch (e) {
//     console.log(`catch:${e}`);
//     htmlData = htmlData
//         .replace('__META_OG_TITLE__', e)
//         .replace('__META_OG_DESCRIPTION__', e)
//         .replace('__META_DESCRIPTION__', e)
//         .replace('__META_OG_IMAGE__', e);
//     return response.send(htmlData);
//   }
// });

// const indexHtml = `<head>
// <meta charset="utf-8" />
// <meta name="viewport" content="width=device-width, initial-scale=1" />

// <meta name="description" content="__META_DESCRIPTION__"/>
// <meta name="og:title" content="__META_OG_TITLE__"/>
// <meta name="og:description" content="__META_OG_DESCRIPTION__"/>
// <meta name="og:image" content="__META_OG_IMAGE__"/>

// <link rel="shortcut icon" href="img/favicon.ico" type="image/x-icon" />
// <link rel="apple-touch-icon" href="img/apple-touch-icon.png" />
// <link
//   rel="apple-touch-icon"
//   sizes="72x72"
//   href="img/apple-touch-icon-72x72.png"
// />
// <link
//   rel="apple-touch-icon"
//   sizes="114x114"
//   href="img/apple-touch-icon-114x114.png"
// />

// <link rel="stylesheet" type="text/css" href="css/bootstrap.css" />
// <link
//   rel="stylesheet"
//   type="text/css"
//   href="fonts/font-awesome/css/font-awesome.css"
// />
// <link rel="stylesheet" type="text/css" href="css/style.css" />
// <link
//   rel="stylesheet"
//   type="text/css"
//   href="css/nivo-lightbox/nivo-lightbox.css"
// />
// <link rel="stylesheet" type="text/css" href="css/nivo-lightbox/default.css" />
// <link
//   href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700"
//   rel="stylesheet"
// />
// <link
//   href="https://fonts.googleapis.com/css?family=Lato:400,700"
//   rel="stylesheet"
// />
// <link
//   href="https://fonts.googleapis.com/css?family=Raleway:300,400,500,600,700,800,900"
//   rel="stylesheet"
// />
// <title>Artsko</title>
// <meta name="description" content="" />
// <meta name="author" content="@Issaafalkattan" />
// </head>

// <body id="page-top" data-spy="scroll" data-target=".navbar-fixed-top">
// <div id="root"></div>
// <script type="text/javascript" src="js/jquery.1.11.1.js"></script>
// <script type="text/javascript" src="js/bootstrap.js"></script>
// </body>`;


exports.app = functions.https.onRequest(app);
