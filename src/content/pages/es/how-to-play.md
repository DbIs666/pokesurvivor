---
title: "Cómo jugar a PokeSurvivor: guía de tu primera partida"
description: "Cómo jugar a PokeSurvivor: controles, cartas de nivel, evolución de movimientos, enemigos y errores de principiante en tu primera run de 10 minutos."
heading: "Cómo jugar a PokeSurvivor: tu primera partida de 10 minutos"
updated: 2026-10-14
# TODO: uncomment once the 1200x630 screenshot crop is in public/images/how-to-play/
# ogImage: "/images/how-to-play/og-how-to-play.png"
# ogImageAlt: "Partida de PokeSurvivor: el Pokémon compañero luchando contra una horda con las cartas de nivel en pantalla"
faq:
  - q: "¿Cómo se ataca en PokeSurvivor?"
    a: "No tienes que hacerlo: tu compañero ataca solo con el movimiento activo. Tú solo te mueves, con WASD o las flechas en PC, o arrastrando el dedo en cualquier parte de la pantalla táctil."
  - q: "¿Cómo cambio de movimiento?"
    a: "En PC, pulsa 1–4 o Q/E, o haz clic en el icono del movimiento. En el móvil, toca el icono del movimiento."
  - q: "¿Por qué no puedo moverme?"
    a: "Un jugador lo comentó en itch.io y no se ha publicado ningún arreglo. El juego solo lee las teclas cuando su página tiene el foco, así que primero haz clic dentro del juego. Si juegas en una versión incrustada (aquí o en itch.io), abre el juego en otra pestaña para que las teclas le lleguen directamente."
  - q: "¿Qué pasa en el minuto 30?"
    a: "Aparece Arceus con la «Sentencia de Arceus», una persecución en la que es invencible. No se le puede vencer a base de daño, así que no dejes de moverte."
  - q: "¿Se guarda mi progreso si juego como invitado?"
    a: "No fuera de tu navegador. Crea una cuenta (nombre y contraseña, o Google) para guardar la partida en la nube."
---

