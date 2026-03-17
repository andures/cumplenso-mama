# Plan de Responsividad — Invitación 90 Años

## Objetivo
Que toda la invitación quepa en pantalla **sin hacer scroll** en cualquier teléfono común desde 2018 hasta hoy, tanto Samsung como iPhone.

---

## Dispositivos Target (CSS px — viewport width × height)

### Samsung (más comunes en Latinoamérica)
| Dispositivo | Ancho | Alto | DPR | Notas |
|---|---|---|---|---|
| Galaxy S10 | 360 | 760 | 3 | ⚠️ Más restrictivo Samsung |
| Galaxy S10+ | 412 | 869 | 3.5 | |
| Galaxy A52/A53/A54 | 360 | 800 | 2.5 | Gama media masiva |
| Galaxy A34 | 360 | 780 | 2.5 | |
| Galaxy S22 | 360 | 780 | 3 | |
| Galaxy S23/S24/S25 | 393 | 851 | 3 | |
| Galaxy S25+ | 412 | 915 | 3 | |
| Galaxy S25 Ultra | 412 | 915 | 3 | ✅ Ya se ve bien |

### iPhone
| Dispositivo | Ancho | Alto | DPR | Notas |
|---|---|---|---|---|
| iPhone SE (3rd gen) | 375 | 667 | 2 | ⚠️⚠️ Más restrictivo de todos |
| iPhone 12/13 mini | 375 | 812 | 3 | |
| iPhone 12/13/14 | 390 | 844 | 3 | |
| iPhone 14/15 Plus | 428 | 926 | 3 | |
| iPhone 14/15 Pro | 393 | 852 | 3 | |
| iPhone 14/15 Pro Max | 430 | 932 | 3 | |
| iPhone 16 Pro Max | 440 | 956 | 3 | |

---

## Breakpoints Clave

### Por ancho (MUI sx responsive)
```
xs  = 0–599px    → todos los teléfonos
sm  = 600px+     → tablets y desktop
md  = 900px+     → desktop grande
```

### Por **alto** (CSS media queries en index.css) ← CLAVE
```
@media (max-height: 670px)   → iPhone SE: 667px de alto
@media (max-height: 780px)   → S10 / S22 / A34: 760–780px de alto
@media (min-height: 840px)   → iPhones modernos, S23+
@media (min-height: 910px)   → S25 Ultra, iPhone Pro Max
```

---

## Problemas Identificados

| Problema | Causa | Dispositivos afectados |
|---|---|---|
| Contenido se corta / hay que scroll | Fuentes demasiado grandes para la altura | S10, A52 (360×760), iPhone SE |
| Aspecto "opaco" | Grid texture con DPR alto | Samsung S-series DPR 3x |
| Club BCIE muy cerca del botón | `space-evenly` no tiene suficiente espacio libre | Todas las pantallas < 800px |
| Photo demasiado grande | Tamaño fijo 105×175 en xs | iPhone SE |

---

## Estrategia de Solución

### 1. Typography fluid con `clamp()`
En vez de saltos bruscos `xs/sm`, usar `clamp(min, preferred, max)` con unidades `dvh` para que escalen PROPORCIONALMENTE al alto de pantalla:

```css
/* "90" */
font-size: clamp(3.8rem, 11dvh, 5rem);

/* "Años" */
font-size: clamp(2rem, 6dvh, 2.5rem);

/* "Leticia de Colindres" */
font-size: clamp(2.8rem, 8dvh, 3.4rem);
```

### 2. CSS Media queries por altura en `index.css`
```css
/* iPhone SE y pantallas muy cortas */
@media (max-height: 700px) {
  .inv-root { padding-top: 16px; padding-bottom: 16px; }
  /* reducir gaps entre secciones */
}

/* Pantallas medianas (S10, A52, S22) */
@media (max-height: 790px) {
  /* ajustes moderados */
}
```

### 3. Photo adaptativa por altura
```jsx
width: { xs: "clamp(80px, 26vw, 115px)" }
height: { xs: "clamp(130px, 43vw, 185px)" }
```

### 4. Padding y gaps fluid
- `pt` del contenido: `clamp(16px, 4dvh, 40px)`
- `pb`: `clamp(16px, 4dvh, 40px)`
- Márgenes entre secciones TOP BLOCK: `clamp(4px, 1dvh, 12px)`

---

## Plan de Implementación

### Fase 1 — Implementada ✅
- [x] Remover grid texture en móvil (fix opaco)
- [x] Reducir opacidad botanical xs
- [x] TOP BLOCK: reducir fuentes para xs
- [x] BOTTOM BLOCK: `gap: 2.5` mínimo en xs
- [x] Gran Salón en Club BCIE

### Fase 2 — En progreso 🔄
- [ ] `clamp()` en fuentes principales ("90", "Años", nombre)
- [ ] CSS media queries por altura en `index.css`
- [ ] Photo más pequeña en pantallas cortas
- [ ] Reducir padding vertical fluid

### Fase 3 — Pendiente
- [ ] Probar en DevTools con todos los devices listados
- [ ] Ajuste fino de spacing en iPhone SE (667px)
- [ ] Push final a Vercel

---

## Notas Técnicas

- MUI `sx` no soporta media queries por altura directamente → usar `index.css`
- `dvh` = dynamic viewport height (excluye chrome del navegador) → preferir sobre `vh`
- `clamp(a, b, c)` = min a, preferred b, max c → escala fluida
- Samsung DPR 3x: el grid de 5×5px se renderiza como 15×15px real → se ve borroso/opaco → ya resuelto con `backgroundImage: none` en xs
