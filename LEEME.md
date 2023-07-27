# PlayWithViewersListener
Un bot que permite introducir de manera automática un comando para poder entrar a la cola del bot PlayWithViewersBot, este bot tiene la capacidad de saber cuando la sala se abre, cuándo el jugador es removido de la lista para reenviar el comando y cuándo se cierra la sala para evitar mandar comandos.

## Dependencias

Tendremos que instalar Node.js para ejecutar el bot, no es necesario instalar las herramientas adicionales. Descarga Node.js aquí (recomiendo la versión estable).

El bot incluye los siguientes módulos:

•	TMI.js: Para enviar mensajes al canal.

•	Puppeteer: Para observar el comportamiento del widget.

•	Play-sound: Emite un sonido para avisarle al usuario de que falta 1 partida para que ingrese.

## Configuración
Antes de iniciar el bot precisamos configurar algunos parámetros para que funcione correctamente con su usuario de Twitch, recuerde que toda la información debe estar en minúscula. Debemos acceder al siguiente directorio src/data.

Entraremos al archivo config.json

### Misc:

`language`: Idioma en el que funciona PlayWithViewers, podras configurar los archivos en la carpeta lang con el prefijo mas .txt por ejemplo es.txt, en.txt, pt.txt.

`sound`: Cuando estemos por jugar el bot nos avisa emitiendo una alarma para avisarnos (abre el reproductor de música de Windows).

### Credentials:

`username`: Tendremos que poner nuestro nombre de usuario de Twitch en minúsculas, el nombre de usuario debe ser el que se utiliza para iniciar sesión.

`usernameDisplay`: Nombre de usuario que aparece en el chat, este puede ser igual o distinto a username. 

`password`: No es la contraseña habitual para iniciar sesión en Twitch, es una clave de autenticación que utiliza el bot para ingresar como bot, por lo que cuando iniciemos el bot este no precisará el código del autenticador (si la cuenta lo tiene activado).
Para obtener dicha clave, tendremos que entrar al siguiente [link](https://twitchapps.com/tmi/), luego abajo del todo hacer clic en “Connect”, donde nos pedirá Twitch que autoricemos el bot, nos dará una clave que tendremos que copiar y pegar en el archivo password (recordar no dejar espacios antes ni al final).

### channelData:

`name`: Nombre de usuario del canal donde el bot tiene que enviar los mensajes.

`command`: Comando para entrar a la sala.

`open`: Comando que usan los moderadores para abrir la sala.

`close`: Comando que usan los moderadores para cerrar la sala.

`widgetUrl`: Url del widget, para obtenerla debemos ir a la parte inferior derecha del widget, veremos un botón de un cuadrado con una flecha saliendo, al hacer clic nos abrira una ventana emergente, ahi copiaremos la url y la pondremos en este campo.

`teamSize`: Tamaño del equipo.

### messages:

`team0`: Mensaje que se enviará al canal cuando el equipo esta por jugar, este campo se completa solo con `true` o `false`.

`team1`: Mensaje que se enviará al canal cuando el equipo esta a una partida por jugar, este campo se completa solo con `true` o `false`.
