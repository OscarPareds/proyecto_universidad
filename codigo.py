from flask import Flask, render_template_string
import random
import webbrowser

app = Flask(__name__)

frases_romanticas = [
    "Come danonino enana",
    "pussito y Kin son muy bellos",
    "medis 1,57😂😂😂😂😂😂😂😂😂",
    "me invitas a tu cumple no seas falsa",
    "echate cloro para blanquearte",
    "cuando hagas lasaña me das a probar",
    "seguire mandando el sticker de la niña negrita"
]

@app.route('/')
def index():
    return render_template_string("""
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Carta Romántica</title>
            <style>
                .container {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                }

                #boton {
                    cursor: pointer;
                    width: 50%; /* Ajusta el ancho según tu preferencia */
                    max-width: 200px; /* Ancho máximo del botón */
                    height: auto; /* Mantén la relación de aspecto */
                }

                #mensaje {
                    display: none; /* Ocultar el mensaje inicial */
                    position: absolute;
                    top: 20px; /* Ajusta la posición vertical del cuadro */
                    background-color: white;
                    padding: 10px;
                    border: 1px solid black;
                    border-radius: 5px;
                }

                #frase {
                    text-align: center;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div id="mensaje">
                    <h2>Presiona la carta varias veces</h2>
                    <p id="frase"></p>
                </div>
                <img src="/static/boton.png" alt="Botón" id="boton" onclick="mostrarFrase()">
            </div>
            <script>
                function mostrarFrase() {
                    var mensaje = document.getElementById('mensaje');
                    var fraseDiv = document.getElementById('frase');
                    var frases = {{ frases|tojson }};
                    var fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
                    fraseDiv.textContent = fraseAleatoria;
                    mensaje.style.display = 'block';
                }
            </script>
        </body>
        </html>
    """, frases=frases_romanticas)

def abrir_navegador():
    webbrowser.open('http://localhost:5000/')

abrir_navegador()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
