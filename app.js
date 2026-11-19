/**
 * ANIL KUMAR KARMAKAR MEMORIAL CANCER TRUST - HOSPITAL MANAGEMENT SYSTEM
 * Frontend Application Controller: app.js
 * Architecture: Clean Vanilla JS, Reactive UI State, Pluggable API Bridge
 */

// ==========================================
// 1. DATA STATE & SEED TEST CASE
// ==========================================
const DEFAULT_SETTINGS = {
  bedChargesPerDay: 0,
  stayChargesPerDay: 0,
  palliativeCareChargesPerDay: 0,
  nursingWardChargesPerDay: 0,
  homeChargesPerDay: 0,
  countAdmissionDay: "Yes",
  backendType: "local", // 'local' | 'sheets' | 'mongodb'
  webAppUrl: "",
  adminUsername: "Admin",
  // Default SHA-256 hash for "1234"
  adminPasswordHash: "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4"
};

// Initial Seed Data: Contains the exact verified test case
const SEED_DATA = {
  patients: [
    {
      _id: "pat_001",
      regNo: "AKKMCT/001/2026",
      admissionDate: "01/11/2026",
      admissionTime: "10:30 AM",
      admissionDay: "Sunday",
      dischargeDate: "04/11/2026",
      dischargeTime: "04:00 PM",
      mrMrs: "Mr",
      name: "Subhashish",
      surname: "Mukherjee",
      guardian: "Late N. C. Mukherjee",
      age: 62,
      diseaseCategory: "Cancer",
      sex: "Male",
      maritalStatus: "Married",
      occupation: "Retired Teacher",
      religion: "Hindu",
      nationality: "Indian",
      permanentAddress: "12, Central Avenue, Bowbazar",
      presentAddress: "12, Central Avenue, Bowbazar",
      city: "Kolkata",
      pin: "700012",
      district: "Kolkata",
      state: "West Bengal",
      contactPerson: "A. Mukherjee (Son)",
      contactNo: "9830012345",
      whatsappNo: "9830012345",
      aadhaarNo: "7823 4519 8201",
      refDoctor: "Dr. P. Sen",
      doctorAdvice: "Palliative care, regular vitals monitoring, pain management protocol.",
      status: "Discharged",
      createdAt: "2026-11-01T05:00:00Z"
    }
  ],
  expenses: [
    {
      _id: "exp_001",
      regNo: "AKKMCT/001/2026",
      date: "01/11/2026",
      category: "Doctor Fees",
      description: "Dr. P. Sen Consultation",
      qty: 1,
      rate: 1500,
      amount: 1500,
      discount: 0,
      netAmount: 1500,
      createdAt: "2026-11-01T06:00:00Z"
    },
    {
      _id: "exp_002",
      regNo: "AKKMCT/001/2026",
      date: "02/11/2026",
      category: "Pathology",
      description: "Complete Blood Count & Liver Panel",
      qty: 1,
      rate: 1000,
      amount: 1000,
      discount: 200,
      netAmount: 800,
      createdAt: "2026-11-02T08:00:00Z"
    },
    {
      _id: "exp_003",
      regNo: "AKKMCT/001/2026",
      date: "02/11/2026",
      category: "Medicine",
      description: "IV Fluids, Antibiotics & Syringes",
      qty: 1,
      rate: 1200,
      amount: 1200,
      discount: 0,
      netAmount: 1200,
      createdAt: "2026-11-02T10:00:00Z"
    }
  ],
  payments: [
    {
      _id: "pay_001",
      regNo: "AKKMCT/001/2026",
      date: "01/11/2026",
      amount: 2000,
      mode: "Cash",
      remarks: "Admission Advance Deposit",
      createdAt: "2026-11-01T05:15:00Z"
    },
    {
      _id: "pay_002",
      regNo: "AKKMCT/001/2026",
      date: "03/11/2026",
      amount: 2500,
      mode: "UPI",
      remarks: "UPI Txn ID: 3192849201",
      createdAt: "2026-11-03T09:30:00Z"
    }
  ],
  documents: [
    {
      regNo: "AKKMCT/001/2026",
      patientAadhaar: true,
      patientAadhaarLink: "https://drive.google.com/file/d/demo-patient-aadhaar/view",
      partyAadhaar: true,
      partyAadhaarLink: "https://drive.google.com/file/d/demo-party-aadhaar/view",
      statusVerified: true,
      adviceCert: true,
      adviceCertLink: "https://drive.google.com/file/d/demo-discharge-cert/view"
    }
  ],
  vendors: [
    {
      _id: "vnd_001",
      vendorId: "VND-001",
      name: "Metro Pharma Distributors",
      category: "Medicine / Pharmacy",
      contactPerson: "Subir Roy",
      phone: "9831098765",
      gstin: "19AAECM1234F1Z5",
      drugLicNo: "DL-20B/1049",
      address: "14, B. B. Ganguly Street, Kolkata-700012",
      bankName: "State Bank of India",
      accountNo: "30982341234",
      ifsc: "SBIN0000123",
      creditDays: 30,
      openingBalance: 0,
      createdAt: "2026-11-01T04:00:00Z"
    },
    {
      _id: "vnd_002",
      vendorId: "VND-002",
      name: "Bengal Surgical & Healthcare",
      category: "Surgical & Disposables",
      contactPerson: "P. K. Ghosh",
      phone: "9830123499",
      gstin: "19AABCB5678G1ZP",
      drugLicNo: "DL-21B/8821",
      address: "22, College Street, Kolkata-700073",
      bankName: "HDFC Bank",
      accountNo: "50200012345678",
      ifsc: "HDFC0000123",
      creditDays: 21,
      openingBalance: 0,
      createdAt: "2026-11-01T04:00:00Z"
    },
    {
      _id: "vnd_003",
      vendorId: "VND-003",
      name: "National Oxygen & Gas Solutions",
      category: "Medical Oxygen",
      contactPerson: "Alok Sen",
      phone: "9830554433",
      gstin: "19AADCN9988H1Z2",
      drugLicNo: "--",
      address: "Plot 8, Kasba Industrial Estate, Kolkata-700107",
      bankName: "Punjab National Bank",
      accountNo: "0123002100054321",
      ifsc: "PUNB0012300",
      creditDays: 15,
      openingBalance: 0,
      createdAt: "2026-11-01T04:00:00Z"
    }
  ],
  purchases: [
    {
      _id: "pur_001",
      grnNo: "GRN/001/2026",
      vendorId: "VND-001",
      vendorName: "Metro Pharma Distributors",
      invoiceNo: "INV-2026-881",
      invoiceDate: "01/11/2026",
      items: [
        { itemName: "Inj. Ondansetron 2ml", category: "Medicine", batchNo: "OND2601", expiryDate: "2027-12", qty: 50, rate: 45, amount: 2250 },
        { itemName: "Inj. Tramadol 50mg", category: "Medicine", batchNo: "TRM2605", expiryDate: "2027-06", qty: 30, rate: 60, amount: 1800 }
      ],
      grossAmount: 4050,
      gstPercent: 12,
      gstAmount: 486,
      netAmount: 4536,
      paidAmount: 2500,
      paymentStatus: "Partial",
      createdAt: "2026-11-01T06:30:00Z"
    }
  ],
  inventory: [
    {
      _id: "inv_001",
      purchaseId: "pur_001",
      vendorId: "VND-001",
      itemName: "Inj. Ondansetron 2ml",
      category: "Medicine",
      batchNo: "OND2601",
      expiryDate: "2027-12",
      initialQty: 50,
      currentQty: 48,
      rate: 45,
      createdAt: "2026-11-01T06:30:00Z"
    },
    {
      _id: "inv_002",
      purchaseId: "pur_001",
      vendorId: "VND-001",
      itemName: "Inj. Tramadol 50mg",
      category: "Medicine",
      batchNo: "TRM2605",
      expiryDate: "2027-06",
      initialQty: 30,
      currentQty: 29,
      rate: 60,
      createdAt: "2026-11-01T06:30:00Z"
    },
    {
      _id: "inv_003",
      purchaseId: "",
      vendorId: "VND-002",
      itemName: "IV Cannula 20G (Pink)",
      category: "Non-Surgical Item",
      batchNo: "CAN2511",
      expiryDate: "2026-12",
      initialQty: 100,
      currentQty: 95,
      rate: 25,
      createdAt: "2026-11-01T06:30:00Z"
    },
    {
      _id: "inv_004",
      purchaseId: "",
      vendorId: "VND-003",
      itemName: "Medical Oxygen Cylinder D-Type (Bulk)",
      category: "Oxygen",
      batchNo: "OXY2601",
      expiryDate: "2028-01",
      initialQty: 10,
      currentQty: 8,
      rate: 450,
      createdAt: "2026-11-01T06:30:00Z"
    }
  ],
  stockIssues: [
    {
      _id: "iss_001",
      batchId: "inv_001",
      itemName: "Inj. Ondansetron 2ml",
      batchNo: "OND2601",
      qty: 2,
      issueType: "Patient Clinical Billing",
      regNo: "AKKMCT/001/2026",
      department: "",
      issueDate: "02/11/2026",
      remarks: "Nausea relief",
      createdAt: "2026-11-02T08:00:00Z"
    }
  ],
  vendorVouchers: [
    {
      _id: "vch_001",
      voucherNo: "PV/001/2026",
      vendorId: "VND-001",
      date: "03/11/2026",
      amount: 2500,
      mode: "NEFT / RTGS",
      refNo: "UTR3198741029",
      remarks: "Part payment against INV-2026-881",
      createdAt: "2026-11-03T11:00:00Z"
    }
  ]
};

