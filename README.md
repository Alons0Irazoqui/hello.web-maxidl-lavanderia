# MAXI DL Lavandería — Brief de Diseño y Desarrollo (Landing Page)

> Este documento es el **informe de negocio + especificaciones de diseño** para el desarrollador que construirá la landing page de **MAXI DL Lavandería**. Complementa el prompt inicial ya entregado para modificar la plantilla base HTML. Úsalo como fuente de verdad sobre el negocio, el branding y el estilo visual esperado.

---

## 1. Cómo trabajar en este proyecto

- El punto de partida es una **plantilla base en HTML** que ya recibiste con un prompt inicial.
- Este proyecto se construye **iterando con Claude**: puedes darle instrucciones directamente a Claude (dentro de tu editor / Claude Code) tantas veces como sea necesario —ajustar textos, colores, animaciones, orden de secciones, responsive, etc.— hasta llegar al resultado deseado. No es necesario que quede perfecto en el primer intento.
- Toda la información de negocio (sucursales, horarios, teléfono, servicios) y los lineamientos visuales de este documento son **el criterio a seguir**. Donde no se especifica algo puntual, queda a tu criterio de diseño, siempre respetando el estilo general descrito abajo.
- Los recursos gráficos (logo y fotos de sucursales) están en la carpeta [`imagenes/`](./imagenes).

---

## 2. Sobre el negocio

- **Nombre comercial:** MAXI DL Lavandería
- **Giro:** Lavandería de autoservicio / servicio completo — lavado y secado.
- **Zona de operación:** El Marqués, Querétaro, México.
- **Sucursales:** 3 (detalle abajo).
- **Servicio distintivo:** entrega rápida (una sucursal ofrece entrega en 3 horas) y servicio a domicilio para hoteles, restaurantes y empresas en otra sucursal.
- **Artículos que se lavan** (además de ropa en general, visto en la rotulación de una de las sucursales): cobijas, edredones, tenis, cubrecolchones, frazadas, almohadas, chamarras, mochilas y muñecos de peluche. *(Confirmar con el cliente si este listado aplica a las 3 sucursales o solo a una en particular; inclúyelo como parte de la sección de servicios como "algunos de los artículos que lavamos".)*

---

## 3. Sucursales

| Sucursal | Dirección | Horario | Servicios destacados |
|---|---|---|---|
| **1 · Bernal** | Carretera a Bernal Km 1, Col. El Paraíso, El Marqués, Qro. | 6:30 a.m. – 8:00 p.m. | Servicio a domicilio para hoteles, restaurantes y empresas · Lavado y secado |
| **2 · Chichimequillas** | Carretera Chichimequillas s/n, Col. Coyotillos, El Marqués, Qro. | 6:00 a.m. – 6:30 p.m. | Lavado y secado · Entrega en 3 horas |
| **3 · Paseos del Marqués** | Av. Paseos del Marqués, Fracc. Paseos del Marqués, El Marqués, Qro. | Lunes a Sábado, 8:00 a.m. – 8:00 p.m. (**cerrado domingo**) | Lavado y secado |

> **Nota:** el cliente no especificó un día de descanso para las sucursales 1 y 2, así que no asumas que cierran algún día salvo que se confirme. Para la sucursal 3 sí se confirmó explícitamente: **no opera domingo**, solo de lunes a sábado.

---

## 4. Contacto — muy importante

- **Único medio de contacto a mostrar en el sitio:** WhatsApp **773 123 36 67**.
- **No agregar** los números `442 209 8929` / `442 144 48 87` que aparecen en las fotos de las fachadas (son de rótulos antiguos que el cliente pidió descartar).
- **No agregar redes sociales.** El negocio no tiene, así que no incluyas íconos ni enlaces a Facebook/Instagram/etc. El único CTA de contacto es el botón/enlace de WhatsApp.

---

## 5. Identidad de marca (branding)

### 5.1 Logo

Archivo de referencia: [`imagenes/logo.jpeg`](./imagenes/logo.jpeg)

Descripción del logotipo:
- Insignia **circular** con contorno negro.
- Dentro del círculo: una ola/onda estilizada en tonos azul marino (parte inferior) y azul cian/turquesa (parte superior, con burbujas), formando una especie de gancho de ropa con un **saco/playera naranja colgada de un gancho** sobre la ola.
- Texto **"MAXI DL"** en azul marino con contorno blanco.
- Texto **"LAVANDERÍA"** en naranja, debajo del anterior.

**Tarea obligatoria para el desarrollador:** el archivo `logo.jpeg` disponible está bordado sobre tela blanca (tiene fondo), así que hay que **quitarle el fondo** (dejarlo en PNG/SVG con fondo transparente) antes de usarlo en el sitio — para el loader, el header/navbar, el favicon, etc. Si es necesario, vectorizar o limpiar el trazo del bordado para que se vea nítido en digital.

El cliente pidió explícitamente **resaltar el naranja y el azul** de la marca, y mantener el logotipo **en formato circular**.

