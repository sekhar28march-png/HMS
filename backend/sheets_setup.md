# Google Sheets Setup Guide & Formula Reference
**Hospital Name:** Anil Kumar Karmakar Memorial Cancer Trust  
**Currency:** INR (₹) | **Date Format:** DD/MM/YYYY | **Time Format:** 12-hour AM/PM  
**Colors:** Pale Peach Header (`#FCE4D6`), Yellow Outstanding Box (`#FFFF00`) with Bold Red Text (`#CC0000`).

---

## 1. Create the 7 Sheets
In a new Google Spreadsheet, create these 7 tabs at the bottom:
1. `Patients`
2. `Registration Form`
3. `Expenses`
4. `Payments`
5. `Settings`
6. `Bill`
7. `Documents Checklist`

---

## 2. Sheet 5: `Settings` (Setup this first)
Fill cells `A1:H7` as follows:

| Cell | Content / Formula |
|:---|:---|
| **A1:B1** | `Setting Parameter` \| `Value` |
| **A2:B2** | `Home Charges per day (₹)` \| `600` |
| **A3:B3** | `Count Admission Day as Billed Day (Yes/No)` \| `Yes` |
| **A4:B4** | `Current Year` \| `=YEAR(TODAY())` |
| **A5:B5** | `Organization Name` \| `Anil Kumar Karmakar Memorial Cancer Trust` |
| **A6:B6** | `Admin Username` \| `Admin` |
| **A7:B7** | `Admin Password Hash` \| `03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4` |

**Dropdown Lists:**
- **C1:C7 (Expense Categories):** `Expense Categories` | `Doctor Fees` | `Pathology` | `Medicine` | `Oxygen` | `Non-Surgical Item` | `Others`
- **D1:D6 (Titles):** `Titles` | `Mr` | `Mrs` | `Ms` | `Master` | `Baby`
- **E1:E4 (Sex):** `Sex` | `Male` | `Female` | `Other`
- **F1:F5 (Marital Status):** `Marital Status` | `Married` | `Single` | `Widowed` | `Divorced`
- **G1:G4 (Status):** `Patient Status` | `Admitted` | `Discharged` | `Death`
- **H1:H5 (Payment Modes):** `Payment Modes` | `Cash` | `UPI` | `Card` | `Cheque`

---

## 3. Sheet 1: `Patients` (Master Admission Register)
### Header Row (Row 1):
Apply Pale Peach Background (`#FCE4D6`), Bold text, Centered, Freeze Row 1.
- **A1:** `_id` (Hidden/System UUID)
- **B1:** `Reg No`
- **C1:** `Date of Admission`
- **D1:** `Time of Admission`
- **E1:** `Day of Admission`
- **F1:** `Date of Discharge/Death`
- **G1:** `Time of Discharge/Death`
- **H1:** `Mr/Mrs`
- **I1:** `Name`
- **J1:** `Surname`
- **K1:** `Father/W/O/H/O`
- **L1:** `Age`
- **M1:** `Disease Category` (`Cancer`, `Nero`, `Dementia`, `Cerebral`, `Paralysis`, `Age-related diseases`)
- **N1:** `Marital Status`
- **O1:** `Occupation`
- **P1:** `Religion`
- **Q1:** `Nationality`
- **R1:** `Permanent Address`
- **S1:** `Present Address`
- **T1:** `City`
- **U1:** `PIN`
- **V1:** `District`
- **W1:** `State`
- **X1:** `Person to be Contacted`
- **Y1:** `Contact No.`
- **Z1:** `WhatsApp No.`
- **AA1:** `Ref. Doctor Name`
- **AB1:** `Doctor's Advice`
- **AC1:** `Status`
- **AD1:** `Total Bill`
- **AE1:** `Total Received`
- **AF1:** `Outstanding`
- **AG1:** `Updated At`