// ==========================================
// 2. STORAGE & API BRIDGE (Sheets/Local/Mongo)
// ==========================================
const Storage = {
  get: function(key, fallback) {
    try {
      const data = localStorage.getItem(`AKKMCT_${key}`);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: function(key, val) {
    try {
      localStorage.setItem(`AKKMCT_${key}`, JSON.stringify(val));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  },
  init: function() {
    if (!localStorage.getItem("AKKMCT_initialized")) {
      this.set("patients", SEED_DATA.patients);
      this.set("expenses", SEED_DATA.expenses);
      this.set("payments", SEED_DATA.payments);
      this.set("documents", SEED_DATA.documents);
      this.set("vendors", SEED_DATA.vendors);
      this.set("purchases", SEED_DATA.purchases);
      this.set("inventory", SEED_DATA.inventory);
      this.set("stockIssues", SEED_DATA.stockIssues);
      this.set("vendorVouchers", SEED_DATA.vendorVouchers);
      this.set("settings", DEFAULT_SETTINGS);
      localStorage.setItem("AKKMCT_initialized", "true");
    } else {
      // Lazy migration: Ensure Finance & Procurement tables exist
      if (!localStorage.getItem("AKKMCT_vendors")) this.set("vendors", SEED_DATA.vendors);
      if (!localStorage.getItem("AKKMCT_purchases")) this.set("purchases", SEED_DATA.purchases);
      if (!localStorage.getItem("AKKMCT_inventory")) this.set("inventory", SEED_DATA.inventory);
      if (!localStorage.getItem("AKKMCT_stockIssues")) this.set("stockIssues", SEED_DATA.stockIssues);
      if (!localStorage.getItem("AKKMCT_vendorVouchers")) this.set("vendorVouchers", SEED_DATA.vendorVouchers);
    }
  }
};

Storage.init();

// App State Cache
let state = {
  patients: Storage.get("patients", []),
  expenses: Storage.get("expenses", []),
  payments: Storage.get("payments", []),
  documents: Storage.get("documents", []),
  vendors: Storage.get("vendors", SEED_DATA.vendors),
  purchases: Storage.get("purchases", SEED_DATA.purchases),
  inventory: Storage.get("inventory", SEED_DATA.inventory),
  stockIssues: Storage.get("stockIssues", SEED_DATA.stockIssues),
  vendorVouchers: Storage.get("vendorVouchers", SEED_DATA.vendorVouchers),
  settings: Storage.get("settings", DEFAULT_SETTINGS),
  selectedRegNo: "AKKMCT/001/2026",
  selectedVendorId: "VND-001"
};

// Ensure default daily charges are Rs. 0 by default
if (state.settings.bedChargesPerDay === undefined) state.settings.bedChargesPerDay = 0;
if (state.settings.stayChargesPerDay === undefined) state.settings.stayChargesPerDay = 0;
if (state.settings.palliativeCareChargesPerDay === undefined) state.settings.palliativeCareChargesPerDay = 0;
if (state.settings.nursingWardChargesPerDay === undefined) state.settings.nursingWardChargesPerDay = 0;
state.settings.homeChargesPerDay = (state.settings.bedChargesPerDay || 0) + 
                                  (state.settings.stayChargesPerDay || 0) + 
                                  (state.settings.palliativeCareChargesPerDay || 0) + 
                                  (state.settings.nursingWardChargesPerDay || 0);

// ==========================================
// 3. UTILITIES & FORMATTERS
// ==========================================
function formatCurrency(num) {
  const n = parseFloat(num) || 0;
  return "₹" + n.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function parseDateDDMMYYYY(dateStr) {
  if (!dateStr) return null;
  // If ISO YYYY-MM-DD
  if (dateStr.includes("-")) {
    const p = dateStr.split("-");
    return new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
  }
  // If DD/MM/YYYY
  const p = dateStr.split("/");
  if (p.length === 3) {
    return new Date(parseInt(p[2], 10), parseInt(p[1], 10) - 1, parseInt(p[0], 10));
  }
  return new Date(dateStr);
}

function formatDateDDMMYYYY(d) {
  if (!d || isNaN(d.getTime())) return "--";
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}

function formatTime12Hr(d) {
  if (!d || isNaN(d.getTime())) return "--";
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 is 12
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

function getDayName(d) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[d.getDay()];
}

// Date & Time conversion helpers
function ddmmyyyyToIsoDate(str) {
  if (!str) return "";
  if (str.includes("-")) return str;
  const parts = str.split("/");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return "";
}

function isoDateToDdmmyyyy(iso) {
  if (!iso) return "";
  if (iso.includes("/")) return iso;
  const parts = iso.split("-");
  if (parts.length === 3) {
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  }
  return iso;
}

function time12HrTo24Hr(time12) {
  if (!time12) return "";
  const match = String(time12).trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i);
  if (!match) return time12;
  let [_, hours, minutes, period] = match;
  hours = parseInt(hours, 10);
  if (period) {
    period = period.toUpperCase();
    if (period === "PM" && hours < 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
  }
  return `${String(hours).padStart(2, '0')}:${minutes}`;
}

function formatTimeInputValueTo12Hr(timeVal) {
  if (!timeVal) return "";
  if (timeVal.toUpperCase().includes("AM") || timeVal.toUpperCase().includes("PM")) return timeVal;
  const parts = timeVal.split(":");
  if (parts.length < 2) return timeVal;
  let hours = parseInt(parts[0], 10);
  const minutes = parts[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
}

// Generate Reg No: AKKMCT/<001>/<YYYY>
function generateNextRegNo() {
  const currentYear = new Date().getFullYear();
  const regex = new RegExp(`^AKKMCT\\/(\\d{3})\\/${currentYear}$`);
  let maxSeq = 0;

  state.patients.forEach(p => {
    const match = String(p.regNo).match(regex);
    if (match) {
      const seq = parseInt(match[1], 10);
      if (seq > maxSeq) maxSeq = seq;
    }
  });

  const nextSeq = String(maxSeq + 1).padStart(3, '0');
  return `AKKMCT/${nextSeq}/${currentYear}`;
}

// ==========================================
// 4. BILLING & CALCULATION ENGINE
// ==========================================
function calculateStayDays(admissionDateStr, dischargeDateStr, countAdmissionDaySetting) {
  const admDate = parseDateDDMMYYYY(admissionDateStr);
  if (!admDate) return 0;

  const disDate = dischargeDateStr ? parseDateDDMMYYYY(dischargeDateStr) : new Date();
  
  // Normalize both dates to midnight for clean day calculation
  const d1 = new Date(admDate.getFullYear(), admDate.getMonth(), admDate.getDate());
  const d2 = new Date(disDate.getFullYear(), disDate.getMonth(), disDate.getDate());

  const diffTime = d2.getTime() - d1.getTime();
  let days = Math.round(diffTime / (1000 * 60 * 60 * 24));
  if (days < 0) days = 0;

  // Option: count admission day as billed day
  if (countAdmissionDaySetting === "Yes") {
    days += 1;
  }

  return days;
}

function computePatientBill(regNo) {
  const patient = state.patients.find(p => p.regNo === regNo);
  if (!patient) return null;

  const bedRate = parseFloat(state.settings.bedChargesPerDay) || 0;
  const stayRate = parseFloat(state.settings.stayChargesPerDay) || 0;
  const palliativeRate = parseFloat(state.settings.palliativeCareChargesPerDay) || 0;
  const nursingRate = parseFloat(state.settings.nursingWardChargesPerDay) || 0;
  const countAdmDay = state.settings.countAdmissionDay || "Yes";

  const stayDays = calculateStayDays(patient.admissionDate, patient.dischargeDate, countAdmDay);

  const bedCharges = stayDays * bedRate;
  const stayCharges = stayDays * stayRate;
  const palliativeCharges = stayDays * palliativeRate;
  const nursingCharges = stayDays * nursingRate;
  const totalDailyCharges = bedCharges + stayCharges + palliativeCharges + nursingCharges;

  // Sum Expenses by Category
  const patientExpenses = state.expenses.filter(e => e.regNo === regNo);

  let doctorFees = 0;
  let pathologyGross = 0;
  let pathologyDiscount = 0;
  let pathologyNet = 0;
  let medicine = 0;
  let oxygen = 0;
  let nonSurgical = 0;
  let others = 0;

  patientExpenses.forEach(exp => {
    const amt = parseFloat(exp.amount) || 0;
    const disc = parseFloat(exp.discount) || 0;
    const net = parseFloat(exp.netAmount) || 0;

    switch (exp.category) {
      case "Doctor Fees":
        doctorFees += net;
        break;
      case "Pathology":
        pathologyGross += amt;
        pathologyDiscount += disc;
        pathologyNet += net;
        break;
      case "Medicine":
        medicine += net;
        break;
      case "Oxygen":
        oxygen += net;
        break;
      case "Non-Surgical Item":
        nonSurgical += net;
        break;
      default:
        others += net;
        break;
    }
  });

  const totalBill = totalDailyCharges + doctorFees + pathologyNet + medicine + oxygen + nonSurgical + others;

  // Payments
  const patientPayments = state.payments.filter(p => p.regNo === regNo);
  const totalReceived = patientPayments.reduce((sum, p) => sum + (parseFloat(p.amount) || 0), 0);
  const outstanding = totalBill - totalReceived;

  return {
    patient,
    stayDays,
    bedRate,
    bedCharges,
    stayRate,
    stayCharges,
    palliativeRate,
    palliativeCharges,
    nursingRate,
    nursingCharges,
    ratePerDay: bedRate + stayRate + palliativeRate + nursingRate,
    homeCharges: totalDailyCharges,
    totalDailyCharges,
    doctorFees,
    pathologyGross,
    pathologyDiscount,
    pathologyNet,
    medicine,
    oxygen,
    nonSurgical,
    others,
    totalBill,
    totalReceived,
    outstanding,
    payments: patientPayments
  };
}

// ==========================================
// 5. VIEW RENDERING FUNCTIONS
// ==========================================

// Render Patients Table
function renderPatientsTable() {
  const tbody = document.getElementById("patientsTableBody");
  const search = document.getElementById("patientSearchInput").value.trim().toLowerCase();
  const statusFilter = document.getElementById("patientStatusFilter").value;
  const categoryFilter = document.getElementById("patientCategoryFilter") ? document.getElementById("patientCategoryFilter").value : "ALL";

  tbody.innerHTML = "";

  let totalBilledSum = 0;
  let totalOutstandingSum = 0;
  let admittedCount = 0;

  state.patients.forEach(pat => {
    // Filter
    if (statusFilter !== "ALL" && pat.status !== statusFilter) return;
    if (categoryFilter !== "ALL" && (pat.diseaseCategory || "Cancer") !== categoryFilter) return;
    if (search) {
      const match = (pat.regNo + " " + pat.name + " " + pat.surname + " " + (pat.diseaseCategory || "") + " " + pat.contactNo + (pat.aadhaarNo ? " " + pat.aadhaarNo + " " + pat.aadhaarNo.replace(/\s/g, "") : "")).toLowerCase();
      if (!match.includes(search)) return;
    }

    if (pat.status === "Admitted") admittedCount++;

    const bill = computePatientBill(pat.regNo);
    const billAmt = bill ? bill.totalBill : 0;
    const recAmt = bill ? bill.totalReceived : 0;
    const outAmt = bill ? bill.outstanding : 0;

    totalBilledSum += billAmt;
    totalOutstandingSum += outAmt;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${pat.regNo}</strong></td>
      <td>${pat.admissionDate} <br><small class="text-muted">${pat.admissionTime} (${pat.admissionDay})</small></td>
      <td><strong>${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname}</strong></td>
      <td><span class="badge" style="background:#fff7ed;color:#c2410c;border:1px solid #fdba74;font-size:11px;padding:2px 7px;border-radius:4px;font-weight:700;display:inline-block;">${pat.diseaseCategory || 'Cancer'}</span></td>
      <td>${pat.age} Yrs</td>
      <td>${pat.contactNo}</td>
      <td><span class="badge badge-${pat.status.toLowerCase()}">${pat.status}</span></td>
      <td>${formatCurrency(billAmt)}</td>
      <td>${formatCurrency(recAmt)}</td>
      <td class="${outAmt > 0 ? 'text-red bold' : 'text-success bold'}">${formatCurrency(outAmt)}</td>
      <td class="no-print" style="white-space: nowrap;">
        <div class="table-actions" style="display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; flex-wrap: nowrap;">
          <button class="btn btn-secondary btn-sm" onclick="openEditPatientModal('${pat.regNo}')" title="Edit patient details">Edit</button>
          <button class="btn btn-secondary btn-sm" onclick="viewPatientForm('${pat.regNo}')">Form</button>
          <button class="btn btn-secondary btn-sm" onclick="viewPatientBill('${pat.regNo}')">Bill</button>
          ${pat.status === "Admitted" ? `<button class="btn btn-primary btn-sm" onclick="openDischargeModal('${pat.regNo}')">Discharge</button>` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // KPI update
  document.getElementById("kpiTotalPatients").textContent = state.patients.length;
  document.getElementById("kpiCurrentlyAdmitted").textContent = admittedCount;
  document.getElementById("kpiTotalBilled").textContent = formatCurrency(totalBilledSum);
  document.getElementById("kpiTotalOutstanding").textContent = formatCurrency(totalOutstandingSum);
}

// Render Selectors Dropdowns
function updateAllPatientDropdowns() {
  const selects = [
    document.getElementById("regFormPatientSelect"),
    document.getElementById("billPatientSelect"),
    document.getElementById("expensePatientFilter"),
    document.getElementById("paymentPatientFilter"),
    document.getElementById("expModalRegSelect"),
    document.getElementById("payModalRegSelect"),
    document.getElementById("issueModalPatientSelect")
  ];

  selects.forEach(sel => {
    if (!sel) return;
    const isFilter = sel.id.includes("Filter");
    const currentVal = sel.value;
    
    sel.innerHTML = isFilter 
      ? '<option value="ALL">All Patients</option>' 
      : '<option value="">-- Choose Patient by Reg No --</option>';

    state.patients.forEach(p => {
      const opt = document.createElement("option");
      opt.value = p.regNo;
      opt.textContent = `${p.regNo} - ${p.name} ${p.surname} (${p.status})`;
      sel.appendChild(opt);
    });

    if (currentVal && sel.querySelector(`option[value="${currentVal}"]`)) {
      sel.value = currentVal;
    }
  });
}

// Render Printable Registration Form
function renderRegistrationForm(regNo) {
  const pat = state.patients.find(p => p.regNo === regNo);
  if (!pat) return;

  document.getElementById("rfRegNo").textContent = pat.regNo;
  document.getElementById("rfPrintDate").textContent = formatDateDDMMYYYY(new Date());
  document.getElementById("rfFullName").textContent = `${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname}`.trim();
  document.getElementById("rfGuardian").textContent = pat.guardian || "--";
  document.getElementById("rfAdmDate").textContent = pat.admissionDate;
  document.getElementById("rfAdmTime").textContent = pat.admissionTime;
  document.getElementById("rfAdmDay").textContent = pat.admissionDay;
  if (document.getElementById("rfAge")) document.getElementById("rfAge").textContent = `${pat.age} Years`;
  if (document.getElementById("rfAgeSex")) document.getElementById("rfAgeSex").textContent = `${pat.age} Years`;
  if (document.getElementById("rfDiseaseCategory")) document.getElementById("rfDiseaseCategory").textContent = pat.diseaseCategory || "--";
  document.getElementById("rfMarital").textContent = pat.maritalStatus || "--";
  document.getElementById("rfReligion").textContent = `${pat.religion || '--'} / ${pat.nationality || 'Indian'}`;
  document.getElementById("rfOccupation").textContent = pat.occupation || "--";
  document.getElementById("rfRefDoctor").textContent = pat.refDoctor || "--";
  document.getElementById("rfPermAddress").textContent = pat.permanentAddress || "--";
  document.getElementById("rfPresAddress").textContent = pat.presentAddress || pat.permanentAddress || "--";
  document.getElementById("rfCity").textContent = pat.city || "--";
  document.getElementById("rfDistrict").textContent = pat.district || "--";
  document.getElementById("rfState").textContent = pat.state || "--";
  document.getElementById("rfPin").textContent = pat.pin || "--";
  document.getElementById("rfContactPerson").textContent = pat.contactPerson || "--";
  document.getElementById("rfPhones").textContent = `Phone: ${pat.contactNo} | WhatsApp: ${pat.whatsappNo}`;
  const elStatus = document.getElementById("rfStatus");
  if (elStatus) {
    elStatus.textContent = pat.status;
    elStatus.className = `field-val badge badge-${pat.status.toLowerCase()}`;
  }
  document.getElementById("rfDischargeInfo").textContent = pat.dischargeDate ? `${pat.dischargeDate} ${pat.dischargeTime || ''}` : "Currently Admitted";

  const elDocAdvice = document.getElementById("rfDoctorAdvice");
  if (elDocAdvice) {
    elDocAdvice.textContent = pat.doctorAdvice || "--";
  }

  // Aadhaar Details
  const elAadhaarNo = document.getElementById("rfAadhaarNo");
  if (elAadhaarNo) elAadhaarNo.textContent = pat.aadhaarNo ? formatAadhaarNumber(pat.aadhaarNo) : "--";

  const elAadhaarStatus = document.getElementById("rfAadhaarStatus");
  if (elAadhaarStatus) {
    const doc = state.documents.find(d => d.regNo === regNo);
    const hasLink = doc && doc.patientAadhaarLink;
    if (hasLink) {
      if (doc.patientAadhaarLink.startsWith("data:")) {
        elAadhaarStatus.innerHTML = `<button type="button" class="btn btn-secondary btn-sm no-print" onclick="viewAadhaarDocument('${doc.patientAadhaarLink}', 'Aadhaar - ${pat.name} ${pat.surname}')" style="padding: 2px 8px; font-size: 11px;">👁️ View Attached Copy</button><span class="print-only">Attached On File</span>`;
      } else {
        elAadhaarStatus.innerHTML = `<a href="${doc.patientAadhaarLink}" target="_blank" style="color: var(--teal-primary); font-weight: 700; text-decoration: underline;">📄 View Attached Copy</a>`;
      }
    } else if (doc && doc.patientAadhaar) {
      elAadhaarStatus.innerHTML = `<span style="color: #15803d; font-weight: 600;">✓ Verified On File</span>`;
    } else {
      elAadhaarStatus.innerHTML = `<span class="text-muted">Not Attached</span>`;
    }
  }

  state.selectedRegNo = regNo;
  document.getElementById("regFormPatientSelect").value = regNo;
}

// Render Printable Bill
function renderBill(regNo) {
  const billData = computePatientBill(regNo);
  if (!billData) return;

  const pat = billData.patient;

  document.getElementById("billRegNo").textContent = pat.regNo;
  document.getElementById("billDate").textContent = formatDateDDMMYYYY(new Date());
  document.getElementById("billPatientName").textContent = `${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname}`.trim();
  if (document.getElementById("billDiseaseCategory")) document.getElementById("billDiseaseCategory").textContent = pat.diseaseCategory || "Cancer";
  if (document.getElementById("billAgeSex")) document.getElementById("billAgeSex").textContent = `${pat.age} Yrs`;
  document.getElementById("billAdmissionInfo").textContent = `${pat.admissionDate} ${pat.admissionTime}`;
  document.getElementById("billDischargeInfo").textContent = pat.dischargeDate ? `${pat.dischargeDate} ${pat.dischargeTime}` : "Still Admitted";
  const elBillStatus = document.getElementById("billStatus");
  if (elBillStatus) {
    elBillStatus.textContent = pat.status;
    elBillStatus.className = `meta-val badge badge-${pat.status.toLowerCase()}`;
  }
  document.getElementById("billStayDays").textContent = `${billData.stayDays} Days`;

  // Itemized Daily Inpatient Care Charges (Default: Rs. 0)
  if (document.getElementById("billBedDays")) {
    document.getElementById("billBedDays").textContent = billData.stayDays;
    document.getElementById("billBedRate").textContent = billData.bedRate.toFixed(2);
    document.getElementById("billBedAmount").textContent = formatCurrency(billData.bedCharges);

    document.getElementById("billStayDaysQty").textContent = billData.stayDays;
    document.getElementById("billStayRate").textContent = billData.stayRate.toFixed(2);
    document.getElementById("billStayAmount").textContent = formatCurrency(billData.stayCharges);

    document.getElementById("billPalliativeDays").textContent = billData.stayDays;
    document.getElementById("billPalliativeRate").textContent = billData.palliativeRate.toFixed(2);
    document.getElementById("billPalliativeAmount").textContent = formatCurrency(billData.palliativeCharges);

    document.getElementById("billNursingDays").textContent = billData.stayDays;
    document.getElementById("billNursingRate").textContent = billData.nursingRate.toFixed(2);
    document.getElementById("billNursingAmount").textContent = formatCurrency(billData.nursingCharges);
  }
  if (document.getElementById("billHomeDays")) document.getElementById("billHomeDays").textContent = billData.stayDays;
  if (document.getElementById("billHomeRate")) document.getElementById("billHomeRate").textContent = billData.ratePerDay.toFixed(2);
  if (document.getElementById("billHomeAmount")) document.getElementById("billHomeAmount").textContent = formatCurrency(billData.totalDailyCharges);
  
  // Clinical Expense Categories (Qty, Rate, Amount)
  if (document.getElementById("billDoctorQty")) {
    document.getElementById("billDoctorQty").textContent = billData.doctorQty > 0 ? billData.doctorQty : "-";
    document.getElementById("billDoctorRate").textContent = billData.doctorQty > 0 ? billData.doctorRate.toFixed(2) : "-";
  }
  document.getElementById("billDoctorFees").textContent = formatCurrency(billData.doctorFees);
  
  document.getElementById("billPathologyGross").textContent = formatCurrency(billData.pathologyGross);
  document.getElementById("billPathologyDiscount").textContent = formatCurrency(billData.pathologyDiscount);
  if (document.getElementById("billPathologyQty")) {
    document.getElementById("billPathologyQty").textContent = billData.pathologyQty > 0 ? billData.pathologyQty : "-";
    document.getElementById("billPathologyRate").textContent = billData.pathologyQty > 0 ? billData.pathologyRate.toFixed(2) : "-";
  }
  document.getElementById("billPathologyNet").textContent = formatCurrency(billData.pathologyNet);
  
  if (document.getElementById("billMedicineQty")) {
    document.getElementById("billMedicineQty").textContent = billData.medicineQty > 0 ? billData.medicineQty : "-";
    document.getElementById("billMedicineRate").textContent = billData.medicineQty > 0 ? billData.medicineRate.toFixed(2) : "-";
  }
  document.getElementById("billMedicine").textContent = formatCurrency(billData.medicine);

  if (document.getElementById("billOxygenQty")) {
    document.getElementById("billOxygenQty").textContent = billData.oxygenQty > 0 ? billData.oxygenQty : "-";
    document.getElementById("billOxygenRate").textContent = billData.oxygenQty > 0 ? billData.oxygenRate.toFixed(2) : "-";
  }
  document.getElementById("billOxygen").textContent = formatCurrency(billData.oxygen);

  if (document.getElementById("billNonSurgicalQty")) {
    document.getElementById("billNonSurgicalQty").textContent = billData.nonSurgicalQty > 0 ? billData.nonSurgicalQty : "-";
    document.getElementById("billNonSurgicalRate").textContent = billData.nonSurgicalQty > 0 ? billData.nonSurgicalRate.toFixed(2) : "-";
  }
  document.getElementById("billNonSurgical").textContent = formatCurrency(billData.nonSurgical);

  if (document.getElementById("billOthersQty")) {
    document.getElementById("billOthersQty").textContent = billData.othersQty > 0 ? billData.othersQty : "-";
    document.getElementById("billOthersRate").textContent = billData.othersQty > 0 ? billData.othersRate.toFixed(2) : "-";
  }
  document.getElementById("billOthers").textContent = formatCurrency(billData.others);

  document.getElementById("billGrandTotal").textContent = formatCurrency(billData.totalBill);
  document.getElementById("billTotalPaid").textContent = formatCurrency(billData.totalReceived);
  document.getElementById("billOutstanding").textContent = formatCurrency(billData.outstanding);

  // Receipts Table on Bill
  const receiptsTbody = document.getElementById("billReceiptsBody");
  receiptsTbody.innerHTML = "";
  if (billData.payments.length === 0) {
    receiptsTbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">No payments recorded yet</td></tr>';
  } else {
    billData.payments.forEach(pay => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pay.date}</td>
        <td><strong>${pay.mode}</strong></td>
        <td>${pay.remarks || '--'}</td>
        <td class="text-right bold">${formatCurrency(pay.amount)}</td>
      `;
      receiptsTbody.appendChild(row);
    });
  }

  state.selectedRegNo = regNo;
  document.getElementById("billPatientSelect").value = regNo;
}

// Render Expenses Table with Totals and All Categories Summary (on bottom)
function renderExpensesTable() {
  const tbody = document.getElementById("expensesTableBody");
  const patFilter = document.getElementById("expensePatientFilter").value;
  const catFilter = document.getElementById("expenseCategoryFilter").value;

  tbody.innerHTML = "";

  let totalQty = 0;
  let totalGross = 0;
  let totalDisc = 0;
  let totalNet = 0;

  // Category breakdown for ALL standard categories
  const categoriesList = ["Doctor Fees", "Pathology", "Medicine", "Oxygen", "Non-Surgical Item", "Others"];
  const catSummary = {};
  categoriesList.forEach(c => {
    catSummary[c] = { qty: 0, gross: 0, disc: 0, net: 0, count: 0 };
  });

  const filteredExpenses = state.expenses.filter(exp => {
    if (patFilter !== "ALL" && exp.regNo !== patFilter) return false;
    if (catFilter !== "ALL" && exp.category !== catFilter) return false;
    return true;
  });

  filteredExpenses.forEach(exp => {
    const q = parseFloat(exp.qty) || 1;
    const r = parseFloat(exp.rate) || 0;
    const gross = parseFloat(exp.amount) || 0;
    const disc = parseFloat(exp.discount) || 0;
    const net = parseFloat(exp.netAmount) || 0;

    totalQty += q;
    totalGross += gross;
    totalDisc += disc;
    totalNet += net;

    const c = categoriesList.includes(exp.category) ? exp.category : "Others";
    catSummary[c].qty += q;
    catSummary[c].gross += gross;
    catSummary[c].disc += disc;
    catSummary[c].net += net;
    catSummary[c].count += 1;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${exp.date}</td>
      <td><strong>${exp.regNo}</strong></td>
      <td><span class="badge">${exp.category}</span></td>
      <td>${exp.description}</td>
      <td style="text-align: center; font-weight: 600;">${q}</td>
      <td style="text-align: right;">${formatCurrency(r)}</td>
      <td style="text-align: right;">${formatCurrency(gross)}</td>
      <td style="text-align: right; color: #c026d3;">${disc > 0 ? formatCurrency(disc) : '-'}</td>
      <td style="text-align: right;" class="bold">${formatCurrency(net)}</td>
      <td class="no-print">
        <div class="table-actions">
          <button class="btn btn-secondary btn-sm" onclick="openEditExpenseModal('${exp._id}')" title="Edit Expense">✏️ Edit</button>
          <button class="btn btn-secondary btn-sm" onclick="deleteExpense('${exp._id}')" title="Delete Expense">🗑️</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filteredExpenses.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding: 24px;">No expense entries found for the selected filter.</td></tr>`;
  }

  // Update Table Footer Totals (on bottom of table)
  const tfootQty = document.getElementById("expTotalQty");
  const tfootRate = document.getElementById("expAvgRate");
  const tfootAmt = document.getElementById("expTotalAmount");
  const tfootDisc = document.getElementById("expTotalDiscount");
  const tfootNet = document.getElementById("expTotalNet");

  if (tfootQty) tfootQty.textContent = totalQty;
  if (tfootRate) tfootRate.textContent = totalQty > 0 ? formatCurrency(totalGross / totalQty) : "-";
  if (tfootAmt) tfootAmt.textContent = formatCurrency(totalGross);
  if (tfootDisc) tfootDisc.textContent = formatCurrency(totalDisc);
  if (tfootNet) tfootNet.textContent = formatCurrency(totalNet);

  // Render All Categories Summary on bottom of Ledger
  const catSummaryBody = document.getElementById("expCategorySummaryBody");
  if (catSummaryBody) {
    catSummaryBody.innerHTML = "";
    categoriesList.forEach(c => {
      const data = catSummary[c];
      const avgRate = data.qty > 0 ? data.gross / data.qty : 0;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${c}</strong></td>
        <td style="text-align: center; font-weight: 700;">${data.qty > 0 ? data.qty : '-'}</td>
        <td style="text-align: right;">${data.qty > 0 ? formatCurrency(avgRate) : '-'}</td>
        <td style="text-align: right;">${data.gross > 0 ? formatCurrency(data.gross) : '₹0.00'}</td>
        <td style="text-align: right; color: #c026d3;">${data.disc > 0 ? formatCurrency(data.disc) : '-'}</td>
        <td style="text-align: right; font-weight: 800; color: #0f766e;">${data.net > 0 ? formatCurrency(data.net) : '₹0.00'}</td>
      `;
      catSummaryBody.appendChild(tr);
    });
  }

  // Update subtitle text for filter context
  const subtitle = document.getElementById("expSummarySubtitle");
  if (subtitle) {
    const patText = patFilter === "ALL" ? "All Patients" : patFilter;
    const catText = catFilter === "ALL" ? "All Categories" : catFilter;
    subtitle.textContent = `Filter: ${patText} | ${catText}`;
  }
}

// Render Payments Table
function renderPaymentsTable() {
  const tbody = document.getElementById("paymentsTableBody");
  const patFilter = document.getElementById("paymentPatientFilter").value;

  tbody.innerHTML = "";

  state.payments.forEach(pay => {
    if (patFilter !== "ALL" && pay.regNo !== patFilter) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${pay.date}</td>
      <td><strong>${pay.regNo}</strong></td>
      <td class="bold text-primary">${formatCurrency(pay.amount)}</td>
      <td><strong>${pay.mode}</strong></td>
      <td>${pay.remarks || '--'}</td>
      <td class="no-print">
        <button class="btn btn-secondary btn-sm" onclick="deletePayment('${pay._id}')">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Render Documents Checklist
function renderDocumentsTable() {
  const tbody = document.getElementById("documentsTableBody");
  tbody.innerHTML = "";

  state.patients.forEach(pat => {
    let doc = state.documents.find(d => d.regNo === pat.regNo);
    if (!doc) {
      doc = {
        regNo: pat.regNo,
        patientAadhaar: false,
        patientAadhaarLink: "",
        partyAadhaar: false,
        partyAadhaarLink: "",
        statusVerified: false,
        adviceCert: false,
        adviceCertLink: ""
      };
      state.documents.push(doc);
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${pat.regNo}</strong></td>
      <td>${pat.name} ${pat.surname}</td>
      <td class="text-center"><input type="checkbox" ${doc.patientAadhaar ? 'checked' : ''} onchange="updateDocCheck('${pat.regNo}', 'patientAadhaar', this.checked)"></td>
      <td>${doc.patientAadhaarLink ? (doc.patientAadhaarLink.startsWith("data:") ? `<a href="#" onclick="viewAadhaarDocument(state.documents.find(d => d.regNo === '${pat.regNo}').patientAadhaarLink, 'Aadhaar - ${pat.name} ${pat.surname}'); return false;" style="color: var(--teal-primary); font-weight: 600;">👁️ View Aadhaar</a>` : `<a href="${doc.patientAadhaarLink}" target="_blank" style="color: var(--teal-primary); font-weight: 600;">🔗 View Aadhaar</a>`) : '<span class="text-muted">No copy</span>'}</td>
      <td class="text-center"><input type="checkbox" ${doc.partyAadhaar ? 'checked' : ''} onchange="updateDocCheck('${pat.regNo}', 'partyAadhaar', this.checked)"></td>
      <td>${doc.partyAadhaarLink ? `<a href="${doc.partyAadhaarLink}" target="_blank" style="color: #0b57d0; font-weight: 600;">🔗 Open</a>` : '<span class="text-muted">No link</span>'}</td>
      <td class="text-center"><input type="checkbox" ${doc.statusVerified ? 'checked' : ''} onchange="updateDocCheck('${pat.regNo}', 'statusVerified', this.checked)"></td>
      <td class="text-center"><input type="checkbox" ${doc.adviceCert ? 'checked' : ''} onchange="updateDocCheck('${pat.regNo}', 'adviceCert', this.checked)"></td>
      <td>${doc.adviceCertLink ? `<a href="${doc.adviceCertLink}" target="_blank" style="color: #0b57d0; font-weight: 600;">🔗 Open</a>` : '<span class="text-muted">No link</span>'}</td>
      <td class="no-print text-center">
        <button class="btn btn-sm btn-secondary" onclick="openAttachDocModal('${pat.regNo}')" style="padding: 3px 8px; font-size: 11px;">📎 Attach / Edit</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  Storage.set("documents", state.documents);
}

function updateDocCheck(regNo, field, val) {
  const doc = state.documents.find(d => d.regNo === regNo);
  if (doc) {
    doc[field] = val;
    Storage.set("documents", state.documents);
  }
}

// Aadhaar & Document Attachment Helpers
function formatAadhaarNumber(val) {
  if (!val) return "";
  const digits = String(val).replace(/\D/g, "").slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
}

function setupAadhaarNumberFormatter() {
  const aadhaarInp = document.getElementById("inpPatientAadhaarNo");
  if (!aadhaarInp) return;

  // Format with a space after every 4 digits in real-time (XXXX XXXX XXXX)
  aadhaarInp.addEventListener("input", function(e) {
    const cursor = this.selectionEnd;
    const previousVal = this.value;

    // Count how many digits exist before the current cursor position
    const digitsBeforeCursor = previousVal.slice(0, cursor).replace(/\D/g, "").length;

    // Filter strictly to numbers up to 12 digits
    const digits = previousVal.replace(/\D/g, "").slice(0, 12);

    // Format with space after each 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    this.value = formatted;

    // Recalculate and set correct cursor position
    let newCursor = 0;
    let digitCount = 0;
    for (let i = 0; i < formatted.length; i++) {
      if (digitCount === digitsBeforeCursor) {
        newCursor = i;
        break;
      }
      if (/\d/.test(formatted[i])) {
        digitCount++;
      }
      newCursor = i + 1;
    }

    this.setSelectionRange(newCursor, newCursor);
  });

  // Handle backspace when cursor is positioned right after an auto-inserted space
  aadhaarInp.addEventListener("keydown", function(e) {
    if (e.key === "Backspace" && this.selectionStart === this.selectionEnd) {
      const cursor = this.selectionStart;
      if (cursor > 0 && this.value[cursor - 1] === " ") {
        e.preventDefault();
        const val = this.value;
        const digits = (val.slice(0, cursor - 2) + val.slice(cursor)).replace(/\D/g, "").slice(0, 12);
        const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
        this.value = formatted;

        const digitsBefore = val.slice(0, cursor - 2).replace(/\D/g, "").length;
        let newCursor = 0;
        let count = 0;
        for (let i = 0; i < this.value.length; i++) {
          if (count === digitsBefore) {
            newCursor = i;
            break;
          }
          if (/\d/.test(this.value[i])) count++;
          newCursor = i + 1;
        }
        this.setSelectionRange(newCursor, newCursor);
      }
    }
  });
}

// Viewer Helper for Uploaded Documents (Images & PDFs)
function viewAadhaarDocument(dataUrl, title) {
  if (!dataUrl) {
    alert("⚠️ No Aadhaar file has been uploaded yet.");
    return;
  }
  const win = window.open("", "_blank");
  if (!win) {
    alert("Please allow popups to view the uploaded Aadhaar card.");
    return;
  }
  if (dataUrl.startsWith("data:image/")) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title || 'Aadhaar Card Preview'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { margin: 0; background: #0f172a; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; font-family: sans-serif; box-sizing: border-box; }
          .header { color: #f8fafc; margin-bottom: 16px; font-size: 16px; font-weight: 700; }
          img { max-width: 95vw; max-height: 82vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); border: 2px solid #334155; }
          .btn-close { margin-top: 16px; background: #0f766e; color: #fff; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: 700; font-size: 14px; }
          .btn-close:hover { background: #115e59; }
        </style>
      </head>
      <body>
        <div class="header">🪪 ${title || 'Patient Aadhaar Card Preview'}</div>
        <img src="${dataUrl}" alt="Aadhaar Card Preview">
        <button class="btn-close" onclick="window.close()">Close Preview</button>
      </body>
      </html>
    `);
    win.document.close();
  } else if (dataUrl.startsWith("data:application/pdf")) {
    win.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title || 'Aadhaar Card PDF'}</title>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe src="${dataUrl}"></iframe>
      </body>
      </html>
    `);
    win.document.close();
  } else {
    win.location.href = dataUrl;
  }
}

function resetAadhaarUploadPreview() {
  const fileInp = document.getElementById("inpPatientAadhaarFile");
  if (fileInp) fileInp.value = "";
  const hiddenInp = document.getElementById("inpPatientAadhaarDoc");
  if (hiddenInp) hiddenInp.value = "";
  const previewBox = document.getElementById("aadhaarPreviewContainer");
  if (previewBox) previewBox.style.display = "none";
  const imgWrapper = document.getElementById("aadhaarImgPreviewWrapper");
  if (imgWrapper) imgWrapper.style.display = "none";
  const imgPrev = document.getElementById("aadhaarImgPreview");
  if (imgPrev) imgPrev.src = "";
  const dropzone = document.getElementById("aadhaarDropzone");
  if (dropzone) dropzone.classList.remove("drag-over");
}

function setupAadhaarUploadListeners() {
  const fileInp = document.getElementById("inpPatientAadhaarFile");
  const hiddenInp = document.getElementById("inpPatientAadhaarDoc");
  const dropzone = document.getElementById("aadhaarDropzone");
  const btnBrowse = document.getElementById("btnBrowseAadhaar");
  const previewBox = document.getElementById("aadhaarPreviewContainer");
  const fileNameSpan = document.getElementById("aadhaarFileName");
  const imgWrapper = document.getElementById("aadhaarImgPreviewWrapper");
  const imgPrev = document.getElementById("aadhaarImgPreview");
  const btnRemove = document.getElementById("btnRemoveAadhaar");
  const btnView = document.getElementById("btnViewUploadedAadhaar");

  function processFile(file) {
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert("⚠️ File size exceeds 8MB. Please choose a smaller file.");
      if (fileInp) fileInp.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = function(evt) {
      const base64Data = evt.target.result;
      if (hiddenInp) hiddenInp.value = base64Data;
      if (fileNameSpan) fileNameSpan.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (previewBox) previewBox.style.display = "flex";

      if (file.type.startsWith("image/") && imgPrev && imgWrapper) {
        imgPrev.src = base64Data;
        imgWrapper.style.display = "block";
      } else if (imgWrapper) {
        imgWrapper.style.display = "none";
      }
    };
    reader.readAsDataURL(file);
  }

  if (fileInp) {
    fileInp.addEventListener("change", (e) => {
      processFile(e.target.files[0]);
    });
  }

  if (btnBrowse && fileInp) {
    btnBrowse.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      fileInp.click();
    });
  }

  if (dropzone && fileInp) {
    dropzone.addEventListener("click", (e) => {
      if (e.target.id === "btnBrowseAadhaar" || e.target.closest("#aadhaarPreviewContainer")) return;
      fileInp.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.add("drag-over");
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropzone.classList.remove("drag-over");
      }, false);
    });

    dropzone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files && files.length > 0) {
        processFile(files[0]);
      }
    }, false);
  }

  if (btnView) {
    btnView.addEventListener("click", (e) => {
      e.preventDefault();
      const data = hiddenInp ? hiddenInp.value : "";
      viewAadhaarDocument(data, "Patient Aadhaar Card");
    });
  }

  if (btnRemove) {
    btnRemove.addEventListener("click", (e) => {
      e.preventDefault();
      resetAadhaarUploadPreview();
    });
  }
}

function openAttachDocModal(regNo) {
  const pat = state.patients.find(p => p.regNo === regNo);
  if (!pat) return;

  document.getElementById("attachModalRegNo").value = regNo;
  document.getElementById("attachModalPatientDisplay").textContent = `${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname} (${regNo})`.trim();
  document.getElementById("attachDocForm").reset();

  document.getElementById("attachDocFileData").value = "";
  document.getElementById("attachDocPreviewContainer").style.display = "none";
  document.getElementById("attachDocImgPreviewWrapper").style.display = "none";
  document.getElementById("attachDocImgPreview").src = "";

  const doc = state.documents.find(d => d.regNo === regNo);
  const type = document.getElementById("attachDocTypeSelect").value;
  if (doc && doc[type + "Link"]) {
    const existing = doc[type + "Link"];
    document.getElementById("attachDocLinkInput").value = existing.startsWith("data:") ? "" : existing;
  }

  openModal("attachDocModal");
}

function setupModalDocUploadListeners() {
  const fileInp = document.getElementById("attachDocFileInput");
  const hiddenInp = document.getElementById("attachDocFileData");
  const previewBox = document.getElementById("attachDocPreviewContainer");
  const fileNameSpan = document.getElementById("attachDocFileName");
  const imgWrapper = document.getElementById("attachDocImgPreviewWrapper");
  const imgPrev = document.getElementById("attachDocImgPreview");
  const btnRemove = document.getElementById("btnRemoveModalDoc");
  const form = document.getElementById("attachDocForm");

  if (fileInp) {
    fileInp.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (file.size > 8 * 1024 * 1024) {
        alert("⚠️ File size exceeds 8MB. Please choose a smaller file.");
        fileInp.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function(evt) {
        const base64Data = evt.target.result;
        if (hiddenInp) hiddenInp.value = base64Data;
        if (fileNameSpan) fileNameSpan.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
        if (previewBox) previewBox.style.display = "block";

        if (file.type.startsWith("image/") && imgPrev && imgWrapper) {
          imgPrev.src = base64Data;
          imgWrapper.style.display = "block";
        } else if (imgWrapper) {
          imgWrapper.style.display = "none";
        }
      };
      reader.readAsDataURL(file);
    });
  }

  if (btnRemove) {
    btnRemove.addEventListener("click", () => {
      if (fileInp) fileInp.value = "";
      if (hiddenInp) hiddenInp.value = "";
      if (previewBox) previewBox.style.display = "none";
      if (imgWrapper) imgWrapper.style.display = "none";
      if (imgPrev) imgPrev.src = "";
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const regNo = document.getElementById("attachModalRegNo").value;
      const docType = document.getElementById("attachDocTypeSelect").value;
      const fileData = document.getElementById("attachDocFileData").value;
      const urlLink = document.getElementById("attachDocLinkInput").value.trim();
      const finalLink = fileData || urlLink;

      if (!finalLink) {
        alert("⚠️ Please choose a file or enter a document URL link.");
        return;
      }

      let doc = state.documents.find(d => d.regNo === regNo);
      if (!doc) {
        doc = {
          regNo: regNo,
          patientAadhaar: false,
          patientAadhaarLink: "",
          partyAadhaar: false,
          partyAadhaarLink: "",
          statusVerified: true,
          adviceCert: false,
          adviceCertLink: ""
        };
        state.documents.push(doc);
      }

      doc[docType] = true;
      doc[docType + "Link"] = finalLink;
      Storage.set("documents", state.documents);

      renderDocumentsTable();
      if (state.selectedRegNo === regNo) {
        renderRegistrationForm(regNo);
      }
      closeModal("attachDocModal");
      alert("✅ Document attached and saved successfully!");
    });
  }
}

// Navigation Actions
function viewPatientForm(regNo) {
  switchTab("tab-registration-form");
  renderRegistrationForm(regNo);
}

function viewPatientBill(regNo) {
  switchTab("tab-bill");
  renderBill(regNo);
}

// ==========================================
// 5B. PROCUREMENT, INVENTORY & ACCOUNTS PAYABLE
// ==========================================

function updateAllVendorDropdowns() {
  const selects = [
    document.getElementById("purchaseVendorFilter"),
    document.getElementById("purModalVendorSelect"),
    document.getElementById("ledgerVendorSelect"),
    document.getElementById("vpModalVendorSelect")
  ];

  selects.forEach(sel => {
    if (!sel) return;
    const isFilter = sel.id.includes("Filter");
    const currentVal = sel.value;

    sel.innerHTML = isFilter
      ? '<option value="ALL">All Vendors</option>'
      : '<option value="">-- Choose Vendor --</option>';

    state.vendors.forEach(v => {
      const opt = document.createElement("option");
      opt.value = v.vendorId;
      opt.textContent = `${v.vendorId} - ${v.name} (${v.category})`;
      sel.appendChild(opt);
    });

    if (currentVal && sel.querySelector(`option[value="${currentVal}"]`)) {
      sel.value = currentVal;
    }
  });
}

// 1. Render Vendor Master Table
function renderVendorsTable() {
  const tbody = document.getElementById("vendorsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const catFilter = document.getElementById("vendorCategoryFilter") ? document.getElementById("vendorCategoryFilter").value : "ALL";
  const search = (document.getElementById("vendorSearchInput") ? document.getElementById("vendorSearchInput").value : "").toLowerCase().trim();

  let sumPurchases = 0;
  let sumPaid = 0;
  let sumOutstanding = 0;

  const filtered = state.vendors.filter(v => {
    if (catFilter !== "ALL" && v.category !== catFilter) return false;
    if (search) {
      const match = `${v.vendorId} ${v.name} ${v.contactPerson} ${v.phone} ${v.gstin || ''}`.toLowerCase();
      if (!match.includes(search)) return false;
    }
    return true;
  });

  filtered.forEach(v => {
    const vendorPurchases = state.purchases.filter(p => p.vendorId === v.vendorId);
    const totalPurchases = vendorPurchases.reduce((sum, p) => sum + (parseFloat(p.netAmount) || 0), 0);

    const vendorPayments = state.vendorVouchers.filter(pv => pv.vendorId === v.vendorId);
    const totalPaid = vendorPayments.reduce((sum, pv) => sum + (parseFloat(pv.amount) || 0), 0);

    const opening = parseFloat(v.openingBalance) || 0;
    const outstanding = (opening + totalPurchases) - totalPaid;

    sumPurchases += totalPurchases;
    sumPaid += totalPaid;
    sumOutstanding += outstanding;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${v.vendorId}</strong></td>
      <td><strong>${v.name}</strong></td>
      <td><span class="badge" style="background:#e0f2fe; color:#0369a1; border:1px solid #bae6fd;">${v.category}</span></td>
      <td>${v.contactPerson}<br><small class="text-muted">${v.phone}</small></td>
      <td><small>${v.gstin || '--'}</small></td>
      <td>${v.creditDays ? `${v.creditDays} Days` : '--'}</td>
      <td style="text-align: right;">${formatCurrency(totalPurchases)}</td>
      <td style="text-align: right; color:#047857;">${formatCurrency(totalPaid)}</td>
      <td style="text-align: right;" class="${outstanding > 0 ? 'text-red bold' : 'text-success bold'}">${formatCurrency(outstanding)}</td>
      <td class="no-print" style="text-align: center; white-space: nowrap;">
        <button class="btn btn-secondary btn-sm" onclick="openLedgerForVendor('${v.vendorId}')" title="View Statement of Account">📑 Ledger</button>
        <button class="btn btn-secondary btn-sm" onclick="deleteVendor('${v._id}')" title="Delete Vendor">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding: 24px;">No vendors found matching the search criteria.</td></tr>`;
  }

  if (document.getElementById("vendorTotalPurchasesSum")) document.getElementById("vendorTotalPurchasesSum").textContent = formatCurrency(sumPurchases);
  if (document.getElementById("vendorTotalPaidSum")) document.getElementById("vendorTotalPaidSum").textContent = formatCurrency(sumPaid);
  if (document.getElementById("vendorTotalOutstandingSum")) document.getElementById("vendorTotalOutstandingSum").textContent = formatCurrency(sumOutstanding);
}

// 2. Render Purchases Table (GRN)
function renderPurchasesTable() {
  const tbody = document.getElementById("purchasesTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const vendorFilter = document.getElementById("purchaseVendorFilter") ? document.getElementById("purchaseVendorFilter").value : "ALL";

  let sumGross = 0;
  let sumGst = 0;
  let sumNet = 0;

  const filtered = state.purchases.filter(p => {
    if (vendorFilter !== "ALL" && p.vendorId !== vendorFilter) return false;
    return true;
  });

  filtered.forEach(p => {
    const gross = parseFloat(p.grossAmount) || 0;
    const gst = parseFloat(p.gstAmount) || 0;
    const net = parseFloat(p.netAmount) || 0;
    const itemsCount = p.items ? p.items.length : 0;

    sumGross += gross;
    sumGst += gst;
    sumNet += net;

    let badgeClass = "badge-admitted";
    if (p.paymentStatus === "Paid") badgeClass = "badge-discharged";
    else if (p.paymentStatus === "Partial") badgeClass = "badge";

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${p.grnNo}</strong></td>
      <td>${p.invoiceDate}</td>
      <td><strong>${p.invoiceNo}</strong></td>
      <td>${p.vendorName || p.vendorId}</td>
      <td style="text-align: center;"><span class="badge" style="background:#f1f5f9; color:#334155;">${itemsCount} Items</span></td>
      <td style="text-align: right;">${formatCurrency(gross)}</td>
      <td style="text-align: right; color:#64748b;">${formatCurrency(gst)}</td>
      <td style="text-align: right;" class="bold">${formatCurrency(net)}</td>
      <td style="text-align: center;"><span class="badge ${badgeClass}">${p.paymentStatus || 'Unpaid'}</span></td>
      <td class="no-print" style="text-align: center; white-space: nowrap;">
        <button class="btn btn-secondary btn-sm" onclick="viewPurchaseBill('${p._id}')" title="View Inward Items">👁️ View</button>
        <button class="btn btn-secondary btn-sm" onclick="deletePurchase('${p._id}')" title="Delete GRN">🗑️</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="10" class="text-center text-muted" style="padding: 24px;">No purchase bills recorded.</td></tr>`;
  }

  if (document.getElementById("purchasesTotalGrossSum")) document.getElementById("purchasesTotalGrossSum").textContent = formatCurrency(sumGross);
  if (document.getElementById("purchasesTotalGstSum")) document.getElementById("purchasesTotalGstSum").textContent = formatCurrency(sumGst);
  if (document.getElementById("purchasesTotalNetSum")) document.getElementById("purchasesTotalNetSum").textContent = formatCurrency(sumNet);
}

// 3. Render Inventory & Stock Table
function renderInventoryTable() {
  const tbody = document.getElementById("inventoryTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";

  const catFilter = document.getElementById("inventoryCategoryFilter") ? document.getElementById("inventoryCategoryFilter").value : "ALL";
  const search = (document.getElementById("inventorySearchInput") ? document.getElementById("inventorySearchInput").value : "").toLowerCase().trim();

  let totalValuation = 0;
  let activeBatches = 0;
  let lowStockCount = 0;
  let expiringSoonCount = 0;

  const now = new Date();
  const sixtyDaysAhead = new Date();
  sixtyDaysAhead.setDate(now.getDate() + 60);

  const filtered = state.inventory.filter(inv => {
    if (catFilter !== "ALL" && inv.category !== catFilter) return false;
    if (search) {
      const match = `${inv.itemName} ${inv.batchNo} ${inv.category}`.toLowerCase();
      if (!match.includes(search)) return false;
    }
    return true;
  });

  filtered.forEach(inv => {
    const qty = parseFloat(inv.currentQty) || 0;
    const rate = parseFloat(inv.rate) || 0;
    const val = qty * rate;

    totalValuation += val;
    if (qty > 0) activeBatches++;
    if (qty > 0 && qty <= 10) lowStockCount++;

    let expBadge = `<span class="badge" style="background:#ecfdf5; color:#047857; border:1px solid #a7f3d0;">Safe</span>`;

    if (inv.expiryDate) {
      const expDate = new Date(inv.expiryDate + "-01");
      if (expDate < now) {
        expBadge = `<span class="badge" style="background:#fef2f2; color:#dc2626; border:1px solid #fecaca; font-weight:800;">⚠️ Expired</span>`;
      } else if (expDate <= sixtyDaysAhead) {
        expiringSoonCount++;
        expBadge = `<span class="badge" style="background:#fff7ed; color:#ea580c; border:1px solid #fed7aa; font-weight:700;">⏱️ Expiring Soon</span>`;
      }
    }

    if (qty === 0) {
      expBadge = `<span class="badge" style="background:#f1f5f9; color:#64748b;">Out of Stock</span>`;
    }

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><strong>${inv.itemName}</strong></td>
      <td><span class="badge" style="font-size: 11px;">${inv.category}</span></td>
      <td><code style="background:#f1f5f9; padding:2px 6px; border-radius:4px; font-weight:600;">${inv.batchNo}</code></td>
      <td>${inv.expiryDate || '--'}</td>
      <td style="text-align: center; font-weight: 800; font-size: 13px; color: ${qty <= 10 ? '#dc2626' : '#0f172a'};">${qty}</td>
      <td style="text-align: right;">${formatCurrency(rate)}</td>
      <td style="text-align: right; font-weight: 700; color: #047857;">${formatCurrency(val)}</td>
      <td style="text-align: center;">${expBadge}</td>
      <td class="no-print" style="text-align: center;">
        <button class="btn btn-secondary btn-sm" onclick="openIssueStockForBatch('${inv._id}')" ${qty === 0 ? 'disabled' : ''} title="Issue or Dispense from this batch">📤 Issue</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" class="text-center text-muted" style="padding: 24px;">No inventory stock items matching filter.</td></tr>`;
  }

  if (document.getElementById("kpiStockValuation")) document.getElementById("kpiStockValuation").textContent = formatCurrency(totalValuation);
  if (document.getElementById("kpiActiveBatchesCount")) document.getElementById("kpiActiveBatchesCount").textContent = activeBatches;
  if (document.getElementById("kpiLowStockCount")) document.getElementById("kpiLowStockCount").textContent = lowStockCount;
  if (document.getElementById("kpiExpiringSoonCount")) document.getElementById("kpiExpiringSoonCount").textContent = expiringSoonCount;
}

// 4. Render Vendor Ledger & Accounts Payable View
function renderVendorLedgerView(vendorId) {
  const currentVendorId = vendorId || state.selectedVendorId || (state.vendors[0] ? state.vendors[0].vendorId : "");
  if (!currentVendorId) return;

  state.selectedVendorId = currentVendorId;
  const vendor = state.vendors.find(v => v.vendorId === currentVendorId);
  const vendorSelect = document.getElementById("ledgerVendorSelect");
  if (vendorSelect && vendorSelect.value !== currentVendorId) {
    vendorSelect.value = currentVendorId;
  }

  const vendorPurchases = state.purchases.filter(p => p.vendorId === currentVendorId);
  const totalBilled = vendorPurchases.reduce((sum, p) => sum + (parseFloat(p.netAmount) || 0), 0);

  const vendorPayments = state.vendorVouchers.filter(pv => pv.vendorId === currentVendorId);
  const totalPaid = vendorPayments.reduce((sum, pv) => sum + (parseFloat(pv.amount) || 0), 0);

  const opening = vendor ? (parseFloat(vendor.openingBalance) || 0) : 0;
  const outstanding = (opening + totalBilled) - totalPaid;

  if (document.getElementById("vlTotalBilled")) document.getElementById("vlTotalBilled").textContent = formatCurrency(totalBilled);
  if (document.getElementById("vlTotalPaid")) document.getElementById("vlTotalPaid").textContent = formatCurrency(totalPaid);
  if (document.getElementById("vlOutstandingBalance")) document.getElementById("vlOutstandingBalance").textContent = formatCurrency(outstanding);
  if (document.getElementById("vlVendorNameSub") && vendor) document.getElementById("vlVendorNameSub").textContent = `${vendor.name} (${vendor.vendorId})`;
  if (document.getElementById("vlStatementContextBadge") && vendor) document.getElementById("vlStatementContextBadge").textContent = `${vendor.name} | Credit: ${vendor.creditDays || 30} Days`;

  const txns = [];
  if (opening > 0) {
    txns.push({
      date: "01/04/2026",
      type: "OPENING BALANCE",
      ref: "--",
      narration: "Balance carried forward",
      debit: 0,
      credit: opening
    });
  }

  vendorPurchases.forEach(p => {
    txns.push({
      date: p.invoiceDate,
      type: "PURCHASE BILL",
      ref: `${p.invoiceNo} (${p.grnNo})`,
      narration: `${p.items ? p.items.length : 1} Line items supplied`,
      debit: 0,
      credit: parseFloat(p.netAmount) || 0
    });
  });

  vendorPayments.forEach(pv => {
    txns.push({
      date: pv.date,
      type: "PAYMENT VOUCHER",
      ref: `${pv.voucherNo} (${pv.refNo})`,
      narration: `${pv.mode} ${pv.remarks ? '- ' + pv.remarks : ''}`,
      debit: parseFloat(pv.amount) || 0,
      credit: 0
    });
  });

  txns.sort((a, b) => {
    const da = parseDateDDMMYYYY(a.date) || new Date(0);
    const db = parseDateDDMMYYYY(b.date) || new Date(0);
    return da - db;
  });

  const tbody = document.getElementById("vendorLedgerTableBody");
  if (tbody) {
    tbody.innerHTML = "";
    let runningBal = 0;

    txns.forEach(t => {
      runningBal += (t.credit - t.debit);
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${t.date}</td>
        <td><span class="badge ${t.type.includes('PAYMENT') ? 'badge-discharged' : 'badge-admitted'}">${t.type}</span></td>
        <td><strong>${t.ref}</strong></td>
        <td>${t.narration}</td>
        <td style="text-align: right; color:#047857; font-weight:700;">${t.debit > 0 ? formatCurrency(t.debit) : '-'}</td>
        <td style="text-align: right; color:#1e293b; font-weight:700;">${t.credit > 0 ? formatCurrency(t.credit) : '-'}</td>
        <td style="text-align: right; font-weight: 800; color: ${runningBal > 0 ? '#dc2626' : '#047857'};">${formatCurrency(runningBal)}</td>
      `;
      tbody.appendChild(tr);
    });

    if (txns.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted" style="padding: 24px;">No ledger transactions recorded for this vendor.</td></tr>`;
    }
  }

  // Render All Vendors Aging Summary Table
  const agingTbody = document.getElementById("vendorAgingTableBody");
  if (agingTbody) {
    agingTbody.innerHTML = "";
    const today = new Date();

    state.vendors.forEach(v => {
      const vPurchases = state.purchases.filter(p => p.vendorId === v.vendorId);
      const vPayments = state.vendorVouchers.filter(pv => pv.vendorId === v.vendorId);
      const vPaid = vPayments.reduce((sum, pv) => sum + (parseFloat(pv.amount) || 0), 0);
      const vOpening = parseFloat(v.openingBalance) || 0;
      const vBilled = vPurchases.reduce((sum, p) => sum + (parseFloat(p.netAmount) || 0), 0);
      const vOut = (vOpening + vBilled) - vPaid;

      let b0_15 = 0;
      let b16_30 = 0;
      let b31_60 = 0;
      let b60_plus = 0;

      vPurchases.forEach(p => {
        const invDate = parseDateDDMMYYYY(p.invoiceDate) || today;
        const diffDays = Math.floor((today - invDate) / (1000 * 60 * 60 * 24));
        const amt = parseFloat(p.netAmount) || 0;

        if (diffDays <= 15) b0_15 += amt;
        else if (diffDays <= 30) b16_30 += amt;
        else if (diffDays <= 60) b31_60 += amt;
        else b60_plus += amt;
      });

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><strong>${v.name}</strong> <small class="text-muted">(${v.vendorId})</small></td>
        <td><span class="badge" style="font-size:11px;">${v.category}</span></td>
        <td style="text-align: right;">${formatCurrency(b0_15)}</td>
        <td style="text-align: right;">${formatCurrency(b16_30)}</td>
        <td style="text-align: right; color:#ea580c;">${formatCurrency(b31_60)}</td>
        <td style="text-align: right; color:#dc2626; font-weight:700;">${formatCurrency(b60_plus)}</td>
        <td style="text-align: right; font-weight: 900; font-size: 13.5px; color: ${vOut > 0 ? '#dc2626' : '#047857'};">${formatCurrency(vOut)}</td>
        <td class="no-print" style="text-align: center;">
          <button class="btn btn-secondary btn-sm" onclick="openLedgerForVendor('${v.vendorId}')">📑 Statement</button>
        </td>
      `;
      agingTbody.appendChild(tr);
    });
  }
}

// 5. Purchase Dynamic Items Grid Helper
function addPurchaseItemRow(defaultItem = {}) {
  const tbody = document.getElementById("purchaseItemsTbody");
  if (!tbody) return;

  const desc = defaultItem.itemName || "";
  const cat = defaultItem.category || "Medicine";
  const batch = defaultItem.batchNo || "";
  const exp = defaultItem.expiryDate || "";
  const qty = defaultItem.qty || 1;
  const rate = defaultItem.rate || "";
  const amt = (qty * (parseFloat(rate) || 0)).toFixed(2);

  const tr = document.createElement("tr");
  tr.className = "pur-item-row";
  tr.innerHTML = `
    <td><input type="text" class="form-input pur-desc" placeholder="Drug / Item name" value="${desc}" required style="padding:4px 8px; font-size:12px;"></td>
    <td>
      <select class="form-select pur-cat" style="padding:4px 6px; font-size:12px;">
        <option ${cat === 'Medicine' ? 'selected' : ''}>Medicine</option>
        <option ${cat === 'Non-Surgical Item' ? 'selected' : ''}>Non-Surgical Item</option>
        <option ${cat === 'Oxygen' ? 'selected' : ''}>Oxygen</option>
        <option ${cat === 'Pathology' ? 'selected' : ''}>Pathology</option>
        <option ${cat === 'Others' ? 'selected' : ''}>Others</option>
      </select>
    </td>
    <td><input type="text" class="form-input pur-batch" placeholder="Batch No" value="${batch}" required style="padding:4px 6px; font-size:12px; width:90px;"></td>
    <td><input type="month" class="form-input pur-exp" value="${exp}" required style="padding:4px 6px; font-size:12px; width:110px;"></td>
    <td style="text-align: center;"><input type="number" class="form-input pur-qty" value="${qty}" min="1" required style="padding:4px 6px; font-size:12px; width:70px; text-align:center;"></td>
    <td style="text-align: right;"><input type="number" class="form-input pur-rate" value="${rate}" step="0.01" min="0" placeholder="0.00" required style="padding:4px 6px; font-size:12px; width:90px; text-align:right;"></td>
    <td style="text-align: right;"><input type="text" class="form-input pur-amt bg-disabled" readonly value="${amt}" style="padding:4px 6px; font-size:12px; width:100px; text-align:right; font-weight:700;"></td>
    <td style="text-align: center;"><button type="button" class="btn btn-secondary btn-sm" onclick="this.closest('tr').remove(); updatePurchaseModalCalculations();" style="padding:2px 6px; color:#dc2626;">✕</button></td>
  `;

  tbody.appendChild(tr);

  const inpQty = tr.querySelector(".pur-qty");
  const inpRate = tr.querySelector(".pur-rate");
  const inpAmt = tr.querySelector(".pur-amt");

  function calcRow() {
    const q = parseFloat(inpQty.value) || 0;
    const r = parseFloat(inpRate.value) || 0;
    inpAmt.value = (q * r).toFixed(2);
    updatePurchaseModalCalculations();
  }

  inpQty.addEventListener("input", calcRow);
  inpRate.addEventListener("input", calcRow);

  updatePurchaseModalCalculations();
}

function updatePurchaseModalCalculations() {
  const rows = document.querySelectorAll(".pur-item-row");
  let gross = 0;
  rows.forEach(r => {
    const amt = parseFloat(r.querySelector(".pur-amt")?.value) || 0;
    gross += amt;
  });

  const gstPercent = parseFloat(document.getElementById("purModalGstPercent")?.value) || 0;
  const gstAmt = (gross * gstPercent) / 100;
  const net = gross + gstAmt;

  if (document.getElementById("purModalGross")) document.getElementById("purModalGross").value = gross.toFixed(2);
  if (document.getElementById("purModalGstAmount")) document.getElementById("purModalGstAmount").value = gstAmt.toFixed(2);
  if (document.getElementById("purModalNetBillPreview")) document.getElementById("purModalNetBillPreview").textContent = formatCurrency(net);
}

// 6. Update Issue Stock Modal Batches (FEFO order)
function updateIssueStockModalBatches() {
  const sel = document.getElementById("issueModalBatchSelect");
  if (!sel) return;
  sel.innerHTML = '<option value="">-- Choose Stock Item & Batch --</option>';

  const sorted = [...state.inventory].filter(inv => (parseFloat(inv.currentQty) || 0) > 0);
  sorted.sort((a, b) => {
    const da = a.expiryDate ? new Date(a.expiryDate + "-01") : new Date(2099, 1, 1);
    const db = b.expiryDate ? new Date(b.expiryDate + "-01") : new Date(2099, 1, 1);
    return da - db;
  });

  sorted.forEach(inv => {
    const opt = document.createElement("option");
    opt.value = inv._id;
    opt.textContent = `${inv.itemName} | Batch: ${inv.batchNo} | Avail: ${inv.currentQty} (Exp: ${inv.expiryDate || 'N/A'})`;
    sel.appendChild(opt);
  });

  if (document.getElementById("issueModalAvailQty")) {
    document.getElementById("issueModalAvailQty").value = "0";
  }
}

// 7. Interactive Action Handlers
function openLedgerForVendor(vendorId) {
  state.selectedVendorId = vendorId;
  switchTab("tab-vendor-ledger");
  renderVendorLedgerView(vendorId);
}

function openIssueStockForBatch(batchId) {
  openModal("issueStockModal");
  updateIssueStockModalBatches();
  const sel = document.getElementById("issueModalBatchSelect");
  if (sel) {
    sel.value = batchId;
    const item = state.inventory.find(i => i._id === batchId);
    if (item && document.getElementById("issueModalAvailQty")) {
      document.getElementById("issueModalAvailQty").value = item.currentQty;
    }
  }
  const dateInp = document.getElementById("issueModalDate");
  if (dateInp) dateInp.value = new Date().toISOString().split("T")[0];
}

function deleteVendor(id) {
  const v = state.vendors.find(item => item._id === id);
  if (!v) return;
  if (!confirm(`Are you sure you want to delete vendor "${v.name}" (${v.vendorId})?`)) return;

  state.vendors = state.vendors.filter(item => item._id !== id);
  Storage.set("vendors", state.vendors);
  syncToBackend("deleteVendor", { _id: id, vendorId: v.vendorId });
  updateAllVendorDropdowns();
  renderVendorsTable();
  renderVendorLedgerView();
  alert("✅ Vendor deleted successfully.");
}

function deletePurchase(id) {
  const p = state.purchases.find(item => item._id === id);
  if (!p) return;
  if (!confirm(`Are you sure you want to delete purchase GRN "${p.grnNo}" (Invoice: ${p.invoiceNo})?`)) return;

  state.purchases = state.purchases.filter(item => item._id !== id);
  Storage.set("purchases", state.purchases);
  syncToBackend("deletePurchase", { _id: id });
  renderPurchasesTable();
  renderVendorsTable();
  renderVendorLedgerView();
  alert("✅ Purchase entry removed.");
}

function viewPurchaseBill(id) {
  const p = state.purchases.find(item => item._id === id);
  if (!p) return;
  let itemsList = (p.items || []).map((it, idx) => `${idx + 1}. ${it.itemName} (Batch: ${it.batchNo}, Exp: ${it.expiryDate}) - Qty: ${it.qty} @ ₹${it.rate} = ₹${it.amount}`).join("\n");
  alert(`📦 Purchase Bill Details:\nGRN: ${p.grnNo}\nVendor: ${p.vendorName}\nInvoice No: ${p.invoiceNo}\nDate: ${p.invoiceDate}\n\nItemized Lines:\n${itemsList}\n\nGross: ₹${p.grossAmount}\nGST (${p.gstPercent}%): ₹${p.gstAmount}\nNet Bill Amount: ₹${p.netAmount}\nPayment Status: ${p.paymentStatus}`);
}

window.openLedgerForVendor = openLedgerForVendor;
window.openIssueStockForBatch = openIssueStockForBatch;
window.deleteVendor = deleteVendor;
window.deletePurchase = deletePurchase;
window.viewPurchaseBill = viewPurchaseBill;

// ==========================================
// 6. MODAL & EVENT CONTROLLERS
// ==========================================
function toggleSidebar() {
  const sidebar = document.getElementById("appSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.toggle("open");
  if (backdrop) backdrop.classList.toggle("active");
  if (document.body) document.body.classList.toggle("sidebar-open", sidebar && sidebar.classList.contains("open"));
}

function closeSidebar() {
  const sidebar = document.getElementById("appSidebar");
  const backdrop = document.getElementById("sidebarBackdrop");
  if (sidebar) sidebar.classList.remove("open");
  if (backdrop) backdrop.classList.remove("active");
  if (document.body) document.body.classList.remove("sidebar-open");
}

function switchTab(tabId) {
  closeSidebar();
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.toggle("active", panel.id === tabId);
  });

  if (tabId === "tab-registration-form") renderRegistrationForm(state.selectedRegNo);
  if (tabId === "tab-bill") renderBill(state.selectedRegNo);
  if (tabId === "tab-expenses") renderExpensesTable();
  if (tabId === "tab-payments") renderPaymentsTable();
  if (tabId === "tab-documents") renderDocumentsTable();
  if (tabId === "tab-vendors") renderVendorsTable();
  if (tabId === "tab-purchases") renderPurchasesTable();
  if (tabId === "tab-inventory") renderInventoryTable();
  if (tabId === "tab-vendor-ledger") renderVendorLedgerView();
}

function openModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("active");
  if (!document.querySelector(".modal-backdrop.active")) {
    document.body.classList.remove("modal-open");
  }
}

// ==========================================
// ADMIN PORTAL & SECURITY HELPERS
// ==========================================

// Web Crypto SHA-256 Hashing Helper
async function sha256Hex(text) {
  if (!text) return "";
  const msgBuffer = new TextEncoder().encode(String(text));
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// Global password visibility toggle
function togglePasswordVisibility(inputId, btn) {
  const inp = document.getElementById(inputId);
  if (!inp) return;
  if (inp.type === "password") {
    inp.type = "text";
    if (btn) btn.textContent = "🙈";
  } else {
    inp.type = "password";
    if (btn) btn.textContent = "👁️";
  }
}
window.togglePasswordVisibility = togglePasswordVisibility;

// Emergency Console Recovery: reset credentials if forgotten
window.resetAdminCredentials = function() {
  state.settings.adminUsername = "Admin";
  state.settings.adminPasswordHash = "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
  Storage.set("settings", state.settings);
  const headerAdminText = document.getElementById("headerAdminUsernameText");
  if (headerAdminText) headerAdminText.textContent = "Admin";
  const userInp = document.getElementById("cfgNewUsername");
  if (userInp) userInp.value = "Admin";
  console.log("✅ Admin credentials have been reset to factory defaults (Username: Admin, Password: 1234).");
  alert("✅ Admin credentials reset to factory default:\n\nUser Name: Admin\nPassword: 1234");
};

function checkAdminPortalAuth() {
  const isAuth = sessionStorage.getItem("AKKMCT_PORTAL_AUTH") === "true" || localStorage.getItem("AKKMCT_PORTAL_AUTH") === "true";
  const configuredUser = (state.settings && state.settings.adminUsername) || "Admin";
  const headerAdminText = document.getElementById("headerAdminUsernameText");
  if (headerAdminText) headerAdminText.textContent = configuredUser;

  if (isAuth) {
    document.body.classList.remove("portal-active");
    document.body.classList.add("authenticated");
  } else {
    document.body.classList.remove("authenticated");
    document.body.classList.add("portal-active");
    setTimeout(() => {
      const userInp = document.getElementById("portalUsername");
      if (userInp) userInp.focus();
    }, 200);
  }
}

function setupAdminPortal() {
  const portalForm = document.getElementById("adminPortalForm");
  const btnToggle = document.getElementById("btnTogglePortalPassword");
  const pwdInp = document.getElementById("portalPassword");
  const userInp = document.getElementById("portalUsername");
  const errAlert = document.getElementById("portalErrorAlert");
  const btnSubmit = document.getElementById("btnPortalSubmit");

  if (btnToggle && pwdInp) {
    btnToggle.addEventListener("click", () => {
      if (pwdInp.type === "password") {
        pwdInp.type = "text";
        btnToggle.textContent = "🙈";
      } else {
        pwdInp.type = "password";
        btnToggle.textContent = "👁️";
      }
    });
  }

  if (portalForm) {
    portalForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const enteredUser = (userInp ? userInp.value : "").trim();
      const enteredPwd = pwdInp ? pwdInp.value : "";
      const remember = document.getElementById("portalRememberMe")?.checked;

      const configuredUser = (state.settings && state.settings.adminUsername ? state.settings.adminUsername : "Admin").trim();
      const configuredHash = (state.settings && state.settings.adminPasswordHash) || "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";

      const enteredHash = await sha256Hex(enteredPwd);

      // Verify username (case-insensitive) and password hash
      const isUserValid = enteredUser.toLowerCase() === configuredUser.toLowerCase();
      const isPwdValid = (enteredHash === configuredHash) || 
                         (configuredHash === "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" && enteredPwd === "1234");

      if (isUserValid && isPwdValid) {
        if (errAlert) errAlert.style.display = "none";

        sessionStorage.setItem("AKKMCT_PORTAL_AUTH", "true");
        if (remember) {
          localStorage.setItem("AKKMCT_PORTAL_AUTH", "true");
        }

        const headerAdminText = document.getElementById("headerAdminUsernameText");
        if (headerAdminText) headerAdminText.textContent = configuredUser;

        if (btnSubmit) {
          btnSubmit.innerHTML = `<span>Authenticated</span> <span>✓</span>`;
          btnSubmit.style.background = "#059669";
        }

        setTimeout(() => {
          document.body.classList.remove("portal-active");
          document.body.classList.add("authenticated");

          renderPatientsTable();
          updateAllPatientDropdowns();
          if (state.selectedRegNo) {
            renderRegistrationForm(state.selectedRegNo);
            renderBill(state.selectedRegNo);
          }
        }, 250);
      } else {
        if (errAlert) {
          errAlert.style.display = "flex";
        }
        if (pwdInp) {
          pwdInp.value = "";
          pwdInp.focus();
        }
      }
    });
  }
}

function setupAdminSecuritySettings() {
  const form = document.getElementById("adminCredentialsForm");
  const currentPwdInp = document.getElementById("cfgCurrentPassword");
  const newUsernameInp = document.getElementById("cfgNewUsername");
  const newPwdInp = document.getElementById("cfgNewPassword");
  const confirmPwdInp = document.getElementById("cfgConfirmPassword");
  const errAlert = document.getElementById("cfgSecurityAlert");
  const errText = document.getElementById("cfgSecurityAlertText");
  const successAlert = document.getElementById("cfgSecuritySuccess");
  const successText = document.getElementById("cfgSecuritySuccessText");

  // Populate current username
  if (newUsernameInp) {
    newUsernameInp.value = (state.settings && state.settings.adminUsername) || "Admin";
  }

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (errAlert) errAlert.style.display = "none";
    if (successAlert) successAlert.style.display = "none";

    const currentPwd = currentPwdInp ? currentPwdInp.value : "";
    const newUsername = (newUsernameInp ? newUsernameInp.value : "").trim();
    const newPwd = newPwdInp ? newPwdInp.value : "";
    const confirmPwd = confirmPwdInp ? confirmPwdInp.value : "";

    // 1. Validation
    if (!newUsername) {
      showError("Username cannot be empty.");
      if (newUsernameInp) newUsernameInp.focus();
      return;
    }
    if (newPwd.length < 4) {
      showError("New password must be at least 4 characters long.");
      if (newPwdInp) newPwdInp.focus();
      return;
    }
    if (newPwd !== confirmPwd) {
      showError("New password and Confirm password do not match.");
      if (confirmPwdInp) confirmPwdInp.focus();
      return;
    }

    // 2. Verify Current Password
    const currentEnteredHash = await sha256Hex(currentPwd);
    const configuredHash = (state.settings && state.settings.adminPasswordHash) || "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4";
    const isCurrentValid = (currentEnteredHash === configuredHash) || 
                           (configuredHash === "03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4" && currentPwd === "1234");

    if (!isCurrentValid) {
      showError("Current Password is incorrect. Verification failed.");
      if (currentPwdInp) {
        currentPwdInp.value = "";
        currentPwdInp.focus();
      }
      return;
    }

    // 3. Save New Credentials
    const newHash = await sha256Hex(newPwd);
    state.settings.adminUsername = newUsername;
    state.settings.adminPasswordHash = newHash;
    Storage.set("settings", state.settings);

    // 4. Update Header Pill
    const headerAdminText = document.getElementById("headerAdminUsernameText");
    if (headerAdminText) headerAdminText.textContent = newUsername;

    // 5. Reset input fields & display success
    if (currentPwdInp) currentPwdInp.value = "";
    if (newPwdInp) newPwdInp.value = "";
    if (confirmPwdInp) confirmPwdInp.value = "";

    if (successAlert) {
      if (successText) successText.textContent = `Admin credentials updated successfully! New Username: "${newUsername}".`;
      successAlert.style.display = "flex";
      setTimeout(() => {
        successAlert.style.display = "none";
      }, 5000);
    }
  });

  function showError(msg) {
    if (errAlert && errText) {
      errText.textContent = msg;
      errAlert.style.display = "flex";
    } else {
      alert("⚠️ " + msg);
    }
  }
}

function logoutAdminPortal() {
  if (confirm("Are you sure you want to sign out of the Admin Portal?")) {
    sessionStorage.removeItem("AKKMCT_PORTAL_AUTH");
    localStorage.removeItem("AKKMCT_PORTAL_AUTH");

    document.body.classList.remove("authenticated");
    document.body.classList.add("portal-active");

    const form = document.getElementById("adminPortalForm");
    if (form) form.reset();

    const err = document.getElementById("portalErrorAlert");
    if (err) err.style.display = "none";

    const pwd = document.getElementById("portalPassword");
    if (pwd) pwd.type = "password";

    const btnToggle = document.getElementById("btnTogglePortalPassword");
    if (btnToggle) btnToggle.textContent = "👁️";

    const btnSubmit = document.getElementById("btnPortalSubmit");
    if (btnSubmit) {
      btnSubmit.innerHTML = `<span>Login to Portal</span> <span>➔</span>`;
      btnSubmit.style.background = "";
    }

    setTimeout(() => {
      const userInp = document.getElementById("portalUsername");
      if (userInp) userInp.focus();
    }, 150);
  }
}

// Real-time live clock
function startClock() {
  const el = document.getElementById("clockDisplay");
  setInterval(() => {
    const now = new Date();
    el.textContent = `${formatDateDDMMYYYY(now)} | ${formatTime12Hr(now)}`;
  }, 1000);
}

// Form Handlers
document.addEventListener("DOMContentLoaded", () => {
  checkAdminPortalAuth();
  setupAdminPortal();
  setupAdminSecuritySettings();
  startClock();
  updateAllPatientDropdowns();
  renderPatientsTable();
  renderRegistrationForm(state.selectedRegNo);
  renderBill(state.selectedRegNo);

  // Initialize Settings Inputs
  if (document.getElementById("settingBedCharges")) {
    document.getElementById("settingBedCharges").value = state.settings.bedChargesPerDay ?? 0;
    document.getElementById("settingStayCharges").value = state.settings.stayChargesPerDay ?? 0;
    document.getElementById("settingPalliativeCareCharges").value = state.settings.palliativeCareChargesPerDay ?? 0;
    document.getElementById("settingNursingWardCharges").value = state.settings.nursingWardChargesPerDay ?? 0;
    document.getElementById("settingCountAdmissionDay").value = state.settings.countAdmissionDay || "Yes";
    document.getElementById("settingBackendType").value = state.settings.backendType || "local";
    document.getElementById("settingWebAppUrl").value = state.settings.webAppUrl || "";
  }

  // Initialize Document Upload Listeners
  setupAadhaarUploadListeners();
  setupAadhaarNumberFormatter();
  setupModalDocUploadListeners();

  // Mobile Sidebar Drawer Toggle & Listeners
  const btnSidebarToggle = document.getElementById("btnSidebarToggle");
  if (btnSidebarToggle) btnSidebarToggle.addEventListener("click", toggleSidebar);

  const btnSidebarClose = document.getElementById("btnSidebarClose");
  if (btnSidebarClose) btnSidebarClose.addEventListener("click", closeSidebar);

  const sidebarBackdrop = document.getElementById("sidebarBackdrop");
  if (sidebarBackdrop) sidebarBackdrop.addEventListener("click", closeSidebar);

  // Close mobile drawer on desktop resize
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeSidebar();
    }
  });

  // Close modal when clicking on backdrop outside modal-dialog
  document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
    backdrop.addEventListener("click", (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  // Close active modal or sidebar on ESC key
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-backdrop.active");
      if (activeModal) {
        closeModal(activeModal.id);
      } else {
        closeSidebar();
      }
    }
  });

  // Tab switching
  document.querySelectorAll(".nav-tab").forEach(tab => {
    tab.addEventListener("click", () => switchTab(tab.dataset.tab));
  });

  // Modal Triggers
  document.getElementById("btnOpenNewPatientModal").addEventListener("click", () => {
    document.getElementById("newPatientForm").reset();
    resetAadhaarUploadPreview();
    openModal("newPatientModal");
  });

  document.getElementById("btnOpenNewExpenseModal").addEventListener("click", () => {
    document.getElementById("newExpenseForm").reset();
    document.getElementById("expModalDate").value = new Date().toISOString().split("T")[0];
    document.getElementById("expModalQty").value = 1;
    document.getElementById("expModalDiscount").value = 0;

    // Contextual Pre-selection from Clinical Expenses Ledger filters
    const patFilterVal = document.getElementById("expensePatientFilter") ? document.getElementById("expensePatientFilter").value : "";
    const catFilterVal = document.getElementById("expenseCategoryFilter") ? document.getElementById("expenseCategoryFilter").value : "";

    const targetReg = (patFilterVal && patFilterVal !== "ALL")
      ? patFilterVal
      : (state.selectedRegNo || (state.patients[0] ? state.patients[0].regNo : ""));

    if (targetReg) {
      document.getElementById("expModalRegSelect").value = targetReg;
      state.selectedRegNo = targetReg;
      updateExpModalLiveList(targetReg);
    }

    if (catFilterVal && catFilterVal !== "ALL") {
      const expCatSelect = document.getElementById("expModalCategory");
      if (expCatSelect) {
        expCatSelect.value = catFilterVal;
      }
    }

    updateExpenseModalCalculations();
    openModal("newExpenseModal");
  });

  const expModalReg = document.getElementById("expModalRegSelect");
  if (expModalReg) {
    expModalReg.addEventListener("change", (e) => {
      updateExpModalLiveList(e.target.value);
    });
  }

  document.getElementById("btnOpenNewPaymentModal").addEventListener("click", () => {
    document.getElementById("newPaymentForm").reset();
    document.getElementById("payModalDate").value = new Date().toISOString().split("T")[0];
    const payFilterVal = document.getElementById("paymentPatientFilter") ? document.getElementById("paymentPatientFilter").value : "";
    const targetReg = (payFilterVal && payFilterVal !== "ALL")
      ? payFilterVal
      : (state.selectedRegNo || (state.patients[0] ? state.patients[0].regNo : ""));
    if (targetReg) {
      document.getElementById("payModalRegSelect").value = targetReg;
      state.selectedRegNo = targetReg;
    }
    openModal("newPaymentModal");
  });

  // Filters
  document.getElementById("patientSearchInput").addEventListener("input", renderPatientsTable);
  document.getElementById("patientStatusFilter").addEventListener("change", renderPatientsTable);
  const catFilter = document.getElementById("patientCategoryFilter");
  if (catFilter) catFilter.addEventListener("change", renderPatientsTable);
  document.getElementById("expensePatientFilter").addEventListener("change", (e) => {
    if (e.target.value && e.target.value !== "ALL") {
      state.selectedRegNo = e.target.value;
    }
    renderExpensesTable();
  });
  document.getElementById("expenseCategoryFilter").addEventListener("change", renderExpensesTable);
  document.getElementById("paymentPatientFilter").addEventListener("change", (e) => {
    if (e.target.value && e.target.value !== "ALL") {
      state.selectedRegNo = e.target.value;
    }
    renderPaymentsTable();
  });

  document.getElementById("regFormPatientSelect").addEventListener("change", (e) => {
    if (e.target.value) renderRegistrationForm(e.target.value);
  });

  document.getElementById("billPatientSelect").addEventListener("change", (e) => {
    if (e.target.value) renderBill(e.target.value);
  });

  // Address Auto-Copy feature: If user types "same" in Present Address
  const inpPermanent = document.getElementById("inpPermanentAddress");
  const inpPresent = document.getElementById("inpPresentAddress");
  inpPresent.addEventListener("input", () => {
    if (inpPresent.value.trim().toLowerCase() === "same") {
      inpPresent.value = inpPermanent.value;
    }
  });

  // Expense modal dynamic calculation
  const expCat = document.getElementById("expModalCategory");
  const expQty = document.getElementById("expModalQty");
  const expRate = document.getElementById("expModalRate");
  const expDisc = document.getElementById("expModalDiscount");

  function updateExpenseModalCalculations() {
    const qty = parseFloat(expQty.value) || 1;
    const rate = parseFloat(expRate.value) || 0;
    const cat = expCat.value;
    const amt = qty * rate;
    document.getElementById("expModalAmount").value = amt.toFixed(2);

    let disc = parseFloat(expDisc.value) || 0;
    // Pathology rows: Net = Amount - Discount. Others: Net = Amount
    let net = amt;
    if (cat === "Pathology") {
      document.getElementById("expModalDiscountContainer").style.display = "block";
      net = Math.max(0, amt - disc);
    } else {
      document.getElementById("expModalDiscountContainer").style.display = "none";
      expDisc.value = 0;
    }

    document.getElementById("expModalNetPreview").textContent = formatCurrency(net);
  }

  [expCat, expQty, expRate, expDisc].forEach(el => {
    el.addEventListener("input", updateExpenseModalCalculations);
    el.addEventListener("change", updateExpenseModalCalculations);
  });

  // Submit New Patient Admission
  document.getElementById("newPatientForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const now = new Date();

    const newRegNo = generateNextRegNo();
    const newPatient = {
      _id: "pat_" + Date.now(),
      regNo: newRegNo,
      admissionDate: formatDateDDMMYYYY(now),
      admissionTime: formatTime12Hr(now),
      admissionDay: getDayName(now),
      dischargeDate: "",
      dischargeTime: "",
      mrMrs: formData.get("mrMrs") || "",
      name: formData.get("name").trim(),
      surname: formData.get("surname").trim(),
      guardian: formData.get("guardian").trim(),
      age: parseInt(formData.get("age"), 10),
      diseaseCategory: formData.get("diseaseCategory") || "Cancer",
      sex: formData.get("sex") || (["Mr", "Master"].includes(formData.get("mrMrs")) ? "Male" : ["Mrs", "Ms"].includes(formData.get("mrMrs")) ? "Female" : ""),
      maritalStatus: formData.get("maritalStatus"),
      occupation: formData.get("occupation"),
      religion: formData.get("religion"),
      nationality: formData.get("nationality"),
      permanentAddress: formData.get("permanentAddress").trim(),
      presentAddress: formData.get("presentAddress").trim(),
      city: formData.get("city").trim(),
      district: formData.get("district").trim(),
      state: formData.get("state").trim(),
      pin: formData.get("pin").trim(),
      contactPerson: formData.get("contactPerson").trim(),
      contactNo: formData.get("contactNo").trim(),
      whatsappNo: formData.get("whatsappNo").trim(),
      refDoctor: formData.get("refDoctor").trim(),
      doctorAdvice: (formData.get("doctorAdvice") || "").trim(),
      status: formData.get("status") || "Admitted",
      aadhaarNo: formatAadhaarNumber(formData.get("aadhaarNo") || ""),
      createdAt: now.toISOString()
    };

    state.patients.unshift(newPatient);
    Storage.set("patients", state.patients);

    // Save Aadhaar & Document Record
    const uploadedAadhaarDoc = document.getElementById("inpPatientAadhaarDoc") ? document.getElementById("inpPatientAadhaarDoc").value : "";
    const aadhaarLink = (formData.get("patientAadhaarLink") || "").trim() || uploadedAadhaarDoc;
    const hasAadhaar = Boolean(aadhaarLink || newPatient.aadhaarNo);

    const newDoc = {
      regNo: newRegNo,
      patientAadhaar: hasAadhaar,
      patientAadhaarLink: aadhaarLink,
      partyAadhaar: false,
      partyAadhaarLink: "",
      statusVerified: true,
      adviceCert: false,
      adviceCertLink: ""
    };
    state.documents.unshift(newDoc);
    Storage.set("documents", state.documents);

    resetAadhaarUploadPreview();

    updateAllPatientDropdowns();
    renderPatientsTable();
    closeModal("newPatientModal");
    alert(`✅ Patient Registered Successfully!\nReg No Assigned: ${newRegNo}\nAdmission Stamped: ${newPatient.admissionDate} ${newPatient.admissionTime}`);
    viewPatientForm(newRegNo);
  });

  // Unified Handler: Save Expense Entry (Supports both 'Save & Close' and 'Save & Add Another')
  function handleExpenseSave(closeAfterSave = true) {
    const form = document.getElementById("newExpenseForm");
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const dateInput = formData.get("date");
    const formattedDate = formatDateDDMMYYYY(parseDateDDMMYYYY(dateInput));
    const qty = parseFloat(formData.get("qty")) || 1;
    const rate = parseFloat(formData.get("rate")) || 0;
    const cat = formData.get("category");
    const amount = qty * rate;
    const discount = cat === "Pathology" ? (parseFloat(formData.get("discount")) || 0) : 0;
    const netAmount = cat === "Pathology" ? Math.max(0, amount - discount) : amount;
    const regNo = formData.get("regNo");
    const desc = (formData.get("description") || "").trim();

    const newExp = {
      _id: "exp_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
      regNo: regNo,
      date: formattedDate,
      category: cat,
      description: desc,
      qty: qty,
      rate: rate,
      amount: amount,
      discount: discount,
      netAmount: netAmount,
      createdAt: new Date().toISOString()
    };

    state.expenses.unshift(newExp);
    Storage.set("expenses", state.expenses);

    // Sync to backend if configured
    if (state.settings.sheetsApiUrl && state.settings.syncEnabled) {
      syncToBackend("addExpense", newExp);
    }

    // Immediately refresh all views and recalculate Final Bill live
    renderExpensesTable();
    renderPatientsTable();
    renderBill(regNo);
    updateExpModalLiveList(regNo);

    if (closeAfterSave) {
      closeModal("newExpenseModal");
    } else {
      // Clear description, rate, amount to allow immediate next entry
      const descEl = document.getElementById("expModalDescription");
      if (descEl) descEl.value = "";
      document.getElementById("expModalQty").value = 1;
      document.getElementById("expModalRate").value = "";
      document.getElementById("expModalAmount").value = "";
      document.getElementById("expModalDiscount").value = 0;
      updateExpenseModalCalculations();
      if (descEl) descEl.focus();
    }
  }

  // Submit Expense (Save & Close)
  document.getElementById("newExpenseForm").addEventListener("submit", (e) => {
    e.preventDefault();
    handleExpenseSave(true);
  });

  // Save & Add Another Expense button
  const btnAddAnother = document.getElementById("btnSaveAndAddAnotherExpense");
  if (btnAddAnother) {
    btnAddAnother.addEventListener("click", () => {
      handleExpenseSave(false);
    });
  }

  // Edit Expense modal input listeners
  const editExpCat = document.getElementById("editExpModalCategory");
  const editExpQty = document.getElementById("editExpModalQty");
  const editExpRate = document.getElementById("editExpModalRate");
  const editExpDisc = document.getElementById("editExpModalDiscount");

  [editExpCat, editExpQty, editExpRate, editExpDisc].forEach(el => {
    if (el) {
      el.addEventListener("input", updateEditExpenseModalCalculations);
      el.addEventListener("change", updateEditExpenseModalCalculations);
    }
  });

  const editExpForm = document.getElementById("editExpenseForm");
  if (editExpForm) {
    editExpForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const expId = document.getElementById("editExpModalId").value;
      const exp = state.expenses.find(x => x._id === expId);
      if (!exp) return;

      const dateInput = document.getElementById("editExpModalDate").value;
      const dParts = dateInput.split("-");
      const formattedDate = `${dParts[2]}/${dParts[1]}/${dParts[0]}`;

      const cat = document.getElementById("editExpModalCategory").value;
      const desc = document.getElementById("editExpModalDescription").value.trim();
      const qty = parseFloat(document.getElementById("editExpModalQty").value) || 1;
      const rate = parseFloat(document.getElementById("editExpModalRate").value) || 0;
      const amt = qty * rate;
      const disc = cat === "Pathology" ? (parseFloat(document.getElementById("editExpModalDiscount").value) || 0) : 0;
      const net = cat === "Pathology" ? Math.max(0, amt - disc) : amt;

      exp.date = formattedDate;
      exp.category = cat;
      exp.description = desc;
      exp.qty = qty;
      exp.rate = rate;
      exp.amount = amt;
      exp.discount = disc;
      exp.netAmount = net;

      Storage.set("expenses", state.expenses);

      if (state.settings.sheetsApiUrl && state.settings.syncEnabled) {
        syncToBackend("addExpense", exp);
      }

      renderExpensesTable();
      renderPatientsTable();
      renderBill(exp.regNo);
      updateExpModalLiveList(exp.regNo);

      closeModal("editExpenseModal");
      alert(`✅ Expense entry updated successfully!\n\nCategory: ${cat}\nDescription: ${desc}\nNet Amount: ${formatCurrency(net)}\n\nFinal Bill for ${exp.regNo} has been automatically modified and recalculated.`);
    });
  }

  // Submit Payment
  document.getElementById("newPaymentForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dateInput = formData.get("date");
    const formattedDate = formatDateDDMMYYYY(parseDateDDMMYYYY(dateInput));

    const newPay = {
      _id: "pay_" + Date.now(),
      regNo: formData.get("regNo"),
      date: formattedDate,
      amount: parseFloat(formData.get("amount")),
      mode: formData.get("mode"),
      remarks: formData.get("remarks"),
      createdAt: new Date().toISOString()
    };

    state.payments.unshift(newPay);
    Storage.set("payments", state.payments);

    renderPaymentsTable();
    renderPatientsTable();
    if (state.selectedRegNo === newPay.regNo) renderBill(state.selectedRegNo);
    closeModal("newPaymentModal");
  });

 // Submit Discharge & Final Financial Clearance Checkpoint (Option B)
  const chkDisSettlement = document.getElementById("chkDisCollectSettlement");
  if (chkDisSettlement) {
    chkDisSettlement.addEventListener("change", (e) => {
      const flds = document.getElementById("disPaymentFields");
      if (flds) flds.style.display = e.target.checked ? "block" : "none";
    });
  }

  document.getElementById("dischargeForm").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const regNo = document.getElementById("disModalRegNo").value;
    
    // Safely parse the date input (YYYY-MM-DD) to DD/MM/YYYY
    const dateInput = document.getElementById("disModalDate").value;
    const dateParts = dateInput.split("-");
    const disDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    const disTimeRaw = document.getElementById("disModalTime").value;
    
    // Format 12-hour time
    const tParts = disTimeRaw.split(":");
    let h = parseInt(tParts[0], 10);
    const m = tParts[1];
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    const disTime = `${String(h).padStart(2, '0')}:${m} ${ampm}`;

    const pat = state.patients.find(p => p.regNo === regNo);
    
    if (pat) {
      // 1. Process Final Settlement Payment if checked and amount > 0
      const chkSettlement = document.getElementById("chkDisCollectSettlement");
      const isCollecting = chkSettlement && chkSettlement.checked;
      const settlementAmt = isCollecting ? parseFloat(document.getElementById("disPaymentAmount")?.value) || 0 : 0;
      let settlementMode = "Cash";

      if (settlementAmt > 0) {
        settlementMode = document.getElementById("disPaymentMode")?.value || "Cash";
        const settlementRemarks = (document.getElementById("disPaymentRemarks")?.value || "").trim() || "Final discharge settlement";
        const newPayment = {
          _id: "pay_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
          regNo: regNo,
          date: disDate,
          amount: settlementAmt,
          mode: settlementMode,
          remarks: settlementRemarks,
          createdAt: new Date().toISOString()
        };

        state.payments.unshift(newPayment);
        Storage.set("payments", state.payments);

        // Sync payment to cloud if configured
        if (state.settings.sheetsApiUrl && state.settings.syncEnabled) {
          syncToBackend("savePayment", newPayment);
        }

        renderPaymentsTable();
      }

      // 2. Update patient discharge timestamp and clinical status
      pat.dischargeDate = disDate;
      pat.dischargeTime = disTime;
      pat.status = e.target.status.value;
      
      // Save patient to local storage
      Storage.set("patients", state.patients);

      // Sync patient update to cloud if configured
      if (state.settings.sheetsApiUrl && state.settings.syncEnabled) {
        syncToBackend("savePatient", pat);
      }
      
      // 3. Update UI
      renderPatientsTable();
      updateAllPatientDropdowns();
      if (state.selectedRegNo === regNo) renderBill(regNo);
      closeModal("dischargeModal");

      // 4. Prompt to print the final settled inpatient bill
      setTimeout(() => {
        const settlementNotice = settlementAmt > 0
          ? `\n💰 Settlement Collected: ${formatCurrency(settlementAmt)} via ${settlementMode} (Account fully settled)`
          : '';
        const wantReceipt = confirm(`✅ Patient ${pat.name} ${pat.surname} (${pat.regNo}) successfully marked as ${pat.status}.${settlementNotice}\n\nWould you like to view and print the final settled Inpatient Bill now?`);
        
        if (wantReceipt) {
          viewPatientBill(regNo);
          setTimeout(() => {
            window.print();
          }, 500);
        }
      }, 300);
    }
  });

  // Settings Save Handlers
  function saveAllSettings() {
    const bedCharges = parseFloat(document.getElementById("settingBedCharges")?.value) || 0;
    const stayCharges = parseFloat(document.getElementById("settingStayCharges")?.value) || 0;
    const palliativeCharges = parseFloat(document.getElementById("settingPalliativeCareCharges")?.value) || 0;
    const nursingCharges = parseFloat(document.getElementById("settingNursingWardCharges")?.value) || 0;

    state.settings.bedChargesPerDay = bedCharges;
    state.settings.stayChargesPerDay = stayCharges;
    state.settings.palliativeCareChargesPerDay = palliativeCharges;
    state.settings.nursingWardChargesPerDay = nursingCharges;
    state.settings.homeChargesPerDay = bedCharges + stayCharges + palliativeCharges + nursingCharges;

    state.settings.countAdmissionDay = document.getElementById("settingCountAdmissionDay").value;
    state.settings.backendType = document.getElementById("settingBackendType").value;
    state.settings.webAppUrl = document.getElementById("settingWebAppUrl").value.trim();

    Storage.set("settings", state.settings);
    renderPatientsTable();
    if (state.selectedRegNo) renderBill(state.selectedRegNo);
    alert("✅ Billing rules saved successfully! All daily charges updated.");
  }

  document.getElementById("btnSaveSettings").addEventListener("click", saveAllSettings);

  const btnSaveBackend = document.getElementById("btnSaveBackendSettings");
  if (btnSaveBackend) {
    btnSaveBackend.addEventListener("click", saveAllSettings);
  }

  // Backend Connection Test
  const btnTest = document.getElementById("btnTestBackendConnection");
  if (btnTest) {
    btnTest.addEventListener("click", async () => {
      const url = document.getElementById("settingWebAppUrl").value.trim();
      if (!url) {
        alert("⚠️ Please enter a Google Apps Script Web App URL first.");
        return;
      }
      btnTest.textContent = "Testing...";
      btnTest.disabled = true;
      try {
        const resp = await fetch(url + (url.includes("?") ? "&" : "?") + "action=ping");
        const json = await resp.json();
        if (json && json.success) {
          alert(`🎉 Connection Successful!\nConnected to: ${json.org}\nStatus: ${json.status}`);
        } else {
          alert("Connected, but unexpected response: " + JSON.stringify(json));
        }
      } catch (err) {
        alert("❌ Connection Test Failed.\nMake sure you deployed as Web App with 'Who has access' set to 'Anyone'.\nDetails: " + err.message);
      } finally {
        btnTest.textContent = "Test Connection";
        btnTest.disabled = false;
      }
    });
  }

  // ==========================================
  // EDIT PATIENT MODAL EVENT LISTENERS
  // ==========================================
  const editTitleSelect = document.getElementById("editInpMrMrs");
  if (editTitleSelect) {
    editTitleSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      const sexSelect = document.getElementById("editInpSex");
      if (sexSelect) {
        if (["Mr", "Master"].includes(val)) sexSelect.value = "Male";
        else if (["Mrs", "Ms"].includes(val)) sexSelect.value = "Female";
      }
    });
  }

  const editAadhaarInp = document.getElementById("editInpAadhaarNo");
  if (editAadhaarInp) {
    editAadhaarInp.addEventListener("input", (e) => {
      const cursor = e.target.selectionStart;
      const prevVal = e.target.value;
      const formatted = formatAadhaarNumber(prevVal);
      e.target.value = formatted;
      if (cursor && cursor <= formatted.length) {
        e.target.setSelectionRange(cursor, cursor);
      }
    });
  }

  const btnCopyPerm = document.getElementById("btnCopyPermAddress");
  if (btnCopyPerm) {
    btnCopyPerm.addEventListener("click", () => {
      const perm = document.getElementById("editInpPermanentAddress").value;
      document.getElementById("editInpPresentAddress").value = perm;
    });
  }

  const editStatusSelect = document.getElementById("editInpStatus");
  if (editStatusSelect) {
    editStatusSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      const disRow = document.getElementById("editDischargeRow");
      const disDateInp = document.getElementById("editInpDischargeDate");
      const disTimeInp = document.getElementById("editInpDischargeTime");
      if (val === "Discharged" || val === "Death") {
        disRow.style.display = "flex";
        if (!disDateInp.value) disDateInp.value = new Date().toISOString().split("T")[0];
        if (!disTimeInp.value) {
          const now = new Date();
          disTimeInp.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        }
      } else {
        disRow.style.display = "none";
      }
    });
  }

  const editAdmDateInp = document.getElementById("editInpAdmissionDate");
  if (editAdmDateInp) {
    editAdmDateInp.addEventListener("change", (e) => {
      if (e.target.value) {
        const parts = e.target.value.split("-");
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
          document.getElementById("editInpAdmissionDay").value = getDayName(d);
        }
      }
    });
  }

  // Edit Modal Aadhaar File Upload & Preview Listeners
  const editFileInp = document.getElementById("editInpAadhaarFile");
  const editHiddenDoc = document.getElementById("editInpAadhaarDoc");
  const editDropzone = document.getElementById("editAadhaarDropzone");
  const btnBrowseEdit = document.getElementById("btnBrowseEditAadhaar");
  const editPreviewBar = document.getElementById("editAadhaarExistingBar");
  const editFileNameSpan = document.getElementById("editAadhaarFileName");
  const editImgWrapper = document.getElementById("editAadhaarImgPreviewWrapper");
  const editImgPrev = document.getElementById("editAadhaarImgPreview");
  const btnRemoveEdit = document.getElementById("btnRemoveEditAadhaar");
  const btnViewEdit = document.getElementById("btnViewEditAadhaar");

  function processEditAadhaarFile(file) {
    if (!file) return;
    if (file.size > 8 * 1024 * 1024) {
      alert("⚠️ File size exceeds 8MB limit. Please choose a smaller file.");
      if (editFileInp) editFileInp.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      const base64Data = evt.target.result;
      if (editHiddenDoc) editHiddenDoc.value = base64Data;
      if (editFileNameSpan) editFileNameSpan.textContent = `📄 ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (editPreviewBar) editPreviewBar.style.display = "flex";
      if (file.type.startsWith("image/") && editImgPrev && editImgWrapper) {
        editImgPrev.src = base64Data;
        editImgWrapper.style.display = "block";
      } else if (editImgWrapper) {
        editImgWrapper.style.display = "none";
      }
    };
    reader.readAsDataURL(file);
  }

  if (editFileInp) {
    editFileInp.addEventListener("change", (e) => {
      processEditAadhaarFile(e.target.files[0]);
    });
  }

  if (btnBrowseEdit && editFileInp) {
    btnBrowseEdit.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      editFileInp.click();
    });
  }

  if (editDropzone && editFileInp) {
    editDropzone.addEventListener("click", (e) => {
      if (e.target.id === "btnBrowseEditAadhaar" || e.target.closest("#editAadhaarExistingBar")) return;
      editFileInp.click();
    });

    ['dragenter', 'dragover'].forEach(name => {
      editDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        editDropzone.classList.add("drag-over");
      });
    });

    ['dragleave', 'drop'].forEach(name => {
      editDropzone.addEventListener(name, (e) => {
        e.preventDefault();
        e.stopPropagation();
        editDropzone.classList.remove("drag-over");
      });
    });

    editDropzone.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length > 0) {
        processEditAadhaarFile(dt.files[0]);
      }
    });
  }

  if (btnViewEdit) {
    btnViewEdit.addEventListener("click", (e) => {
      e.preventDefault();
      const data = editHiddenDoc ? editHiddenDoc.value : "";
      const reg = document.getElementById("editModalRegNo").value;
      viewAadhaarDocument(data, `Patient Aadhaar Card - ${reg}`);
    });
  }

  if (btnRemoveEdit) {
    btnRemoveEdit.addEventListener("click", (e) => {
      e.preventDefault();
      if (editHiddenDoc) editHiddenDoc.value = "";
      if (editPreviewBar) editPreviewBar.style.display = "none";
      if (editImgWrapper) editImgWrapper.style.display = "none";
      if (editImgPrev) editImgPrev.src = "";
      if (editFileInp) editFileInp.value = "";
    });
  }

  // Edit Patient Form Submit Handler
  document.getElementById("editPatientForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const regNo = document.getElementById("editModalRegNo").value;
    const pat = state.patients.find(p => p.regNo === regNo);
    if (!pat) {
      alert("⚠️ Patient record not found.");
      return;
    }

    const formData = new FormData(e.target);
    const admDateIso = formData.get("admissionDate");
    const admDateFormatted = isoDateToDdmmyyyy(admDateIso);
    const admTimeRaw = formData.get("admissionTime");
    const admTimeFormatted = formatTimeInputValueTo12Hr(admTimeRaw);

    // Compute admission day
    let admDay = formData.get("admissionDay");
    if (admDateIso) {
      const p = admDateIso.split("-");
      const d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
      admDay = getDayName(d);
    }

    const statusVal = formData.get("status");
    let disDateFormatted = "";
    let disTimeFormatted = "";

    if (statusVal === "Discharged" || statusVal === "Death") {
      const disDateIso = formData.get("dischargeDate");
      disDateFormatted = disDateIso ? isoDateToDdmmyyyy(disDateIso) : formatDateDDMMYYYY(new Date());
      const disTimeRaw = formData.get("dischargeTime");
      disTimeFormatted = disTimeRaw ? formatTimeInputValueTo12Hr(disTimeRaw) : formatTime12Hr(new Date());
    }

    // Update patient object properties
    pat.admissionDate = admDateFormatted;
    pat.admissionTime = admTimeFormatted;
    pat.admissionDay = admDay;
    pat.dischargeDate = disDateFormatted;
    pat.dischargeTime = disTimeFormatted;
    pat.mrMrs = formData.get("mrMrs");
    pat.name = formData.get("name").trim();
    pat.surname = formData.get("surname").trim();
    pat.guardian = (formData.get("guardian") || "").trim();
    pat.age = parseInt(formData.get("age"), 10);
    pat.diseaseCategory = formData.get("diseaseCategory") || "Cancer";
    pat.sex = formData.get("sex") || pat.sex || "Male";
    pat.maritalStatus = formData.get("maritalStatus");
    pat.occupation = (formData.get("occupation") || "").trim();
    pat.religion = (formData.get("religion") || "").trim();
    pat.nationality = (formData.get("nationality") || "Indian").trim();
    pat.permanentAddress = formData.get("permanentAddress").trim();
    pat.presentAddress = (formData.get("presentAddress") || "").trim();
    pat.city = formData.get("city").trim();
    pat.district = formData.get("district").trim();
    pat.state = formData.get("state").trim();
    pat.pin = formData.get("pin").trim();
    pat.contactPerson = formData.get("contactPerson").trim();
    pat.contactNo = formData.get("contactNo").trim();
    pat.whatsappNo = formData.get("whatsappNo").trim();
    pat.refDoctor = (formData.get("refDoctor") || "").trim();
    pat.doctorAdvice = (formData.get("doctorAdvice") || "").trim();
    pat.status = statusVal;
    pat.aadhaarNo = formatAadhaarNumber(formData.get("aadhaarNo") || "");
    pat.updatedAt = new Date().toISOString();

    // Save to LocalStorage
    Storage.set("patients", state.patients);

    // Save Aadhaar & Document Record
    const aadhaarDocData = document.getElementById("editInpAadhaarDoc") ? document.getElementById("editInpAadhaarDoc").value : "";
    let doc = state.documents.find(d => d.regNo === regNo);
    if (!doc) {
      doc = {
        regNo: regNo,
        patientAadhaar: false,
        patientAadhaarLink: "",
        partyAadhaar: false,
        partyAadhaarLink: "",
        statusVerified: true,
        adviceCert: false,
        adviceCertLink: ""
      };
      state.documents.push(doc);
    }
    doc.patientAadhaar = Boolean(aadhaarDocData || pat.aadhaarNo);
    doc.patientAadhaarLink = aadhaarDocData;
    Storage.set("documents", state.documents);

    // Sync to Cloud/Google Sheets backend if configured
    await syncPatientUpdateToBackend(pat);

    // Refresh UI
    renderPatientsTable();
    updateAllPatientDropdowns();
    if (state.selectedRegNo === regNo) {
      renderRegistrationForm(regNo);
      renderBill(regNo);
    }
    renderDocumentsTable();

    closeModal("editPatientModal");
    alert(`✅ Patient record for ${regNo} (${pat.name} ${pat.surname}) has been updated successfully across all database tables and views!`);
  });

  // ==========================================
  // PROCUREMENT & FINANCE LISTENERS & RENDERS
  // ==========================================

  // 1. Vendor Master
  const btnNewVendor = document.getElementById("btnOpenNewVendorModal");
  if (btnNewVendor) {
    btnNewVendor.addEventListener("click", () => {
      document.getElementById("newVendorForm").reset();
      const activeFilter = document.getElementById("vendorCategoryFilter") ? document.getElementById("vendorCategoryFilter").value : "ALL";
      if (activeFilter && activeFilter !== "ALL") {
        const catInp = document.getElementById("inpVendorCategory");
        if (catInp) catInp.value = activeFilter;
      }
      openModal("newVendorModal");
    });
  }

  const vCatFilter = document.getElementById("vendorCategoryFilter");
  if (vCatFilter) vCatFilter.addEventListener("change", renderVendorsTable);
  const vSearchInp = document.getElementById("vendorSearchInput");
  if (vSearchInp) vSearchInp.addEventListener("input", renderVendorsTable);

  const newVendorForm = document.getElementById("newVendorForm");
  if (newVendorForm) {
    newVendorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const nextNum = state.vendors.length + 1;
      const vendorId = "VND-" + String(nextNum).padStart(3, "0");

      const newVendor = {
        _id: "vnd_" + Date.now().toString(36),
        vendorId: vendorId,
        name: formData.get("name").trim(),
        category: formData.get("category"),
        contactPerson: formData.get("contactPerson").trim(),
        phone: formData.get("phone").trim(),
        gstin: (formData.get("gstin") || "").trim(),
        drugLicNo: (formData.get("drugLicNo") || "").trim(),
        address: (formData.get("address") || "").trim(),
        bankName: (formData.get("bankName") || "").trim(),
        accountNo: (formData.get("accountNo") || "").trim(),
        ifsc: (formData.get("ifsc") || "").trim(),
        creditDays: parseInt(formData.get("creditDays"), 10) || 30,
        openingBalance: parseFloat(formData.get("openingBalance")) || 0,
        createdAt: new Date().toISOString()
      };

      state.vendors.push(newVendor);
      Storage.set("vendors", state.vendors);

      // Sync to cloud Google Sheets backend
      syncToBackend("addVendor", newVendor);

      // Ensure newly added vendor is visible even if a different category filter was selected
      const filterSelect = document.getElementById("vendorCategoryFilter");
      if (filterSelect && filterSelect.value !== "ALL" && filterSelect.value !== newVendor.category) {
        filterSelect.value = newVendor.category;
      }

      updateAllVendorDropdowns();
      renderVendorsTable();
      renderVendorLedgerView();
      closeModal("newVendorModal");
      alert(`✅ Vendor Registered Successfully!\nVendor ID: ${vendorId}\nName: ${newVendor.name}\nCategory: ${newVendor.category}`);
    });
  }

  // 2. Purchase Entry (GRN)
  const btnNewPurchase = document.getElementById("btnOpenNewPurchaseModal");
  if (btnNewPurchase) {
    btnNewPurchase.addEventListener("click", () => {
      const form = document.getElementById("newPurchaseForm");
      if (form) form.reset();
      const tbody = document.getElementById("purchaseItemsTbody");
      if (tbody) tbody.innerHTML = "";
      addPurchaseItemRow();
      const dInp = document.getElementById("purModalInvoiceDate");
      if (dInp) dInp.value = new Date().toISOString().split("T")[0];

      // Inherit filtered vendor if active
      const activeVendor = document.getElementById("purchaseVendorFilter") ? document.getElementById("purchaseVendorFilter").value : "ALL";
      if (activeVendor && activeVendor !== "ALL") {
        const vSel = document.getElementById("purModalVendorSelect");
        if (vSel) vSel.value = activeVendor;
      }

      updatePurchaseModalCalculations();
      openModal("newPurchaseModal");
    });
  }

  const btnAddPurItem = document.getElementById("btnAddPurchaseItemRow");
  if (btnAddPurItem) {
    btnAddPurItem.addEventListener("click", () => addPurchaseItemRow());
  }

  const purGstSelect = document.getElementById("purModalGstPercent");
  if (purGstSelect) {
    purGstSelect.addEventListener("change", updatePurchaseModalCalculations);
  }

  const purVendorFilter = document.getElementById("purchaseVendorFilter");
  if (purVendorFilter) {
    purVendorFilter.addEventListener("change", renderPurchasesTable);
  }

  const newPurchaseForm = document.getElementById("newPurchaseForm");
  if (newPurchaseForm) {
    newPurchaseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const vendorId = formData.get("vendorId");
      const vendor = state.vendors.find(v => v.vendorId === vendorId);
      const invNo = formData.get("invoiceNo").trim();
      const invDateRaw = formData.get("invoiceDate");
      const invDateFormatted = formatDateDDMMYYYY(parseDateDDMMYYYY(invDateRaw));

      const rows = document.querySelectorAll(".pur-item-row");
      if (rows.length === 0) {
        alert("⚠️ Please add at least one line item to the purchase bill.");
        return;
      }

      const items = [];
      let gross = 0;
      rows.forEach(r => {
        const desc = (r.querySelector(".pur-desc")?.value || "").trim();
        const cat = r.querySelector(".pur-cat")?.value || "Medicine";
        const batch = (r.querySelector(".pur-batch")?.value || "").trim();
        const exp = r.querySelector(".pur-exp")?.value || "";
        const qty = parseFloat(r.querySelector(".pur-qty")?.value) || 1;
        const rate = parseFloat(r.querySelector(".pur-rate")?.value) || 0;
        const amt = qty * rate;
        gross += amt;

        items.push({
          itemName: desc,
          category: cat,
          batchNo: batch,
          expiryDate: exp,
          qty: qty,
          rate: rate,
          amount: amt
        });
      });

      const gstPercent = parseFloat(document.getElementById("purModalGstPercent")?.value) || 0;
      const gstAmt = (gross * gstPercent) / 100;
      const net = gross + gstAmt;

      const grnSeq = String(state.purchases.length + 1).padStart(3, "0");
      const grnNo = `GRN/${grnSeq}/${new Date().getFullYear()}`;

      const newPurchase = {
        _id: "pur_" + Date.now().toString(36),
        grnNo: grnNo,
        vendorId: vendorId,
        vendorName: vendor ? vendor.name : vendorId,
        invoiceNo: invNo,
        invoiceDate: invDateFormatted,
        items: items,
        grossAmount: gross,
        gstPercent: gstPercent,
        gstAmount: gstAmt,
        netAmount: net,
        paidAmount: 0,
        paymentStatus: "Unpaid",
        createdAt: new Date().toISOString()
      };

      state.purchases.unshift(newPurchase);
      Storage.set("purchases", state.purchases);

      // Inward to Inventory Stock
      items.forEach(it => {
        const newInv = {
          _id: "inv_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 5),
          purchaseId: newPurchase._id,
          vendorId: vendorId,
          itemName: it.itemName,
          category: it.category,
          batchNo: it.batchNo,
          expiryDate: it.expiryDate,
          initialQty: it.qty,
          currentQty: it.qty,
          rate: it.rate,
          createdAt: new Date().toISOString()
        };
        state.inventory.unshift(newInv);
      });
      Storage.set("inventory", state.inventory);

      // Sync purchase to cloud backend
      syncToBackend("addPurchase", newPurchase);

      renderPurchasesTable();
      renderInventoryTable();
      renderVendorsTable();
      renderVendorLedgerView();
      closeModal("newPurchaseModal");
      alert(`✅ Purchase Bill Inwarded Successfully!\nGRN No: ${grnNo}\nVendor: ${vendor ? vendor.name : vendorId}\nTotal Bill: ${formatCurrency(net)}`);
    });
  }

  // 3. Inventory & Stock Issue
  const btnIssueStock = document.getElementById("btnOpenIssueStockModal");
  if (btnIssueStock) {
    btnIssueStock.addEventListener("click", () => {
      const form = document.getElementById("issueStockForm");
      if (form) form.reset();
      updateIssueStockModalBatches();
      const dInp = document.getElementById("issueModalDate");
      if (dInp) dInp.value = new Date().toISOString().split("T")[0];
      const pRow = document.getElementById("issuePatientSelectRow");
      if (pRow) pRow.style.display = "block";
      const dRow = document.getElementById("issueDeptSelectRow");
      if (dRow) dRow.style.display = "none";
      openModal("issueStockModal");
    });
  }

  const issueBatchSelect = document.getElementById("issueModalBatchSelect");
  if (issueBatchSelect) {
    issueBatchSelect.addEventListener("change", (e) => {
      const batchId = e.target.value;
      const inv = state.inventory.find(i => i._id === batchId);
      const availEl = document.getElementById("issueModalAvailQty");
      if (availEl) availEl.value = inv ? inv.currentQty : "0";
    });
  }

  const issueTypeSelect = document.getElementById("issueModalType");
  if (issueTypeSelect) {
    issueTypeSelect.addEventListener("change", (e) => {
      const val = e.target.value;
      const pRow = document.getElementById("issuePatientSelectRow");
      const dRow = document.getElementById("issueDeptSelectRow");
      if (val === "Patient Clinical Billing") {
        if (pRow) pRow.style.display = "block";
        if (dRow) dRow.style.display = "none";
      } else {
        if (pRow) pRow.style.display = "none";
        if (dRow) dRow.style.display = "block";
      }
    });
  }

  const invCatFilter = document.getElementById("inventoryCategoryFilter");
  if (invCatFilter) invCatFilter.addEventListener("change", renderInventoryTable);
  const invSearchInp = document.getElementById("inventorySearchInput");
  if (invSearchInp) invSearchInp.addEventListener("input", renderInventoryTable);

  const issueStockForm = document.getElementById("issueStockForm");
  if (issueStockForm) {
    issueStockForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const batchId = formData.get("batchId");
      const issueQty = parseFloat(formData.get("qty")) || 1;
      const issueType = formData.get("issueType");
      const regNo = formData.get("regNo");
      const dept = formData.get("department") || "";
      const issueDateRaw = formData.get("issueDate");
      const issueDateFormatted = formatDateDDMMYYYY(parseDateDDMMYYYY(issueDateRaw));
      const remarks = (formData.get("remarks") || "").trim();

      const inv = state.inventory.find(i => i._id === batchId);
      if (!inv) {
        alert("⚠️ Please select an available stock item.");
        return;
      }

      if (issueQty > (parseFloat(inv.currentQty) || 0)) {
        alert(`⚠️ Insufficient stock! Available: ${inv.currentQty}, Requested: ${issueQty}`);
        return;
      }

      inv.currentQty -= issueQty;
      Storage.set("inventory", state.inventory);

      const issueRecord = {
        _id: "iss_" + Date.now().toString(36),
        batchId: batchId,
        itemName: inv.itemName,
        batchNo: inv.batchNo,
        qty: issueQty,
        rate: inv.rate,
        category: inv.category,
        issueType: issueType,
        regNo: issueType === "Patient Clinical Billing" ? regNo : "",
        department: dept,
        issueDate: issueDateFormatted,
        remarks: remarks,
        createdAt: new Date().toISOString()
      };
      state.stockIssues.unshift(issueRecord);
      Storage.set("stockIssues", state.stockIssues);

      // Sync stock issue to cloud backend
      syncToBackend("issueStock", issueRecord);

      if (issueType === "Patient Clinical Billing" && regNo) {
        const expCat = inv.category === "Medicine" ? "Medicine" : (inv.category === "Oxygen" ? "Oxygen" : "Non-Surgical Item");
        const expAmt = issueQty * inv.rate;
        const autoExp = {
          _id: "exp_" + Date.now().toString(36) + "_" + Math.random().toString(36).substring(2, 6),
          regNo: regNo,
          date: issueDateFormatted,
          category: expCat,
          description: `${inv.itemName} (Batch: ${inv.batchNo})`,
          qty: issueQty,
          rate: inv.rate,
          amount: expAmt,
          discount: 0,
          netAmount: expAmt,
          createdAt: new Date().toISOString()
        };
        state.expenses.unshift(autoExp);
        Storage.set("expenses", state.expenses);

        renderExpensesTable();
        renderPatientsTable();
        renderBill(regNo);
        updateExpModalLiveList(regNo);
      }

      renderInventoryTable();
      closeModal("issueStockModal");
      alert(`✅ Stock Issued Successfully!\n${inv.itemName} (Batch: ${inv.batchNo}) - Qty: ${issueQty}\n${issueType === 'Patient Clinical Billing' ? '⚡ Automatically added to Patient Bill for ' + regNo : ''}`);
    });
  }

  // 4. Vendor Ledger & Payment Voucher
  const ledgerVendorSel = document.getElementById("ledgerVendorSelect");
  if (ledgerVendorSel) {
    ledgerVendorSel.addEventListener("change", (e) => {
      if (e.target.value) renderVendorLedgerView(e.target.value);
    });
  }

  const btnOpenVP = document.getElementById("btnOpenVendorPaymentModal");
  if (btnOpenVP) {
    btnOpenVP.addEventListener("click", () => {
      const form = document.getElementById("newVendorPaymentForm");
      if (form) form.reset();
      const dInp = document.getElementById("vpModalDate");
      if (dInp) dInp.value = new Date().toISOString().split("T")[0];
      const vSel = document.getElementById("vpModalVendorSelect");
      if (vSel && state.selectedVendorId) {
        vSel.value = state.selectedVendorId;
      }
      openModal("newVendorPaymentVoucherModal");
    });
  }

  const newVPForm = document.getElementById("newVendorPaymentForm");
  if (newVPForm) {
    newVPForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const vendorId = formData.get("vendorId");
      const vDateRaw = formData.get("date");
      const vDateFormatted = formatDateDDMMYYYY(parseDateDDMMYYYY(vDateRaw));
      const amount = parseFloat(formData.get("amount")) || 0;
      const mode = formData.get("mode");
      const refNo = formData.get("refNo").trim();
      const remarks = (formData.get("remarks") || "").trim();

      const vchSeq = String(state.vendorVouchers.length + 1).padStart(3, "0");
      const vchNo = `PV/${vchSeq}/${new Date().getFullYear()}`;

      const newVoucher = {
        _id: "vch_" + Date.now().toString(36),
        voucherNo: vchNo,
        vendorId: vendorId,
        date: vDateFormatted,
        amount: amount,
        mode: mode,
        refNo: refNo,
        remarks: remarks,
        createdAt: new Date().toISOString()
      };

      state.vendorVouchers.unshift(newVoucher);
      Storage.set("vendorVouchers", state.vendorVouchers);

      // Sync voucher to cloud backend
      syncToBackend("addVendorVoucher", newVoucher);

      let remainingPayment = amount;
      state.purchases.filter(p => p.vendorId === vendorId && p.paymentStatus !== "Paid").forEach(p => {
        if (remainingPayment <= 0) return;
        const due = (parseFloat(p.netAmount) || 0) - (parseFloat(p.paidAmount) || 0);
        if (remainingPayment >= due) {
          p.paidAmount = p.netAmount;
          p.paymentStatus = "Paid";
          remainingPayment -= due;
        } else {
          p.paidAmount = (parseFloat(p.paidAmount) || 0) + remainingPayment;
          p.paymentStatus = "Partial";
          remainingPayment = 0;
        }
      });
      Storage.set("purchases", state.purchases);

      renderVendorLedgerView(vendorId);
      renderVendorsTable();
      renderPurchasesTable();
      closeModal("newVendorPaymentVoucherModal");
      alert(`✅ Payment Voucher Disbursed & Posted!\nVoucher No: ${vchNo}\nAmount: ${formatCurrency(amount)} via ${mode}`);
    });
  }

  // Initial Procurement Renders
  updateAllVendorDropdowns();
  renderVendorsTable();
  renderPurchasesTable();
  renderInventoryTable();
  renderVendorLedgerView();
});

