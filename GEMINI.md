# GEMINI.md - Hospital Management System (HMS)

> **Hospital / Organization:** Anil Kumar Karmakar Memorial Cancer Trust (AKKMCT)  
> **System:** Single Page Application (SPA) Hospital Management, Inpatient Billing & Registration System  
> **Repository:** [https://github.com/sekhar28march-png/HMS](https://github.com/sekhar28march-png/HMS)

---

## 🏛️ Project Architecture & Tech Stack

This project is a decoupled, lightweight, zero-dependency Hospital Management System designed for low-friction offline and cloud operations:

- **Frontend:** Pure Vanilla JavaScript (ES6+), HTML5 Single Page Application, CSS3.
- **Styling & Theme:** 
  - Brand Palette: Pale Peach (`#FCE4D6`) letterhead/table headers, Yellow (`#FFFF00`) highlighted outstanding balance box with bold red typography (`#CC0000`).
  - Print Ready: Strict `@media print` styling calibrated for standard **A4 Portrait** paper with automatic suppression of UI chrome, sidebars, and action buttons.
- **Data Layer (Pluggable):**
  - **Local Storage Mode:** Zero-config instant local execution using browser `localStorage` (`AKKMCT_*` keys) pre-seeded with verified test cases.
  - **Google Sheets Mode:** Relational database backing via Google Apps Script (`backend/Code.gs`) exposing REST API endpoints (`doGet`, `doPost`).
  - **MongoDB Atlas (Roadmap):** Normalized document repository model (`_id`, `regNo`, `createdAt`) prepared for future cloud database migration.

---

## 📂 Project Directory Structure

```
HMS/
├── index.html                 # Primary SPA Web Application interface
├── styles.css / style1.css    # Responsive styles, print rules & design tokens
├── app.js                     # State controller, billing math engine & API bridge
├── backend/
│   ├── Code.gs                # Google Apps Script API, auto-setup & PDF generator
│   └── sheets_setup.md        # Relational schema reference & formula documentation
├── README.md                  # Human-oriented project documentation
├── error_log.md               # Incident registry, runtime errors & troubleshooting guide
└── GEMINI.md                  # Agent context, conventions & system rules (this file)
```

---

## ⚙️ Core Business Rules & Formulas

### 1. Patient Registration & Numbering
- **Reg No Format:** `AKKMCT/<3-digit-seq>/<YYYY>` (e.g., `AKKMCT/001/2026`).
- **Timestamps:** Automatic stamping of admission date (`DD/MM/YYYY`), 12-hour admission time (`hh:mm AM/PM`), and day of the week.

### 2. Stay Day & Inpatient Daily Care Charge Calculation
- **Stay Days Formula:**
  $$\text{Days} = (\text{DischargeDate} - \text{AdmissionDate}) + (\text{CountAdmissionDay} == \text{"Yes"} \ ? \ 1 : 0)$$
  *(If patient is still admitted, `DischargeDate` defaults to `Today`).*
- **Daily Inpatient Charge Heads (Default: ₹0.00 / day):**
  1. `Bed Charges per day (₹)` (Default: ₹0.00)
  2. `Inpatient Stay Charges per day (₹)` (Default: ₹0.00)
  3. `Daily Palliative Care Charges (₹)` (Default: ₹0.00)
  4. `Nursing & Ward Charges (₹)` (Default: ₹0.00)
  $$\text{Total Daily Charges} = \text{Stay Days} \times (\text{Bed Rate} + \text{Stay Rate} + \text{Palliative Rate} + \text{Nursing Rate})$$

### 3. Expense Categories & Net Billing
Expenses are categorized into 6 standard heads:
1. `Doctor Fees`: Consultation and visiting specialist charges.
2. `Pathology`: Lab investigations. **Net Amount = Gross Amount - Discount.**
3. `Medicine`: Pharmacy, IV fluids, consumables.
4. `Oxygen`: Oxygen cylinder/concentrator support.
5. `Non-Surgical Item`: Clinical supplies (`Qty * Rate`).
6. `Others`: Sundry hospital services.

### 4. Financial Settlement
- **Total Bill:** $\text{Total Daily Care Charges} + \sum \text{Net Expenses}$
- **Total Received:** $\sum \text{Payments (Cash, UPI, Card, Cheque)}$
- **Outstanding Till Date:** $\text{Total Bill} - \text{Total Received}$
  *(Displayed in high-visibility `#FFFF00` Yellow box with `#CC0000` Bold Red font).*

---

## 📐 Coding Conventions & Formatting Standards

- **Language & Runtime:** Clean Vanilla JavaScript without bundlers, npm, or node runtime dependencies for frontend execution.
- **Currency:** Indian Rupee (`₹`), formatted via `toLocaleString('en-IN', { minimumFractionDigits: 2 })`.
- **Date Format:** `DD/MM/YYYY` for display; parse from/to HTML5 `YYYY-MM-DD` input fields.
- **Time Format:** 12-hour format with uppercase AM/PM (e.g., `10:30 AM`).
- **Repository Pattern:** State mutations must flow through `Storage.set()` or `syncToBackend()` to guarantee consistency across browser and cloud sheets.

---

## 🚀 Common Commands & Workflows

### Running Locally
- **Direct launch:**
  ```cmd
  start index.html
  ```
- **Local HTTP Server (Optional):**
  ```cmd
  python -m http.server 8000
  # or
  npx serve .
  ```

### Git Workflow
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

### Google Apps Script 1-Click Setup
In the Google Apps Script editor, run function **`setupHospitalSheets()`** to automatically build and format all 7 spreadsheet tabs (`Patients`, `Registration Form`, `Expenses`, `Payments`, `Settings`, `Bill`, `Documents Checklist`).