### Formulas for Row 2 (Drag down):
- **AD2 (Total Bill):**
  ```excel
  =IF(B2="","", (((IF(ISBLANK(F2), TODAY(), F2) - C2) + IF(Settings!$B$3="Yes", 1, 0)) * Settings!$B$2) + IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, B2), 0))
  ```
- **AE2 (Total Received):**
  ```excel
  =IF(B2="","", IFERROR(SUMIFS(Payments!$D:$D, Payments!$B:$B, B2), 0))
  ```
- **AF2 (Outstanding):**
  ```excel
  =IF(B2="","", AD2 - AE2)
  ```

### Data Validation Rules:
- **Col H (Mr/Mrs):** Dropdown from `Settings!$D$2:$D$6`
- **Col M (Sex):** Dropdown from `Settings!$E$2:$E$4`
- **Col N (Marital Status):** Dropdown from `Settings!$F$2:$F$5`
- **Col AC (Status):** Dropdown from `Settings!$G$2:$G$4`
- **Col U (PIN):** Custom formula: `=REGEXMATCH(TO_TEXT(U2), "^\d{6}$")`
- **Col Y (Contact No):** Custom formula: `=REGEXMATCH(TO_TEXT(Y2), "^\d{10}$")`
- **Col Z (WhatsApp No):** Custom formula: `=REGEXMATCH(TO_TEXT(Z2), "^\d{10}$")`

---

## 4. Sheet 3: `Expenses` (Ledger)
### Header Row (Row 1):
Headers with `#FCE4D6`:
- `_id (A)`, `Reg No (B)`, `Date (C)`, `Category (D)`, `Description / Doctor / Item Name (E)`, `Qty (F)`, `Rate (G)`, `Amount (H)`, `Discount (I)`, `Net Amount (J)`, `Created At (K)`

### Formulas for Row 2 (Drag down):
- **H2 (Amount):**
  ```excel
  =IF(B2="","", IF(D2="Non-Surgical Item", F2*G2, IF(G2>0, F2*G2, 0)))
  ```
- **J2 (Net Amount):**
  ```excel
  =IF(B2="","", IF(D2="Pathology", H2 - I2, H2))
  ```

### Validation:
- **Col B (Reg No):** Dropdown from `Patients!$B$2:$B`
- **Col D (Category):** Dropdown from `Settings!$C$2:$C$7`

---

## 5. Sheet 4: `Payments` (Receipts)
### Header Row (Row 1):
Headers with `#FCE4D6`:
- `_id (A)`, `Reg No (B)`, `Receipt Date (C)`, `Amount (D)`, `Mode (E)`, `Remarks (F)`, `Created At (G)`

### Validation:
- **Col B (Reg No):** Dropdown from `Patients!$B$2:$B`
- **Col E (Mode):** Dropdown from `Settings!$H$2:$H$5` (`Cash`, `UPI`, `Card`, `Cheque`)

---

## 6. Sheet 2: `Registration Form` (Printable A4 View)
- **Cell C4 (Select Reg No):** Dropdown from `Patients!$B$2:$B`
- **Cell F4 (Date):** `=TODAY()`
- **Cell C6 (Patient Full Name):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$H:$H&" "&Patients!$I:$I&" "&Patients!$J:$J),""))
  ```
- **Cell C7 (Age / Sex):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$L:$L)&" Years / "&XLOOKUP($C$4,Patients!$B:$B,Patients!$M:$M),""))
  ```
- **Cell C8 (Guardian / Father / Husband):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$K:$K),""))
  ```
- **Cell C9 (Admission Date & Time):**
  ```excel
  =IF($C$4="","",IFERROR(TEXT(XLOOKUP($C$4,Patients!$B:$B,Patients!$C:$C),"dd/mm/yyyy")&" "&TEXT(XLOOKUP($C$4,Patients!$B:$B,Patients!$D:$D),"hh:mm AM/PM"),""))
  ```
- **Cell C10 (Admission Day):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$E:$E),""))
  ```
