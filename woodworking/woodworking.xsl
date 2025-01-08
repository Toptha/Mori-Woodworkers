<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:mori="https://moriwoodworkers.vercel.app/"
    exclude-result-prefixes="mori">
    
    <xsl:output method="html" indent="yes" />
    
    <xsl:template match="/">
        <html>
            <head>
                <title>Woodworking Data</title>
            </head>
            <body>
                <h1>Woodworking Data</h1>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Wood-Type</th>
                            <th>Hardness</th>
                            <th>Price</th>
                            <th>Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="//mori:wood">
                            <xsl:sort select="mori:hardness" data-type="number" order="descending" />
                            <tr>
                                <td>
                                    <xsl:value-of select="mori:type" />
                                </td>
                                <td>
                                    <xsl:value-of select="mori:hardness" />
                                </td>
                                <td>
                                    <xsl:choose>
                                        <xsl:when test="mori:price &lt; 100">
                                            <xsl:value-of select="concat('$', mori:price, ' (Budget)')" />
                                        </xsl:when>
                                        <xsl:otherwise>
                                            <xsl:value-of select="concat('$', mori:price, ' (Premium)')" />
                                        </xsl:otherwise>
                                    </xsl:choose>
                                </td>
                                <td>
                                    <xsl:value-of select="mori:origin" />
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
