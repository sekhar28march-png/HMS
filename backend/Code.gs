/**
 * ==============================================================================
 * ANIL KUMAR KARMAKAR MEMORIAL CANCER TRUST - HOSPITAL MANAGEMENT SYSTEM
 * Backend Application & API Controller: Code.gs
 * Runtime: Google Apps Script (V8 Engine)
 * Database Storage: Google Sheets (Pluggable to MongoDB Atlas)
 * ==============================================================================
 */

// ==========================================
// 1. CONFIGURATION
// ==========================================
const CONFIG = {
  TRUST_NAME: "Anil Kumar Karmakar Memorial Cancer Trust",
  REG_PREFIX: "AKKMCT",
  SHEETS: {
    PATIENTS: "Patients",
    EXPENSES: "Expenses",
    PAYMENTS: "Payments",
    SETTINGS: "Settings",
    BILL: "Bill",
    REG_FORM: "Registration Form",
    DOCS: "Documents Checklist",
    VENDORS: "Vendors",
    PURCHASES: "Purchases",
    INVENTORY: "Inventory",
    STOCK_ISSUES: "Stock Issues",
    VENDOR_VOUCHERS: "Vendor Vouchers"
  },
  FOLDERS: {
    BILLS: "AKKMCT_Billing_Records",
    REG_FORMS: "AKKMCT_Registration_Forms"
  }
};

// ==========================================
// 2. REPOSITORY PATTERN / DATA ACCESS LAYER
// (This layer abstracts Google Sheets; swap here for MongoDB)
// ==========================================
const SheetDB = {
  getSheet: function(sheetName) {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      throw new Error(`Sheet "${sheetName}" not found. Please ensure all 7 sheets are created.`);
    }
    return sheet;
  },

  getAllRows: function(sheetName) {
    const sheet = this.getSheet(sheetName);
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    if (lastRow <= 1 || lastCol < 1) return [];
    return sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
  },

  appendRow: function(sheetName, rowArray) {
    const sheet = this.getSheet(sheetName);
    sheet.appendRow(rowArray);
    return rowArray;
  },

  updateCell: function(sheetName, row, col, value) {
    const sheet = this.getSheet(sheetName);
    sheet.getRange(row, col).setValue(value);
  }
};

