# AGENTS.md - Angel Salazar Digital

## Architecture Overview

### Project Purpose
Angel Salazar Digital is a professional consulting website designed to solve the "ROI crisis" in Artificial Intelligence projects, where 95% of pilots fail to generate measurable financial results. The site positions the business as a strategic partner that transforms AI investments into measurable profitability systems using the "Order Before Tool" methodology.

### Technology Stack
- **HTML5**: Semantic markup with ARIA landmarks and accessibility features
- **CSS3**: Custom properties (CSS Variables), Flexbox, CSS Grid for responsive layouts
- **Vanilla JavaScript**: No frameworks - progressive enhancement approach
- **Accessibility**: WCAG 2.2 Level AA compliance (mandatory)
- **Performance**: Target Lighthouse scores: Performance >85, Accessibility >95

### Project Structure
```
/
├── index.html                 # Home - Need capture page
├── metodologia.html           # Methodology - "Order Before Tool" system
├── casos-exito.html          # Success Cases - Post-mortem analysis
├── recursos.html             # Resources - Knowledge management
├── diagnostico.html          # Diagnosis - Conversion form
├── css/
│   ├── variables.css         # Design system (colors, typography, spacing)
│   ├── base.css              # Reset, typography, base styles
│   ├── components.css        # Reusable components (buttons, cards, forms)
│   ├── layout.css            # Grid systems, containers, responsive
│   └── pages/
│       ├── home.css
│       ├── metodologia.css
│       ├── casos-exito.css
│       ├── recursos.css
│       └── diagnostico.css
├── js/
│   ├── main.js               # Core functionality, navigation
│   ├── form-validation.js    # Form validation and submission
│   ├── expandable.js         # Expandable sections (success cases)
│   └── analytics.js          # Event tracking
├── assets/
│   ├── images/               # Optimized images (WebP + fallbacks)
│   ├── icons/                # SVG icons
│   └── fonts/                # Web fonts (if needed)
└── docs/
    ├── design-system.md      # Design system documentation
    ├── accessibility.md      # Accessibility guidelines
    └── maintenance.md        # Maintenance procedures
```

### Key Design Principles
1. **Mobile-First**: Design starts at 320px width, then scales up
2. **Progressive Enhancement**: Core functionality works without JavaScript
3. **Semantic HTML**: Use correct HTML elements for their purpose
4. **Accessibility First**: WCAG 2.2 AA is non-negotiable, not optional
5. **Transparency**: Reflect the "Order Before Tool" methodology in code quality

### Site Architecture (5 Pages)
1. **Home** (`index.html`): PAS formula (Problem-Agitation-Solution), tangible results
2. **Methodology** (`metodologia.html`): 3 pillars system explanation
3. **Success Cases** (`casos-exito.html`): Post-mortem analysis with radical transparency
4. **Resources** (`recursos.html`): Knowledge management repository
5. **Diagnosis** (`diagnostico.html`): Intelligent conversion form

---

## Coding Conventions

### HTML Standards
- **Semantic markup is mandatory**: Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **ARIA landmarks**: All major sections must have appropriate ARIA roles
- **Heading hierarchy**: Must be logical (H1 → H2 → H3) without skipping levels
- **Form labels**: All inputs must have associated `<label>` elements with `for` attribute
- **Autocomplete attributes**: Required on all user data fields (email, name, etc.)

```html
<!-- ✅ CORRECT -->
<label for="email">Correo Empresarial</label>
<input 
  type="email" 
  id="email" 
  name="email" 
  autocomplete="email" 
  required
  aria-describedby="email-help"
>
<span id="email-help" class="help-text">Tu correo está seguro. Odiamos el spam tanto como tú</span>

<!-- ❌ INCORRECT -->
<div>Email</div>
<input type="text" name="mail">
```

### CSS Standards
- **Use CSS Custom Properties**: All colors, spacing, and typography must use CSS variables defined in `variables.css`
- **Mobile-First Media Queries**: Start with base mobile styles, add `min-width` media queries
- **BEM-like Naming**: Use descriptive class names (`.caso-exito__resultado`, `.cta-primary`)
- **No inline styles**: All styles must be in CSS files
- **Contrast ratios**: Minimum 4.5:1 for normal text, 3:1 for large text (18px+)

