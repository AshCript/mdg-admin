import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

const welcome = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    const html = `
      <body style="background-color: #222222; color: #dddddd">
        <h1>Welcome to MDG-ADMIN v1.0.0</h1>
        <hr/>
        <p>Those are all the available free services for this API :</p>
        <ol>
        <h2><li>USER :</li></h2>
        <ul>
          <h3 style="font-weight: normal"><li>Authenticate : <b>/api/login</b></li></h3>
          <h3 style="font-weight: normal"><li>Sign up : <b>/api/signup</b></li></h3>
          <h3 style="font-weight: normal"><li>Update user informations : <b>/api/user/update</b></li></h3>
        </ul>
          <h2><li>PROVINCES :</li></h2>
            <ul>
              <h3 style="font-weight: normal"><li>Get a province by its ID : <b>/api/province/:id</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all provinces : <b>/api/provinces</b></li></h3>
            </ul>
          <h2><li>REGIONS :</li></h2>
            <ul>
              <h3 style="font-weight: normal"><li>Get a region by its ID : <b>/api/region/:id</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all regions : <b>/api/regions</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all regions according to a province : <b>/api/regions/:provinceId</b></li></h3>
            </ul>
          <h2><li>DISTRICTS :</li></h2>
            <ul>
              <h3 style="font-weight: normal"><li>Get a district by its ID : <b>/api/district/:id</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all districts : <b>/api/districts</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all districts according to a region : <b>/api/districts/:regionId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all districts according to a province : <b>/api/districts/p/:provinceId</b></li></h3>
            </ul>
          <h2><li>COMMUNES :</li></h2>
            <ul>
              <h3 style="font-weight: normal"><li>Get a commune by its ID : <b>/api/commune/:id</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all communes : <b>/api/communes</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all communes according to a district : <b>/api/communes/:districtId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all communes according to a region : <b>/api/communes/r/:regionId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all communes according to a province : <b>/api/communes/p/:provinceId</b></li></h3>
            </ul>
          <h2><li>FOKOTANY :</li></h2>
            <ul>
              <h3 style="font-weight: normal"><li>Get a fokotany by its ID : <b>/api/fokotany/:id</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all fokotanys : <b>/api/fokotanys</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all fokotanys according to a commune : <b>/api/fokotanys/:communeId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all fokotanys according to a district : <b>/api/fokotanys/d/:districtId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all fokotanys according to a region : <b>/api/fokotanys/r/:regionId</b></li></h3>
              <h3 style="font-weight: normal"><li>Get all fokotanys according to a province : <b>/api/fokotanys/p/:provinceId</b></li></h3>
            </ul>
        </ol>
        <hr/>
        <p>
          All these endpoints are available for free, for personal use. You can pass as query params : "name", "order" and "limit". 
          &nbsp;&nbsp;&nbsp;&nbsp;- The data you want to get is set to <b>20</b> by default, but you can change it by passing limit as a query parameter.<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- By default, data are ordered by name, ascendently. But you can change it by passing order as a query parameter. It can take the values ASC or DESC.<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;- You can filter researches by adding a query parameter "name". It can take string as value, and filter researches by just showing data which contains that string.
        </p>
        <div style="text-align: center">
          <span style="color: grey">Copyright © 2023 - Made with ❤️ by TEAM MALAKY</span>
        </div>
      </body>
    `
    return res.send(html)
  })
}

export default welcome