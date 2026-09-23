# Sonido Sur

Aplicación de inscripción para un festival con navegación entre pantallas, formulario con validación y guardado de la última inscripción.

## Cómo correr el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar la app:

```bash
npx expo start
```

### Si están dentro de la escuela / red interna

Si el emulador o el celular no conecta bien por red local, conviene usar tunnel:

```bash
npx expo start --tunnel
```

Esto ayuda cuando hay restricciones de red o firewall en el entorno escolar.

## Validación elegida

Se eligió `react-hook-form` para validar el formulario.

¿Por qué?
- permite centralizar la validación en cada campo
- maneja validaciones `required`, `minLength`, `max`, `pattern` con menos código
- deja el formulario más limpio y mantenible
- ayuda a practicar y familiarizarse con una librería muy usada en React Native/React

Se validan campos como:
- nombre completo
- email
- edad
- tipo de entrada
- teléfono opcional (solo números)

## Bonus resueltos

Se resolvieron ambos bonus:

### 1) Persistencia del último email con AsyncStorage
- al confirmar la inscripción, se guarda el email del último usuario en almacenamiento local
- cuando se abre la app nuevamente, ese email se precarga en el campo de email

### 2) Loading simulado de envío
- antes de habilitar la confirmación final, se simula un envío con un loading de 1 segundo con timeout
- se muestra spinner + texto tipo `Inscribiendote!`

- el botón queda deshabilitado durante ese tiempo

## Fotos del formulario
- Encontrables en /capturas

## Estructura del proyecto

- `App.js`: configuración de navegación principal
- `pages/HomePantalla.jsx`: pantalla de inicio
- `pages/InscripcionPantalla.jsx`: pantalla de inscripción
- `componentes/FormularioInscripcion.jsx`: formulario principal con validación y bonus
- `componentes/Footer.jsx`: navegación entre pantallas
- `componentes/TicketConfirmacion.jsx`: confirmación final

## Tecnologías usadas

- React Native
- Expo
- React Navigation
- React Hook Form
- AsyncStorage