```css
/* ✅ CORRECT */
:root {
  --color-primary: #3D0066;
  --spacing-unit: 8px;
}

.cta-primary {
  background: var(--color-primary);
  padding: calc(var(--spacing-unit) * 2);
}

@media (min-width: 768px) {
  .cta-primary {
    padding: calc(var(--spacing-unit) * 3);
  }
}

/* ❌ INCORRECT */
.button {
  background: #3D0066; /* No usar valores hardcoded */
  padding: 16px; /* Usar variables de spacing */
}
```

### JavaScript Standards
- **Vanilla JS only**: No frameworks or libraries (except for production enhancements if explicitly approved)
- **ES6+ syntax**: Use `const`/`let`, arrow functions, template literals, async/await
- **Progressive enhancement**: Site must work without JavaScript for core functionality
- **Event delegation**: Use event delegation for dynamic content
- **Accessibility**: All interactive elements must be keyboard accessible

```javascript
// ✅ CORRECT
const form = document.getElementById('diagnostico-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const button = form.querySelector('button[type="submit"]');
  
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.textContent = 'Enviando...';
  
  try {
    const response = await fetch('/api/diagnostico', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      showSuccessMessage();
    } else {
      showErrorMessage();
    }
  } catch (error) {
    showErrorMessage(error.message);
  } finally {
    button.disabled = false;
    button.setAttribute('aria-busy', 'false');
    button.textContent = 'Obtener mi Diagnóstico de ROI';
  }
});

// ❌ INCORRECT
$('#form').submit(function() {  // No jQuery
  // No async/await, no error handling, no accessibility
});
```

### Accessibility Requirements
- **Skip links**: Must be present on all pages
- **Focus indicators**: Minimum 3px solid outline with 2px offset
- **ARIA labels**: All icons and icon-only buttons must have `aria-label`
- **Live regions**: Use `aria-live` for dynamic content updates
- **Keyboard navigation**: All functionality must work with keyboard only
- **Screen reader testing**: Code must be tested with NVDA (Windows) or VoiceOver (macOS)

```html
<!-- ✅ CORRECT -->
<a href="#main-content" class="skip-link">Saltar al contenido principal</a>

<button 
  aria-expanded="false" 
  aria-controls="nabolic-details"
  class="expand-button"
>
  Ver análisis completo de Nabolic Fitness
</button>

<div id="nabolic-details" hidden>
  <!-- Expandable content -->
</div>

<!-- ❌ INCORRECT -->
<div onclick="toggle()">Click here</div> <!-- Not keyboard accessible -->
```

### Code Quality Tools
- **HTML Validation**: Must pass W3C HTML Validator with 0 errors
- **CSS Validation**: Must pass W3C CSS Validator with 0 critical errors
- **Accessibility**: Must score >95 on Lighthouse Accessibility
- **Performance**: Must score >85 on Lighthouse Performance
- **WAVE**: Must have 0 errors, <5 alerts

---

## Running Tests

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, or Edge - latest 2 versions)
- Local web server (Live Server extension for VS Code recommended)
- Internet connection for validation tools

### Installation
```bash
# No build process required - vanilla HTML/CSS/JS
# Simply clone the repository and open in a local server

# If using VS Code:
# 1. Install "Live Server" extension
# 2. Right-click on index.html
# 3. Select "Open with Live Server"
```

### Manual Testing Checklist

#### 1. HTML Validation
```bash
# Online: https://validator.w3.org/
# Upload each HTML file or validate by URI
# Required: 0 errors, <3 warnings
```

#### 2. CSS Validation
```bash
# Online: https://jigsaw.w3.org/css-validator/
# Upload CSS files or validate by URI
# Required: 0 errors
```

#### 3. Accessibility Testing
```bash
# WAVE Browser Extension
# 1. Install WAVE from https://wave.webaim.org/extension/
# 2. Open each page in browser
# 3. Click WAVE icon
# Required: 0 errors, <5 alerts

# Lighthouse (Chrome DevTools)
# 1. Open Chrome DevTools (F12)
# 2. Go to "Lighthouse" tab
# 3. Select "Accessibility" and "Performance"
# 4. Click "Generate report"
# Required: Accessibility >95, Performance >85
```