// Universal Backend Sync Helper (Google Sheets / REST Web App)
async function syncToBackend(action, data) {
  const url = (state.settings && state.settings.webAppUrl) || "";
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: action, data: data })
    });
    console.log(`☁️ Synced "${action}" to Google Sheets backend.`);
  } catch (err) {
    console.warn(`⚠️ Backend sync failed for "${action}":`, err);
  }
}
window.syncToBackend = syncToBackend;

// Sync patient update to backend (Google Sheets / REST API)
async function syncPatientUpdateToBackend(patient) {
  if (state.settings.backendType !== "sheets" || !state.settings.webAppUrl) return;
  try {
    await fetch(state.settings.webAppUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updatePatient",
        data: patient
      })
    });
    console.log("☁️ Patient updated and synced to Google Sheets backend:", patient.regNo);
  } catch (err) {
    console.warn("⚠️ Backend sync failed (offline or network error):", err);
  }
}

// Edit patient modal trigger
function openEditPatientModal(regNo) {
  if (!regNo) {
    alert("⚠️ Please select a patient to edit.");
    return;
  }
  const pat = state.patients.find(p => p.regNo === regNo);
  if (!pat) {
    alert(`⚠️ Patient with Reg No ${regNo} not found.`);
    return;
  }

  // Header banner
  document.getElementById("editModalRegNo").value = pat.regNo;
  document.getElementById("editModalRegDisplay").textContent = pat.regNo;
  const statusBadge = document.getElementById("editModalStatusBadge");
  if (statusBadge) {
    statusBadge.textContent = pat.status;
    statusBadge.className = `badge badge-${pat.status.toLowerCase()}`;
  }

  // Admission info
  document.getElementById("editInpAdmissionDate").value = ddmmyyyyToIsoDate(pat.admissionDate);
  document.getElementById("editInpAdmissionTime").value = time12HrTo24Hr(pat.admissionTime);
  document.getElementById("editInpAdmissionDay").value = pat.admissionDay || "";

  // Personal details
  document.getElementById("editInpMrMrs").value = pat.mrMrs || "Mr";
  document.getElementById("editInpName").value = pat.name || "";
  document.getElementById("editInpSurname").value = pat.surname || "";
  document.getElementById("editInpGuardian").value = pat.guardian || "";
  document.getElementById("editInpAge").value = pat.age || "";
  if (document.getElementById("editInpDiseaseCategory")) {
    document.getElementById("editInpDiseaseCategory").value = pat.diseaseCategory || "Cancer";
  }
  if (document.getElementById("editInpSex")) {
    document.getElementById("editInpSex").value = pat.sex || (["Mr", "Master"].includes(pat.mrMrs) ? "Male" : "Female");
  }
  document.getElementById("editInpMaritalStatus").value = pat.maritalStatus || "Married";
  document.getElementById("editInpOccupation").value = pat.occupation || "";
  document.getElementById("editInpReligion").value = pat.religion || "Hindu";
  document.getElementById("editInpNationality").value = pat.nationality || "Indian";

  // Aadhaar No
  document.getElementById("editInpAadhaarNo").value = pat.aadhaarNo ? formatAadhaarNumber(pat.aadhaarNo) : "";

  // Aadhaar File
  const doc = state.documents.find(d => d.regNo === regNo);
  const existingAadhaarBar = document.getElementById("editAadhaarExistingBar");
  const existingFileName = document.getElementById("editAadhaarFileName");
  const hiddenAadhaarDoc = document.getElementById("editInpAadhaarDoc");
  const editImgPreview = document.getElementById("editAadhaarImgPreview");
  const editImgWrapper = document.getElementById("editAadhaarImgPreviewWrapper");

  if (doc && doc.patientAadhaarLink) {
    hiddenAadhaarDoc.value = doc.patientAadhaarLink;
    existingAadhaarBar.style.display = "flex";
    if (doc.patientAadhaarLink.startsWith("data:image")) {
      existingFileName.textContent = `🖼️ Attached Image Copy`;
      editImgPreview.src = doc.patientAadhaarLink;
      editImgWrapper.style.display = "block";
    } else if (doc.patientAadhaarLink.startsWith("data:application/pdf")) {
      existingFileName.textContent = `📄 Attached PDF Document`;
      editImgWrapper.style.display = "none";
    } else {
      existingFileName.textContent = `🔗 Attached Cloud Link`;
      editImgWrapper.style.display = "none";
    }
  } else {
    hiddenAadhaarDoc.value = "";
    existingAadhaarBar.style.display = "none";
    editImgWrapper.style.display = "none";
  }

  // Address
  document.getElementById("editInpPermanentAddress").value = pat.permanentAddress || "";
  document.getElementById("editInpPresentAddress").value = pat.presentAddress || "";
  document.getElementById("editInpCity").value = pat.city || "";
  document.getElementById("editInpDistrict").value = pat.district || "";
  document.getElementById("editInpState").value = pat.state || "West Bengal";
  document.getElementById("editInpPin").value = pat.pin || "";

  // Emergency & Status
  document.getElementById("editInpContactPerson").value = pat.contactPerson || "";
  document.getElementById("editInpContactNo").value = pat.contactNo || "";
  document.getElementById("editInpWhatsappNo").value = pat.whatsappNo || "";
  document.getElementById("editInpRefDoctor").value = pat.refDoctor || "";
  document.getElementById("editInpDoctorAdvice").value = pat.doctorAdvice || "";
  document.getElementById("editInpStatus").value = pat.status || "Admitted";

  // Discharge row
  const disRow = document.getElementById("editDischargeRow");
  const disDateInp = document.getElementById("editInpDischargeDate");
  const disTimeInp = document.getElementById("editInpDischargeTime");

  disDateInp.value = pat.dischargeDate ? ddmmyyyyToIsoDate(pat.dischargeDate) : "";
  disTimeInp.value = pat.dischargeTime ? time12HrTo24Hr(pat.dischargeTime) : "";

  if (pat.status === "Discharged" || pat.status === "Death") {
    disRow.style.display = "flex";
  } else {
    disRow.style.display = "none";
  }

  openModal("editPatientModal");
}

