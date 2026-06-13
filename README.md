# Optimizador de Taller — Wood Cutting Optimizer

Aplicación web diseñada para optimizar el corte de planchas de madera y melamina en talleres de carpintería y fabricación de muebles.

El sistema permite ingresar una lista de despiece, calcular una distribución optimizada de las piezas y generar una hoja de ruta exportable en formato PDF, con el objetivo de reducir el desperdicio de material.

## Características principales

- **Interfaz intuitiva:** panel de control diseñado para facilitar el ingreso y la gestión de piezas.
- **Motor de optimización:** algoritmo desarrollado en Python que distribuye las piezas considerando el grosor del disco de corte o *kerf*.
- **Visualización interactiva:** representación SVG proporcional de cada plancha y de sus respectivos cortes.
- **Gestión de múltiples planchas:** distribución automática de las piezas cuando se requiere utilizar más de una plancha.
- **Exportación a PDF:** generación de un documento con información del cliente, medidas, porcentaje de desperdicio, diagramas de corte y tablas de despiece.

## Tecnologías utilizadas

### Frontend

- React.js
- Vite
- Tailwind CSS
- SVG
- React-to-Print
- HTML2Canvas
- jsPDF

### Backend

- Python
- Flask
- Flask-CORS

## Metodología de desarrollo

Este proyecto fue desarrollado utilizando prácticas de **programación en pareja asistida por inteligencia artificial** (*AI-Assisted Pair Programming*).

El uso de modelos de lenguaje permitió acelerar la iteración sobre la interfaz, la arquitectura y la lógica del algoritmo de empaquetado o *bin packing*.

El trabajo de ingeniería se concentró principalmente en:

- El diseño de la arquitectura del sistema.
- La experiencia de usuario y la interfaz.
- La validación de la lógica matemática.
- Las pruebas funcionales.
- El aseguramiento de calidad del producto.

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Python 3
- Node.js
- npm

## Ejecución del proyecto

El frontend y el backend deben ejecutarse en terminales separadas.

### 1. Iniciar el backend

Ubícate en la carpeta correspondiente al backend e instala las dependencias:

```bash
pip install -r requirements.txt
```

Luego inicia el servidor:

```bash
python app.py
```

El servidor de Flask estará disponible normalmente en:

```text
http://127.0.0.1:5000
```

### 2. Iniciar el frontend

Abre una nueva terminal, ubícate en la carpeta correspondiente al frontend e instala las dependencias:

```bash
npm install
```

Luego inicia el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173
```

## Autor y aseguramiento de calidad

**Michael Alexander Belmar Cabrera**

Proyecto enfocado en el aseguramiento de calidad y en la entrega de software funcional, procurando que la lógica de optimización se traduzca en una herramienta visualmente clara y aplicable a la fabricación de muebles y al trabajo en talleres.
