# 📋 Hospital Management System (HMS) - Error Log & Troubleshooting Guide

> **Organization:** Anil Kumar Karmakar Memorial Cancer Trust (AKKMCT)  
> **System:** Single Page Application (SPA) Hospital Management, Inpatient Billing & Registration  
> **File:** `error_log.md`  
> **Last Updated:** 17 November 2026  
> **Status:** Active & Maintained  

---

## 📑 Table of Contents
1. [Overview & Severity Matrix](#1-overview--severity-matrix)
2. [Historical Incident & Resolution Registry](#2-historical-incident--resolution-registry)
3. [Common Runtime Errors & Diagnostics](#3-common-runtime-errors--diagnostics)
4. [Client-Side Error Logging Architecture](#4-client-side-error-logging-architecture)
5. [Backend & Google Apps Script Error Handling](#5-backend--google-apps-script-error-handling)
6. [Administrator Troubleshooting Playbook](#6-administrator-troubleshooting-playbook)

---

## 1. Overview & Severity Matrix

This document records historical bugs, known runtime edge cases, diagnostic procedures, and recovery workflows for the AKKMCT Hospital Management System. All system anomalies are categorized according to the standard clinical severity matrix below:

| Severity Level | Identifier | Clinical & Operational Impact | Target Resolution SLA |
|:---|:---|:---|:---|
| 🔴 **Critical** | `SEV-1` | Financial calculation errors, billing discrepancies, patient admission loss, data corruption. | Immediate (< 1 hour) |
| 🟠 **High** | `SEV-2` | Google Sheets backend sync failure, modal blocking, form submission freeze, print generation crash. | Within 4 hours |
| 🟡 **Medium** | `SEV-3` | UI clipping on small devices, responsive drawer failure, non-critical table overflow. | Within 24 hours |
| 🟢 **Low** | `SEV-4` | Minor styling misalignment, non-critical console warnings, cosmetic label spacing. | Next scheduled update |

---

## 2. Historical Incident & Resolution Registry

### 📌 INC-001: Modal Clipping & Inaccessible Action Buttons on Screen
- **Severity:** 🟠 `SEV-2` (High)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Symptoms:**
  When opening "Add Expense Entry" (`#newExpenseModal`), the dialog extended below the viewport bottom edge. Fields below *Rate (₹)* (including *Amount*, *Discount*, *Net Amount*, and the *Cancel / Save Expense* buttons) were cut off and unscrollable on laptops and mobile devices.
- **Root Cause Analysis:**
  The `<form>` element inside `.modal-dialog` was a standard block element (`display: block`) with unconstrained height. Because the form was not configured as a flex child with `min-height: 0`, the inner `.modal-body` could not establish its own scrolling container. The `.modal-dialog` container (`overflow: hidden; max-height: 90vh`) clipped the overflowing form elements.
- **Resolution Implemented:**
  1. Configured `.modal-dialog form` as a vertical flex container:
     ```css
     .modal-dialog form {
       display: flex;
       flex-direction: column;
       flex: 1 1 auto;
       min-height: 0;
       overflow: hidden;
     }
     ```
  2. Applied constrained vertical scrolling and sleek custom scrollbars to `.modal-body`:
     ```css
     .modal-body {
       flex: 1 1 auto;
       min-height: 0;
       overflow-y: auto;
       -webkit-overflow-scrolling: touch;
       overscroll-behavior: contain;
     }
     ```
  3. Pinned `.modal-header` to top and `.modal-footer` to bottom (`flex-shrink: 0;`) so *Cancel* and *Save* buttons are **permanently visible** on all screens.
  4. Introduced `.form-row-2` grid layout to pair *Date + Category* and *Qty + Rate* side-by-side on wide screens while maintaining single-column stacking on mobile.
- **Files Modified:** `style1.css`, `styles.css`, `Index.html`.

---

### 📌 INC-002: Mobile Navigation Drawer Unresponsive on Screens $\le 900\text{px}$
- **Severity:** 🟡 `SEV-3` (Medium)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Symptoms:**
  On tablet and smartphone screens, the 280px vertical sidebar squeezed or squashed the main application area. Clicking the hamburger button did not trigger navigation.
- **Root Cause Analysis:**
  The redesign in `Index.html` lacked the matching ID hooks expected by `app.js` (`#appSidebar`, `#sidebarBackdrop`, `#btnSidebarToggle`, `#btnSidebarClose`).
- **Resolution Implemented:**
  1. Added `id="appSidebar"` to the `<aside>` element.
  2. Added `<div class="sidebar-backdrop" id="sidebarBackdrop"></div>` overlay.
  3. Inserted `<button id="btnSidebarToggle" class="sidebar-toggle-btn">` in the top app header.
  4. Inserted `<button id="btnSidebarClose" class="sidebar-close-btn">` in the sidebar header.
  5. Implemented responsive drawer CSS with `transform: translateX(-100%)` and hardware-accelerated cubic-bezier transitions.
- **Files Modified:** `Index.html`, `style1.css`, `styles.css`, `app.js`.

---

### 📌 INC-003: Uncaught TypeError in Compliance Checklist Modal
- **Severity:** 🟠 `SEV-2` (High)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Symptoms:**
  In the *Documents Checklist* tab, clicking the "📎 Attach / Edit" button threw an unhandled JavaScript error:
  `TypeError: Cannot set properties of null (setting 'value')` at `openAttachDocModal(regNo)`.
- **Root Cause Analysis:**
  The JavaScript controller `openAttachDocModal()` in `app.js` attempted to access DOM element `document.getElementById("attachModalRegNo")`, but the modal `#attachDocModal` markup was missing from `Index.html`.
- **Resolution Implemented:**
  Integrated the full `#attachDocModal` template into `Index.html` supporting file uploads (images/PDFs with base64 encoding up to 8MB) and external cloud document links (Google Drive / DigiLocker).
- **Files Modified:** `Index.html`, `style1.css`.

---

### 📌 INC-004: Horizontal Overflow in System Settings on Small Devices ($< 400\text{px}$)
- **Severity:** 🟡 `SEV-3` (Medium)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Symptoms:**
  The *System Settings* tab caused horizontal page blowout on mobile phones with viewports narrower than 420px.
- **Root Cause Analysis:**
  The CSS grid rule `.settings-grid` used `grid-template-columns: repeat(auto-fit, minmax(400px, 1fr))`. When viewport width was $< 400\text{px}$, the grid forced a 400px minimum column, extending beyond screen boundaries.
- **Resolution Implemented:**
  Replaced with a responsive media query breakpoint resetting `.settings-grid` to `grid-template-columns: 1fr` on screens $\le 1120\text{px}$.
- **Files Modified:** `style1.css`, `styles.css`.

---

### 📌 INC-005: Form Input Automatic Zooming on iOS Safari
- **Severity:** 🟢 `SEV-4` (Low)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Symptoms:**
  Focusing on any text or number field on iPhone devices caused Mobile Safari to automatically zoom the page to 125%, displacing the header and requiring manual pinch-to-zoom out.
- **Root Cause Analysis:**
  iOS Safari enforces automatic page zooming whenever an `<input>` or `<select>` element has a CSS `font-size` less than $16\text{px}$.
- **Resolution Implemented:**
  Added responsive rule `@media screen and (max-width: 680px)` setting `.form-input, .form-select { font-size: 16px; min-height: 44px; }`.
- **Files Modified:** `style1.css`, `styles.css`.

---

### 📌 INC-006: Header & Outstanding Box Color Inversion During Printing
- **Severity:** 🔴 `SEV-1` (Critical)
- **Status:** ✅ **RESOLVED**
- **Date:** 16-11-2026
- **Symptoms:**
  When printing the Inpatient Bill or Registration Form, table headers appeared white instead of Pale Peach (`#FCE4D6`), and the outstanding balance box lost its highlighted Yellow (`#FFFF00`) background.
- **Root Cause Analysis:**
  Standard browser print engines strip background colors by default to save ink unless forced by print color adjust CSS tokens.
- **Resolution Implemented:**
  Applied strict `@media print` rules with `-webkit-print-color-adjust: exact !important` and `print-color-adjust: exact !important` to all brand header and yellow highlight elements.
- **Files Modified:** `style1.css`, `styles.css`.

---

### 📌 INC-007: Integration of Patient Aadhaar Number Entry & Drag-and-Drop Document Uploader
- **Severity:** 🟢 `SEV-4` (Enhancement & Compliance)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Requirement:**
  Add a dedicated input field for the patient's 12-digit Aadhaar number with automatic formatting, an interactive drag & drop file uploader with a file browser option (supporting PDF/JPG/PNG up to 8MB), and an integrated "👁️ View Uploaded File" button to preview the attached Aadhaar card immediately.
- **Resolution Implemented:**
  1. Inserted `#inpPatientAadhaarNo` under Personal Details in `Index.html` wired to the real-time space formatter `XXXX XXXX XXXX`.
  2. Built interactive drag & drop zone (`#aadhaarDropzone`) with `.drag-over` states and choose file option (`#btnBrowseAadhaar`).
  3. Integrated `#btnViewUploadedAadhaar` triggering the `viewAadhaarDocument()` viewer for instant full-size image and PDF viewing.
  4. Added Aadhaar display row (`#rfAadhaarNo` and `#rfAadhaarStatus`) to the A4 Printable Registration Form.
- **Files Modified:** `Index.html`, `style1.css`, `styles.css`, `app.js`.

---

### 📌 INC-008: Addition of Doctor's Advice Field Across UI, Registration Form & Database Schema
- **Severity:** 🟢 `SEV-4` (Enhancement & Clinical Records)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Requirement:**
  Add a dedicated text row for "Doctor's advice" in the Emergency & Status section of the Admit New Patient modal, display this on the official Printable Registration Form, and persist it across both LocalStorage and Google Sheets database layers.
- **Resolution Implemented:**
  1. Inserted `<textarea name="doctorAdvice" id="inpDoctorAdvice">` directly below Referring Doctor / Initial Status in the `Emergency & Status` section of `Index.html`.
  2. Added `<div class="grid-row"><div class="col-12"><strong>Doctor's Advice:</strong> <span id="rfDoctorAdvice" class="field-val">--</span></div></div>` on the printable A4 Registration Form in `Index.html`.
  3. Updated `renderRegistrationForm()` and `newPatientForm` submit handler in `app.js` to capture, persist, and render `doctorAdvice`.
  4. Extended Google Sheets relational model in `backend/Code.gs` and `backend/sheets_setup.md` adding Col AB (`Doctor's Advice`), shifting `Status` to Col AC, and updating formula mappings for `Total Bill` (Col AD), `Total Received` (Col AE), and `Outstanding` (Col AF) with backward-compatibility logic for legacy 31-column rows.
- **Files Modified:** `Index.html`, `app.js`, `backend/Code.gs`, `backend/sheets_setup.md`, `error_log.md`.

---

### 📌 INC-009: Comprehensive Patient Record "Edit" Feature & Multi-Database Synchronization
- **Severity:** 🟢 `SEV-4` (Enhancement & Data Management)
- **Status:** ✅ **RESOLVED**
- **Date:** 17-11-2026
- **Requirement:**
  Provide an "Edit" option directly in the Patients table Actions column (as well as on the Registration Form and Bill tabs) allowing operators to modify all patient admission, personal, address, contact, Aadhaar, clinical advice, and discharge status fields, with changes propagated accurately across the browser LocalStorage database and the Google Sheets backend.
- **Resolution Implemented:**
  1. Added `[Edit]` button to each patient row in the main Patients directory table (`#patientsTableBody`), and `[✏️ Edit Record]` buttons to the Registration Form and Bill tab headers.
  2. Built Modal 6: `#editPatientModal` covering every field: Admission Date, Time & Day; Title, First Name, Surname, Guardian, Age, Sex, Marital Status, Occupation, Religion, Nationality; Aadhaar Number & Aadhaar File Preview/Upload/Remove; Permanent & Present Addresses; Contact Person, Mobile, WhatsApp; Referring Doctor, Doctor's Advice; Status & Discharge Date/Time.
  3. Created two-way date/time conversion helpers (`ddmmyyyyToIsoDate`, `isoDateToDdmmyyyy`, `time12HrTo24Hr`, `formatTimeInputValueTo12Hr`).
  4. Wired form submit handler to update `state.patients`, `state.documents`, and sync to Google Sheets backend via `updatePatient` REST API action.
  5. Implemented `PatientRepository.update(regNo, data)` in `backend/Code.gs` to find and update all non-formula cells by `regNo` in Column B while preserving live calculation formulas for `Total Bill`, `Total Received`, and `Outstanding`.
  6. Calibrated table action button grouping (`.table-actions`) with `white-space: nowrap`, `flex-wrap: nowrap`, and `display: inline-flex` to ensure all action buttons (`Edit`, `Form`, `Bill`, `Discharge`) display strictly side by side in a single horizontal line.
- **Files Modified:** `Index.html`, `app.js`, `backend/Code.gs`, `backend/sheets_setup.md`, `error_log.md`.

---

### 📌 INC-010: Implementation of Professional Admin Portal Login Gateway
- **Severity:** 🟢 `SEV-4` (Security & Access Control)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Implement a professional Admin Portal screen that displays prior to opening the software. Access requires User Name = "Admin" and Password = "1234", without placeholder text inside the input fields, maintaining institutional hospital branding.
- **Resolution Implemented:**
  1. Built `#adminPortalScreen` (`.admin-portal-wrapper`) with full-viewport modal backdrop and radial dark-slate styling.
  2. Designed portal login card with official AKKMCT trust header, emblem, and security badge.
  3. Created inputs for `User Name` and `Password` (with password show/hide eye toggle) strictly omitting all `placeholder` attributes.
  4. Wired authentication logic in `app.js` (`checkAdminPortalAuth`, `setupAdminPortal`, `logoutAdminPortal`) accepting User Name: "Admin" and Password: "1234", with session persistence and error alerts.
  5. Placed an Admin user badge and "Sign Out" button in the top navigation header for session termination.
  6. Updated official Trust Registration Number badge across the Admin Portal, Printable Registration Record, and Inpatient Bill to `150600104`.
- **Files Modified:** `Index.html`, `style1.css`, `styles.css`, `app.js`, `error_log.md`.

---

### 📌 INC-011: Official AKKMCT Seal Logo Integration & Brand Asset Deployment
- **Severity:** 🟢 `SEV-4` (UI & Institutional Branding)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Replace the temporary hospital emoji icon in the Admin Portal screen with the official circular seal of the *Anil Kumar Karmakar Memorial Cancer Trust* (Kolkata - 700 055), and ensure high-resolution brand asset rendering across application navigation.
- **Root Cause & Asset Transition:**
  The Admin Portal previously utilized a generic Unicode hospital symbol (`🏥`) within a square gradient badge. The trust's official registered seal—featuring the seated yogic cancer-care emblem and circular inscription—was provided as an authentic JPEG image asset.
- **Resolution Implemented:**
  1. Copied and verified the official trust seal image to `logo.jpg` at the project root.
  2. Updated the Admin Portal brand banner in `Index.html` to embed `<img src="logo.jpg" alt="AKKMCT Official Logo" class="portal-logo-img">` inside `.portal-logo-circle`.
  3. Upgraded `.portal-logo-circle` in both stylesheets (`style1.css` and `styles.css`) to a 86x86px circular frame with `#ffffff` background, `3px solid rgba(45, 212, 191, 0.55)` teal ring border, depth drop shadow, and subtle scale transition on hover.
  4. Added responsive brand presence with `logo.jpg` integrated into the sidebar brand banner (`.sidebar-brand-img`) and main application top navigation header (`.header-brand-logo`).
  5. Ensured `style1.css` and `styles.css` remain 100% byte-for-byte identical.
- **Files Modified:** `logo.jpg`, `Index.html`, `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-012: Bright Orange Accent Theme for "Admit New Patient"
- **Severity:** 🟢 `SEV-4` (UI & User Experience)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Apply a bright orange background colour to "Admit New Patient" to make patient onboarding and the admission flow prominently visible and differentiated.
- **Resolution Implemented:**
  1. Updated the primary Call-To-Action button `#btnOpenNewPatientModal` ("➕ Admit New Patient") on the Patients Register tab with a bright orange gradient (`linear-gradient(135deg, #ff7700 0%, #ff5500 100%)`), `#ffffff` bold text, and a glowing orange drop-shadow (`rgba(255, 102, 0, 0.35)`).
  2. Applied matching bright orange background styling to the `#newPatientModal` modal header banner (`.modal-header`), setting the title `<h3>Admit New Patient</h3>` and modal close icon (`.modal-close`) to crisp white.
  3. Styled the modal submission button (`#newPatientModal .modal-footer .btn-primary`) in matching bright orange for visual consistency throughout the admission flow.
  4. Preserved 100% synchronization between `style1.css` and `styles.css`.
- **Files Modified:** `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-013: Integration of Disease Category Field Across Admissions, Directory, Print Views & Google Sheets Database
- **Severity:** 🟢 `SEV-4` (Clinical Data Architecture & Form Schema)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Insert a "Disease Category" dropdown menu in the admission form under Personal Details with options: "Cancer, Nero, Dementia, Cerebral, Paralysis, Age-related diseases" and propagate this change consistently across all system interfaces and database persistence layers.
- **Resolution Implemented:**
  1. **New Admission Dialog (`#newPatientModal`):** Added `Disease Category *` select dropdown in Row 2 of Personal Details alongside `Guardian` and `Age *`, featuring options: `Cancer`, `Nero`, `Dementia`, `Cerebral`, `Paralysis`, `Age-related diseases`.
  2. **Edit Patient Dialog (`#editPatientModal`):** Configured `Disease Category *` select dropdown in Row 2, populating the existing category on open and updating state on form submission.
  3. **Patients Register Table & Filter Bar:** Added dedicated `Category` table column header with badge rendering (`#fff7ed` peach background, `#c2410c` bold text, `#fdba74` border). Added `#patientCategoryFilter` dropdown to the filter toolbar and updated client-side search indexing to filter patients by disease category instantly.
  4. **Printable Registration Record (`#printableRegForm`):** Added `rfDiseaseCategory` field in the patient details grid.
  5. **Printable Inpatient Bill (`#printableBill`):** Added `billDiseaseCategory` metadata item in the inpatient bill summary.
  6. **Google Sheets Database (`backend/Code.gs` & `backend/sheets_setup.md`):** Updated column M (Column 13) in the master `Patients` spreadsheet from `Sex` to `Disease Category`, mapping `findAll`, `save`, and `update` endpoints while preserving all formula offsets in Columns AD, AE, and AF.
- **Files Modified:** `Index.html`, `app.js`, `backend/Code.gs`, `backend/sheets_setup.md`, `error_log.md`.

---

### 📌 INC-014: Bright Orange Accent Theme for "Add Expense Entry"
- **Severity:** 🟢 `SEV-4` (UI & User Experience)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Apply a bright orange background colour to the "Add Expense Entry" modal header and related action trigger to maintain visual hierarchy and parity with the patient admission theme.
- **Resolution Implemented:**
  1. Updated `#newExpenseModal .modal-header` with bright orange gradient (`linear-gradient(135deg, #ff7700 0%, #ff5500 100%)`), `#ffffff` bold text, and a crisp white close icon.
  2. Applied bright orange theme to the "➕ Add Expense" button (`#btnOpenNewExpenseModal`) and "Save Expense" submit button (`#newExpenseModal .modal-footer .btn-primary`).
  3. Ensured `style1.css` and `styles.css` remain 100% byte-for-byte identical.
- **Files Modified:** `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-015: Configurable Dynamic Admin Portal Credentials (User-Defined Username & SHA-256 Hashed Password)
- **Severity:** 🟢 `SEV-4` (Security Architecture & User Management)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Eliminate hardcoded Admin Portal credentials ("Admin" / "1234") and allow administrators to dynamically configure custom usernames and passwords through the system interface with cryptographic security and persistent storage.
- **Resolution Implemented:**
  1. **Dynamic Authentication State (`DEFAULT_SETTINGS` in `app.js`):** Extended configuration state with `adminUsername` and `adminPasswordHash` (pre-seeded with default SHA-256 hash of "1234").
  2. **Security & Credentials Card in System Settings (`Index.html`):** Added a dedicated card in `.settings-grid` with inputs for *Current Password*, *New Username*, *New Password*, and *Confirm New Password*, complete with password eye toggles and error/success alerts.
  3. **Cryptographic SHA-256 Hashing (`sha256Hex`):** Implemented native browser Web Crypto API hashing (`crypto.subtle.digest("SHA-256", ...)`) so passwords are never stored or transmitted in plain text.
  4. **Dynamic Login Verification (`setupAdminPortal`):** Updated the login gateway to compare entered credentials against dynamic stored settings with case-insensitive username matching and cryptographic hash comparison.
  5. **Live Header Synchronization:** Updated the top navigation user badge to display the dynamic active username in real time.
  6. **Emergency Console Recovery:** Provided `window.resetAdminCredentials()` callable from browser DevTools to reset credentials to factory defaults (`Admin` / `1234`) without altering clinical data.
  7. **Backend Sync Protocol (`Code.gs` & `sheets_setup.md`):** Added `getSettings` and `saveSettings` API endpoints and schema definitions (Rows B6 & B7 in `Settings` sheet).
- **Files Modified:** `Index.html`, `app.js`, `backend/Code.gs`, `backend/sheets_setup.md`, `error_log.md`.

---

### 📌 INC-016: Granular Daily Inpatient Care Charge Heads (Bed, Stay, Palliative, Nursing) Defaulted to ₹0.00
- **Severity:** 🟢 `SEV-4` (Financial & Billing Configuration)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Replace legacy monolithic "Home Charges" with 4 distinct, itemized inpatient care charge heads: Bed Charges per day, Inpatient Stay Charges, Daily Palliative Care Charges, and Nursing & Ward Charges, with all charges defaulted to ₹0.00 by default.
- **Resolution Implemented:**
  1. **Billing Rules Configuration (`Index.html` & `app.js`):** Replaced single home charge input with 4 independent inputs (`settingBedCharges`, `settingStayCharges`, `settingPalliativeCareCharges`, `settingNursingWardCharges`), all initialized to ₹0.00.
  2. **Billing Math Engine (`computePatientBill` in `app.js`):** Updated calculation engine to compute stay charges for each head: $\text{Charges} = \text{Billed Stay Days} \times \text{Rate}$. Total Daily Charges represents the sum of all 4 heads (defaulting to ₹0.00).
  3. **Inpatient Bill Itemization (`#printableBill` in `Index.html`):** Itemized charges table with rows 1 to 4 displaying Bed Charges, Inpatient Stay Charges, Daily Palliative Care Charges, and Nursing & Ward Charges with dynamic days, rates, and amounts, followed by clinical expense categories (Doctor Fees, Pathology, Medicines, Oxygen, Non-Surgical, Others).
  4. **State & Storage Synchronization:** Updated `DEFAULT_SETTINGS` and cache initialization in `app.js` to ensure zero-cost default daily billing for all admitted patients until customized by administration.
- **Files Modified:** `Index.html`, `app.js`, `GEMINI.md`, `error_log.md`.

---

### 📌 INC-017: 1-Click Financial Settlement & Clearance inside Patient Discharge Flow (Option B)
- **Severity:** 🟢 `SEV-4` (Financial Settlement & Inpatient Discharge Workflow)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  When generating a discharge report for a patient with an outstanding balance ($> ₹0.00$), provide a seamless 1-click settlement and payment collection mechanism directly inside the Discharge Modal (`#dischargeModal`). If dues exist, enable instant recording of final payment (Amount, Mode, Remarks) to clear the balance to ₹0.00 upon discharge, or confirm clearance if already zero.
- **Resolution Implemented:**
  1. **Discharge Modal Settlement Card (`#disSettlementSection` in `Index.html`):**
     - **Zero Dues State (`#disZeroDueBox`):** Displays a green alert badge: `✅ Account Fully Settled (₹0.00 Outstanding). Patient is financially cleared for discharge.`
     - **Pending Balance State (`#disDueNoticeBox`):** Displays a high-visibility warning box highlighting the live pending balance in bold red `#disOutstandingBadge` (`#FFFF00` yellow badge), a toggle checkbox `[x] Record Final Payment & Zero Balance on Discharge`, prefilled settlement amount, payment mode selector (`Cash`, `UPI`, `Card`, `Cheque`, `Trust Waiver`), and reference/remarks input.
  2. **Live Outstanding Check on Modal Launch (`openDischargeModal` in `app.js`):**
     - Calls `computePatientBill(regNo)` to calculate live dues up to the moment of discharge.
     - Automatically toggles between `#disZeroDueBox` and `#disDueNoticeBox` based on whether `outstanding <= 0`.
     - Prefills the exact outstanding balance in the payment amount input.
  3. **Atomic Discharge & Payment Creation (`dischargeForm` handler in `app.js`):**
     - When submitted with settlement checked, atomically unshifts a new payment entry to `state.payments`, commits to `LocalStorage`, and syncs to Google Sheets backend if enabled.
     - Stamps patient `dischargeDate`, `dischargeTime`, and `status = 'Discharged'` (or `'Death'`).
     - Refreshes directory tables, updates dropdowns, and triggers an automated prompt to view and print the final zero-balance Inpatient Bill.
- **Files Modified:** `Index.html`, `app.js`, `error_log.md`.

---

### 📌 INC-018: All Categories Qnty, Rate & Amount Display on Bottom (Ledger & Inpatient Bill)
- **Severity:** 🟢 `SEV-4` (Clinical Accounting & Itemized Reporting)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  Display itemized **"Qnty"**, **"Rate"**, and **"Amount"** for all clinical categories (`Doctor Fees`, `Pathology`, `Medicine`, `Oxygen`, `Non-Surgical Item`, `Others`) at the bottom of the Clinical Expenses Ledger and on the printable Inpatient Bill charges table.
- **Resolution Implemented:**
  1. **Expenses Ledger Footer & Category Breakdown Card (`Index.html` & `app.js`):**
     - **Table Footer (`<tfoot>` on `#expensesTable`):** Added a dynamic total summary row displaying the sum of Qty, weighted average Rate, Total Gross Amount, Total Discount, and Total Net Amount for filtered expenses.
     - **All Categories Summary Card (`#expenseCategoriesSummaryCard`):** Added a dedicated summary card positioned directly below the ledger table listing all 6 standard categories with their specific Total Qnty, Avg Rate, Gross Amount, Discount, and Net Amount.
  2. **Billing Math Engine (`computePatientBill` in `app.js`):**
     - Enhanced computation loop to aggregate both `quantity` and `amount` per category.
     - Computes unit / average rate ($\text{Rate} = \text{Amount} / \text{Qty}$) for each category head (`doctorRate`, `pathologyRate`, `medicineRate`, `oxygenRate`, `nonSurgicalRate`, `othersRate`).
  3. **Printable Inpatient Bill Itemization (`#printableBill` in `Index.html` & `renderBill` in `app.js`):**
     - Updated rows 5–10 of the bill table (`Doctor Fees`, `Pathology`, `Medicines`, `Oxygen Support`, `Non-Surgical Items`, `Others`) to display actual dynamic `Qty/Days`, `Rate`, and `Amount` values instead of static dashes (`-`).
- **Files Modified:** `Index.html`, `app.js`, `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-019: Real-time Itemized Expense Feed ("One-by-One") & Universal Edit Expense Modal with Instant Final Bill Modification
- **Severity:** 🟢 `SEV-4` (Expense Data Entry Workflow & Billing Recalculation)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Requirement:**
  1. As expenses are entered for all categories, display them item-by-item ("one by one") at the bottom of the entry screen.
  2. Allow the user to enter multiple expenses continuously without modal exit via `➕ Save & Add Another`.
  3. Provide full editing capabilities (`✏️ Edit`) for any wrongly entered expense (Date, Category, Description, Qty, Rate, Discount), automatically recalculating and updating the Final / Running Inpatient Bill in real time.
- **Resolution Implemented:**
  1. **Live "One-by-One" Expense Feed inside Add Expense Modal (`#expModalLivePreviewSection` in `Index.html`):**
     - Embedded a live preview table directly at the bottom of `#newExpenseModal`.
     - Whenever an expense is submitted, it immediately appends to this table with itemized Category, Description, Qty, Rate, Net Amount, and inline `✏️ Edit` and `🗑️ Delete` actions.
     - Added `➕ Save & Add Another` alongside `Save & Close`, resetting input fields while keeping patient and date selected so users can rapidly key in continuous expenses.
  2. **Universal Edit Expense Modal (`#editExpenseModal` in `Index.html` & `app.js`):**
     - Added a dedicated Edit Expense dialog styled with the bright orange header.
     - Supports full modification of Date, Category, Description, Quantity, Rate, and Discount (for Pathology), with real-time Gross and Net calculations.
     - Added an `✏️ Edit` action button to every expense row in the main `expensesTable` ledger.
  3. **Instant Real-Time Final Bill Recalculation (`renderBill` cascade in `app.js`):**
     - Editing, adding, or deleting any expense immediately triggers `computePatientBill(regNo)` and `renderBill(regNo)`, updating the patient's Final / Running Bill itemized rows (rows 5–10), Grand Total, and Outstanding Till Date balance box instantly.
- **Files Modified:** `Index.html`, `app.js`, `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-020: Scope Resolution & Z-Index Layering for Expense Edit Action inside Modal
- **Severity:** 🟡 `SEV-3` (UI Component Interaction / JavaScript Scope)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Symptom / User Report:**
  Clicking the "Edit" (`✏️ Edit`) button inside the "Entered Expenses for this Patient" live table in `#newExpenseModal` was not responding.
- **Root Cause Analysis:**
  1. **Function Scope Enclosure:** `updateEditExpenseModalCalculations` was declared inside the `DOMContentLoaded` closure, making it unavailable to `openEditExpenseModal(id)` in the global scope. Calling it triggered `Uncaught ReferenceError: updateEditExpenseModalCalculations is not defined`, halting execution before `openModal("editExpenseModal")` could run.
  2. **Modal Stacking Order:** `#editExpenseModal` shared the default backdrop `z-index: 1100`, which caused layering ambiguity when launched while `#newExpenseModal` was already active.
- **Resolution Implemented:**
  1. **Promoted Utility Functions to Global & Window Scope:** Exported `updateEditExpenseModalCalculations()`, `updateExpModalLiveList()`, and `openEditExpenseModal()` to global and `window` objects.
  2. **Layered Z-Index Stacking:** Elevated `#editExpenseModal` to `z-index: 1250 !important` in `style1.css` and `styles.css` so it sits cleanly on top of `#newExpenseModal` (`z-index: 1100`).
  3. **Live Two-Way Synchronization:** Saving an edited expense atomically refreshes the parent modal's live feed, updates the ledger, and triggers instant Final Bill recalculation.
- **Files Modified:** `app.js`, `style1.css`, `styles.css`, `error_log.md`.

---

### 📌 INC-021: Contextual Auto-Preselection of Patient & Category on Modal Launch from Expenses Ledger
- **Severity:** 🟢 `SEV-4` (UI Contextual State & Data Entry Usability)
- **Status:** ✅ **RESOLVED**
- **Date:** 18-11-2026
- **Symptom / User Report:**
  User filtered the Clinical Expenses Ledger by patient `AKKMCT/003/2026 - Sekhar Sengupta (Discharged)` and category `Pathology`, then clicked `➕ Add Expense`. The Add Expense modal previously defaulted to the first patient (`AKKMCT/001/2026`) and default category (`Doctor Fees`), ignoring the active ledger filters.
- **Root Cause Analysis:**
  The `btnOpenNewExpenseModal` click listener only referenced `state.selectedRegNo` (fallback to `state.patients[0]`) and reset all category inputs without checking `expensePatientFilter` or `expenseCategoryFilter`. Additionally, filter `change` events did not persist the chosen patient into `state.selectedRegNo`.
- **Resolution Implemented:**
  1. **Ledger Context Inheritance in [app.js](file:///g:/Hospital-2/HMS/app.js):**
     - Updated `btnOpenNewExpenseModal` to inspect `expensePatientFilter.value` and `expenseCategoryFilter.value`.
     - Automatically sets `expModalRegSelect` to the filtered patient (e.g. `AKKMCT/003/2026`) and pre-selects `expModalCategory` to the filtered category (e.g. `Pathology`).
     - Triggers `updateExpenseModalCalculations()` immediately to render category-specific controls (e.g. Discount container for Pathology).
     - Calls `updateExpModalLiveList(targetReg)` to display the itemized entries for that specific patient.
  2. **Bidirectional State Sync on Filter Change:**
     - Selecting a patient in `expensePatientFilter` or `paymentPatientFilter` synchronizes `state.selectedRegNo`.
     - Enhanced `btnOpenNewPaymentModal` with symmetrical context inheritance.
- **Files Modified:** `app.js`, `error_log.md`.

---

### 📌 INC-022: Implementation of Hospital Finance, Procurement, Inventory & Accounts Payable (AP) Module
- **Severity:** 🟢 `SEV-4` (Enterprise Module Expansion)
- **Status:** ✅ **RESOLVED**
- **Date:** 19-11-2026
- **Requirement:**
  Implement the 3-column architecture for Hospital Finance & Supply Chain:
  1. `Vendor Master`: Supplier profiles, contact info, GSTIN, drug licenses, banking, and credit terms.
  2. `Purchase Entry (GRN)`: Inward supplier invoices with multi-item batch details, auto-posting stock inward and vendor credit liability.
  3. `Inventory & Stock Management`: Real-time stock valuation, FEFO expiry tracking, and direct point-of-care stock issue to admitted patients (auto-billed to the Clinical Expenses Ledger & Inpatient Bill).
  4. `Vendor Ledger & Accounts Payable`: Statement of accounts, payment vouchers (NEFT/Cheque/UPI/Cash), outstanding balance highlighted in signature `#FFFF00` box with bold red `#CC0000`, and all-vendor aging analysis (0-15, 16-30, 31-60, 60+ days).
- **Resolution Implemented:**
  1. **UI Navigation & Tabs in [Index.html](file:///g:/Hospital-2/HMS/Index.html):**
     - Added `Procurement & Finance` sidebar navigation group with 4 interactive tabs (`#tab-vendors`, `#tab-purchases`, `#tab-inventory`, `#tab-vendor-ledger`).
     - Added 4 enterprise modals: `#newVendorModal`, `#newPurchaseModal` (with dynamic multi-item grid), `#issueStockModal` (with automatic patient billing integration), and `#newVendorPaymentVoucherModal`.
  2. **Reactive State & Storage in [app.js](file:///g:/Hospital-2/HMS/app.js):**
     - Seeded initial realistic hospital vendors (`VND-001` Metro Pharma, `VND-002` Bengal Surgical, `VND-003` National Oxygen), inward purchases (`GRN/001/2026`), inventory batches, stock issues, and payment vouchers (`PV/001/2026`).
     - Implemented `updateAllVendorDropdowns()`, `renderVendorsTable()`, `renderPurchasesTable()`, `renderInventoryTable()`, and `renderVendorLedgerView()`.
     - Integrated the **Closed-Loop Dispensation**: Dispensing stock to an admitted patient atomically creates an expense in `state.expenses`, decrements warehouse stock, and recalculates the patient's Final Inpatient Bill in real time.
- **Files Modified:** `Index.html`, `app.js`, `error_log.md`.

---

### 📌 INC-023: Full Google Sheets Backend Integration & Context-Aware Data Entry for Procurement & Finance
- **Severity:** 🟢 `SEV-4` (Backend Service & API Synchronization)
- **Status:** ✅ **RESOLVED**
- **Date:** 19-11-2026
- **Requirement:**
  1. Provide seamless data entry from the frontend with contextual category inheritance and automatic list visibility.
  2. Implement full Google Sheets backend support in `backend/Code.gs` and `backend/sheets_setup.md` for all 5 new tabs (`Vendors`, `Purchases`, `Inventory`, `Stock Issues`, `Vendor Vouchers`).
  3. Provide a 1-click `setupHospitalSheets()` function in `Code.gs` that automatically builds and formats all 12 sheets with headers, signature Pale Peach `#FCE4D6` styling, and formulas.
  4. Implement universal `syncToBackend()` bridge in `app.js` to sync all procurement mutations (adds, edits, stock deductions, vouchers) to Google Sheets.
- **Resolution Implemented:**
  1. **Google Apps Script Backend ([Code.gs](file:///g:/Hospital-2/HMS/backend/Code.gs)):**
     - Expanded `CONFIG.SHEETS` with 5 new sheets: `Vendors`, `Purchases`, `Inventory`, `Stock Issues`, `Vendor Vouchers`.
     - Added `VendorRepository`, `PurchaseRepository`, `InventoryRepository`, `StockIssueRepository`, and `VendorVoucherRepository`.
     - Added `setupHospitalSheets()` creating all 12 sheets with pale peach `#FCE4D6` headers, bold typography, and data validations. Added to custom UI menu in `onOpen()`.
     - Handled `doGet` (`listVendors`, `listPurchases`, `listInventory`, `listStockIssues`, `listVendorVouchers`) and `doPost` (`addVendor`, `deleteVendor`, `addPurchase`, `deletePurchase`, `issueStock`, `addVendorVoucher`).
  2. **Relational Schema Reference ([sheets_setup.md](file:///g:/Hospital-2/HMS/backend/sheets_setup.md)):**
     - Documented detailed column schemas, validation rules, and REST API contract for all 5 procurement tabs.
  3. **Contextual Frontend Data Entry ([app.js](file:///g:/Hospital-2/HMS/app.js) & [Index.html](file:///g:/Hospital-2/HMS/Index.html)):**
     - Clicking `➕ Add Vendor` now inherits the active category from `#vendorCategoryFilter`.
     - Saving a new vendor updates the filter so newly added vendors are immediately visible in the table.
     - Added compact table layout styling (`.table-compact`) to `Index.html`, `styles.css`, and `style1.css`.
     - Added universal `syncToBackend(action, data)` for two-way synchronization.
- **Files Modified:** `backend/Code.gs`, `backend/sheets_setup.md`, `app.js`, `Index.html`, `styles.css`, `style1.css`, `error_log.md`.

---

## 3. Common Runtime Errors & Diagnostics

### ⚠️ ERR-101: `QuotaExceededError` (Browser Storage Limit)
- **Trigger:** Attempting to upload multiple large high-resolution document scans directly into LocalStorage.
- **Console Message:** `DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of 'AKKMCT_documents' exceeded the quota.`
- **Diagnostic:**
  Browser `localStorage` is capped at $5\text{MB} - 10\text{MB}$ per origin. Base64 strings increase binary file size by approximately $33\%$.
- **Remedy:**
  1. File input validator enforces an $8\text{MB}$ ceiling with alert: `"⚠️ File size exceeds 8MB. Please choose a smaller file."`
  2. For high-volume archives, store documents in Google Drive or cloud storage and paste the URL link into the modal's *Web Link (URL)* field.
  3. Clear unused storage logs via `clearSystemErrorLogs()`.

---

### ⚠️ ERR-102: Google Apps Script Web App `Failed to fetch` / CORS Block
- **Trigger:** Testing connection or syncing data with Google Sheets backend.
- **Console Message:** `TypeError: Failed to fetch` or `Access to fetch at 'https://script.google.com/...' blocked by CORS policy.`
- **Diagnostic:**
  Google Apps Script handles HTTP redirects (HTTP 302 to Googleusercontent). A CORS failure typically indicates incorrect deployment permissions.
- **Remedy:**
  1. Open the Google Apps Script project (`Code.gs`).
  2. Click **Deploy > Manage deployments**.
  3. Verify that **Who has access** is set to **`Anyone`** (NOT *"Only myself"* or *"Anyone within organization"*).
  4. Ensure deployment is configured to execute as **`Me`**.
  5. Copy the newly issued `/exec` URL and update it in **System Settings > Apps Script Web App URL**.

---

### ⚠️ ERR-103: `NaN Days` in Bed Stay Charges
- **Trigger:** Discharge Date is entered prior to Admission Date, or dates are in an incompatible format.
- **Formula Reference:**
  $$\text{Days} = (\text{DischargeDate} - \text{AdmissionDate}) + (\text{CountAdmissionDay} == \text{"Yes"} \ ? \ 1 : 0)$$
- **Diagnostic:**
  Occurs when date strings are parsed as US format `MM/DD/YYYY` instead of Indian/UK format `DD/MM/YYYY`.
- **Remedy:**
  The core calculation engine in `app.js` (`parseDateDDMMYYYY()`) strictly sanitizes `DD/MM/YYYY` strings. Always enter dates through the standard HTML5 date picker (`YYYY-MM-DD`).

---

### ⚠️ ERR-104: Discount Exceeds Gross Amount in Pathology
- **Trigger:** Staff enters a discount value greater than the test rate.
- **Diagnostic:**
  Produces a negative Net Amount, corrupting the total inpatient bill sum.
- **Remedy:**
  The calculation engine in `app.js` automatically clamps net expense to zero:
  ```javascript
  const net = Math.max(0, (qty * rate) - discount);
  ```

---

## 4. Client-Side Error Logging Architecture

The application includes an automated, low-overhead client-side logging monitor in `app.js`. When any unhandled runtime error occurs, it is timestamped and recorded in browser storage under `AKKMCT_error_logs` (retaining the last 50 events).

### Data Schema: `AKKMCT_error_logs`
```json
[
  {
    "timestamp": "2026-11-17T13:30:00.000Z",
    "message": "Uncaught TypeError: Cannot read properties of undefined",
    "filename": "http://localhost:8000/app.js",
    "lineno": 412,
    "colno": 18,
    "stack": "TypeError: Cannot read properties of undefined...",
    "activeTab": "tab-patients",
    "selectedRegNo": "AKKMCT/001/2026"
  }
]
```

### Developer & Admin Console Utilities
Inspect or clear logs at any time from the browser developer console (`F12` $\to$ **Console**):

```javascript
// 1. View all recorded error events in formatted table
console.table(window.getSystemErrorLogs());

// 2. Clear all error logs
window.clearSystemErrorLogs();

// 3. Export full system state backup as JSON
console.log(JSON.stringify(window.exportSystemState(), null, 2));
```

---

## 5. Backend & Google Apps Script Error Handling

In `backend/Code.gs`, all REST operations are encapsulated within structured `try...catch` blocks that prevent silent failures:

```javascript
function doGet(e) {
  var response;
  try {
    var action = e.parameter.action;
    if (action === "getAllData") {
      response = { success: true, data: Repository.getAllData() };
    } else {
      response = { success: false, error: "Unknown action: " + action };
    }
  } catch (err) {
    Logger.log("doGet Error: " + err.toString());
    response = { success: false, error: err.toString() };
  }
  return ContentService.createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Backend Verification Checks:
1. **Missing Spreadsheet Tabs:** If any of the 7 tabs are missing, the repository throws:
   `Sheet "Patients" not found. Please ensure all 7 sheets are created.`
   Run function `setupHospitalSheets()` in `Code.gs` to recreate missing sheets automatically.
2. **Formula Integrity Protection:** Total Bill, Total Received, and Outstanding columns in the Google Sheet use spreadsheet formulas (`SUMIFS`, `TODAY()`, `IFERROR`). Never type static text into columns **AC**, **AD**, or **AE** in the `Patients` tab.

---

## 6. Administrator Troubleshooting Playbook

```
                         [ System Issue Occurs ]
                                   │
                 ┌─────────────────┴─────────────────┐
                 ▼                                   ▼
        [ UI / Display Error ]             [ Data Sync Failure ]
                 │                                   │
      - Check browser zoom (100%)         - Verify Settings tab URL
      - Open DevTools (F12) Console       - Test Web App connection
      - Run getSystemErrorLogs()          - Check Apps Script quota
      - Hard Refresh (Ctrl + F5)          - Confirm "Anyone" access
                 │                                   │
                 └─────────────────┬─────────────────┘
                                   ▼
                     [ Issue Resolved? ]
                       ├── YES ──> Log incident in error_log.md
                       └── NO  ──> Export backup: Storage.get("patients")
                                   Reset cache & restore test case
```

### Emergency Data Backup & Restoration Procedure:
If a client machine encounters browser corruption or requires replacement:
1. Open DevTools (`F12`) on the existing machine.
2. In Console, run:
   ```javascript
   const backup = {
     patients: JSON.parse(localStorage.getItem("AKKMCT_patients") || "[]"),
     expenses: JSON.parse(localStorage.getItem("AKKMCT_expenses") || "[]"),
     payments: JSON.parse(localStorage.getItem("AKKMCT_payments") || "[]"),
     documents: JSON.parse(localStorage.getItem("AKKMCT_documents") || "[]"),
     settings: JSON.parse(localStorage.getItem("AKKMCT_settings") || "{}")
   };
   copy(JSON.stringify(backup));
   console.log("✅ Backup copied to clipboard!");
   ```
3. On the new machine, open `index.html`, open Console, and paste:
   ```javascript
   const data = /* Paste JSON here */;
   Object.keys(data).forEach(k => localStorage.setItem("AKKMCT_" + k, JSON.stringify(data[k])));
   location.reload();
   ```
