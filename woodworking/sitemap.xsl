<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

  <xsl:output method="html" encoding="UTF-8" indent="yes"/>
  
  <xsl:template match="/rss">
    <html>
      <head>
        <title>
          <xsl:value-of select="channel/title"/>
        </title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .header {
            background-color: #333;
            color: #fff;
            padding: 20px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
          }
          .content {
            max-width: 800px;
            margin: 20px auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .item {
            margin-bottom: 20px;
            padding-bottom: 20px;
            border-bottom: 1px solid #ddd;
          }
          .item h2 {
            color: #333;
            margin: 0 0 10px;
          }
          .item a {
            color: #007BFF;
            text-decoration: none;
          }
          .item a:hover {
            text-decoration: underline;
          }
          .item p {
            color: #555;
          }
          .footer {
            text-align: center;
            padding: 10px;
            background: #333;
            color: #fff;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>
            <xsl:value-of select="channel/title"/>
          </h1>
          <p>
            <xsl:value-of select="channel/description"/>
          </p>
        </div>
        <div class="content">
          <xsl:for-each select="channel/item">
            <div class="item">
              <h2>
                <a href="https://moriwoodworkers.vercel.app/furniture.html" target="_blank">
                  <xsl:value-of select="title"/>
                </a>
              </h2>
              <p>
                <xsl:value-of select="description"/>
              </p>
              <p><small>Published on: <xsl:value-of select="pubDate"/></small></p>
            </div>
          </xsl:for-each>
        </div>
        <div class="footer">
          <p>&#169; <xsl:value-of select="substring(channel/lastBuildDate, 13, 4)"/> Mori Woodworkers. All rights reserved.</p>
        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