// Discharge modal trigger with 1-Click Settlement (Option B)
function openDischargeModal(regNo) {
  const pat = state.patients.find(p => p.regNo === regNo);
  if (!pat) return;

  document.getElementById("disModalRegNo").value = regNo;
  document.getElementById("disModalPatientName").textContent = `${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname}`.trim();
  document.getElementById("disModalRegDisplay").textContent = regNo;
  document.getElementById("disModalDate").value = new Date().toISOString().split("T")[0];
  
  const now = new Date();
  document.getElementById("disModalTime").value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  // Compute current bill to determine outstanding balance
  const bill = computePatientBill(regNo);
  const outstanding = bill ? (bill.outstanding || 0) : 0;

  const zeroBox = document.getElementById("disZeroDueBox");
  const dueBox = document.getElementById("disDueNoticeBox");
  const badge = document.getElementById("disOutstandingBadge");
  const chk = document.getElementById("chkDisCollectSettlement");
  const amtInp = document.getElementById("disPaymentAmount");
  const fields = document.getElementById("disPaymentFields");
  const remarks = document.getElementById("disPaymentRemarks");

  if (outstanding <= 0.005) {
    if (zeroBox) zeroBox.style.display = "block";
    if (dueBox) dueBox.style.display = "none";
    if (chk) chk.checked = false;
    if (amtInp) amtInp.value = "0.00";
  } else {
    if (zeroBox) zeroBox.style.display = "none";
    if (dueBox) dueBox.style.display = "block";
    if (badge) badge.textContent = formatCurrency(outstanding);
    if (chk) chk.checked = true;
    if (amtInp) amtInp.value = outstanding.toFixed(2);
    if (fields) fields.style.display = "block";
    if (remarks) remarks.value = "Final discharge settlement";
  }

  openModal("dischargeModal");
}