// --- Patient Repository ---
const PatientRepository = {
  getNextRegNo: function() {
    const currentYear = new Date().getFullYear();
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.PATIENTS);
    const regex = new RegExp(`^${CONFIG.REG_PREFIX}\\/(\\d{3})\\/${currentYear}$`);
    let maxSeq = 0;

    rows.forEach(r => {
      const reg = String(r[1] || ""); // Col B is Reg No
      const match = reg.match(regex);
      if (match) {
        const seq = parseInt(match[1], 10);
        if (seq > maxSeq) maxSeq = seq;
      }
    });

    const nextSeq = String(maxSeq + 1).padStart(3, '0');
    return `${CONFIG.REG_PREFIX}/${nextSeq}/${currentYear}`;
  },

  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.PATIENTS);
    return rows.map(r => {
      const hasAdvice = r.length > 31;
      return {
        _id: r[0],
        regNo: r[1],
        admissionDate: r[2],
        admissionTime: r[3],
        admissionDay: r[4],
        dischargeDate: r[5],
        dischargeTime: r[6],
        mrMrs: r[7],
        name: r[8],
        surname: r[9],
        guardian: r[10],
        age: r[11],
        diseaseCategory: r[12] || "Cancer",
        sex: r[12],
        maritalStatus: r[13],
        occupation: r[14],
        religion: r[15],
        nationality: r[16],
        permanentAddress: r[17],
        presentAddress: r[18],
        city: r[19],
        pin: r[20],
        district: r[21],
        state: r[22],
        contactPerson: r[23],
        contactNo: r[24],
        whatsappNo: r[25],
        refDoctor: r[26],
        doctorAdvice: hasAdvice ? (r[27] || "") : "",
        status: hasAdvice ? r[28] : r[27],
        totalBill: hasAdvice ? r[29] : r[28],
        totalReceived: hasAdvice ? r[30] : r[29],
        outstanding: hasAdvice ? r[31] : r[30]
      };
    });
  },

  save: function(patientDoc) {
    const targetRow = SheetDB.getSheet(CONFIG.SHEETS.PATIENTS).getLastRow() + 1;
    const row = [
      patientDoc._id || ("pat_" + Utilities.getUuid().substring(0, 8)),
      patientDoc.regNo,
      patientDoc.admissionDate,
      patientDoc.admissionTime,
      patientDoc.admissionDay,
      patientDoc.dischargeDate || "",
      patientDoc.dischargeTime || "",
      patientDoc.mrMrs || "Mr",
      patientDoc.name,
      patientDoc.surname,
      patientDoc.guardian || "",
      patientDoc.age || "",
      patientDoc.diseaseCategory || patientDoc.sex || "Cancer",
      patientDoc.maritalStatus || "Married",
      patientDoc.occupation || "",
      patientDoc.religion || "",
      patientDoc.nationality || "Indian",
      patientDoc.permanentAddress || "",
      patientDoc.presentAddress || "",
      patientDoc.city || "",
      patientDoc.pin || "",
      patientDoc.district || "",
      patientDoc.state || "West Bengal",
      patientDoc.contactPerson || "",
      patientDoc.contactNo || "",
      patientDoc.whatsappNo || "",
      patientDoc.refDoctor || "",
      patientDoc.doctorAdvice || "",
      patientDoc.status || "Admitted",
      // Formula for Total Bill (Col AD)
      `=IF(B${targetRow}="","", (((IF(ISBLANK(F${targetRow}), TODAY(), F${targetRow}) - C${targetRow}) + IF(Settings!$B$3="Yes", 1, 0)) * Settings!$B$2) + IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, B${targetRow}), 0))`,
      // Formula for Total Received (Col AE)
      `=IF(B${targetRow}="","", IFERROR(SUMIFS(Payments!$D:$D, Payments!$B:$B, B${targetRow}), 0))`,
      // Formula for Outstanding (Col AF)
      `=IF(B${targetRow}="","", AD${targetRow} - AE${targetRow})`,
      new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.PATIENTS, row);
    return patientDoc;
  },

  update: function(regNo, data) {
    const sheet = SheetDB.getSheet(CONFIG.SHEETS.PATIENTS);
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) throw new Error("No patient records found in database.");

    // Find row index (1-based sheet row)
    const regValues = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
    let rowIndex = -1;
    for (let i = 0; i < regValues.length; i++) {
      if (String(regValues[i][0]).trim() === String(regNo).trim()) {
        rowIndex = i + 2; // +2 offset for header row
        break;
      }
    }

    if (rowIndex === -1) {
      throw new Error("Patient with Reg No " + regNo + " not found in database.");
    }

    const lastCol = sheet.getLastColumn();
    const hasAdvice = lastCol >= 32;

    // Update non-formula columns
    if (data.admissionDate !== undefined) sheet.getRange(rowIndex, 3).setValue(data.admissionDate);
    if (data.admissionTime !== undefined) sheet.getRange(rowIndex, 4).setValue(data.admissionTime);
    if (data.admissionDay !== undefined) sheet.getRange(rowIndex, 5).setValue(data.admissionDay);
    if (data.dischargeDate !== undefined) sheet.getRange(rowIndex, 6).setValue(data.dischargeDate || "");
    if (data.dischargeTime !== undefined) sheet.getRange(rowIndex, 7).setValue(data.dischargeTime || "");
    if (data.mrMrs !== undefined) sheet.getRange(rowIndex, 8).setValue(data.mrMrs);
    if (data.name !== undefined) sheet.getRange(rowIndex, 9).setValue(data.name);
    if (data.surname !== undefined) sheet.getRange(rowIndex, 10).setValue(data.surname);
    if (data.guardian !== undefined) sheet.getRange(rowIndex, 11).setValue(data.guardian || "");
    if (data.age !== undefined) sheet.getRange(rowIndex, 12).setValue(data.age);
    if (data.diseaseCategory !== undefined) sheet.getRange(rowIndex, 13).setValue(data.diseaseCategory);
    else if (data.sex !== undefined) sheet.getRange(rowIndex, 13).setValue(data.sex);
    if (data.maritalStatus !== undefined) sheet.getRange(rowIndex, 14).setValue(data.maritalStatus);
    if (data.occupation !== undefined) sheet.getRange(rowIndex, 15).setValue(data.occupation || "");
    if (data.religion !== undefined) sheet.getRange(rowIndex, 16).setValue(data.religion || "");
    if (data.nationality !== undefined) sheet.getRange(rowIndex, 17).setValue(data.nationality || "Indian");
    if (data.permanentAddress !== undefined) sheet.getRange(rowIndex, 18).setValue(data.permanentAddress);
    if (data.presentAddress !== undefined) sheet.getRange(rowIndex, 19).setValue(data.presentAddress);
    if (data.city !== undefined) sheet.getRange(rowIndex, 20).setValue(data.city);
    if (data.pin !== undefined) sheet.getRange(rowIndex, 21).setValue(data.pin);
    if (data.district !== undefined) sheet.getRange(rowIndex, 22).setValue(data.district);
    if (data.state !== undefined) sheet.getRange(rowIndex, 23).setValue(data.state || "West Bengal");
    if (data.contactPerson !== undefined) sheet.getRange(rowIndex, 24).setValue(data.contactPerson);
    if (data.contactNo !== undefined) sheet.getRange(rowIndex, 25).setValue(data.contactNo);
    if (data.whatsappNo !== undefined) sheet.getRange(rowIndex, 26).setValue(data.whatsappNo);
    if (data.refDoctor !== undefined) sheet.getRange(rowIndex, 27).setValue(data.refDoctor || "");

    if (hasAdvice) {
      if (data.doctorAdvice !== undefined) sheet.getRange(rowIndex, 28).setValue(data.doctorAdvice || "");
      if (data.status !== undefined) sheet.getRange(rowIndex, 29).setValue(data.status);
      sheet.getRange(rowIndex, 33).setValue(new Date().toISOString());
    } else {
      if (data.status !== undefined) sheet.getRange(rowIndex, 28).setValue(data.status);
      sheet.getRange(rowIndex, 32).setValue(new Date().toISOString());
    }

    return { success: true, regNo: regNo, rowIndex: rowIndex };
  }
};

