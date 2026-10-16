---
title: "PokeSurvivor multijugador: cooperativo con hasta 4 amigos"
description: "PokeSurvivor multijugador: juega en cooperativo online con hasta 4 amigos, añade su apodo, únete a la sala del anfitrión y revive a tu equipo."
heading: "PokeSurvivor multijugador cooperativo: juega con hasta 4 amigos"
updated: 2026-10-14
faq:
  - q: "¿PokeSurvivor es multijugador?"
    a: "Sí. La versión online tiene un modo cooperativo multijugador para hasta 4 jugadores. Se añaden amigos por su apodo, el anfitrión los invita a una sala y la experiencia se comparte. Las páginas oficiales solo describen el cooperativo; no hemos encontrado ningún modo PvP."
  - q: "¿Cuántos jugadores pueden jugar en cooperativo a PokeSurvivor?"
    a: "Hasta 4 jugadores en una misma sala."
  - q: "¿El cooperativo funciona en la versión sin conexión?"
    a: "No. El zip sin conexión de itch.io es solo para un jugador. El cooperativo, el guardado en la nube y el ranking necesitan la versión online de pokesurvivor.com."
  - q: "¿Pueden jugar juntos jugadores de PC y de móvil?"
    a: "Sí. En PC y en el móvil se usa la misma versión web de pokesurvivor.com, así que pueden compartir sala. Lo hemos comprobado con un navegador de PC y otro de móvil jugando juntos."
  - q: "¿El cooperativo funciona dentro del juego incrustado en esta web?"
    a: "Mejor usa otra pestaña. Los navegadores separan el almacenamiento de un juego incrustado del de la web oficial, así que la sesión que inicies en nuestra versión incrustada no pasa a pokesurvivor.com, y «Entrar con Google» abre una ventana emergente que puede quedar bloqueada. No hemos probado el cooperativo en la versión incrustada, así que abre pokesurvivor.com en su propia pestaña."
  - q: "¿Se puede jugar a PokeSurvivor con 2 jugadores?"
    a: "Sí, y 2 es el mínimo. El botón «Empezar partida» del anfitrión no funciona hasta que haya al menos un amigo en la sala (el juego avisa: «Necesitas al menos un amigo en la sala.»). Las partidas en solitario son el juego normal, no una sala cooperativa."
  - q: "¿Necesito una cuenta para jugar con amigos?"
    a: "Sí, en la práctica. Los amigos se añaden por su apodo, así que cada jugador necesita una cuenta con la sesión iniciada (nombre y contraseña, o Google). Los invitados no tienen apodo con el que otros puedan encontrarlos."
  - q: "¿Hay PvP en PokeSurvivor?"
    a: "Las páginas oficiales solo describen el cooperativo, en el que hasta 4 jugadores luchan juntos contra la horda. Hay ranking, pero no hemos encontrado ningún modo jugador contra jugador."
  - q: "¿Qué pasa si el anfitrión cambia de pestaña o se va?"
    a: "Si el anfitrión cambia de pestaña, la partida se pausa para todos hasta que vuelva. Si el anfitrión abandona la run, se acaba para todo el grupo."
  - q: "¿Por qué mi amigo no puede conectarse a la sala?"
    a: "El cooperativo conecta los navegadores directamente y usa un servidor de reserva para las redes que lo bloquean. Si no funciona ninguna de las dos vías, la sala avisa de que la red de algún amigo no deja jugar en grupo. Prueba con otra wifi o con datos móviles; el juego vuelve a intentarlo solo."
  - q: "¿Hay una app de PokeSurvivor para jugar en cooperativo?"
    a: "Que sepamos, no hay app en App Store ni en Google Play. La opción «instalable como app» de la guía oficial es «Añadir a pantalla de inicio» con pokesurvivor.com. Es la misma versión online, así que usa la misma cuenta, la misma lista de amigos y las mismas salas."
---

