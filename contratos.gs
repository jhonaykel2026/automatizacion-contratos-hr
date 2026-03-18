/**
 * SISTEMA DE AUTOMATIZACIÓN DE CONTRATACIÓN (VERSION 1.0)
 * Diseñado para la gestión masiva de expedientes legales.
 */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('⚙️ Gestión de Contratos')
    .addItem('🚀 Ejecutar Emisión Masiva', 'processContractIssuance')
    .addItem('🔄 Consolidar Base de Datos', 'consolidateRequests')
    .addToUi();
}

/**
 * Función Principal: Procesa la cola de impresión, genera PDFs y envía notificaciones.
 */
function processContractIssuance() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const deliverySheet = ss.getSheetByName('ENVÍO - CONTRATOS');
  const lastRow = deliverySheet.getLastRow();
  
  if (lastRow < 2) return; 

  // Captura de matriz de datos (A2:Z)
  const dataRange = deliverySheet.getRange(2, 1, lastRow - 1, 26).getValues();
  
  // Configuración de Seguridad y Destinatarios (Sanitizado)
  const emailCC = 'archivo.rrhh@empresa-ejemplo.com, gerencia.operativa@empresa-ejemplo.com';
  const driveIdRegex = /[-\w]{25,}/;
  
  // Mapeo de Documentación Complementaria (Etiquetas y Columnas 0-based)
  const supplementaryDocs = [
    { label: 'Planillas de Ingreso', col: 19 },
    { label: 'Instructivo de Llenado', col: 20 },
    { label: 'Lista de Verificación de Documentos', col: 21 },
    { label: 'Ficha de Registro de Personal', col: 22 },
    { label: 'Formato de Referencias Laborales', col: 23 }
  ];
  
  dataRange.forEach(function(row) {
    const status = row[0];        // Columna A
    const employeeName = row[2];  // Columna C
    const contractUrl = row[17];  // Columna R
    const recipientEmail = row[18]; // Columna S

    // Solo procesa si el estatus es 'Enviar' y existe un contrato generado
    if (status !== 'Enviar' || !contractUrl) return;

    // 1. Construcción de Enlaces de Documentación (HTML dinámico)
    const htmlLinks = supplementaryDocs
      .filter(doc => row[doc.col] && String(row[doc.col]).trim() !== "")
      .map(doc => `<li><a href="${row[doc.col]}" style="color:#1a73e8; font-weight:bold;">${doc.label}</a></li>`)
      .join('');

    // 2. Diseño del Cuerpo del Mensaje (Responsive HTML)
    const htmlBody = `
      <html>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; color: #444; line-height: 1.6;">
          <div style="max-width: 600px; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #1a73e8;">Notificación de Ingreso de Personal</h2>
            <p>Estimados,</p>
            <p>Se adjunta el <b>Contrato de Trabajo</b> correspondiente al nuevo ingreso. Por favor, asegurar la firma del documento y su posterior envío a la oficina central.</p>
            <p>Adicionalmente, el colaborador debe completar los siguientes requisitos disponibles en estos enlaces:</p>
            <ul>${htmlLinks}</ul>
            <p style="background: #f8f9fa; padding: 10px; border-left: 4px solid #1a73e8;">
              <b>Nota importante:</b> Para la gestión de credenciales e identificación, completar el formulario institucional en este enlace: 
              <a href="https://forms.gle/ejemplo-seguro">Solicitud de Identificación</a>.
            </p>
            <p>Atentamente,<br>
            <strong>Departamento de Gestión Organizacional</strong><br>
            Servicios Logísticos Integrales</p>
          </div>
        </body>
      </html>`;

    // 3. Gestión de Archivos en Drive y Envío
    const match = String(contractUrl).match(driveIdRegex);
    if (!match) return;

    try {
      const pdfAttachment = DriveApp.getFileById(match[0])
        .getBlob()
        .getAs('application/pdf')
        .setName(`Contrato_Ingreso_${employeeName}.pdf`);

      MailApp.sendEmail({
        to: recipientEmail,
        cc: emailCC,
        subject: `Documentación de Ingreso - ${employeeName}`,
        htmlBody: htmlBody,
        attachments: [pdfAttachment]
      });
    } catch (err) {
      Logger.log(`Error en registro ${employeeName}: ${err.message}`);
    }
  });

  // Finaliza actualizando el log en la base de datos maestra
  syncDatabaseStatus();
}

/**
 * Sincroniza el estatus entre la hoja de envío y la base de datos central.
 */
function syncDatabaseStatus() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const deliverySheet = ss.getSheetByName('ENVÍO - CONTRATOS');
  const masterDataSheet = ss.getSheetByName('DATA');
  
  const lastDelivery = deliverySheet.getLastRow();
  const lastMaster = masterDataSheet.getLastRow();
  
  if (lastDelivery < 2 || lastMaster < 2) return;

  const deliveryData = deliverySheet.getRange(2, 1, lastDelivery - 1, 4).getValues(); // Col A a D
  const masterIds = masterDataSheet.getRange(2, 5, lastMaster - 1, 1).getValues(); // IDs en Col E
  
  const masterMap = {};
  masterIds.forEach((id, index) => {
    if (id[0]) masterMap[id[0]] = index + 2;
  });

  const cellsToUpdate = [];
  deliveryData.forEach(row => {
    const status = row[0]; // Col A
    const employeeId = row[3]; // Col D (Cédula/ID)
    const targetRow = masterMap[employeeId];
    
    if (employeeId && status === 'Enviar' && targetRow) {
      cellsToUpdate.push(`Y${targetRow}`); // Columna Y en DATA
    }
  });

  if (cellsToUpdate.length) {
    masterDataSheet.getRangeList(cellsToUpdate).setValue('PROCESADO');
  }
}
