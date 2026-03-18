# Automatización de Emisión y Control de Contratación Masiva

## 📌 Resumen del Proyecto
[cite_start]Este sistema centraliza y automatiza el ciclo de vida de la documentación legal para el ingreso de personal en una red de sucursales con más de 1,600 empleados[cite: 30, 40]. [cite_start]Mediante la integración de **Google Apps Script**, **Google Sheets** y **Autocrat**, se logró transformar un proceso manual propenso a errores en un flujo de datos estandarizado y eficiente[cite: 29, 63].

## ⚠️ El Desafío (Análisis de Problemas)
Antes de la implementación, el proceso presentaba fallas críticas de integridad de datos y latencia operativa:
* [cite_start]**Alta Tasa de Error:** 7 de cada 10 contratos recibidos contenían errores de redacción, montos o cargos[cite: 37].
* [cite_start]**Inconsistencia de Datos:** Uso de formatos obsoletos y errores en datos sensibles como sueldos, horarios y fechas[cite: 33].
* [cite_start]**Latencia en el Onboarding:** El proceso de ingreso podía demorar hasta un mes por re-procesos, afectando el pago del personal nuevo[cite: 38].
* [cite_start]**Fragmentación:** Falta de estandarización en la captura de información en los distintos puntos de la red[cite: 30, 34].

## 🛠️ Stack Tecnológico
* [cite_start]**Google Apps Script:** Motor de lógica para consolidación de datos, automatización de correos y conversión de archivos[cite: 39, 43, 57].
* [cite_start]**Google Sheets:** Actúa como Base de Datos Maestra y Central de Solicitudes[cite: 39, 49].
* [cite_start]**Autocrat:** Herramienta para el mapeo de etiquetas (tags) y generación de documentos dinámicos[cite: 39, 41].
* [cite_start]**HTML/CSS:** Para el diseño y estructura de las notificaciones de correo electrónico[cite: 58].

## 🧠 Lógica de Ingeniería y Flujo de Trabajo

### 1. Ingesta de Datos y Validación (Input)
[cite_start]Implementé interfaces de captura independientes por sucursal con validación de datos en tiempo real[cite: 44, 46]. [cite_start]Utilicé la función `FILTER` para crear cintas desplegables condicionales que aseguran que el cargo y horario seleccionados sean válidos y actuales[cite: 44, 45].

### 2. Consolidación y Procesamiento (ETL)
* [cite_start]**Macros de Consolidación:** Mediante Apps Script, la información se envía desde cada sucursal a una "Central de Solicitudes" como valores puros para mantener la integridad[cite: 47, 48].
* [cite_start]**Enriquecimiento de Datos:** El sistema utiliza `BUSCARX` para asignar automáticamente la empresa contratante, sueldos y datos del representante legal basándose en el cargo y sucursal[cite: 49, 50].

### 3. Generación y Distribución (Output)
* [cite_start]**Generación Dinámica:** Ejecución de 3 plantillas de contrato diferenciadas según la lógica de negocio[cite: 52, 53].
* [cite_start]**Tratamiento de Archivos:** El script convierte los contratos generados a formato PDF para garantizar la inmutabilidad[cite: 60].
* [cite_start]**Notificación Automatizada:** Envío de correos mediante Apps Script con hipervínculos dinámicos a guías de llenado y planillas adicionales según el perfil del empleado[cite: 58, 59, 61].

## 📈 Impacto y Resultados Medibles
* [cite_start]**Precisión Documental:** Se alcanzó un **100% de perfección** en la emisión de contratos gracias a la estandarización[cite: 63].
* [cite_start]**Reducción de Errores:** Mitigación del error humano en un **93%** (estimado) en el llenado de formatos[cite: 62].
* [cite_start]**Eficiencia Operativa:** Reducción significativa de los tiempos de ingreso, garantizando el abono de nómina oportuno para el personal nuevo[cite: 67].
* [cite_start]**Optimización de Recursos:** Eliminación de la búsqueda manual de formatos y redacción individual de contratos en las sucursales[cite: 64, 66].