#### 4. Keyboard Navigation Testing
```bash
# Manual test procedure:
# 1. Load page in browser
# 2. Use only Tab, Shift+Tab, Enter, Space, Arrow keys
# 3. Verify all interactive elements are reachable
# 4. Verify focus indicator is always visible
# 5. Verify logical tab order
# Required: All functionality accessible via keyboard
```

#### 5. Screen Reader Testing
```bash
# Windows (NVDA):
# 1. Download NVDA from https://www.nvaccess.org/
# 2. Start NVDA
# 3. Navigate page using screen reader commands
# 4. Verify all content is announced correctly

# macOS (VoiceOver):
# 1. Press Cmd+F5 to enable VoiceOver
# 2. Navigate page using VoiceOver commands
# 3. Verify all content is announced correctly
```

#### 6. Responsive Testing
```bash
# Test at these breakpoints:
# - 320px (iPhone SE)
# - 375px (iPhone 12)
# - 768px (iPad Portrait)
# - 1024px (iPad Landscape / Small Desktop)
# - 1440px (Desktop)
# - 1920px (Full HD Desktop)

# Chrome DevTools:
# 1. Open DevTools (F12)
# 2. Click device toolbar icon (Ctrl+Shift+M)
# 3. Test each breakpoint
# Required: No horizontal scroll, content readable at all sizes
```

#### 7. Cross-Browser Testing
```bash
# Required browsers (latest 2 versions):
# - Google Chrome
# - Mozilla Firefox
# - Apple Safari
# - Microsoft Edge

# Verify:
# - Layout consistency
# - Functionality works
# - Forms submit correctly
# - Accessibility features work
```

#### 8. Contrast Ratio Testing
```bash
# WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
# Test these combinations:
# - Primary CTA (purple #3D0066) on white
# - Text on all background colors
# - Focus indicators
# Required: 4.5:1 for normal text, 3:1 for large text (18px+)
```

### Automated Testing Script
```javascript
// Create a file: test/accessibility-check.js
// Run in browser console on each page

(function accessibilityCheck() {
  const issues = [];
  
  // Check for skip links
  const skipLink = document.querySelector('.skip-link');
  if (!skipLink) {
    issues.push('Missing skip link');
  }
  
  // Check heading hierarchy
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let lastLevel = 0;
  headings.forEach(heading => {
    const level = parseInt(heading.tagName[1]);
    if (level - lastLevel > 1) {
      issues.push(`Heading hierarchy skip: ${heading.tagName} after H${lastLevel}`);
    }
    lastLevel = level;
  });
  
  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.hasAttribute('alt')) {
      issues.push(`Image missing alt text: ${img.src}`);
    }
  });
  
  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    if (!input.id || !document.querySelector(`label[for="${input.id}"]`)) {
      issues.push(`Input missing associated label: ${input.name}`);
    }
  });
  
  // Check for buttons without text
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent.trim() && !button.getAttribute('aria-label')) {
      issues.push('Button without text or aria-label');
    }
  });
  
  if (issues.length === 0) {
    console.log('✅ All accessibility checks passed!');
  } else {
    console.error('❌ Accessibility issues found:');
    issues.forEach(issue => console.error(`  - ${issue}`));
  }
  
  return issues;
})();
```

### Performance Testing
```bash
# Lighthouse Performance
# Target metrics:
# - First Contentful Paint: <2s
# - Time to Interactive: <3.5s
# - Largest Contentful Paint: <2.5s
# - Cumulative Layout Shift: <0.1
# - Total Blocking Time: <200ms

# Image optimization check:
# - All images must be optimized (WebP with PNG/JPG fallback)
# - No images >500KB
# - Responsive images using srcset where appropriate
```

---

## Common Tasks

### Task 1: Adding a New Page

**When to use**: Creating additional pages like blog posts, case studies, or service pages.

**Step-by-step procedure**:

1. **Create the HTML file**
```bash
# Create new file in root directory
touch nueva-pagina.html
```

2. **Use the page template**
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="[DESCRIPTION - Max 160 characters]">
  <title>[PAGE TITLE] | Angel Salazar Digital</title>
  
  <!-- Stylesheets -->
  <link rel="stylesheet" href="css/variables.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/layout.css">
  <link rel="stylesheet" href="css/pages/[nueva-pagina].css">