// --- Vendor Repository ---
const VendorRepository = {
  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.VENDORS);
    return rows.map(r => ({
      _id: r[0],
      vendorId: r[1],
      name: r[2],
      category: r[3],
      contactPerson: r[4],
      phone: r[5],
      gstin: r[6],
      drugLicNo: r[7],
      address: r[8],
      bankName: r[9],
      accountNo: r[10],
      ifsc: r[11],
      creditDays: r[12],
      openingBalance: r[13],
      createdAt: r[14]
    }));
  },
  save: function(v) {
    const row = [
      v._id || "vnd_" + Utilities.getUuid().substring(0, 8),
      v.vendorId,
      v.name,
      v.category,
      v.contactPerson,
      v.phone,
      v.gstin || "",
      v.drugLicNo || "",
      v.address || "",
      v.bankName || "",
      v.accountNo || "",
      v.ifsc || "",
      v.creditDays || 30,
      v.openingBalance || 0,
      v.createdAt || new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.VENDORS, row);
    return { success: true, data: v };
  },
  delete: function(id) {
    const sheet = SheetDB.getSheet(CONFIG.SHEETS.VENDORS);
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.VENDORS);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id || rows[i][1] === id) {
        sheet.deleteRow(i + 2);
        return { success: true };
      }
    }
    return { success: false, message: "Vendor not found" };
  }
};

// --- Purchase Repository ---
const PurchaseRepository = {
  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.PURCHASES);
    return rows.map(r => {
      let items = [];
      try { items = JSON.parse(r[6]); } catch (e) { items = []; }
      return {
        _id: r[0],
        grnNo: r[1],
        vendorId: r[2],
        vendorName: r[3],
        invoiceNo: r[4],
        invoiceDate: r[5],
        items: items,
        grossAmount: r[7],
        gstPercent: r[8],
        gstAmount: r[9],
        netAmount: r[10],
        paidAmount: r[11],
        paymentStatus: r[12],
        createdAt: r[13]
      };
    });
  },
  save: function(p) {
    const row = [
      p._id || "pur_" + Utilities.getUuid().substring(0, 8),
      p.grnNo,
      p.vendorId,
      p.vendorName,
      p.invoiceNo,
      p.invoiceDate,
      JSON.stringify(p.items || []),
      p.grossAmount,
      p.gstPercent,
      p.gstAmount,
      p.netAmount,
      p.paidAmount || 0,
      p.paymentStatus || "Unpaid",
      p.createdAt || new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.PURCHASES, row);
    return { success: true, data: p };
  },
  delete: function(id) {
    const sheet = SheetDB.getSheet(CONFIG.SHEETS.PURCHASES);
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.PURCHASES);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === id) {
        sheet.deleteRow(i + 2);
        return { success: true };
      }
    }
    return { success: false, message: "Purchase not found" };
  }
};

