# Stripe Payment Gateway Testing Guide

## ✅ Frontend Changes Complete

All frontend code for Stripe integration has been implemented:

- ✅ Payment API client (`/client/src/lib/payment-api.ts`)
- ✅ Subscription hooks (`/client/src/hooks/use-subscription.ts`)
- ✅ Subscribe button component (`/client/src/components/payment/SubscribeButton.tsx`)
- ✅ Success page (`/client/src/pages/SubscriptionSuccess.tsx`)
- ✅ Account settings page (`/client/src/pages/Account.tsx`)
- ✅ Updated Pricing page with subscribe buttons
- ✅ Routes registered in App.tsx
- ✅ Environment variables configured

---

## 🔧 Setup Instructions

### Step 1: Configure Environment Variables

#### Backend (.env in root directory)

You've already added these:

```env
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

#### Frontend (/client/.env.local)

Add your **Stripe Publishable Key** (it's safe to use on the client):

```env
VITE_API_URL=http://localhost:3000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxx
```

**Replace `your_stripe_publishable_key_here` with your actual publishable key from Stripe.**

---

### Step 2: Create Products in Stripe Dashboard

1. Go to: https://dashboard.stripe.com/test/products
2. Click **"Add Product"**
3. Create 3 products with these details:

#### Product 1: Weekly Plan

- Name: `Weekly Plan`
- Pricing: `$15.00 AUD` per week
- Billing period: `Weekly`
- After saving, copy the **Price ID** (format: `price_xxxxx`)

#### Product 2: Monthly Plan

- Name: `Monthly Plan`
- Pricing: `$50.00 AUD` per month
- Billing period: `Monthly`
- After saving, copy the **Price ID**

#### Product 3: Yearly Plan

- Name: `Yearly Plan`
- Pricing: `$500.00 AUD` per year
- Billing period: `Yearly`
- After saving, copy the **Price ID**

---

### Step 3: Update Price IDs in Code

Open `/client/src/pages/Pricing.tsx` and update the `PRICE_IDS` object (around line 14):

```typescript
const PRICE_IDS = {
  weekly: "price_xxxxx", // Replace with your Weekly Price ID
  monthly: "price_xxxxx", // Replace with your Monthly Price ID
  yearly: "price_xxxxx", // Replace with your Yearly Price ID
};
```

---

### Step 4: Run Database Migration

```bash
cd /Users/yatharthagarwal/Healthcare-Educate
npx prisma migrate dev --name add_subscription_and_payment_models
```

This creates the `Subscription` and `Payment` tables in your database.

---

### Step 5: Install Stripe CLI (for local webhook testing)

#### macOS:

```bash
brew install stripe/stripe-cli/stripe
```

#### Login to Stripe:

```bash
stripe login
```

This will open your browser to authenticate.

---

## 🚀 Testing the Payment Flow

### Terminal 1: Start Backend Server

```bash
cd /Users/yatharthagarwal/Healthcare-Educate
npm run dev
```

Backend should be running on `http://localhost:3000`

---

### Terminal 2: Start Frontend Server

```bash
cd /Users/yatharthagarwal/Healthcare-Educate/client
npm run dev
```

Frontend should be running on `http://localhost:5173`

---

### Terminal 3: Forward Stripe Webhooks to Localhost