</head>
<body>
  <!-- Skip Link -->
  <a href="#main-content" class="skip-link">Saltar al contenido principal</a>
  
  <!-- Header -->
  <header role="banner">
    <nav role="navigation" aria-label="Navegación principal">
      <ul>
        <li><a href="/">Inicio</a></li>
        <li><a href="/metodologia.html">Metodología</a></li>
        <li><a href="/casos-exito.html">Casos de Éxito</a></li>
        <li><a href="/recursos.html">Recursos</a></li>
        <li><a href="/diagnostico.html">Diagnóstico</a></li>
      </ul>
    </nav>
  </header>
  
  <!-- Main Content -->
  <main id="main-content" role="main">
    <h1>[PAGE HEADING]</h1>
    <!-- Page content here -->
  </main>
  
  <!-- Footer -->
  <footer role="contentinfo">
    <div class="footer-contact">
      <h2>Contacto</h2>
      <p>Teléfono: [PHONE]</p>
      <p>Email: [EMAIL]</p>
      <p>Horario: [SCHEDULE]</p>
    </div>
    <nav aria-label="Enlaces legales">
      <ul>
        <li><a href="/accesibilidad.html">Declaración de Accesibilidad</a></li>
        <li><a href="/privacidad.html">Política de Privacidad</a></li>
        <li><a href="/terminos.html">Términos y Condiciones</a></li>
      </ul>
    </nav>
  </footer>
  
  <!-- Scripts -->
  <script src="js/main.js"></script>
</body>
</html>
```

3. **Create page-specific CSS**
```bash
# Create CSS file in css/pages/
touch css/pages/nueva-pagina.css
```

4. **Validate the page**
```bash
# Run through testing checklist:
# - HTML validation
# - Accessibility check with WAVE
# - Lighthouse audit
# - Keyboard navigation test
# - Responsive design check
```

5. **Update sitemap**
```bash
# Add to sitemap.xml if it exists
# Update internal navigation if needed
```

---

### Task 2: Adding a New Success Case (Caso de Éxito)

**When to use**: Adding a new client case study to casos-exito.html

**Step-by-step procedure**:

1. **Gather required information**
```
Required data:
- Client name and industry
- Initial context (2-3 sentences)
- 3 critical errors with:
  - The Problem (specific situation)
  - The Correction (solution implemented)
  - Lesson Learned (systemic insight)
- Quantifiable results (before/after metrics)
- Decisive factor (key insight)
- Timeline (months to results)
```

2. **Add case to casos-exito.html** (insert after existing cases)
```html
<section class="caso-exito" id="[client-slug]">
  <h3>[CLIENT NAME]</h3>
  <p class="caso-exito__industria">[Industry/Sector]</p>
  
  <div class="caso-exito__contexto">
    <h4>Contexto Inicial</h4>
    <p>[Initial context description]</p>
  </div>
  
  <div class="caso-exito__obstaculos">
    <h4>Obstáculos Superados</h4>
    
    <div class="obstaculo">
      <h5>🔴 Error Crítico #1: [Title]</h5>
      <p><strong>El Problema:</strong> [Specific problem description]</p>
      <p><strong>La Corrección:</strong> [Solution implemented]</p>
      <p><strong>Lección Aprendida:</strong> [Systemic insight]</p>
    </div>
    
    <div class="obstaculo">
      <h5>🔴 Error Crítico #2: [Title]</h5>
      <p><strong>El Problema:</strong> [Specific problem description]</p>
      <p><strong>La Corrección:</strong> [Solution implemented]</p>
      <p><strong>Lección Aprendida:</strong> [Systemic insight]</p>
    </div>
    
    <div class="obstaculo">
      <h5>🔴 Error Crítico #3: [Title]</h5>
      <p><strong>El Problema:</strong> [Specific problem description]</p>
      <p><strong>La Corrección:</strong> [Solution implemented]</p>
      <p><strong>Lección Aprendida:</strong> [Systemic insight]</p>
    </div>
  </div>
  
  <div class="caso-exito__resultados">
    <h4>✅ Resultados en [X] Meses</h4>
    <table class="tabla-resultados">
      <caption>Resultados cuantificables de [CLIENT NAME]</caption>
      <thead>
        <tr>
          <th scope="col">Métrica</th>
          <th scope="col">Antes</th>
          <th scope="col">Después</th>
          <th scope="col">Impacto</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>[Metric name]</td>
          <td>[Before value]</td>
          <td>[After value]</td>
          <td class="impacto-positivo">[+X%]</td>
        </tr>
        <!-- Add more rows as needed -->
      </tbody>
    </table>
  </div>
  
  <div class="caso-exito__factor-decisivo factor-decisivo">
    <h4>💡 El Factor Decisivo</h4>
    <p>[Key insight that made the difference]</p>
  </div>