### 5.2 Paleta de colores

Colores aproximados extraídos del logo (ajustar tono exacto una vez que el logo esté sin fondo y en mejor resolución):

| Color | Uso | Hex aproximado |
|---|---|---|
| Naranja corporativo | Acentos, CTA, detalles de marca, texto "LAVANDERÍA" | `#F5821F` |
| Azul marino | Texto "MAXI DL", tipografía principal, header/footer | `#173F80` |
| Azul cian / turquesa | Detalles de la ola, gradientes, hover states | `#2AACD1` |
| Negro / gris muy oscuro | Contorno del logo, texto de alto contraste | `#111111` |
| Blanco | Fondos limpios, contraste, espacios negativos | `#FFFFFF` |

Se recomienda usar naranja y azul como colores primarios/de acento (según pidió el cliente), con negro/blanco/grises neutros como base para lograr el estilo premium y minimalista descrito abajo.

### 5.3 Tipografía sugerida

Tipografía sans-serif moderna y geométrica para transmitir el estilo corporativo/high-tech (por ejemplo: Poppins, Montserrat, Inter o similar). Queda a criterio del desarrollador/Claude elegir la combinación final, siempre priorizando legibilidad y un look premium.

---

## 6. Estilo visual requerido

El sitio debe sentirse **premium, corporativo/enterprise, high-tech y elegante**, pero a la vez **minimalista** (mucho espacio en blanco, jerarquía clara, nada saturado). Piensa en el nivel de acabado de una marca grande, no en una lavandería de barrio genérica — aunque el negocio sea local, el sitio debe transmitir profesionalismo y confianza.

---

## 7. Efectos visuales y animaciones (obligatorios)

- **Pantalla de carga (loading screen):** al entrar al sitio, mostrar un splash/loader con el **logo** (sin fondo) y un **spinner de carga**, antes de revelar el contenido.
- **Animaciones al hacer scroll:** las secciones deben aparecer con animaciones (fade-in, slide-up, reveal, etc.) conforme el usuario va bajando por la página.
- **Efecto "máquina de escribir" (typewriter) en el título del Hero:** el texto principal del hero debe escribirse letra por letra como si fuera tecleado.
- **Cambio de color en las letras del título del Hero:** además del efecto typewriter, las letras del título deben tener algún efecto de cambio de color (por ejemplo, transición de color por letra, gradiente animado, o resaltado progresivo usando la paleta naranja/azul de la marca).
- Se pueden sumar micro-interacciones adicionales (hover en botones/tarjetas, scroll suave, parallax sutil, etc.) siempre que mantengan el estilo elegante y minimalista — esto queda a criterio del desarrollador.

---

## 8. Estructura sugerida de secciones

Sugerencia de orden para la landing (ajustable con Claude según cómo luzca mejor):

1. **Loader** (logo + spinner)
2. **Hero** — título con efecto typewriter/color, propuesta de valor, CTA a WhatsApp
3. **Quiénes somos / Sobre nosotros**
4. **Servicios** (lavado y secado, entrega en 3 horas, servicio a domicilio, artículos especiales que se lavan)
5. **Sucursales** — tarjetas con dirección, horario y, si aplica, mapa por sucursal
6. **Por qué elegirnos** (rapidez, cobertura de 3 sucursales, atención a hoteles/restaurantes/empresas, etc.)
7. **CTA final / Contacto** — botón de WhatsApp destacado (y botón flotante de WhatsApp fijo en toda la página)
8. **Footer** — logo, sucursales, horarios, WhatsApp (sin redes sociales)

---

## 9. Recursos disponibles

Carpeta [`imagenes/`](./imagenes):

| Archivo | Contenido |
|---|---|
| `logo.jpeg` | Logotipo oficial (bordado sobre tela, requiere quitar fondo) |
| `primera_sucursal.jpeg` | Fachada sucursal 1 — Bernal |
| `segunda_sucursal.jpeg` | Fachada sucursal 2 — Chichimequillas |
| `tercera_sucursal.jpeg` | Fachada sucursal 3 — Paseos del Marqués |

---

## 10. Checklist de pendientes

- [ ] Quitar el fondo del logo y dejarlo en PNG/SVG transparente (usar en loader, navbar y favicon)
- [ ] Usar únicamente el WhatsApp **773 123 36 67** como contacto — no mostrar los números 442
- [ ] No incluir iconos ni enlaces a redes sociales
- [ ] Reflejar que la sucursal 3 (Paseos del Marqués) **no abre domingo**
- [ ] Confirmar con el cliente si las sucursales 1 y 2 tienen algún día de descanso (no especificado)
- [ ] Implementar loader con logo + spinner
- [ ] Implementar animaciones on-scroll en todas las secciones
- [ ] Implementar efecto typewriter + cambio de color en el título del Hero
- [ ] Aplicar paleta de colores con énfasis en naranja y azul, estilo premium/minimalista
- [ ] Iterar con Claude hasta validar el resultado final con el cliente
