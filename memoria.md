# MEMORIA DE TRABAJO

## Selección de tecnologías

Para empezar quiero reducir el nuúmero de librerías a utilizar. No creo que sea necesario ningún
framework JS tipo React, Vue o Angular para poder hacer estas animaciones. Creo que con JS, CSS y HTML podemos lograrlo.

Voy a utilizar [Vite](https://vitejs.dev/) para que el entorno de desarrollo sea cómodo.

### Coordinación del scroll y vídeo.

Haciendo una búsqueda en internet he encontrado la siguiente librería que parece sencilla de utilizar
para hacer la coordinación del scroll + vídeo: [ScrollMagic](https://scrollmagic.io/).

La idea es la siguiente:

El elemento vídeo lo tenemos situado en el html, lo capturamos por identificador y luego en base al ancho de pantalla del usuario cargamos un asset u otro.

- Si el ancho de la pantalla es >= 1920px cargamos el vídeo de 1920x1080 sino, el de 1080x1920.

La librería me permite situar una escena dentro del scroll y tiene un hook `onProgress` que recibe un callback al que le pasa un evento con la situación del scroll en la escena, que va de 0 a 1.

En este caso la escena debe durar toda la altura del scroll y lo que voy a probar es a avanzar el `currentTime` del vídeo en base al avance del scroll: `currentTime = progreso del scroll * duracion del video`.

Pero el scroll es demasiado corto. Para hacer el scroll más grande, podemos hacer el alto del documento más alto, en base a la duración del vídeo.

Digamos que un segundo de vídeo, son 200px de alto. Ayudándome de la IA, la fórmula es `alto del documento = duración del vídeo * velocidad`, siendo `velocidad=200`.

#### Comentarios

- Parece que en Safari no me reproduce el vídeo aunque lo avance con el scroll, es necesario darle al play y pausarlo de manera inmediata para que empiece a verse.

### Flecha de navegación

En el mismo callback de la escena de coordinación de avance del video con el scroll, podemos introducir la lógica de la flecha de navegación.

Esta debe estar parpadeando siempre y darse la vuelta cuando el scroll ha alcanzado una posición casi final o final y el efecto contrario si rebasa esa posición cuando el scroll va hacia atrás.

La librería ScrollMagic, en el evento `onProgress` parece que inyecta la `scrollDirection` como 2 strings: `FORWARD` y `REVERSE`.

Pues si la dirección del scroll es `FORWARD` y rebasamos el 70% del scroll total, cambiamos la clase de la flecha de navegación y salta nuestra animación de rotación y si es reversa y estamos a menos del 70% del scroll le volvemos a dar la vuelta.

Como la flecha debe seguir parpadeando en todo momento, la animación de blink también hay que reproducirla cuando se activan las de rotación, dado que no se puede tener 2 propiedade `animation` en CSS.

### Escenas de los textos

Voy a usar la libreria de ScrollMagic para coordinar el avance o retroceso de los textos con el scroll, asi como el cambio de opacidad. Aquí una clase CSS no me sirve, porque se activaría pero no se coordina con el scroll. Tenemos que cambiar la posición al top y la opacidad en base al movimiento del scroll entre dos puntos.

La idea sería tener todas las escenas ocultas y fixed en el centro del documento e ir animándolas con las callback onProgress.

#### Escena 1

Empezará a 3.5 segundos del vídeo, para que se vea un poco avanzado. Para ello, primero desplazamos el scroll hacia allí, para hacerlo suavemente he usado la librería de [gsap y el plugin scrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

ScrollMagic funciona en base a triggers, sitúas un trigger en un punto del scroll del documento y cuando el scroll hook de la librería detecta que pasa por ese elemento, se inicia la escena. La escena dura lo que uno marque, que puede ser en px o en porcentajes. Dejamos el 100% del porcentaje que corresponde al alto de la ventana.

En el caso del primer elemento de texto, se muestra visible y lo que haremos es que:

- Cuando la dirección del scroll es FORWARD:
  - Y el scroll se sitúa entre el 50% - 100% de la escena: entonces iremos desplazandolo hacia el 15% del top y reduciendo su opacidad.

-  Cuando la dirección del scroll es REVERSE:
   -  Y el scroll se sitúa entre el 100% - 50% de la escena: entonces iremos desplazandolo hacia el el top 35% desde el punto en el que se quedo cuando la dirección del scroll era FORWARD que es el 15%, es decir lo desplazamos hacia abajo y aumentamos su opacidad.


Para hacer estos calculos he usado la IA y los he ido corrigiendo, pero no son muy complejos.


### Comentarios

- Me ha resultado contraintuitivo los movimientos de los textos, dado que son contrarios a la dirección del scroll y es lo que más me ha dificultado mentalmente los cálculos.


#### Escena 2

Para comenzar colocamos el trigger 2 en la posición que necesitamos, en este caso, hacemos el cálculo basándonos en la posición de partida del trigger 1 + la duración de la escena 1 + 50px que incluimos de margen para la separación entre ambas escenas.

En el caso del segundo elemento de texto, se muestra invisible y lo que hacemos es:

- Cuando la dirección del scroll es FORWARD:
 - Y el scroll se situa entre el 0% - 33% de la escena: Entonces iremos desplazando hasta el 40% del top y aumentando su opacidad.
 - Cuando el scroll se sitúa entre el 33% - 66% de la escena lo mantenemos al 40% y mantenemos su opacidad.
 - Cuando el scroll se sitúa entre el 66% - 100% de la escena: entonces iremos desplazando del 40% al 20% del top e iremos reduciendo su opacidad.
  
- Cuando la dirección del scroll es REVERSE:
 - Y el scroll se situa entre el 100% - 66% de la escena entonces iremos desplazando del 20% al 40% del top e iremos aumentando su opacidad.
 - Cuando el scroll se sitúa entre el 66% - 33% de la escena, entonces lo mantenemos en la posición del 40% del top y mantenemos su opacidad.
 - Cuando el scroll se sitúa entre el 33% - 0% de la escena, entonces lo desplazamos desde el 40% al 20% del top y vamos reduciendo su opacidad.


#### Escena 3

En este caso como hemos hecho con los anteriores lo primero que debemos hacer es colocar el trigger 3. En este caso, el cálculo lo hacemos basándonos en la posición final del trigger 1 + la duración de la escena 2 + 100px de margen (ya que debemos tener en cuenta el margen entre las escenas anteriores y este nuevo margen).

En el caso del tercer elemento del texto, se muestra invisible y lo que hacemos es:

- Cuando la dirección del scroll es FORWARD:
 - Y el scroll se sitúa entre el 50% - 100% de la escena entonces iremos desplazando del 60% al 35% del top e iremos aumentando su opacidad
 - Cuando el scroll superar el 50% de la escena, lo mantemos en la posición alcanzada al 50% y mantiene su visibilidad.

- Cuando la dirección del scroll es REVERSE:
 - Y el scroll se sitúa entre el 50% al 0% de la escena  entonces lo iremos desplazando del 35% al 60% del top e iremos disminuyendo su opacidad.
  