// --- Inventory Repository ---
const InventoryRepository = {
  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.INVENTORY);
    return rows.map(r => ({
      _id: r[0],
      purchaseId: r[1],
      vendorId: r[2],
      itemName: r[3],
      category: r[4],
      batchNo: r[5],
      expiryDate: r[6],
      initialQty: r[7],
      currentQty: r[8],
      rate: r[9],
      createdAt: r[10]
    }));
  },
  save: function(inv) {
    const row = [
      inv._id || "inv_" + Utilities.getUuid().substring(0, 8),
      inv.purchaseId || "",
      inv.vendorId || "",
      inv.itemName,
      inv.category,
      inv.batchNo,
      inv.expiryDate,
      inv.initialQty,
      inv.currentQty,
      inv.rate,
      inv.createdAt || new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.INVENTORY, row);
    return { success: true, data: inv };
  },
  updateQty: function(batchId, newQty) {
    const sheet = SheetDB.getSheet(CONFIG.SHEETS.INVENTORY);
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.INVENTORY);
    for (let i = 0; i < rows.length; i++) {
      if (rows[i][0] === batchId) {
        sheet.getRange(i + 2, 9).setValue(newQty);
        return { success: true };
      }
    }
    return { success: false, message: "Batch not found" };
  }
};

// --- Stock Issue Repository ---
const StockIssueRepository = {
  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.STOCK_ISSUES);
    return rows.map(r => ({
      _id: r[0],
      batchId: r[1],
      itemName: r[2],
      batchNo: r[3],
      qty: r[4],
      issueType: r[5],
      regNo: r[6],
      department: r[7],
      issueDate: r[8],
      remarks: r[9],
      createdAt: r[10]
    }));
  },
  save: function(iss) {
    const row = [
      iss._id || "iss_" + Utilities.getUuid().substring(0, 8),
      iss.batchId,
      iss.itemName,
      iss.batchNo,
      iss.qty,
      iss.issueType,
      iss.regNo || "",
      iss.department || "",
      iss.issueDate,
      iss.remarks || "",
      iss.createdAt || new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.STOCK_ISSUES, row);
    return { success: true, data: iss };
  }
};

// --- Vendor Voucher Repository ---
const VendorVoucherRepository = {
  findAll: function() {
    const rows = SheetDB.getAllRows(CONFIG.SHEETS.VENDOR_VOUCHERS);
    return rows.map(r => ({
      _id: r[0],
      voucherNo: r[1],
      vendorId: r[2],
      date: r[3],
      amount: r[4],
      mode: r[5],
      refNo: r[6],
      remarks: r[7],
      createdAt: r[8]
    }));
  },
  save: function(vch) {
    const row = [
      vch._id || "vch_" + Utilities.getUuid().substring(0, 8),
      vch.voucherNo,
      vch.vendorId,
      vch.date,
      vch.amount,
      vch.mode,
      vch.refNo,
      vch.remarks || "",
      vch.createdAt || new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.VENDOR_VOUCHERS, row);
    return { success: true, data: vch };
  }
};

