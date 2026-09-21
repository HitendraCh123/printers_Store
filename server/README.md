# Printer Shop — Backend Setup Guide (Easy Steps)

Yeh guide tumhe step-by-step batayegi ki backend kaise chalana hai — bina kisi
pehle se knowledge ke. Sirf steps follow karo.

---

## Backend kya karta hai (recap)

- `server/` folder ek alag chalne wala program hai (Node.js)
- Yeh ek **database** (MongoDB) se connect hota hai jaha sab users aur orders save hote hain
- Tumhara React app (`src/` folder) ab is backend se baat karta hai jab koi signup/login/order karta hai

---

## STEP 1 — MongoDB Atlas account banao (FREE database)

MongoDB Atlas free cloud database deta hai, koi installation nahi chahiye.

1. Jao: https://www.mongodb.com/cloud/atlas/register
2. Free account banao (Google se sign up kar sakte ho)
3. "Create a deployment" pe click karo → **M0 Free** tier choose karo
4. Region: apne paas wala koi bhi (e.g. Mumbai) choose kar lo
5. "Create Deployment" pe click karo — 1-2 min lagega

### Database user banao
1. Ek popup aayega "Create a database user" — username/password set karo
   (yeh password yaad rakhna, neeche use hoga)
2. "Create Database User" pe click karo

### Apna IP allow karo (network access)
1. Left sidebar mein "Network Access" pe jao
2. "Add IP Address" → "Allow Access from Anywhere" choose karo (0.0.0.0/0)
   (testing ke liye theek hai; baad mein restrict kar sakte ho)
3. Confirm karo

### Connection string copy karo
1. Left sidebar mein "Database" pe jao → apne cluster ke "Connect" button pe click karo
2. "Drivers" choose karo → Node.js
3. Ek lambi string milegi jaisi:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
4. `<username>` aur `<password>` ko apne actual username/password se replace karo
5. `mongodb.net/` ke baad `printer_shop` add karo (database ka naam), jaise:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/printer_shop?retryWrites=true&w=majority
   ```

---

## STEP 2 — `.env` file update karo

`server/.env` file kholo aur `MONGODB_URI` ki line ko apni connection string se replace karo:

```
MONGODB_URI=mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/printer_shop?retryWrites=true&w=majority
```

`JWT_SECRET` ko bhi kisi bhi random lambe text se replace kar sakte ho (already
ek default value di hui hai, wo bhi chal jayegi).

---

## STEP 3 — Backend install aur run karo

Apne computer pe Node.js installed hona chahiye (https://nodejs.org se le sakte ho,
"LTS" version download karo).

Terminal/Command Prompt kholo aur:

```bash
cd server
npm install
npm start
```

Agar sahi se chala, toh yeh dikhega:
```
Connected to MongoDB
Server running on http://localhost:5000
```

Yeh window khuli rakhna jab tak backend chahiye — band karne ke liye Ctrl+C.

---

## STEP 4 — React app (frontend) run karo

Naya terminal window kholo (backend wali band na karo), phir:

```bash
cd printer_10
npm install
npm run dev
```

Browser mein khulne wala link (jaise `http://localhost:5173`) khol lo.

Ab signup/login/checkout sab REAL backend se connected hain — agar tumne pehle
wali baar localStorage wala version use kiya tha, browser ka localStorage clear
kar dena (DevTools → Application → Local Storage → Clear) taaki purana fake data
confuse na kare.

---

## Test kaise karo

1. `/signup` pe jao, account banao
2. Koi printer cart mein add karo
3. Cart → "Proceed to Checkout" → order place ho jayega
4. "My Orders" pe jao → order dikhega
5. MongoDB Atlas website pe jao → "Browse Collections" → `users` aur `orders`
   collections mein apna real data dikhega!

---

## Jab real website pe launch karna ho (production)

Abhi tak backend sirf tumhare computer pe chal raha hai (`localhost`). Real
website ke liye backend ko kahi "live" rakhna padega. Yeh free options hain:

### Backend hosting (free options)
- **Render.com** — sabse easy, free tier available
  1. GitHub pe apna `server/` folder push karo
  2. Render.com pe account banao → "New Web Service" → apna GitHub repo connect karo
  3. Build command: `npm install`, Start command: `npm start`
  4. Environment Variables mein `.env` wali values daal do (MONGODB_URI, JWT_SECRET)
  5. Deploy hone ke baad ek live URL milega, jaise `https://printer-backend.onrender.com`

### Frontend hosting (free options)
- **Vercel.com** ya **Netlify.com** — React apps ke liye best, free hai
  1. GitHub pe apna React project (`printer_10/`) push karo
  2. Vercel/Netlify pe account banao → repo import karo → deploy

### Connect karna
`src/api.js` file mein yeh line change karo:
```js
const BASE_URL = "http://localhost:5000/api";
```
Isko apne live backend URL se replace karo:
```js
const BASE_URL = "https://printer-backend.onrender.com/api";
```

---

## Koi problem aaye toh

- **"Could not connect to MongoDB"** → `.env` mein connection string check karo,
  password sahi hai ya nahi
- **CORS error browser console mein** → backend chal raha hai ya nahi check karo
  (`npm start` wali terminal window)
- **"Cannot find module"** → `npm install` chalana bhool gaye ho shayad
