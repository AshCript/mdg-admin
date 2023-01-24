import { Request, Response } from 'express';
import { Express } from 'express-serve-static-core';

const welcome = (app: Express) => {
  app.get('/', (req: Request, res: Response) => {
    const html = `
      <h1>Welcome to MDG-ADMIN v1.0.0</h1>
      <hr/>
      <p>Those are all the available free services for this API :</p>
      <ol>
        <li><h2>PROVINCES :</h2></li>
          <ul>
          <li><h3>Get a province by its ID : /api/province/:id</h3></li>
            <li><h3>Get all provinces : /api/provinces</h3></li>
          </ul>
        <li><h2>REGIONS :</h2></li>
          <ul>
            <li><h3>Get a region by its ID : /api/region/:id</h3></li>
            <li><h3>Get all regions : /api/regions</h3></li>
            <li><h3>Get all regions according to a province : /api/regions/:provinceId</h3></li>
          </ul>
        <li><h2>DISTRICTS :</h2></li>
          <ul>
            <li><h3>Get a district by its ID : /api/district/:id</h3></li>
            <li><h3>Get all districts : /api/districts</h3></li>
            <li><h3>Get all districts according to a region : /api/districts/:regionId</h3></li>
            <li><h3>Get all districts according to a province : /api/districts/p/:provinceId</h3></li>
          </ul>
        <li><h2>COMMUNES :</h2></li>
          <ul>
            <li><h3>Get a commune by its ID : /api/commune/:id</h3></li>
            <li><h3>Get all communes : /api/communes</h3></li>
            <li><h3>Get all communes according to a district : /api/communes/:districtId</h3></li>
            <li><h3>Get all communes according to a region : /api/communes/r/:regionId</h3></li>
            <li><h3>Get all communes according to a province : /api/communes/p/:provinceId</h3></li>
          </ul>
        <li><h2>FOKOTANY :</h2></li>
          <ul>
            <li><h3>Get a fokotany by its ID : /api/fokotany/:id</h3></li>
            <li><h3>Get all fokotanys : /api/fokotanys</h3></li>
            <li><h3>Get all fokotanys according to a commune : /api/fokotanys/:communeId</h3></li>
            <li><h3>Get all fokotanys according to a district : /api/fokotanys/d/:districtId</h3></li>
            <li><h3>Get all fokotanys according to a region : /api/fokotanys/r/:regionId</h3></li>
            <li><h3>Get all fokotanys according to a province : /api/fokotanys/p/:provinceId</h3></li>
          </ul>
      </ol>
      <hr/>
      <p>
        All these endpoints are available for free, for personal use. You can pass as query params : "name", "order" and "limit". 
        &nbsp;&nbsp;&nbsp;&nbsp;- The data you want to get is set to <b>20</b> by default, but you can change it by passing limit as a query parameter.
        &nbsp;&nbsp;&nbsp;&nbsp;- By default, data are ordered by name, ascendently. But you can change it by passing order as a query parameter. It can take the values ASC or DESC.
        &nbsp;&nbsp;&nbsp;&nbsp;- You can filter researches by adding a query parameter "name". It can take string as value, and filter researches by just showing data which contains that string.
      </p>
    `
  })
}

export default welcome