// ==========================================
// 3. SERVICE LAYER (BUSINESS RULES)
// ==========================================
const HospitalService = {
  registerAdmission: function(data) {
    const regNo = PatientRepository.getNextRegNo();
    const now = new Date();
    const tz = Session.getScriptTimeZone();

    const patientDoc = {
      _id: "pat_" + Utilities.getUuid().substring(0, 8),
      regNo: regNo,
      admissionDate: Utilities.formatDate(now, tz, "dd/MM/yyyy"),
      admissionTime: Utilities.formatDate(now, tz, "hh:mm a"),
      admissionDay: Utilities.formatDate(now, tz, "EEEE"),
      mrMrs: data.mrMrs || "Mr",
      name: data.name,
      surname: data.surname,
      guardian: data.guardian || "",
      age: data.age,
      sex: data.sex || "Male",
      maritalStatus: data.maritalStatus || "Single",
      occupation: data.occupation || "",
      religion: data.religion || "",
      nationality: data.nationality || "Indian",
      permanentAddress: data.permanentAddress,
      presentAddress: (String(data.presentAddress).toLowerCase() === "same") ? data.permanentAddress : data.presentAddress,
      city: data.city,
      district: data.district,
      state: data.state || "West Bengal",
      pin: data.pin,
      contactPerson: data.contactPerson,
      contactNo: data.contactNo,
      whatsappNo: data.whatsappNo,
      refDoctor: data.refDoctor || "",
      doctorAdvice: data.doctorAdvice || "",
      status: "Admitted"
    };

    return PatientRepository.save(patientDoc);
  },

  addExpense: function(data) {
    const targetRow = SheetDB.getSheet(CONFIG.SHEETS.EXPENSES).getLastRow() + 1;
    const qty = parseFloat(data.qty) || 1;
    const rate = parseFloat(data.rate) || 0;
    const cat = data.category;
    const amount = qty * rate;
    const discount = cat === "Pathology" ? (parseFloat(data.discount) || 0) : 0;
    const net = cat === "Pathology" ? (amount - discount) : amount;

    const row = [
      "exp_" + Utilities.getUuid().substring(0, 8),
      data.regNo,
      data.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"),
      cat,
      data.description,
      qty,
      rate,
      amount,
      discount,
      net,
      new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.EXPENSES, row);
    return { success: true };
  },

  addPayment: function(data) {
    const row = [
      "pay_" + Utilities.getUuid().substring(0, 8),
      data.regNo,
      data.date || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "dd/MM/yyyy"),
      parseFloat(data.amount),
      data.mode || "Cash",
      data.remarks || "",
      new Date().toISOString()
    ];
    SheetDB.appendRow(CONFIG.SHEETS.PAYMENTS, row);
    return { success: true };
  },

  addVendor: function(data) {
    return VendorRepository.save(data);
  },

  addPurchase: function(data) {
    const purchaseResult = PurchaseRepository.save(data);
    // Inward each item batch into Inventory sheet
    if (data.items && Array.isArray(data.items)) {
      data.items.forEach(it => {
        InventoryRepository.save({
          purchaseId: data._id,
          vendorId: data.vendorId,
          itemName: it.itemName,
          category: it.category,
          batchNo: it.batchNo,
          expiryDate: it.expiryDate,
          initialQty: it.qty,
          currentQty: it.qty,
          rate: it.rate,
          createdAt: new Date().toISOString()
        });
      });
    }
    return purchaseResult;
  },

  issueStock: function(data) {
    // 1. Log stock issue
    const issueResult = StockIssueRepository.save(data);
    // 2. Decrement inventory stock
    const invRows = SheetDB.getAllRows(CONFIG.SHEETS.INVENTORY);
    for (let i = 0; i < invRows.length; i++) {
      if (invRows[i][0] === data.batchId) {
        const cur = parseFloat(invRows[i][8]) || 0;
        const newQty = Math.max(0, cur - (parseFloat(data.qty) || 0));
        SheetDB.updateCell(CONFIG.SHEETS.INVENTORY, i + 2, 9, newQty);
        break;
      }
    }
    // 3. If patient clinical billing, also post to Expenses sheet!
    if (data.issueType === "Patient Clinical Billing" && data.regNo) {
      this.addExpense({
        regNo: data.regNo,
        date: data.issueDate,
        category: data.category || "Medicine",
        description: `${data.itemName} (Batch: ${data.batchNo})`,
        qty: data.qty,
        rate: data.rate || 0,
        amount: (parseFloat(data.qty) || 1) * (parseFloat(data.rate) || 0),
        discount: 0
      });
    }
    return issueResult;
  },

  addVendorVoucher: function(data) {
    return VendorVoucherRepository.save(data);
  }
};