// ==========================================
// EXPENSE MODAL UTILITIES & TRIGGERS (GLOBAL SCOPE)
// ==========================================

function updateEditExpenseModalCalculations() {
  const editExpCat = document.getElementById("editExpModalCategory");
  const editExpQty = document.getElementById("editExpModalQty");
  const editExpRate = document.getElementById("editExpModalRate");
  const editExpDisc = document.getElementById("editExpModalDiscount");

  if (!editExpCat || !editExpQty || !editExpRate) return;
  const qty = parseFloat(editExpQty.value) || 1;
  const rate = parseFloat(editExpRate.value) || 0;
  const cat = editExpCat.value;
  const amt = qty * rate;
  const amtInp = document.getElementById("editExpModalAmount");
  if (amtInp) amtInp.value = amt.toFixed(2);

  let disc = parseFloat(editExpDisc ? editExpDisc.value : 0) || 0;
  let net = amt;
  const discContainer = document.getElementById("editExpModalDiscountContainer");
  if (cat === "Pathology") {
    if (discContainer) discContainer.style.display = "block";
    net = Math.max(0, amt - disc);
  } else {
    if (discContainer) discContainer.style.display = "none";
    if (editExpDisc) editExpDisc.value = 0;
  }

  const netPrev = document.getElementById("editExpModalNetPreview");
  if (netPrev) netPrev.textContent = formatCurrency(net);
}
window.updateEditExpenseModalCalculations = updateEditExpenseModalCalculations;

