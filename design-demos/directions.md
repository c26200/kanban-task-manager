# Kanban Flow — Rediseño 2026

## Spec (común a las tres direcciones)

**Qué es.** Tablero kanban de tres columnas con drag and drop, edición en línea y
persistencia en localStorage. Sin backend.

**Audiencia.** Reclutadores y equipos que evalúan producto; alguien que abre el repo dos
minutos.

**Mensaje central.** Un tablero que se siente como una herramienta, no como una demo.

**Tono.** Preciso y táctil. Orden sin rigidez.

**Formato.** Pantalla principal a 1440×900.

**Contenido real.** Columnas: To Do, In Progress, Done. Tareas: Analyze competitors;
Design high-fidelity wireframes; Set up the database (Supabase); Implement authentication;
Create the GitHub repository. Proporción 2 / 2 / 1. Acción "Reset board".

**Restricciones.** Sin emojis como iconos, sin gradientes morados, sin sombras flotantes
genéricas. Cuerpo ≥14 px, etiquetas ≥12 px, contraste ≥4.5:1.

---

## Candidatos

### 1 · Best designer — Dieter Rams (Braun)
- **Lógica.** «Menos, pero mejor»: función primero, gris técnico, un solo naranja de señal,
  tipografía neutra, todo alineado.
- **Qué se toma.** Fondo gris frío, tarjetas blancas, filetes finos, un acento naranja
  reservado a la acción.
- **Esqueleto.** Cabecera de instrumento + tres columnas de igual peso.
- **Audacia.** La contención: nada sobra.
- **Form.** Un tablero es una herramienta de trabajo; debe parecer un instrumento.

### 2 · Best designer — Massimo Vignelli
- **Lógica.** Helvetica, retícula, rojo y negro, jerarquía sin adornos.
- **Qué se toma.** Reglas gruesas, numeración, títulos a gran escala.
- **Esqueleto.** Cabecera editorial + tres columnas con filetes.
- **Audacia.** Casi todo es tipografía y reglas.
- **Form.** Un tablero es un documento de trabajo; se compone como tal.

### 3 · Referencia real — Linear
- **Lógica.** Herramienta oscura y precisa: densidad alta, acento violeta, microtipografía.
- **Qué se toma.** Fondo tinta, módulos con hairlines, chips de estado.
- **Esqueleto.** Rail izquierdo + columnas densas.
- **Audacia.** Densidad sin ruido.
- **Form.** Se usa durante horas; la densidad es una función.

### 4 · Referencia real — Trello
- **Lógica.** El kanban de referencia: tablero azul, listas blancas, tarjetas.
- **Qué se toma.** Fondo azul saturado, listas claras, tarjetas apiladas.
- **Esqueleto.** Fondo de tablero + tres listas.
- **Audacia.** El color del tablero como identidad.
- **Form.** Un kanban es una superficie; el color la define.

### 5 · Ruleta — web #11 Dark Editorial
- **Lógica.** Brittany Chiang: navy `#0A192F`, slate `#8892B0`, teal `#64FFDA`, rail fijo,
  secciones numeradas 01/02/03, Inter + JetBrains Mono.
- **Qué se toma.** Rail con índice numerado, un solo acento fluorescente, etiquetas mono.
- **Esqueleto.** Rail fijo + área de tablero desplazable.
- **Audacia.** El tablero como sistema de secciones numeradas.
- **Form.** Tres estados son tres secciones de un mismo documento.

### 6 · Ruleta — east #7 Solar-Term Palette
- **Lógica.** La paleta de los 24 términos solares: franjas verticales de color con nombre,
  la franja activa más alta y ancha; papel cálido y tinta.
- **Qué se toma.** Columnas como franjas de color con nombre; la columna activa se ensancha;
  serif para los títulos.
- **Esqueleto.** Tres franjas verticales a sangre con tarjetas encima.
- **Audacia.** Cada estado tiene un color con nombre propio.
- **Form.** Un tablero es un ciclo: cada columna es una estación del trabajo.

---

## Selección para versión completa

1. **Dirección 1 — Nightrail** (Dark Editorial). Navy + teal, rail numerado.
2. **Dirección 2 — Seasonal Board** (Solar-Term). Papel cálido, tres franjas de color.
3. **Dirección 3 — Instrument** (Dieter Rams). Gris frío, blanco, un naranja de señal.

Descartadas para completa (quedan como miniaturas): Vignelli, Linear, Trello.
