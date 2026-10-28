# XXII Legado Académico · Página web

Página oficial del XXII Legado Académico (Pontificia Universidad Javeriana Cali, enero de 2027).

**Dirección pública:** https://legado-academico.vercel.app

Esta dirección es la que va en el código QR de los carteles. **No cambies el nombre del proyecto en Vercel**: si lo cambias, cambia la dirección y el QR deja de funcionar.

---

## 1. ¿Qué archivo debo editar?

Casi todo lo que cambia con el tiempo está en un solo archivo:

```
js/config.js
```

Ábrelo con cualquier editor de texto (Bloc de notas, VS Code, o directamente en GitHub con el ícono del lápiz ✏️).

Reglas sencillas:

- Cambia **solo el texto que está entre comillas** `"..."`.
- No borres las comillas, los dos puntos `:` ni la coma `,` del final de cada línea.
- Si dejas un campo vacío (`""`), ese dato **no aparece** en la página.

## 2. Cambiar la fecha, el lugar, el horario o la modalidad

En `js/config.js` busca la línea y cambia el texto. Ejemplos:

| Quiero…                                   | Escribo                                                         |
|-------------------------------------------|-----------------------------------------------------------------|
| Poner la fecha exacta                     | `fecha: "Viernes 22 y sábado 23 de enero de 2027",`             |
| Quitar "Día exacto por confirmar"         | `fechaNota: "",`                                                |
| Indicar el auditorio                      | `lugarNota: "Auditorio ...",`                                   |
| Mostrar el horario                        | `horario: "8:00 a. m. a 5:00 p. m.",`                           |
| Mostrar la modalidad                      | `modalidad: "Presencial",`                                      |

> Los ejemplos son solo de formato. Escribe únicamente datos confirmados.

## 3. Activar las inscripciones

1. Copia el enlace del formulario de inscripción (Google Forms, Microsoft Forms, etc.).
2. En `js/config.js`, pégalo entre las comillas de `inscripcionUrl`:

   ```js
   inscripcionUrl: "https://forms.gle/tu-enlace",
   ```
3. Publica los cambios (paso 4).

Mientras `inscripcionUrl` esté vacío, el botón dice **"Próximamente"** y no lleva a ninguna parte.
Cuando tiene un enlace, el botón cambia solo a **"Inscribirme ahora"** y abre el formulario.

## 4. Volver a publicar los cambios

Los cambios **siempre** se publican sobre el mismo proyecto, así la dirección (y el QR) no cambian.

**Opción A — GitHub conectado a Vercel (recomendada):**
edita `js/config.js` directamente en GitHub (ícono del lápiz ✏️ → "Commit changes"). Vercel publica solo en 1 o 2 minutos. No hay que hacer nada más.

Si trabajas en tu computador con Git:

```bash
git add .
git commit -m "Actualiza fecha del evento"
git push
```

**Opción B — sin GitHub, desde la terminal**, dentro de esta carpeta:

```bash
npx vercel --prod
```

Después de publicar, abre la página en el celular y recarga para confirmar el cambio.

## 5. Generar el código QR para imprimir

1. Usa exactamente esta dirección: `https://legado-academico.vercel.app`
2. Entra a un generador de QR que permita descargar en **SVG** o en **PNG de alta resolución** (por ejemplo, [qr-code-generator.com](https://www.qr-code-generator.com/) o [goqr.me](https://goqr.me/)). Elige un **QR estático** (no "dinámico"): los dinámicos pasan por el servidor de la empresa y pueden dejar de funcionar si la suscripción vence.
3. Descarga en **SVG** (ideal para imprenta, no pierde calidad) o en PNG de al menos 1000 × 1000 px.
4. Recomendaciones de impresión:
   - Tamaño mínimo del QR en el cartel: **3 × 3 cm** (más grande si se va a leer de lejos).
   - QR oscuro sobre fondo claro, con un margen blanco alrededor.
5. **Antes de imprimir**, escanea el QR con varios celulares (Android y iPhone, distintas apps de cámara) y confirma que abre la página.

## 6. Estructura del proyecto

```
index.html            La página
css/styles.css        Estilos (colores, tipografía, olas, animaciones)
js/config.js          Datos editables (fecha, lugar, inscripción, Instagram)
js/main.js            Lógica de la página (no hace falta tocarla)
assets/logo.webp      Logo oficial
assets/og-image.png   Imagen que aparece al compartir el enlace en redes
assets/apple-touch-icon.png  Ícono al guardar la página en el inicio del iPhone
favicon.png           Ícono de la pestaña del navegador
vercel.json           Configuración de Vercel (caché y seguridad)
```

### Nota técnica (para quien edite estilos o lógica)

`css/`, `js/` y `assets/` se guardan en caché por un año en los navegadores. `js/config.js` es la excepción: nunca se guarda en caché, para que los cambios de datos se vean de inmediato.
Si modificas `css/styles.css` o `js/main.js`, sube el número de versión en `index.html` (`styles.css?v=1` → `?v=2`, `main.js?v=1` → `?v=2`) para que los visitantes reciban la versión nueva. Si reemplazas una imagen de `assets/`, cámbiale el nombre al archivo y actualiza las referencias.