```bash
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

**Important:** This command will output a webhook signing secret like:

```
> Ready! Your webhook signing secret is whsec_xxxxx
```

**Copy this secret and update your backend `.env` file:**

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

Then **restart your backend server** (Terminal 1).

---

## 🧪 Test Flow Checklist

### 1. Navigate to Pricing Page

- Open: http://localhost:5173/pricing
- You should see 3 pricing cards with "Subscribe" buttons

### 2. Click Subscribe (Weekly Plan)

- If not logged in, you'll be redirected to `/login`
- Log in with your test user credentials
- After login, click "Subscribe" on Weekly Plan
- You should be redirected to Stripe Checkout page

### 3. Complete Payment with Test Card

Use these Stripe test card numbers:

**Success:**

- Card Number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**Failure:**

- Card Number: `4000 0000 0000 0002` (card declined)

### 4. Verify Success Redirect

After successful payment:

- You should be redirected to: http://localhost:5173/subscription/success
- You should see a success message and next steps

### 5. Check Webhook Events

In Terminal 3 (Stripe CLI), you should see:

```
[200] POST /api/webhooks/stripe [evt_xxxxx] checkout.session.completed
[200] POST /api/webhooks/stripe [evt_xxxxx] invoice.payment_succeeded
```

### 6. Verify Database Updates

```bash
npx prisma studio
```

Check the `Subscription` table:

- Should have a new record with:
  - `status: "active"`
  - `stripeCustomerId: "cus_xxxxx"`
  - `stripeSubscriptionId: "sub_xxxxx"`

Check the `Payment` table:

- Should have a new record with payment details

### 7. Test Account Page

- Navigate to: http://localhost:5173/account
- You should see:
  - Subscription status badge (✓ Active)
  - Next billing date
  - "Manage Subscription" button

### 8. Test Billing Portal

- Click "Manage Subscription" button
- You should be redirected to Stripe Billing Portal
- Test canceling subscription:
  - Click "Cancel subscription"
  - Confirm cancellation
  - You'll be redirected back to `/account`
  - Status should update to "Canceled" (check Terminal 3 for webhook)

---

## 🔍 Debugging Guide

### Issue: "Invalid API Key"

- ✅ Check `STRIPE_SECRET_KEY` in backend `.env` starts with `sk_test_`
- ✅ Check no trailing spaces in `.env` file

### Issue: Webhook signature verification failed

- ✅ Make sure `STRIPE_WEBHOOK_SECRET` matches the secret from `stripe listen` command
- ✅ Restart backend server after updating webhook secret
- ✅ Check Terminal 3 shows `[200]` responses (not `[400]` or `[500]`)

### Issue: "Cannot find Stripe Publishable Key"

- ✅ Check `VITE_STRIPE_PUBLISHABLE_KEY` in `/client/.env.local`
- ✅ Restart frontend server (Vite needs restart for env changes)

### Issue: Redirect to login instead of checkout

- ✅ Make sure you're logged in
- ✅ Check JWT token in browser DevTools → Application → Local Storage

### Issue: "Price not found"

- ✅ Verify `PRICE_IDS` in `Pricing.tsx` match your Stripe Dashboard Price IDs
- ✅ Make sure you're using Price IDs (start with `price_`), not Product IDs (`prod_`)

### Issue: Database errors

- ✅ Run `npx prisma migrate reset` to reset database
- ✅ Run `npx prisma migrate dev` to apply migrations
- ✅ Check PostgreSQL is running

---

## 📊 Monitor Stripe Dashboard

### During Testing, Monitor:

1. **Payments:** https://dashboard.stripe.com/test/payments
   - See your test payments appear in real-time

2. **Subscriptions:** https://dashboard.stripe.com/test/subscriptions
   - View active subscriptions

3. **Webhooks:** https://dashboard.stripe.com/test/webhooks
   - See webhook delivery status
   - Click into events to see payloads

4. **Logs:** https://dashboard.stripe.com/test/logs
   - Debug API requests and responses

---

## 🎯 Testing Scenarios

### Scenario 1: Successful Subscription

1. ✅ User clicks Subscribe on Pricing page
2. ✅ Redirected to Stripe Checkout
3. ✅ Enters valid test card
4. ✅ Payment succeeds
5. ✅ Redirected to Success page
6. ✅ Webhook creates Subscription record
7. ✅ Account page shows "Active" status

### Scenario 2: Failed Payment

1. ✅ User clicks Subscribe
2. ✅ Enters declined test card (`4000 0000 0000 0002`)
3. ✅ Payment fails
4. ✅ User stays on Stripe Checkout with error message
5. ✅ No Subscription created in database

### Scenario 3: Subscription Cancellation

1. ✅ User navigates to Account page
2. ✅ Clicks "Manage Subscription"
3. ✅ Opens Stripe Billing Portal
4. ✅ Cancels subscription
5. ✅ Webhook updates Subscription status to "canceled"
6. ✅ Account page reflects new status

### Scenario 4: Recurring Payment

1. ✅ Active subscription exists
2. ✅ Wait for next billing cycle (or use Stripe CLI to simulate)
3. ✅ `invoice.payment_succeeded` webhook fires
4. ✅ New Payment record created in database

---

## 🔐 Security Checklist

✅ Webhook signature verification implemented  
✅ Stripe secret key never exposed to frontend  
✅ Payment amounts validated server-side (not client-side)  
✅ JWT authentication required for checkout/portal  
✅ Raw body middleware before express.json() for webhooks  
✅ Idempotency checks in webhook handlers  
✅ Database indexes on frequently queried fields  
✅ Error logging without exposing sensitive data

---

## 🚨 Important Notes

1. **Test Mode Only:** All current configurations use Stripe test mode (`sk_test_`, `pk_test_`). For production, you'll need to:
   - Use live keys (`sk_live_`, `pk_live_`)
   - Create products in live mode
   - Update webhook endpoint in Stripe Dashboard

2. **Webhook Secret:** The `whsec_xxxxx` from `stripe listen` is temporary. For production:
   - Create a webhook endpoint in Stripe Dashboard
   - Set URL to: `https://api.smashmedgamsat.com/api/webhooks/stripe`
   - Select events to listen to
   - Copy the permanent webhook secret

3. **Currency:** Currently set to AUD. Change in `stripeService.ts` if needed.

4. **Customer Portal:** Customization available in Stripe Dashboard → Settings → Billing → Customer Portal

---

## 📞 Support

If you encounter issues not covered in this guide:

1. Check Stripe API logs: https://dashboard.stripe.com/test/logs
2. Check webhook delivery: https://dashboard.stripe.com/test/webhooks
3. Check server logs in Terminal 1
4. Check browser console for frontend errors

---

## Next Steps After Testing

Once local testing succeeds:

1. ✅ Switch to live Stripe keys for production
2. ✅ Create webhook endpoint in Stripe Dashboard (not CLI)
3. ✅ Update production environment variables
4. ✅ Test in production with real card (then refund)
5. ✅ Monitor first real transactions closely
