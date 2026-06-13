# 🪚 Optimizador de Taller (Wood Cutting Optimizer)

Una aplicación web diseñada para optimizar el corte de planchas de madera y melamina en talleres de carpintería y fabricación de muebles. Este sistema permite ingresar una lista de despiece y calcula la distribución matemática más eficiente para minimizar el desperdicio de material, generando una hoja de ruta exportable en PDF.

## ✨ Características Principales

* **Interfaz de Usuario Intuitiva:** Panel de control estático (sin scroll global) para un ingreso rápido de piezas.
* **Motor Matemático:** Algoritmo en Python que evalúa y empaqueta las piezas considerando el grosor del disco de corte (Kerf).
* **Visualización en Tiempo Real:** Renderizado SVG interactivo a escala real de cada plancha y sus cortes.
* **Exportación Profesional:** Generación de PDF multipágina en alta resolución (vía `react-to-print`), incluyendo membrete con nombre del cliente, medidas, porcentaje de desperdicio y tablas de despiece por cada plancha.

## 🛠️ Tecnologías Utilizadas

**Frontend:**
* React.js (Vite)
* Tailwind CSS
* HTML2Canvas / React-to-Print / jsPDF

**Backend:**
* Python
* Flask & Flask-CORS

## ⚙️ Metodología de Desarrollo

Este proyecto fue construido utilizando prácticas modernas de **AI-Assisted Pair Programming** (Programación en pareja asistida por Inteligencia Artificial). 
El uso de modelos de lenguaje avanzados permitió iterar rápidamente sobre el diseño de la interfaz y la lógica del algoritmo de empaquetado (Bin Packing). Esto permitió enfocar el esfuerzo de ingeniería humano en el diseño de la arquitectura del sistema, la experiencia del usuario final (UX/UI) y un riguroso aseguramiento de calidad (QA) para garantizar que el producto cumpla con las exigencias del mundo real en un entorno de taller.

## 🚀 Cómo ejecutar el proyecto

Para correr este proyecto localmente, necesitas ejecutar ambos entornos (Frontend y Backend) en terminales separadas.

### 1. Iniciar el Backend (Python)
Asegúrate de tener Python instalado y ejecuta:
```bash
python app.py