function updateExpModalLiveList(regNo) {
  const liveTbody = document.getElementById("expModalLiveTbody");
  const liveCount = document.getElementById("expModalLiveCount");
  if (!liveTbody) return;

  if (!regNo) {
    liveTbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted" style="padding:10px;">Select a patient above to view their entries</td></tr>';
    if (liveCount) liveCount.textContent = "0 Items";
    return;
  }

  const patientExpenses = state.expenses.filter(e => e.regNo === regNo);
  const totalNet = patientExpenses.reduce((sum, e) => sum + (parseFloat(e.netAmount) || 0), 0);

  if (liveCount) {
    liveCount.textContent = `${patientExpenses.length} Items (Total: ${formatCurrency(totalNet)})`;
  }

  if (patientExpenses.length === 0) {
    liveTbody.innerHTML = '<tr><td colspan="6" class="text-center text-muted" style="padding:12px;">No expenses recorded yet for this patient. Enter details above to add.</td></tr>';
    return;
  }

  liveTbody.innerHTML = "";
  patientExpenses.forEach(exp => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="badge" style="font-size:11px;">${exp.category}</span></td>
      <td style="max-width:140px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${exp.description}">${exp.description}</td>
      <td style="text-align:center;">${exp.qty}</td>
      <td style="text-align:right;">${formatCurrency(exp.rate)}</td>
      <td style="text-align:right; font-weight:700; color:#0f766e;">${formatCurrency(exp.netAmount)}</td>
      <td class="no-print" style="text-align:center; white-space:nowrap;">
        <button type="button" class="btn btn-secondary btn-sm" style="padding:2px 6px; font-size:11px; cursor:pointer;" onclick="openEditExpenseModal('${exp._id}')" title="Edit Expense">✏️ Edit</button>
        <button type="button" class="btn btn-secondary btn-sm" style="padding:2px 6px; font-size:11px; cursor:pointer;" onclick="deleteExpense('${exp._id}')" title="Delete Expense">🗑️</button>
      </td>
    `;
    liveTbody.appendChild(tr);
  });
}
window.updateExpModalLiveList = updateExpModalLiveList;

function openEditExpenseModal(id) {
  const exp = state.expenses.find(e => e._id === id);
  if (!exp) {
    alert("⚠️ Expense record not found (ID: " + id + ")");
    return;
  }

  const pat = state.patients.find(p => p.regNo === exp.regNo);
  const patName = pat ? `${pat.mrMrs ? pat.mrMrs + ' ' : ''}${pat.name} ${pat.surname}`.trim() : exp.regNo;

  const idEl = document.getElementById("editExpModalId");
  const regEl = document.getElementById("editExpModalRegNo");
  const dispEl = document.getElementById("editExpModalPatientDisplay");
  const dateEl = document.getElementById("editExpModalDate");
  const catEl = document.getElementById("editExpModalCategory");
  const descEl = document.getElementById("editExpModalDescription");
  const qtyEl = document.getElementById("editExpModalQty");
  const rateEl = document.getElementById("editExpModalRate");
  const amtEl = document.getElementById("editExpModalAmount");
  const discEl = document.getElementById("editExpModalDiscount");

  if (idEl) idEl.value = exp._id;
  if (regEl) regEl.value = exp.regNo;
  if (dispEl) dispEl.value = `${patName} (${exp.regNo})`;

  // Convert DD/MM/YYYY to YYYY-MM-DD for date input
  if (dateEl) {
    const dParts = exp.date ? exp.date.split("/") : [];
    if (dParts.length === 3) {
      dateEl.value = `${dParts[2]}-${dParts[1].padStart(2, '0')}-${dParts[0].padStart(2, '0')}`;
    } else {
      dateEl.value = exp.date || new Date().toISOString().split("T")[0];
    }
  }

  if (catEl) catEl.value = exp.category;
  if (descEl) descEl.value = exp.description || "";
  if (qtyEl) qtyEl.value = exp.qty || 1;
  if (rateEl) rateEl.value = exp.rate || 0;
  if (amtEl) amtEl.value = (exp.amount || 0).toFixed(2);
  if (discEl) discEl.value = exp.discount || 0;

  updateEditExpenseModalCalculations();
  openModal("editExpenseModal");
}
window.openEditExpenseModal = openEditExpenseModal;

function deleteExpense(id) {
  const exp = state.expenses.find(e => e._id === id);
  const regNo = exp ? exp.regNo : null;
  if (confirm("Delete this expense entry?")) {
    state.expenses = state.expenses.filter(e => e._id !== id);
    Storage.set("expenses", state.expenses);
    renderExpensesTable();
    renderPatientsTable();
    if (regNo) {
      renderBill(regNo);
      updateExpModalLiveList(regNo);
    } else if (state.selectedRegNo) {
      renderBill(state.selectedRegNo);
    }
  }
}

function deletePayment(id) {
  if (confirm("Delete this payment receipt?")) {
    state.payments = state.payments.filter(p => p._id !== id);
    Storage.set("payments", state.payments);
    renderPaymentsTable();
    renderPatientsTable();
    if (state.selectedRegNo) renderBill(state.selectedRegNo);
  }
}

// ==========================================
// 7. SYSTEM ERROR LOGGING & DIAGNOSTICS
// ==========================================
window.addEventListener("error", (event) => {
  try {
    const errLog = {
      timestamp: new Date().toISOString(),
      message: event.message || "Unknown error",
      filename: event.filename || "inline",
      lineno: event.lineno || 0,
      colno: event.colno || 0,
      stack: event.error ? event.error.stack : null,
      activeTab: document.querySelector(".tab-panel.active") ? document.querySelector(".tab-panel.active").id : "unknown",
      selectedRegNo: state ? state.selectedRegNo : null
    };
    const logs = JSON.parse(localStorage.getItem("AKKMCT_error_logs") || "[]");
    logs.unshift(errLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem("AKKMCT_error_logs", JSON.stringify(logs));
  } catch (e) {
    console.warn("Error logger failure:", e);
  }
});

window.addEventListener("unhandledrejection", (event) => {
  try {
    const errLog = {
      timestamp: new Date().toISOString(),
      message: event.reason ? (event.reason.message || String(event.reason)) : "Unhandled Promise Rejection",
      stack: event.reason && event.reason.stack ? event.reason.stack : null,
      type: "UnhandledRejection",
      activeTab: document.querySelector(".tab-panel.active") ? document.querySelector(".tab-panel.active").id : "unknown"
    };
    const logs = JSON.parse(localStorage.getItem("AKKMCT_error_logs") || "[]");
    logs.unshift(errLog);
    if (logs.length > 50) logs.pop();
    localStorage.setItem("AKKMCT_error_logs", JSON.stringify(logs));
  } catch (e) {
    console.warn("Rejection logger failure:", e);
  }
});

// Admin Diagnostic Utilities
window.getSystemErrorLogs = () => {
  try {
    return JSON.parse(localStorage.getItem("AKKMCT_error_logs") || "[]");
  } catch (e) {
    return [];
  }
};

window.clearSystemErrorLogs = () => {
  localStorage.removeItem("AKKMCT_error_logs");
  console.log("✅ AKKMCT Error logs cleared.");
};

window.exportSystemState = () => {
  return {
    timestamp: new Date().toISOString(),
    patients: state.patients,
    expenses: state.expenses,
    payments: state.payments,
    documents: state.documents,
    settings: state.settings,
    errorLogs: window.getSystemErrorLogs()
  };
};

