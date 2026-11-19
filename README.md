# Anil Kumar Karmakar Memorial Cancer Trust - Hospital Management System (HMS)

> **Official Repository:** [https://github.com/sekhar28march-png/HMS](https://github.com/sekhar28march-png/HMS)

A scalable, decoupled Hospital Management System designed for patient admission registration, clinical expense tracking, payment receipts, procurement, inventory stock management, and automated inpatient billing.

---

## 🏛️ System Architecture

- **Frontend:** Modern HTML5, CSS3, and Vanilla JavaScript (SPA, responsive, print-optimized for A4 paper).
- **Backend Service Layer:** Google Apps Script (`Code.gs`) implementing the **Repository Pattern** and exposing REST endpoints (`doGet`, `doPost`).
- **Database (Current):** Google Sheets (7 Normalized Relational Tables).
- **Database (Target Migration):** MongoDB Atlas (JSON Document Collections).

---

## 📂 Project Structure

```
d:\Sekhar\HMS\
├── index.html            # Complete Single Page Application (SPA) Web Interface
├── styles.css / style1.css # Stylesheet: Pale Peach (#FCE4D6), Yellow (#FFFF00) Outstanding box, Responsive rules
├── app.js                # Frontend Application Controller & Calculation Engine
├── error_log.md          # Incident history, runtime diagnostics & troubleshooting guide
├── backend\
│   ├── Code.gs           # Google Apps Script Backend (API, Menu, Drive PDF export, DAL)
│   └── sheets_setup.md   # Step-by-step Google Sheets setup guide with exact formulas
└── README.md             # This documentation
```

---

## 🚀 Quickstart: Running the Web App

### Option 1: Instant Local Browser Use (Immediate Demo Mode)
1. Open the project folder `d:\Sekhar\HMS\`.
2. Double-click **`index.html`** in any web browser (Chrome, Edge, Firefox).
3. The app starts immediately in **Local Storage Mode**, preloaded with the verified test case. All registrations, expenses, payments, and bill print previews function offline.

---

### Option 2: Full Deployment with Google Sheets as Database
1. **Prepare the Google Spreadsheet:**
   - Create a new Google Spreadsheet at [sheets.new](https://sheets.new).
   - Follow [`backend/sheets_setup.md`](backend/sheets_setup.md) to name the 7 tabs (`Patients`, `Registration Form`, `Expenses`, `Payments`, `Settings`, `Bill`, `Documents Checklist`) and paste the formulas.
2. **Add Backend Script:**
   - In Google Sheets, click **Extensions > Apps Script**.
   - Paste the contents of [`backend/Code.gs`](backend/Code.gs) into `Code.gs`.
   - Click the 💾 **Save** icon.
3. **Deploy as Web App:**
   - Click **Deploy > New deployment**.
   - Select type: **Web app**.
   - Description: `AKKMCT HMS Backend API`.
   - Execute as: **Me**.
   - Who has access: **Anyone**.
   - Click **Deploy** and copy the **Web app URL**.
4. **Connect Frontend to Backend:**
   - Open `index.html` in your browser.
   - Go to the **⚙️ Settings** tab.
   - Select Storage: **Google Sheets via Google Apps Script Web App**.
   - Paste your Web App URL and click **Save Billing Settings**.

---

## 📊 Verified Test Case Verification

| Step | Action | Values | Calculated Result |
|:---|:---|:---|:---|
| **1** | Register Patient | Name: `Subhashish Mukherjee`<br>Stay: `01/11/2026` to `04/11/2026`<br>Count admission day: `Yes` | **4 Days** @ ₹600 = **₹2,400.00** |
| **2** | Doctor Fees | Dr. P. Sen Consultation | **₹1,500.00** |
| **3** | Pathology | Blood Panel: Amount ₹1,000, Discount ₹200 | Net: **₹800.00** |
| **4** | Medicine | Consumables & IV Fluids | **₹1,200.00** |
| **5** | Total Bill | Home Charges (₹2,400) + Expenses (₹3,500) | **₹5,900.00** |
| **6** | Payments | 01/11 Cash: ₹2,000 + 03/11 UPI: ₹2,500 | Total Received: **₹4,500.00** |
| **7** | Outstanding | ₹5,900.00 - ₹4,500.00 | **₹1,400.00** *(Yellow Box #FFFF00, Bold Red Text)* |

---

## 🖨️ Printing Instructions (A4 Portrait)

- Open either **Registration Form (Print)** or **Inpatient Bill (Print)** tab.
- Select the patient from the dropdown.
- Click the **🖨️ Print** button (or press `Ctrl + P`).
- The `@media print` CSS automatically hides headers, navbars, and buttons, formatting the document to fit standard A4 portrait margins with official letterhead and signature lines.

---

## 🔄 Future MongoDB Migration Roadmap

Because `Code.gs` and `app.js` use the **Repository Pattern** and normalized document models (`_id`, `regNo`, `createdAt`), migrating to MongoDB Atlas requires zero changes to the frontend:
1. Spin up a MongoDB Atlas cluster.
2. Replace `SheetDB.appendRow()` in `Code.gs` with a call to the MongoDB Atlas Data API or deploy a lightweight Node.js/Express backend with Mongoose.
3. The frontend `app.js` continues to send and receive the exact same JSON payloads.

