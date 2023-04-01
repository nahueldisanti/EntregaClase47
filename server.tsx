//@deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://jspm.dev/react"
//@deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom/server"
import { GetColorName } from "https://raw.githubusercontent.com/jeff3754/HexColorToColorName/master/src/index.ts";

import { Application, Router, RouterContext } from "https://deno.land/x/oak@v10.6.0/mod.ts"

import { serve } from "https://deno.land/std@0.106.0/http/mod.ts";

const port = Number(Deno.env.get('PORT')) || 8080;

const server = serve({ port });
const colores: string[] = []


    (async () => {
        for await (const req of server) {

            if (req.method === "POST") {
                const thedata = await Deno.readAll(req.body);
                const formData = new URLSearchParams(new TextDecoder().decode(thedata));
                const color = formData.get("color");
                if (color) {
                    colores.push(color.toString());
                }
            }

        }


        await req.respond({
            status: 200,
            headers: new Headers({
                "content-type": "text/html; charset=UTF-8",
            }),
            body: ReactDOMServer.renderToString(
                <html>
                    <head>
                        <meta charSet="utf-8" />
                        <title>DENO COLORES ENTREGA CLASE 48</title>
                    </head>
                    <body style={{ backgroundColor: "black" }}>
                        <h1 style={{ color: "white" }}>Ingresa un color</h1>
                        <form method="POST" action="/">
                            <input name="textColor" placeholder="Ingrese un color en inglés" type="text" />
                            <button type="submit">Cargar Color</button>
                        </form>
                        <br /><br />
                        {colores.length > 0 &&
                            <>
                                <div>
                                    <h3 style={{ color: "white" }}>Los colores ingresados fueron:</h3>
                                    <ul>
                                        {colores.map((color, index) => {
                                            return <li key={index} style={{ color: color }}>{color} </li>
                                        })}
                                    </ul>
                                </div>
                            </>
                        }
                    </body>
                </html>
            ),
        });
    })()