- **Cell C11 (Marital Status / Religion):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$N:$N)&" / "&XLOOKUP($C$4,Patients!$B:$B,Patients!$P:$P),""))
  ```
- **Cell C12 (Nationality / Occupation):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$Q:$Q)&" / "&XLOOKUP($C$4,Patients!$B:$B,Patients!$O:$O),""))
  ```
- **Cell C13 (Permanent Address):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$R:$R),""))
  ```
- **Cell C14 (Present Address - with "same" fallback):**
  ```excel
  =IF($C$4="","",IFERROR(IF(LOWER(TRIM(XLOOKUP($C$4,Patients!$B:$B,Patients!$S:$S)))="same", XLOOKUP($C$4,Patients!$B:$B,Patients!$R:$R), XLOOKUP($C$4,Patients!$B:$B,Patients!$S:$S)),""))
  ```
- **Cell C15 (City, District, State, PIN):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$T:$T)&", "&XLOOKUP($C$4,Patients!$B:$B,Patients!$V:$V)&", "&XLOOKUP($C$4,Patients!$B:$B,Patients!$W:$W)&" - "&XLOOKUP($C$4,Patients!$B:$B,Patients!$U:$U),""))
  ```
- **Cell C16 (Contact Person):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$X:$X),""))
  ```
- **Cell C17 (Phone & WhatsApp):**
  ```excel
  =IF($C$4="","",IFERROR("Contact: "&XLOOKUP($C$4,Patients!$B:$B,Patients!$Y:$Y)&" | WhatsApp: "&XLOOKUP($C$4,Patients!$B:$B,Patients!$Z:$Z),""))
  ```
- **Cell C18 (Referring Doctor):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$AA:$AA),""))
  ```