</section>
```

3. **Validate the new case**
```bash
# Check:
# - All headings are in correct hierarchy
# - Table has proper caption and scope attributes
# - Metrics are quantifiable (percentages, hours, costs)
# - Icons have aria-labels if needed
# - Contrast ratios meet 4.5:1 minimum
```

---

### Task 3: Updating Form Validation Rules

**When to use**: Modifying validation logic in diagnostico.html form

**Step-by-step procedure**:

1. **Locate the form validation code** in `js/form-validation.js`

2. **Update validation rules** following this pattern:
```javascript
const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Por favor ingrese un email válido'
  },
  nombre: {
    required: true,
    minLength: 2,
    message: 'El nombre debe tener al menos 2 caracteres'
  },
  industria: {
    required: true,
    message: 'Por favor seleccione una industria'
  },
  frustracion: {
    required: true,
    minLength: 10,
    message: 'Por favor describa su frustración (mínimo 10 caracteres)'
  }
};

function validateField(field) {
  const rule = validationRules[field.name];
  if (!rule) return true;
  
  const value = field.value.trim();
  
  // Check required
  if (rule.required && !value) {
    showError(field, rule.message);
    return false;
  }
  
  // Check pattern
  if (rule.pattern && !rule.pattern.test(value)) {
    showError(field, rule.message);
    return false;
  }
  
  // Check minLength
  if (rule.minLength && value.length < rule.minLength) {
    showError(field, rule.message);
    return false;
  }
  
  clearError(field);
  return true;
}

function showError(field, message) {
  const errorId = `${field.id}-error`;
  let errorElement = document.getElementById(errorId);
  
  if (!errorElement) {
    errorElement = document.createElement('span');
    errorElement.id = errorId;
    errorElement.className = 'error-message';
    errorElement.setAttribute('role', 'alert');
    field.parentNode.appendChild(errorElement);
  }
  
  errorElement.textContent = message;
  field.setAttribute('aria-invalid', 'true');
  field.setAttribute('aria-describedby', errorId);
}

function clearError(field) {
  const errorId = `${field.id}-error`;
  const errorElement = document.getElementById(errorId);
  
  if (errorElement) {
    errorElement.textContent = '';
  }
  
  field.setAttribute('aria-invalid', 'false');
  field.removeAttribute('aria-describedby');
}
```

3. **Update HTML if adding new fields**
```html
<div class="form-group">
  <label for="nuevo-campo">Etiqueta del Campo</label>
  <input 
    type="text" 
    id="nuevo-campo" 
    name="nuevo-campo" 
    autocomplete="[appropriate-value]"
    required
  >
  <span class="help-text">Texto de ayuda opcional</span>
</div>
```

4. **Test validation**
```bash
# Manual testing checklist:
# - Submit empty form (all required fields show errors)
# - Enter invalid data (errors show for specific fields)
# - Enter valid data (errors clear, form submits)
# - Test with keyboard only (errors are announced)
# - Test with screen reader (NVDA/VoiceOver)
```

---

### Task 4: Optimizing Images

**When to use**: Adding new images or optimizing existing ones

**Step-by-step procedure**:

1. **Prepare source images**
```bash
# Required formats:
# - WebP (modern browsers)
# - PNG or JPG (fallback for older browsers)

# Target sizes:
# - Mobile: 640px wide
# - Tablet: 1024px wide
# - Desktop: 1920px wide
```

2. **Optimize images**
```bash
# Online tools:
# - TinyPNG: https://tinypng.com/
# - Squoosh: https://squoosh.app/
# - ImageOptim (macOS): https://imageoptim.com/