Sí, PokeSurvivor es multijugador: la versión online tiene un modo cooperativo para hasta 4 jugadores que funciona con tu lista de amigos. Aquí verás cómo configurarlo, qué cambia al jugar en grupo y qué revisar si algo falla. Las reglas salen de la [guía oficial](https://pokesurvivor.com/guia/), de la [página de novedades del desarrollador](https://pokesurvivor.com/novedades/) y del [código fuente público](https://github.com/JPTER78/pokesurvivor) del juego, revisados el 14 de octubre de 2026. El juego se actualiza casi a diario, así que las cifras pueden cambiar.

## Qué necesitas para jugar en cooperativo

- **La versión online.** Juega en [pokesurvivor.com](https://pokesurvivor.com/). El zip sin conexión de [itch.io](https://jpter78.itch.io/pokesurvivor) es solo para un jugador, igual que sus partidas guardadas.
- **Una cuenta con apodo.** Tus amigos te encuentran por tu apodo, así que entra con tu cuenta (nombre y contraseña, o Google) en lugar de jugar como invitado. Además, con una cuenta la partida se guarda en la nube.
- **Al menos un amigo.** Una sala cooperativa necesita de 2 a 4 jugadores.
- **PC o móvil, da igual.** Jugadores de PC y de móvil pueden compartir sala, porque todos usan la misma versión web. En el móvil, juega en horizontal.
- **Abre el juego en otra pestaña.** Los navegadores separan la sesión de un juego incrustado de la de la web oficial, y «Entrar con Google» usa una ventana emergente. Inicia sesión y juega en cooperativo en pokesurvivor.com, en su propia pestaña, no dentro del juego incrustado de nuestra página de inicio.

## Cómo empezar una partida cooperativa

<figure>
  <img src="/images/co-op/friends-list.webp" width="1200" height="617" loading="lazy" decoding="async"
    alt="Pantalla Amigos de PokeSurvivor con tu apodo, el campo para el apodo de un amigo y el botón Añadir amigo">
  <figcaption>La pantalla «Amigos»: pasa tu apodo a tus amigos, o escribe el suyo y pulsa «Añadir amigo».</figcaption>
</figure>

1. Cada jugador abre el juego en pokesurvivor.com e inicia sesión. Si el juego lo pide («Elige tu apodo»), elige un apodo de 3 a 16 letras, números o _.
2. Abre **Amigos**, escribe el apodo exacto de tu amigo y pulsa **Añadir amigo**. Tu amigo acepta la solicitud desde su lado.
3. El anfitrión pulsa **Invitar** junto a un amigo de la lista. La primera invitación crea la sala y la abre. El botón «Invitar» solo aparece con amigos que están conectados y no están ya en una run. Solo el anfitrión puede invitar, y cada invitación caduca a los 3 minutos.
4. Los amigos aceptan la invitación. Cuando haya de 2 a 4 jugadores, el anfitrión pulsa **Empezar partida** (muestra el número de jugadores, por ejemplo «Empezar partida (3/4)») y todo el grupo empieza a la vez.

<figure>
  <img src="/images/co-op/room-invite.webp" width="1200" height="609" loading="lazy" decoding="async"
    alt="Pantalla Sala de PokeSurvivor vista por un invitado: el anfitrión con Scorbunny, el invitado con Quaxly y dos huecos libres">
  <figcaption>Una sala de 2 jugadores vista por el invitado. El anfitrión aparece como «Anfitrión», los huecos vacíos muestran «Libre» y la run empieza cuando el anfitrión pulsa «Empezar partida».</figcaption>
</figure>

¿Eres nuevo en el juego? Cada jugador puede aprender lo básico antes en [Cómo jugar a PokeSurvivor](/es/how-to-play/): los controles y las cartas de nivel funcionan igual en cooperativo.

## Reglas del cooperativo: experiencia compartida, revivir y grietas

<figure>
  <img src="/images/co-op/2-player-run.webp" width="1200" height="630" loading="lazy" decoding="async"
    alt="Dos jugadores en una partida cooperativa de PokeSurvivor: Scorbunny lanza Ascuas junto al Quaxly de un compañero, con la barra de vida del compañero arriba a la izquierda">
  <figcaption>Una partida de 2 jugadores: cada uno lleva su propio compañero, y el nombre y la barra de vida de tu compañero de equipo salen debajo de los tuyos, arriba a la izquierda.</figcaption>
</figure>

- **Experiencia compartida.** La experiencia se comparte entre el equipo, así que no hace falta que todos persigan toda la experiencia.
- **Revivir.** Si cae un compañero de equipo, quédate a su lado para levantarlo. El juego se lo avisa con «Has caído: un compañero puede levantarte».
- **Grietas.** Cuando el grupo entra en una grieta, todo el equipo entra a la vez. Mira la [guía de grietas y legendarios](/es/rifts/).
- **Pestaña del anfitrión.** Si el anfitrión cambia de pestaña del navegador, la partida se pausa para todos («Pausa: esperando a… (anfitrión)»). El anfitrión debe mantener la pestaña del juego en primer plano.
- **Si el anfitrión se va.** Si el anfitrión abandona la run, se acaba para todo el grupo. Si se va un invitado, el resto sigue jugando.

### Los enemigos se adaptan al tamaño del grupo

Cuantos más jugadores, más enemigos y más resistentes. Estos multiplicadores salen del código fuente del juego, revisado el 14 de octubre de 2026:

| Jugadores | Aparición de enemigos | Vida de los enemigos |
|---|---|---|
| 1 (en solitario) | ×1 | ×1 |
| 2 | ×1,75 | ×1,3 |
| 3 | ×2,5 | ×1,6 |
| 4 | ×3,25 | ×1,9 |

Además, los jefes tienen ×1,4 de vida extra en cualquier partida en grupo. Un equipo completo se enfrenta a más del triple de enemigos que un jugador en solitario, así que conviene que el grupo se separe un poco y que todo el mundo siga atacando.

## Problemas con el cooperativo y soluciones

Estos pasos se deducen de las reglas anteriores; el desarrollador no ha publicado una lista de soluciones.

- **No encuentras a un amigo:** revisa cómo se escribe su apodo y comprueba que haya iniciado sesión. Los invitados no tienen cuenta que puedas añadir.
- **«No hay ningún jugador con ese apodo.»:** el apodo tiene que coincidir exactamente. Pide a tu amigo que copie el suyo desde la pantalla «Amigos».
- **«No se puede conectar con algún amigo…»:** su red o la tuya no deja jugar en grupo. Que uno de los dos cambie a otra wifi o a datos móviles; el juego vuelve a intentarlo solo.
- **«La invitación ha caducado.»:** las invitaciones duran 3 minutos. Pide al anfitrión que envíe otra.
- **«La partida de esa sala ya ha empezado.»:** no puedes unirte a una run en curso. Espera a la siguiente.
- **«La sala está llena.»:** una sala admite 4 jugadores como máximo.
- **No puedes iniciar sesión o aceptar la invitación en esta web:** abre [pokesurvivor.com](https://pokesurvivor.com/) en su propia pestaña y vuelve a intentarlo ahí. Si «Entrar con Google» no hace nada, permite las ventanas emergentes para ese sitio.
- **No aparece «Crear cuenta»:** el juego limita las cuentas nuevas cada mes y, cuando se llega al tope, el registro se pausa hasta el mes siguiente.
- **La partida se pausa una y otra vez:** lo más probable es que el anfitrión esté cambiando de pestaña o de app. El juego del anfitrión tiene que estar en primer plano.
- **Tu amigo usa la versión sin conexión:** el zip de itch.io no puede unirse a salas. Todo el grupo necesita el juego online.
- **Juegas en el móvil:** usa Safari o Chrome en horizontal, no el navegador integrado de Discord, WeChat o Instagram, que puede bloquear «Entrar con Google». La configuración está en la [guía para móvil](/es/mobile/).

## Cooperativo online o versión sin conexión: qué cambia

| | Versión online (pokesurvivor.com) | Zip sin conexión (itch.io) |
|---|---|---|
| Jugadores | De 2 a 4 en una sala | 1 (solo en solitario) |
| PC y móvil juntos | Sí | No |
| Lista de amigos y salas | Sí | No |
| Experiencia compartida y revivir | Sí | No |
| Guardado | En la nube con una cuenta | Solo en el navegador |
| Ranking | Sí | No |

## ¿Es seguro el multijugador? Nota sobre privacidad

El cooperativo conecta los navegadores directamente, como en una videollamada, por eso el texto de privacidad del juego advierte que los compañeros de equipo pueden llegar a ver la dirección IP de los demás. Cuando la conexión directa no es posible, la partida pasa por un servidor intermedio. El texto del juego nombra Firebase para esto; desde el 12 de octubre de 2026, el código fuente usa en su lugar un servidor de Cloudflare. En cualquier caso, juega en cooperativo con gente que conozcas.

## Mejor equipo para el cooperativo de 4 jugadores

Son sugerencias nuestras basadas en las descripciones de los movimientos y las estadísticas base, no en datos de equipos probados. Como la experiencia se comparte, el equipo puede repartirse las tareas en lugar de que todos persigan gemas.

| Rol | Qué hace | Compañeros posibles | Por qué |
|---|---|---|---|
| Daño | Limpia la horda a distancia | Mudkip, Sobble | Pistola Agua (Chorro de Agua en Hispanoamérica) es un «chorro perforante, fiable a cualquier distancia», y estos dos tienen el multiplicador de ataque más alto entre quienes la usan (1,08) |
| Control de masas | Cubre un ángulo amplio | Bulbasaur, Chikorita, Turtwig, Grookey | Látigo Cepa golpea en un arco amplio y de largo alcance |
| Ralentizar y apoyar | Frena lo que se acerca | Popplio | Burbuja ralentiza a quien toca |
| Rescatador | Llega primero a los compañeros caídos | Froakie | La velocidad base más alta entre los iniciales (108) |

- Mezcla formas de ataque. Un chorro perforante y un arco amplio cubren ángulos distintos, así que un equipo variado deja menos huecos alrededor del grupo.
- Que el equipo se reparta un poco por el mapa. Un jugador puede recoger mientras los demás contienen la horda.
- En las grietas, que cada uno se coloque en un sitio distinto: así un solo ataque avisado no alcanza a todo el grupo. Las arenas de las grietas y los movimientos que mejor las cubren están en la [página de grietas](/es/rifts/).

Para comparar compañeros en cada fase, mira la [tier list de PokeSurvivor](/es/tier-list/). Para elegir tu primer compañero, mira la guía del [mejor inicial](/es/best-pokemon/).
