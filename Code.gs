// -------------------------------------------------------------
// GOOGLE APPS SCRIPT CODE
// Deploy this as a Web App to receive form data.
// -------------------------------------------------------------

function doPost(e) {
  // Use LockService to prevent concurrent editing issues
  var lock = LockService.getScriptLock();
  
  // Wait for up to 10 seconds for other processes to finish
  if (!lock.tryLock(10000)) {
    return ContentService.createTextOutput(JSON.stringify({
      "status": "error", 
      "message": "Server busy, please try again."
    })).setMimeType(ContentService.MimeType.JSON);
  }

  try {
    // 1. Open the Spreadsheet and Sheet
    var sheetName = "Niat Marketing Arizalar";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      // If sheet doesn't exist, return error
      return createJsonResponse({ "status": "error", "message": "Sheet not found: " + sheetName });
    }

    // 2. Parse POST Body
    var data;
    try {
      // Try parsing JSON body first
      if (e.postData && e.postData.contents) {
        data = JSON.parse(e.postData.contents);
      } else if (e.parameter) {
        // Fallback to URL encoded parameters if needed
        data = e.parameter;
      } else {
         throw new Error("No data received");
      }
    } catch (parseError) {
      return createJsonResponse({ "status": "error", "message": "Invalid JSON data" });
    }

    // 3. Extract Fields
    var ism = data.ism;
    var telefon = data.telefon;

    // 4. Validate Required Fields
    if (!ism || !telefon) {
      return createJsonResponse({ "status": "error", "message": "Missing required fields: ism or telefon" });
    }

    // 5. Generate Date and Time (Uzbekistan Timezone)
    var timeZone = "Asia/Tashkent";
    var dateObj = new Date();
    var sana = Utilities.formatDate(dateObj, timeZone, "yyyy-MM-dd");
    var vaqt = Utilities.formatDate(dateObj, timeZone, "HH:mm:ss");

    // 6. Prepare Row Data
    // Order: ism, telefon, biznes, biznes_turi, xodimlar, manzil, muammo, byudjet, natija, vaqt, sana
    var newRow = [
      ism,
      telefon,
      data.biznes || "",
      data.biznes_turi || "",
      data.xodimlar || "",
      data.manzil || "",
      data.muammo || "",
      data.byudjet || "",
      data.natija || "",
      vaqt,
      sana
    ];

    // 7. Append Row
    sheet.appendRow(newRow);

    // 8. Return Success
    return createJsonResponse({ "status": "success" });

  } catch (error) {
    // Handle unexpected errors
    return createJsonResponse({ "status": "error", "message": error.toString() });
  } finally {
    // Always release the lock
    lock.releaseLock();
  }
}

// Helper to create consistent JSON responses with CORS headers
function createJsonResponse(responseObject) {
  return ContentService.createTextOutput(JSON.stringify(responseObject))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*")
    .setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
    .setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// Handle Preflight Requests (CORS)
function doOptions(e) {
  var output = ContentService.createTextOutput("");
  output.setMimeType(ContentService.MimeType.TEXT);
  output.setHeader("Access-Control-Allow-Origin", "*");
  output.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  output.setHeader("Access-Control-Allow-Headers", "Content-Type, Origin, Accept");
  return output;
}

// -------------------------------------------------------------
// END OF CODE
// -------------------------------------------------------------