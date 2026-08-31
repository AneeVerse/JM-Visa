/**
 * =========================================================================
 * SCRIPT 1: JM VISA FORM CONSULTATION LEADS (DEDICATED)
 * =========================================================================
 * 1. Open Google Sheets -> Create new sheet: "JM_Visa_Consultation_Leads"
 * 2. Go to Extensions -> Apps Script
 * 3. Replace all content in Code.gs with this code.
 * 4. Click "Deploy" -> "New deployment" -> Select "Web app"
 *    - Description: JM Visa Leads Form Webhook
 *    - Execute as: Me (<your-email>)
 *    - Who has access: Anyone
 * 5. Click "Deploy", copy the Web App URL, and paste it into .env.local as:
 *    NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL="<your-url>"
 * =========================================================================
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Submitted At (IST)",
        "Full Name",
        "First Name",
        "Last Name",
        "Email",
        "Phone",
        "Country Code",
        "Destination Country",
        "Visa Type",
        "Form Source",
        "User Location",
        "Pincode",
        "IP Address"
      ]);
      
      var headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setBackground("#2563EB");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
    }

    sheet.appendRow([
      data.submittedAt || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.name || ((data.firstName || "") + " " + (data.lastName || "")).trim(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.phone || data.googleSheetsPhone || "",
      data.countryCode || "",
      data.country || data.countryName || "",
      data.visaType || data.serviceSelected || "",
      data.formSource || data.from || "ads-visa",
      data.userLocation || "",
      data.userPincode || "",
      data.userIp || ""
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "Lead recorded successfully"
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