- **Cell C19 (Doctor's Advice):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$AB:$AB),""))
  ```
- **Cell C20 (Current Status):**
  ```excel
  =IF($C$4="","",IFERROR(XLOOKUP($C$4,Patients!$B:$B,Patients!$AC:$AC),""))
  ```

---

## 7. Sheet 6: `Bill` (Printable Inpatient Invoice)
- **Cell C5 (Select Reg No):** Dropdown from `Patients!$B$2:$B`
- **Cell F5 (Bill Date):** `=TODAY()`
- **Cell C7:D7 (Patient Name):**
  ```excel
  =IF($C$5="","",IFERROR(XLOOKUP($C$5,Patients!$B:$B,Patients!$H:$H&" "&Patients!$I:$I&" "&Patients!$J:$J),""))
  ```
- **Cell F7 (Age / Sex):**
  ```excel
  =IF($C$5="","",IFERROR(XLOOKUP($C$5,Patients!$B:$B,Patients!$L:$L)&" Yrs / "&XLOOKUP($C$5,Patients!$B:$B,Patients!$M:$M),""))
  ```
- **Cell C8:D8 (Admission Info):**
  ```excel
  =IF($C$5="","",IFERROR(TEXT(XLOOKUP($C$5,Patients!$B:$B,Patients!$C:$C),"dd/mm/yyyy")&" "&TEXT(XLOOKUP($C$5,Patients!$B:$B,Patients!$D:$D),"hh:mm AM/PM"),""))
  ```
- **Cell F8 (Discharge Info):**
  ```excel
  =IF($C$5="","",IFERROR(IF(ISBLANK(XLOOKUP($C$5,Patients!$B:$B,Patients!$F:$F)),"Still Admitted",TEXT(XLOOKUP($C$5,Patients!$B:$B,Patients!$F:$F),"dd/mm/yyyy")&" "&TEXT(XLOOKUP($C$5,Patients!$B:$B,Patients!$G:$G),"hh:mm AM/PM")),""))
  ```
- **Cell C9 (Status):**
  ```excel
  =IF($C$5="","",IFERROR(XLOOKUP($C$5,Patients!$B:$B,Patients!$AC:$AC),""))
  ```
- **Cell F9 (No. of Days Staying):**
  ```excel
  =IF($C$5="","",IFERROR((IF(ISBLANK(XLOOKUP($C$5,Patients!$B:$B,Patients!$F:$F)), TODAY(), XLOOKUP($C$5,Patients!$B:$B,Patients!$F:$F)) - XLOOKUP($C$5,Patients!$B:$B,Patients!$C:$C)) + IF(Settings!$B$3="Yes", 1, 0), 0))
  ```

### Charges Table:
- **D13 (Home Days):** `=F9`
- **E13 (Home Rate):** `=Settings!$B$2`
- **F13 (Home Charges Amount):** `=IF($C$5="","", D13*E13)`
- **F14 (Doctor Fees):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Doctor Fees"), 0))
  ```
- **F15 (Pathology Gross):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$H:$H, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Pathology"), 0))
  ```
- **F16 (Pathology Discount - negative):**
  ```excel
  =IF($C$5="","", -1 * IFERROR(SUMIFS(Expenses!$I:$I, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Pathology"), 0))
  ```
- **F17 (Medicine):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Medicine"), 0))
  ```
- **F18 (Oxygen):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Oxygen"), 0))
  ```
- **F19 (Non-Surgical Items):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Non-Surgical Item"), 0))
  ```
- **F20 (Others):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Expenses!$J:$J, Expenses!$B:$B, $C$5, Expenses!$D:$D, "Others"), 0))
  ```
- **F22 (TOTAL BILL AMOUNT):**
  ```excel
  =IF($C$5="","", SUM(F13:F15) + F16 + SUM(F17:F20))
  ```
- **F23 (TOTAL PAYMENT RECEIVED):**
  ```excel
  =IF($C$5="","", IFERROR(SUMIFS(Payments!$D:$D, Payments!$B:$B, $C$5), 0))
  ```
- **B24:F24 (OUTSTANDING TILL DATE BOX):**
  - Background: `#FFFF00` (Yellow)
  - Label in B24: `OUTSTANDING TILL DATE (₹):` in Bold Red (`#CC0000`)
  - Value in F24: `=IF($C$5="","", F22 - F23)` formatted as Bold Red font (`#CC0000`), 14pt.
- **B28 (Recent Payments Filter):**
  ```excel
  =IF($C$5="","", IFERROR(FILTER({Payments!$C$2:$C, Payments!$E$2:$E, Payments!$F$2:$F, Payments!$D$2:$D}, Payments!$B$2:$B = $C$5), {"No payments recorded yet", "", "", 0}))
  ```

---

## 8. Sheet 7: `Documents Checklist`
Columns:
- `Reg No (A)`, `Patient Name (B)`, `Patient Aadhaar (C)`, `Aadhaar Link (D)`, `Party Aadhaar (E)`, `Party Aadhaar Link (F)`, `Clinical Status Verified (G)`, `Doctor Advice / Discharge Cert (H)`, `Certificate Link (I)`
- Formula for B2:
  ```excel
  =IF(A2="","",XLOOKUP(A2,Patients!$B:$B,Patients!$H:$H&" "&Patients!$I:$I&" "&Patients!$J:$J))
  ```

---

## 9. Procurement & Finance Sheets (Sheets 8–12)

### Sheet 8: `Vendors` (Supplier Master)
Headers (Row 1): Pale Peach Background (`#FCE4D6`), Bold, Freeze Row 1.
- `A1: _id` (System UUID)
- `B1: Vendor ID` (e.g. `VND-001`)
- `C1: Vendor Name`
- `D1: Category` (`Medicine / Pharmacy`, `Surgical & Disposables`, `Medical Oxygen`, `Pathology & Lab`, `General & Sundry`)
- `E1: Contact Person`
- `F1: Phone`
- `G1: GSTIN`
- `H1: Drug License No`
- `I1: Address`
- `J1: Bank Name`
- `K1: Account No`
- `L1: IFSC Code`
- `M1: Credit Days`
- `N1: Opening Balance (₹)`
- `O1: Created At`

### Sheet 9: `Purchases` (Inward GRN & Invoices)
Headers (Row 1): Pale Peach Background (`#FCE4D6`), Bold, Freeze Row 1.
- `A1: _id`
- `B1: GRN No` (e.g. `GRN/001/2026`)
- `C1: Vendor ID`
- `D1: Vendor Name`
- `E1: Supplier Invoice No`
- `F1: Invoice Date`
- `G1: Items JSON` (Itemized line items array)
- `H1: Gross Amount (₹)`
- `I1: GST (%)`
- `J1: GST Amount (₹)`
- `K1: Net Bill Amount (₹)`
- `L1: Paid Amount (₹)`
- `M1: Payment Status` (`Unpaid`, `Partial`, `Paid`)
- `N1: Created At`

### Sheet 10: `Inventory` (Batch & Stock Warehouse)
Headers (Row 1): Pale Peach Background (`#FCE4D6`), Bold, Freeze Row 1.
- `A1: _id`
- `B1: Purchase ID`
- `C1: Vendor ID`
- `D1: Item Name`
- `E1: Category`
- `F1: Batch No`
- `G1: Expiry Date (YYYY-MM)`
- `H1: Initial Qty`
- `I1: Current Stock Qty`
- `J1: Unit Rate (₹)`
- `K1: Created At`

### Sheet 11: `Stock Issues` (Clinical & Ward Consumption Log)
Headers (Row 1): Pale Peach Background (`#FCE4D6`), Bold, Freeze Row 1.
- `A1: _id`
- `B1: Batch ID`
- `C1: Item Name`
- `D1: Batch No`
- `E1: Quantity Issued`
- `F1: Issue Purpose` (`Patient Clinical Billing`, `Internal Ward / Dept`, `Wastage / Breakage`)
- `G1: Patient Reg No`
- `H1: Department`
- `I1: Issue Date`
- `J1: Remarks`
- `K1: Created At`

### Sheet 12: `Vendor Vouchers` (Disbursement Receipts)
Headers (Row 1): Pale Peach Background (`#FCE4D6`), Bold, Freeze Row 1.
- `A1: _id`
- `B1: Voucher No` (e.g. `PV/001/2026`)
- `C1: Vendor ID`
- `D1: Voucher Date`
- `E1: Amount Paid (₹)`
- `F1: Payment Mode` (`NEFT / RTGS`, `Cheque`, `UPI`, `Cash`)
- `G1: Txn Ref No / Cheque`
- `H1: Remarks`
- `I1: Created At`

---

## 10. REST Web App API Endpoints (`Code.gs`)

### `doGet(e)`:
- `?action=ping`: Returns `{ success: true, org: "...", status: "Online" }`
- `?action=listPatients`: Returns all patient rows.
- `?action=listVendors`: Returns all registered vendors.
- `?action=listPurchases`: Returns all inward purchase bills (GRN).
- `?action=listInventory`: Returns all inventory batches and current stock.
- `?action=listStockIssues`: Returns consumption issue logs.
- `?action=listVendorVouchers`: Returns disbursement payment vouchers.

### `doPost(e)`:
- `action: "createPatient"`: Registers new admission and appends row to `Patients` sheet.
- `action: "updatePatient"`: Locates patient by `regNo` and updates fields.
- `action: "addExpense"`: Appends expense item to `Expenses` ledger.
- `action: "addPayment"`: Appends receipt record to `Payments` ledger.
- `action: "addVendor"`: Saves new vendor profile to `Vendors` sheet.
- `action: "deleteVendor"`: Removes vendor by `vendorId`.
- `action: "addPurchase"`: Records purchase in `Purchases` sheet and inwards batches to `Inventory`.
- `action: "deletePurchase"`: Deletes purchase record by ID.
- `action: "issueStock"`: Decrements stock in `Inventory`, logs to `Stock Issues`, and auto-bills to `Expenses` if `Patient Clinical Billing`.
- `action: "addVendorVoucher"`: Records payment voucher in `Vendor Vouchers` sheet and updates vendor ledger.