Cómo jugar a PokeSurvivor, en una frase: tú solo te mueves y tu Pokémon compañero ataca por su cuenta. Esta guía repasa minuto a minuto tu primera partida de 10 minutos y añade nuestros consejos a la [guía oficial](https://pokesurvivor.com/guia/), que es la fuente de las reglas que se explican aquí. ¿Aún no tienes compañero? Mira nuestra guía del [mejor inicial](/es/best-pokemon/).

## Antes de empezar

- **Invitado o cuenta:** como invitado no se guarda nada fuera del navegador. Con una cuenta (nombre y contraseña, o Google) la partida se guarda en la nube.
- **Idioma:** el juego sale en español o en inglés según el idioma de tu navegador. Puedes cambiarlo en «Ajustes».
- **Compañero:** los jugadores nuevos responden un breve cuestionario («Tu personalidad es…») que les propone un compañero. Puedes aceptarlo con «¡Vamos juntos!» o pulsar «Elegir otro».

## Controles de PokeSurvivor

| Acción | PC | Móvil o tablet (en horizontal) |
| --- | --- | --- |
| Moverse | WASD o flechas | Arrastra el dedo en cualquier parte (el joystick aparece donde tocas) |
| Atacar | Automático | Automático |
| Cambiar el movimiento activo | 1–4 o Q/E, o clic en el icono del movimiento | Toca el icono del movimiento |
| Cambiar las cartas de nivel | R («Cambiar opciones») | Toca «Cambiar opciones» |
| Pausa | Esc | Botón de arriba a la derecha |

En el móvil el juego solo funciona en horizontal. La configuración y cómo añadirlo a la pantalla de inicio están en [PokeSurvivor en el móvil](/es/mobile/).

## Minutos 0–2: muévete y recoge experiencia

Tú solo te mueves; tu compañero ataca por su cuenta con el movimiento activo. Los enemigos sueltan experiencia, así que tienes que acercarte lo justo para recogerla sin que te rodeen.

### Consejos para moverte

- Muévete en círculos amplios en lugar de ir y venir. La horda te sigue en fila y así la mantienes delante de tu ataque.
- No te pares a recoger toda la experiencia. Vuelve a por ella en la siguiente vuelta, cuando la zona esté más despejada.

<!-- IMAGE PLACEHOLDER 1: screenshot of an early run, partner kiting a horde in a wide circle with XP gems on the ground.
     Suggested file: /images/how-to-play/first-minutes.webp
     Suggested alt: "Primeros minutos en PokeSurvivor: el Pokémon compañero da vueltas alrededor de una horda mientras recoge experiencia" -->

## Cartas al subir de nivel

En cada «¡Nivel N!» el juego te pide «Elige una recompensa» entre tres cartas: un movimiento nuevo, una mejora para un movimiento que ya tienes o un potenciador para tu Pokémon. Si ninguna te sirve, puedes cambiarlas con «Cambiar opciones» (tecla R). Según el código actual del juego, tienes un cambio gratis por run; la mejora permanente «Cambio de cartas», que se compra con monedas, añade hasta 5 más.

<!-- IMAGE PLACEHOLDER 2: screenshot of the level-up screen with three cards.
     Suggested file: /images/how-to-play/level-up-cards.webp
     Suggested alt: "Pantalla de subida de nivel de PokeSurvivor con tres cartas: movimiento nuevo, mejora de movimiento y potenciador" -->

### Qué cartas elegir en tu primera partida

1. Sube primero tu movimiento inicial hacia el nivel 5. Un movimiento al máximo y evolucionado rinde más que cuatro flojos.
2. Consigue pronto un segundo movimiento de ataque para no depender de una sola dirección.
3. Cuando te salga la carta de mejora que necesita tu movimiento principal para evolucionar (ver más abajo), elígela.
4. Si las tres cartas no encajan con tu plan, cámbialas en vez de tomar un movimiento que no vas a subir. Como solo tienes un cambio gratis, guárdalo para ese momento.

### Qué hace cada carta de potenciador

Estos valores salen del [código fuente público en GitHub](https://github.com/JPTER78/pokesurvivor) (`js/systems/levelup.js`) y del cliente del juego, revisados el 14 de octubre de 2026. El desarrollador actualiza el juego a menudo, así que tómalos como una foto del momento.

| Carta | Efecto por carta | Máximo de veces |
|---|---|---|
| Vigor | +20 de vida máxima (y la recupera) | Sin límite |
| Potencia | +10% de daño con todos los movimientos | 40 |
| Carrera | +7% de velocidad de movimiento | 8 |
| Reflejos | −8% de recarga en todos los movimientos | 10 |
| Coraza | +6% de reducción de daño recibido (con un tope total del 70%) | 12 |
| Síntesis | +0,9 de vida regenerada por segundo | Sin límite |
| Imán | +30% de radio de recogida de experiencia | 6 |
| Aprendizaje | +12% de experiencia ganada | 8 |
| Baya Zidra (Baya Citrón en Hispanoamérica) | Recupera el 45% de tu vida al momento | Sin límite |

Los efectos se multiplican: dos cartas de Potencia dan ×1,21 de daño, no +20%. Varias de estas cartas (Potencia, Vigor, Reflejos, Carrera, Coraza, Síntesis, Imán) son también el requisito para evolucionar un movimiento, así que conviene elegir la que pide tu movimiento principal.

## Minutos 2–5: construye tu partida en torno a un movimiento

Aquí es donde la run toma forma. Nuestro enfoque (es un consejo nuestro, no una regla oficial):

- Sigue invirtiendo los niveles en tu movimiento inicial y en un segundo movimiento de ataque.
- Empieza a buscar la carta de mejora que necesita tu movimiento principal para evolucionar, para tenerla lista al llegar al nivel 5.
- Los objetos del mapa empiezan a importar: limpia de enemigos la zona de un cofre con candado y quédate a su lado para abrirlo. Guarda los manantiales para cuando de verdad vayas mal de vida.
- Si pasa un Meowth corriendo, persíguelo: huye y se escapa a los 15 segundos, pero suelta 100 monedas (detalles más abajo).
- Atento a los primeros enemigos especiales (curanderos, *shielders*, *exploders* y *summoners*) y cambia de objetivo cuando aparezca uno. Cómo enfrentarte a ellos, más abajo.

## Minutos 5–10: primera evolución y primera grieta

- **Evoluciona tu movimiento principal.** Cuando esté al nivel 5 y tengas su carta de mejora, aparecerá una carta dorada de evolución. Elígela.
- **Cuenta con una grieta.** Como mucho pasan 2,5 minutos sin que se abra una grieta misteriosa, así que lo normal es que veas una antes del minuto 10. Si tu partida va fuerte, entra; si te cuesta, no pasa nada por dejarla para más adelante.
- **No dejes de moverte.** La horda crece, y quedarse quieto para rematar una pelea es como acaban la mayoría de las primeras partidas. En el [foro de la comunidad de itch.io](https://jpter78.itch.io/pokesurvivor/community) hay jugadores que dicen que la dificultad sube rápido y que los enemigos aguantan mucho pronto, así que tener el movimiento principal evolucionado a estas alturas marca la diferencia.

Lo que viene después: las grietas y los jefes llenan la mitad de la partida, y en el minuto 30 Arceus empieza una persecución en la que es invencible (ver las preguntas frecuentes).

## Cómo evolucionan los movimientos (nivel 5 + carta de mejora)

Los movimientos se mejoran hasta el nivel 5. Al nivel máximo, si además tienes la carta de mejora que pide ese movimiento (Potencia, Vigor, Reflejos, Carrera…), aparece una carta dorada de evolución. De los 64 movimientos, 59 pueden evolucionar; los cinco que no lo hacen son de mejora: Danza Espada (Danza de Espadas en Hispanoamérica), Agilidad, Fortaleza, Acua Aro (Acuaanillo) y Danza Dragón (Danza de Dragón). Algunos ejemplos de la [lista oficial de movimientos](https://pokesurvivor.com/movimientos/), revisada el 14 de octubre de 2026:

| Movimiento | Evoluciona a | Carta necesaria | Cambio al evolucionar |
|---|---|---|---|
| Ascuas (Brasas en Hispanoamérica) | Llamarada | Potencia | ×1,8 daño, +2 proyectiles, +2 perforación y más grandes |
| Pistola Agua (Chorro de Agua en Hispanoamérica) | Escaldar | Potencia | ×1,8 daño, +2 proyectiles, +2 perforación y más grandes |
| Látigo Cepa | Latigazo | Potencia | ×1,9 daño, más alcance y golpea en 360° |
| Burbuja | Surf | Carrera | +6 proyectiles, ×1,6 daño y +1 perforación |
| Hoja Afilada (Hojas Navaja en Hispanoamérica) | Lluevehojas (Tormenta de Hojas) | Reflejos | ×1,8 daño, +1 bumerán y más alcance |
| Confusión | Psicocarga (Choque Psíquico) | Reflejos | ×1,8 daño, +2 proyectiles, +2 perforación y más grandes |
| Placaje (Tacleada en Hispanoamérica) | Derribo | Vigor | ×1,9 daño, más alcance y golpea en 360° |

Antes de la partida, mira en la lista de movimientos qué carta pide tu movimiento principal, para saber qué buscar. Lo que hace cada carta por sí sola está en la [tabla de cartas de potenciador](#qué-hace-cada-carta-de-potenciador) de arriba.

<!-- IMAGE PLACEHOLDER 3: screenshot of the golden evolution card on the level-up screen.
     Suggested file: /images/how-to-play/golden-evolution-card.webp
     Suggested alt: "Carta dorada de evolución de PokeSurvivor, que aparece cuando un movimiento llega al nivel 5" -->

## Las cuatro personalidades de los enemigos

Algunos enemigos tienen una de cuatro personalidades: curanderos, *shielders* (ponen escudos), *exploders* (explotan) y *summoners* (invocan ayuda). El juego en español solo tiene nombre para los curanderos; para los otros tres usamos el nombre en inglés. Las fuentes oficiales las mencionan, pero no explican cada una en detalle, así que las tácticas de abajo son nuestra interpretación, no mecánicas confirmadas.

- **Curanderos:** según las novedades del desarrollador, curan según lo fuerte que pegas, con tope. Elimínalos primero para que el grupo no se recupere.
- **Shielders:** trátalos como objetivo prioritario (la guía oficial aconseja eliminar primero a los que curan o ponen escudos) o aleja de ellos al resto del grupo.
- **Exploders:** no dejes de moverte y deja que tu ataque automático les dé antes de que te alcancen.
- **Summoners:** acaba con ellos pronto, antes de que se acumulen más enemigos.

Algunos enemigos también disparan rayos avisando antes en el suelo. Sal de la zona marcada.

<!-- IMAGE PLACEHOLDER 4: screenshot of a telegraphed beam marker on the ground.
     Suggested file: /images/how-to-play/ground-marker.webp
     Suggested alt: "Aviso en el suelo de PokeSurvivor antes de que un enemigo dispare un rayo" -->

## Objetos del mapa y objetos equipables

- **Altares de poder, manantiales y trampas** están repartidos por el mapa. Usa los manantiales cuando vayas mal de vida; si se secan, se recargan solos.
- **Los cofres con candado** se abren cuando te quedas a su lado, así que despeja antes la zona.
- **Objetos equipables** como Restos, Cinta Elección o Vidasfera (Vidaesfera en Hispanoamérica): solo puedes llevar uno.
- **Meowth cargado de monedas:** un Meowth que huye de ti. Según el código del juego, el primero aparece entre los minutos 2 y 4, y un segundo, 4–6 minutos después (dos como máximo por run y nunca dentro de una grieta). No hace daño, se aleja en zigzag y se escapa a los 15 segundos. Si lo derrotas a tiempo, suelta 20 monedas de 5 cada una (100 monedas). Más o menos 1 de cada 4 veces aparece un Gholdengo en su lugar, que suelta menos monedas y además un ticket ×10 para el gacha.

## Eventos a mitad de partida

Cada 4–5 minutos el juego lanza uno de estos tres eventos (nunca el mismo dos veces seguidas), según el código de `js/systems/events.js`:

- **«¡Horda de tipo…!»:** durante 30 segundos llegan en masa enemigos de un solo tipo. Buen momento para cambiar a un movimiento muy eficaz contra ellos.
- **«¡Hora dorada!»:** durante 30 segundos, los enemigos en pantalla se vuelven dorados y dan el doble de experiencia.
- **Pokémon perdido:** llévalo a la marca en menos de 2 minutos sin que los enemigos lo alcancen. Recuperas la mitad de tu vida y ganas monedas y un ticket del gacha, y hay un 20% de probabilidades de que se una a tu colección.

## El clima y la tabla de tipos

La [tabla de tipos oficial](https://pokesurvivor.com/tipos/) da los multiplicadores: lo muy eficaz hace ×1,6, lo poco eficaz ×0,6 y las inmunidades ×0,3. Contra Pokémon de dos tipos los multiplicadores se multiplican entre sí, con un tope de ×2,4. Funciona igual cuando los enemigos te atacan a ti.

El clima aparece a partir del minuto 2 (más o menos uno de cada seis minutos) y dura alrededor de un minuto. Los valores de abajo salen del código del juego (`js/systems/weather.js`), revisado el 14 de octubre de 2026:

| Clima | Se potencia | Se debilita u otro efecto |
|---|---|---|
| Lluvia | Agua ×1,5, Eléctrico ×1,2 | Fuego ×0,5 |
| Sol abrasador | Fuego ×1,5 | Agua ×0,5 |
| Tormenta de arena | Roca, Tierra y Acero ×1,3 | Los demás tipos pierden vida poco a poco |
| Nevada | Hielo ×1,5 | Los demás tipos pierden vida poco a poco y van hasta un 10% más lentos |
| Niebla | Fantasma, Hada y Psíquico ×1,3 | Ninguno |

El daño de la arena y la nieve nunca te deja fuera de combate por sí solo. Regla práctica: cuando el clima favorezca a uno de tus movimientos, ponlo como activo.

## Errores típicos de principiante

1. **Quedarse quieto para recoger experiencia.** Sigue dando vueltas y recoge la experiencia en la siguiente pasada.
2. **Repartir los niveles entre cuatro movimientos.** Sube uno al nivel 5 y evoluciónalo primero.
3. **Saltarse la carta de mejora de tu movimiento principal.** Sin ella, la carta dorada de evolución no aparece nunca.
4. **No hacer caso a los avisos en el suelo.** Un aviso significa que viene un rayo: sal de ahí.
5. **Dejar vivos a los curanderos.** Pegarle más fuerte al grupo solo alimenta su curación.
6. **Jugar sesiones largas como invitado.** El progreso de invitado vive solo en tu navegador. Crea una cuenta para guardar en la nube.

## Tu primera grieta

En el mapa se abre una grieta misteriosa como mucho cada 2,5 minutos. Entra para luchar contra un legendario en una arena de su tipo. Si ganas, te llevas un ticket ×10 para el gacha y un vínculo que une dos movimientos en un solo hueco; si pierdes, vuelves al mapa sin premio. Tienes todos los detalles en la [guía de grietas y legendarios](/es/rifts/).

<!-- IMAGE PLACEHOLDER 5: screenshot of a Mysterious Rift on the map.
     Suggested file: /images/how-to-play/mysterious-rift.webp
     Suggested alt: "Grieta misteriosa de PokeSurvivor abriéndose en el mapa" -->

## Siguientes pasos

- Compara compañeros para la fase media y final en la [tier list de PokeSurvivor](/es/tier-list/).
- Juega con amigos: la [guía del cooperativo](/es/co-op/) explica cómo montar una partida multijugador.
- En el móvil: [PokeSurvivor en el móvil](/es/mobile/).
