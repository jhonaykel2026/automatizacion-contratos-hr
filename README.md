# Automatización de Emisión y Control de Contratación Masiva

## 📌 Resumen del Proyecto
Este sistema centraliza y automatiza el ciclo de vida de la documentación legal para el ingreso de personal en una red de sucursales con más de 1,600 empleados. Mediante la integración de **Google Apps Script**, **Google Sheets** y **Autocrat**, se logró transformar un proceso manual propenso a errores en un flujo de datos estandarizado y eficiente.

## ⚠️ El Desafío (Análisis de Problemas)
Antes de la implementación, el proceso presentaba fallas críticas de integridad de datos y latencia operativa:
* **Alta Tasa de Error:** 7 de cada 10 contratos recibidos contenían errores de redacción, montos o cargos.
* **Inconsistencia de Datos:** Uso de formatos obsoletos y errores en datos sensibles como sueldos, horarios y fechas.
* **Latencia en el Onboarding:** El proceso de ingreso podía demorar hasta un mes por re-procesos, afectando el pago del personal nuevo.
* **Fragmentación:** Falta de estandarización en la captura de información en los distintos puntos de la red.

## 🛠️ Stack Tecnológico
* **Google Apps Script:** Motor de lógica para consolidación de datos, automatización de correos y conversión de archivos(Lógica diseñada por mí e implementada mediante la optimización de scripts y herramientas de IA generativa para maximizar la eficiencia del código).
* **Google Sheets:** Actúa como Base de Datos Maestra y Central de Solicitudes.
* **Autocrat:** Herramienta para el mapeo de etiquetas (tags) y generación de documentos dinámicos.
* **HTML/CSS:** Para el diseño y estructura de las notificaciones de correo electrónico.

## 🧠 Lógica de Ingeniería y Flujo de Trabajo

### 1. Ingesta de Datos y Validación (Input)
Implementé interfaces de captura independientes por sucursal con validación de datos en tiempo real. Utilicé la función `FILTER` para crear cintas desplegables condicionales que aseguran que campos como el cargo y horario seleccionados sean válidos y actuales.

### 2. Consolidación y Procesamiento (ETL)
* **Macros de Consolidación:** Mediante Apps Script, la información se envía desde cada sucursal a una "Central de Solicitudes" como valores puros para mantener la integridad.
* **Enriquecimiento de Datos:** El sistema utiliza `BUSCARX` para asignar automáticamente la empresa contratante, sueldos y datos del representante legal basándose en el cargo y sucursal.

### 3. Generación y Distribución (Output)
* **Generación Dinámica:** Ejecución de 3 plantillas de contrato diferenciadas según la lógica de negocio.
* **Tratamiento de Archivos:** El script convierte los contratos generados a formato PDF para garantizar la inmutabilidad.
* **Notificación Automatizada:** Envío de correos mediante Apps Script con hipervínculos dinámicos a guías de llenado y planillas adicionales según el perfil del empleado.

## 📈 Impacto y Resultados Medibles
* **Precisión Documental:** Se alcanzó un **100% de perfección** en la emisión de contratos gracias a la estandarización.
* **Reducción de Errores:** Mitigación del error humano en un **93%** (estimado) en el llenado de formatos.
* **Eficiencia Operativa:** Reducción de los tiempos de ingreso, garantizando el abono de nómina oportuno para el personal nuevo.
* **Optimización de Recursos:** Eliminación de la búsqueda manual de formatos y redacción individual de contratos en las sucursales.