# Target file sizes:
# - Hero images: <200KB
# - Content images: <100KB
# - Icons/logos: <50KB
```

3. **Use responsive images in HTML**
```html
<picture>
  <source 
    srcset="assets/images/hero-640.webp 640w,
            assets/images/hero-1024.webp 1024w,
            assets/images/hero-1920.webp 1920w"
    sizes="(max-width: 640px) 640px,
           (max-width: 1024px) 1024px,
           1920px"
    type="image/webp"
  >
  <img 
    src="assets/images/hero-1920.jpg"
    srcset="assets/images/hero-640.jpg 640w,
            assets/images/hero-1024.jpg 1024w,
            assets/images/hero-1920.jpg 1920w"
    sizes="(max-width: 640px) 640px,
           (max-width: 1024px) 1024px,
           1920px"
    alt="[Descriptive alt text]"
    loading="lazy"
    width="1920"
    height="1080"
  >
</picture>
```

4. **Validate image optimization**
```bash
# Check in Lighthouse:
# - "Serve images in next-gen formats" (WebP)
# - "Properly size images"
# - "Defer offscreen images"
# - "Efficiently encode images"

# All checks should pass or show green
```

---

### Task 5: Updating Design System Colors

**When to use**: Changing brand colors or adding new color variables

**Step-by-step procedure**:

1. **Update `css/variables.css`**
```css
:root {
  /* Primary Colors */
  --color-primary: #3D0066;
  --color-primary-light: #5E35B1;
  --color-primary-dark: #1A0029;
  
  /* Secondary Colors */
  --color-secondary: #F57C00;
  --color-secondary-light: #FFB74D;
  --color-secondary-dark: #E65100;
  
  /* Semantic Colors */
  --color-success: #388E3C;
  --color-error: #D32F2F;
  --color-warning: #F57C00;
  --color-info: #1976D2;
  
  /* Neutral Colors */
  --color-text: #212121;
  --color-text-light: #757575;
  --color-background: #FFFFFF;
  --color-background-alt: #F5F5F5;
  --color-border: #E0E0E0;
}
```

2. **Test contrast ratios**
```bash
# For each new color combination, check:
# https://webaim.org/resources/contrastchecker/

# Text on backgrounds:
# - Normal text (16px): Minimum 4.5:1
# - Large text (18px+): Minimum 3:1
# - Interactive elements: Minimum 4.5:1

# Document all passing combinations in design-system.md
```

3. **Update component styles** if needed
```css
/* Only if components were using hardcoded colors */
.cta-primary {
  background: var(--color-primary); /* ✅ Using variable */
  /* background: #3D0066; */ /* ❌ Remove hardcoded value */
}
```

4. **Visual regression testing**
```bash
# Manual check all pages:
# 1. Open each page in browser
# 2. Verify all colors display correctly
# 3. Check hover/focus/active states
# 4. Verify readability at all breakpoints
```

5. **Update documentation**
```bash
# Update docs/design-system.md with:
# - New color values
# - Contrast ratio results
# - Usage guidelines
# - Visual examples
```

---

### Task 6: Making Content Editable Without Breaking Accessibility

**When to use**: Updating copy, adding content, or restructuring sections

**Critical rules**:

1. **Never remove or modify accessibility attributes**
```html
<!-- ❌ DON'T DO THIS -->
<button onclick="toggle()">Click</button>

<!-- ✅ DO THIS -->
<button 
  aria-expanded="false" 
  aria-controls="details-section"
  onclick="toggle()"
>
  Ver detalles
</button>
```

2. **Maintain heading hierarchy**
```html
<!-- ❌ DON'T DO THIS -->
<h1>Page Title</h1>
<h3>Subsection</h3> <!-- Skipped H2 -->

<!-- ✅ DO THIS -->
<h1>Page Title</h1>
<h2>Main Section</h2>
<h3>Subsection</h3>
```

3. **Keep form associations intact**
```html
<!-- ❌ DON'T DO THIS -->
<label>Email</label>
<input type="email">

<!-- ✅ DO THIS -->
<label for="email">Email</label>
<input type="email" id="email" name="email">
```

4. **Preserve ARIA landmarks**
```html
<!-- ❌ DON'T DO THIS -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- ✅ DO THIS -->
<header role="banner">
  <nav role="navigation" aria-label="Navegación principal">...</nav>
</header>
```

5. **After any content change, run**:
```
