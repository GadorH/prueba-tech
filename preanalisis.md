# PREANÁLISIS

Como punto de partida para abordar la ejecución de la prueba técnica, el primer paso consistió en analizar detenidamente el vídeo de ejemplo adjunto en la documentación. Tras su revisión, se destacó la necesidad de sincronizar la reproducción del vídeo con el desplazamiento vertical (scroll) de la página. Es crucial que el scroll sea lo suficientemente extenso para permitir que el vídeo se reproduzca de manera completa y fluida.


Además, se observaron textos que aparecen y desaparecen durante el vídeo. Estos textos también deben estar vinculados al progreso del scroll. La conclusión es clara: no será posible utilizar animaciones CSS para el avance de los textos, ya que este está estrechamente ligado al desplazamiento vertical. Dado que la opacidad y la duración de los textos varían con el avance del scroll, se hace necesario recurrir a JavaScript para coordinar estas animaciones de manera efectiva.


En el vídeo, se identificó una animación de la flecha ("arrow") que, en principio, podría ser animada con CSS. Sin embargo, esta animación está vinculada a una transición que invierte la flecha cuando el scroll alcanza el final de la página. Por lo tanto, será crucial coordinar esta animación con JavaScript para asegurar una transición fluida y consistente.
Dentro de la carpeta, se encuentran dos vídeos con diferentes resoluciones: uno con 1920x1080 y otro con 1080x1920. Se propone seleccionar el vídeo en función del diseño de la página, eligiendo la resolución adecuada según si la pantalla es de tipo móvil o de escritorio. Se sugiere que las pantallas con una resolución de 1920x1080 o superior utilicen el vídeo correspondiente a esa resolución.


Por último, al analizar que los textos se presentan en formato SVG, surge la preocupación de que su implementación no se adapte correctamente al diseño, especialmente en dispositivos móviles. Como solución preferida, se propone redactar los textos manualmente, y se buscará y descargará el tipo de fuente necesario desde la página web oficial de ZARA.com para garantizar una integración más precisa y consistente.


Cualquier detalle adicional relacionado con la implementación se documentará en la memoria correspondiente.