// ==========================================
// 4. REST WEB APP API (doGet / doPost)
// ==========================================
function doGet(e) {
  // If request asks for JSON API
  if (e && e.parameter && e.parameter.action) {
    return handleApiGet(e);
  }

  // Otherwise serve the HTML5 Frontend
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Anil Kumar Karmakar Memorial Cancer Trust - HMS')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function handleApiGet(e) {
  const action = e.parameter.action;
  let response = {};

  try {
    if (action === "listPatients") {
      response = { success: true, data: PatientRepository.findAll() };
    } else if (action === "listVendors") {
      response = { success: true, data: VendorRepository.findAll() };
    } else if (action === "listPurchases") {
      response = { success: true, data: PurchaseRepository.findAll() };
    } else if (action === "listInventory") {
      response = { success: true, data: InventoryRepository.findAll() };
    } else if (action === "listStockIssues") {
      response = { success: true, data: StockIssueRepository.findAll() };
    } else if (action === "listVendorVouchers") {
      response = { success: true, data: VendorVoucherRepository.findAll() };
    } else if (action === "getSettings") {
      const sheet = SheetDB.getSheet(CONFIG.SHEETS.SETTINGS);
      response = {
        success: true,
        data: {
          adminUsername: sheet.getRange("B6").getValue() || "Admin",
          adminPasswordHash: sheet.getRange("B7").getValue() || "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
        }
      };
    } else if (action === "ping") {
      response = { success: true, org: CONFIG.TRUST_NAME, status: "Online" };
    } else {
      response = { success: false, error: "Unknown action" };
    }
  } catch (err) {
    response = { success: false, error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  let response = {};
  try {
    const payload = JSON.parse(e.postData.contents);
    const action = payload.action;

    if (action === "createPatient") {
      const patient = HospitalService.registerAdmission(payload.data);
      response = { success: true, data: patient };
    } else if (action === "updatePatient") {
      const result = PatientRepository.update(payload.data.regNo, payload.data);
      response = { success: true, data: result };
    } else if (action === "addExpense") {
      response = HospitalService.addExpense(payload.data);
    } else if (action === "addPayment") {
      response = HospitalService.addPayment(payload.data);
    } else if (action === "addVendor") {
      response = HospitalService.addVendor(payload.data);
    } else if (action === "deleteVendor") {
      response = VendorRepository.delete(payload.data.vendorId || payload.data._id);
    } else if (action === "addPurchase") {
      response = HospitalService.addPurchase(payload.data);
    } else if (action === "deletePurchase") {
      response = PurchaseRepository.delete(payload.data._id);
    } else if (action === "issueStock") {
      response = HospitalService.issueStock(payload.data);
    } else if (action === "addVendorVoucher") {
      response = HospitalService.addVendorVoucher(payload.data);
    } else if (action === "saveSettings") {
      const sheet = SheetDB.getSheet(CONFIG.SHEETS.SETTINGS);
      if (payload.data.adminUsername) sheet.getRange("B6").setValue(payload.data.adminUsername);
      if (payload.data.adminPasswordHash) sheet.getRange("B7").setValue(payload.data.adminPasswordHash);
      response = { success: true };
    } else {
      response = { success: false, error: "Unsupported POST action" };
    }
  } catch (err) {
    response = { success: false, error: err.toString() };
  }

  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}

// ==========================================
// 5. GOOGLE SHEETS SPREADSHEET AUTOMATION & MENU
// ==========================================
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🏥 AKKMCT HMS')
    .addItem('⚙️ Build / Setup All 12 Hospital Sheets', 'setupHospitalSheets')
    .addSeparator()
    .addItem('➕ New Patient Admission', 'uiRegisterNewPatient')
    .addSeparator()
    .addItem('🖨️ Print Registration Form (PDF)', 'exportRegistrationFormPDF')
    .addItem('🧾 Print Inpatient Bill (PDF)', 'exportBillPDF')
    .addSeparator()
    .addItem('🔒 Lock & Protect System Formula Columns', 'protectFormulaCells')
    .addToUi();
}

/**
 * 1-Click Automated Setup for all 12 Hospital Sheets
 */
function setupHospitalSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  const peach = "#FCE4D6"; // Signature Pale Peach

  const sheetsDef = [
    {
      name: CONFIG.SHEETS.SETTINGS,
      headers: ["Setting Parameter", "Value", "Expense Categories", "Titles", "Sex", "Marital Status", "Patient Status", "Payment Modes", "Supplier Categories"],
      initialRows: [
        ["Home Charges per day (₹)", 0, "Doctor Fees", "Mr", "Male", "Married", "Admitted", "Cash", "Medicine / Pharmacy"],
        ["Count Admission Day as Billed Day", "Yes", "Pathology", "Mrs", "Female", "Single", "Discharged", "UPI", "Surgical & Disposables"],
        ["Current Year", "=YEAR(TODAY())", "Medicine", "Ms", "Other", "Widowed", "Death", "Card", "Medical Oxygen"],
        ["Organization Name", CONFIG.TRUST_NAME, "Oxygen", "Master", "", "Divorced", "", "Cheque", "Pathology & Lab"],
        ["Admin Username", "Admin", "Non-Surgical Item", "Baby", "", "", "", "NEFT / RTGS", "General & Sundry"],
        ["Admin Password Hash", "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4", "Others", "", "", "", "", "", ""]
      ]
    },
    {
      name: CONFIG.SHEETS.PATIENTS,
      headers: [
        "_id", "Reg No", "Date of Admission", "Time of Admission", "Day of Admission",
        "Date of Discharge/Death", "Time of Discharge/Death", "Mr/Mrs", "Name", "Surname",
        "Guardian (Father/Husband)", "Age", "Disease Category", "Marital Status", "Occupation",
        "Religion", "Nationality", "Permanent Address", "Present Address", "City",
        "PIN", "District", "State", "Contact Person", "Contact No.", "WhatsApp No.",
        "Ref. Doctor Name", "Doctor's Advice", "Status", "Total Bill", "Total Received",
        "Outstanding", "Updated At"
      ]
    },
    {
      name: CONFIG.SHEETS.EXPENSES,
      headers: ["_id", "Reg No", "Date", "Category", "Description", "Qty", "Rate (₹)", "Gross Amount (₹)", "Discount (₹)", "Net Amount (₹)", "Created At"]
    },
    {
      name: CONFIG.SHEETS.PAYMENTS,
      headers: ["_id", "Reg No", "Date", "Amount (₹)", "Payment Mode", "Remarks / Txn Ref", "Created At"]
    },
    {
      name: CONFIG.SHEETS.DOCS,
      headers: ["Reg No", "Patient Aadhaar Copy", "Patient Aadhaar Link", "Party Aadhaar Copy", "Party Aadhaar Link", "Status Verified", "Advice / Discharge Cert", "Certificate Link"]
    },
    {
      name: CONFIG.SHEETS.VENDORS,
      headers: ["_id", "Vendor ID", "Vendor Name", "Category", "Contact Person", "Phone", "GSTIN", "Drug License No", "Address", "Bank Name", "Account No", "IFSC Code", "Credit Days", "Opening Balance (₹)", "Created At"]
    },
    {
      name: CONFIG.SHEETS.PURCHASES,
      headers: ["_id", "GRN No", "Vendor ID", "Vendor Name", "Supplier Invoice No", "Invoice Date", "Items JSON", "Gross Amount (₹)", "GST (%)", "GST Amount (₹)", "Net Bill Amount (₹)", "Paid Amount (₹)", "Payment Status", "Created At"]
    },
    {
      name: CONFIG.SHEETS.INVENTORY,
      headers: ["_id", "Purchase ID", "Vendor ID", "Item Name", "Category", "Batch No", "Expiry Date (YYYY-MM)", "Initial Qty", "Current Stock Qty", "Unit Rate (₹)", "Created At"]
    },
    {
      name: CONFIG.SHEETS.STOCK_ISSUES,
      headers: ["_id", "Batch ID", "Item Name", "Batch No", "Quantity Issued", "Issue Purpose", "Patient Reg No", "Department", "Issue Date", "Remarks", "Created At"]
    },
    {
      name: CONFIG.SHEETS.VENDOR_VOUCHERS,
      headers: ["_id", "Voucher No", "Vendor ID", "Voucher Date", "Amount Paid (₹)", "Payment Mode", "Txn Ref No / Cheque", "Remarks", "Created At"]
    }
  ];

  sheetsDef.forEach(def => {
    let sheet = ss.getSheetByName(def.name);
    if (!sheet) {
      sheet = ss.insertSheet(def.name);
    }

    if (def.headers && def.headers.length > 0) {
      const headerRange = sheet.getRange(1, 1, 1, def.headers.length);
      headerRange.setValues([def.headers]);
      headerRange.setBackground(peach);
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    if (def.initialRows && def.initialRows.length > 0 && sheet.getLastRow() === 1) {
      const rowRange = sheet.getRange(2, 1, def.initialRows.length, def.initialRows[0].length);
      rowRange.setValues(def.initialRows);
    }
  });

  ui.alert("🎉 Success!\nAll 12 Hospital Management & Procurement sheets have been created and formatted with headers, signature Pale Peach branding, and configuration rules.");
}

/**
 * Interactive prompt in Google Sheets to register patient and stamp frozen admission
 */
function uiRegisterNewPatient() {
  const ui = SpreadsheetApp.getUi();
  const nameResp = ui.prompt('New Patient Admission', 'Enter Patient First Name:', ui.ButtonSet.OK_CANCEL);
  if (nameResp.getSelectedButton() !== ui.Button.OK || !nameResp.getResponseText().trim()) return;
  const firstName = nameResp.getResponseText().trim();

  const surnameResp = ui.prompt('New Patient Admission', 'Enter Patient Surname:', ui.ButtonSet.OK_CANCEL);
  if (surnameResp.getSelectedButton() !== ui.Button.OK) return;
  const surname = surnameResp.getResponseText().trim();

  const patient = HospitalService.registerAdmission({
    name: firstName,
    surname: surname
  });

  ui.alert(`✅ Registration Successful!\n\nReg No: ${patient.regNo}\nName: ${patient.name} ${patient.surname}\nAdmission Stamped: ${patient.admissionDate} ${patient.admissionTime} (${patient.admissionDay})`);
}

/**
 * onEdit Trigger: Copies Permanent Address if user enters "same" in Present Address
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CONFIG.SHEETS.PATIENTS) return;

  const row = e.range.getRow();
  const col = e.range.getColumn();

  // Column 19 is Present Address (S), Column 18 is Permanent Address (R)
  if (col === 19 && row > 1) {
    const val = String(e.value || "").trim().toLowerCase();
    if (val === 'same') {
      const permAddress = sheet.getRange(row, 18).getValue();
      e.range.setValue(permAddress);
    }
  }
}

// ==========================================
// 6. PDF EXPORT PIPELINES (DRIVE AUTOMATION)
// ==========================================
function exportSheetToPDF(sheetName, fileNameSuffix, folderName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(sheetName);
  const ui = SpreadsheetApp.getUi();

  if (!sheet) {
    ui.alert(`Sheet "${sheetName}" not found.`);
    return;
  }

  // Get Reg No from selection cell
  const regCell = sheetName === CONFIG.SHEETS.BILL ? 'C5' : 'C4';
  const regNo = sheet.getRange(regCell).getValue();
  if (!regNo) {
    ui.alert(`Please choose a Patient Reg No in cell ${regCell} of "${sheetName}" first.`);
    return;
  }

  const cleanRegNo = String(regNo).replace(/\//g, '_');
  const fileName = `${cleanRegNo}_${fileNameSuffix}.pdf`;

  // Get or create Drive Folder
  const folders = DriveApp.getFoldersByName(folderName);
  const folder = folders.hasNext() ? folders.next() : DriveApp.createFolder(folderName);

  // PDF Export URL
  const sheetId = sheet.getSheetId();
  const url = `${ss.getUrl().replace(/edit$/, '')}export?exportFormat=pdf&format=pdf` +
    `&size=A4` +
    `&portrait=true` +
    `&fitw=true` +
    `&gridlines=false` +
    `&printtitle=false` +
    `&sheetnames=false` +
    `&fzr=false` +
    `&gid=${sheetId}`;

  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const blob = response.getBlob().setName(fileName);
  const file = folder.createFile(blob);

  const html = HtmlService.createHtmlOutput(
    `<p style="font-family: Arial, sans-serif; font-size: 13px;">Generated PDF: <b>${fileName}</b></p>` +
    `<p><a href="${file.getUrl()}" target="_blank" style="display:inline-block;padding:8px 16px;background:#0b57d0;color:#fff;text-decoration:none;border-radius:4px;font-weight:600;">Open / Download PDF</a></p>`
  ).setWidth(360).setHeight(130);
  ui.showModalDialog(html, 'PDF Generated Successfully');
}

function exportRegistrationFormPDF() {
  exportSheetToPDF(CONFIG.SHEETS.REG_FORM, 'Registration_Form', CONFIG.FOLDERS.REG_FORMS);
}

function exportBillPDF() {
  exportSheetToPDF(CONFIG.SHEETS.BILL, 'Inpatient_Bill', CONFIG.FOLDERS.BILLS);
}

// ==========================================
// 7. CELL PROTECTION UTILITY
// ==========================================
function protectFormulaCells() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const patients = ss.getSheetByName(CONFIG.SHEETS.PATIENTS);
  if (patients) {
    const pProt = patients.protect().setDescription('Patients System Lock');
    // Allow editing input columns only (F to AC)
    pProt.setUnprotectedRanges([patients.getRange('F2:AC')]);
  }

  ui.alert('🔒 All calculation and ID columns are protected. Input fields remain editable.');
}

