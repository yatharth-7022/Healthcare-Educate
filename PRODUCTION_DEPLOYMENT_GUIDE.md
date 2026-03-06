# Production Deployment Guide - Stripe Integration

## 🌐 Your Infrastructure

- **Backend API**: `https://api.smashmedgamsat.com`
- **Frontend**: (Your production domain - e.g., `https://smashmedgamsat.com` or Vercel URL)

---

## 📋 Production Setup Checklist

### Step 1: Switch to Stripe Live Mode

1. Go to Stripe Dashboard: https://dashboard.stripe.com
2. Toggle from **Test Mode** to **Live Mode** (top right)
3. Get your **Live API Keys**:
   - Navigate to: **Developers → API Keys**
   - Copy **Publishable key** (starts with `pk_live_`)
   - Copy **Secret key** (starts with `sk_live_`) - **Keep this secure!**

---

### Step 2: Create Products in Live Mode

1. Go to: https://dashboard.stripe.com/products (ensure you're in **Live Mode**)
2. Create your 3 pricing plans:

#### Weekly Plan
- Name: `Weekly Plan`
- Price: `$15.00 AUD` per week
- Billing: `Weekly`
- Copy the **Price ID** (starts with `price_`)

#### Monthly Plan
- Name: `Monthly Plan`
- Price: `$50.00 AUD` per month
- Billing: `Monthly`
- Copy the **Price ID**

#### Yearly Plan
- Name: `Yearly Plan`
- Price: `$500.00 AUD` per year
- Billing: `Yearly`
- Copy the **Price ID**

---

### Step 3: Backend Environment Variables

Update your **production backend** `.env` file (on AWS/hosting platform):

```env
# Production Mode
NODE_ENV=production

# Stripe LIVE Keys (NOT test keys!)
STRIPE_SECRET_KEY=sk_live_xxxxx              # Your LIVE secret key
STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx         # Your LIVE publishable key
STRIPE_WEBHOOK_SECRET=whsec_xxxxx            # From Stripe Dashboard (see Step 4)

# Frontend URL (where users will be redirected after payment)
FRONTEND_URL=https://smashmedgamsat.com      # Replace with your actual frontend domain
```

**Important:**
- ❌ Never commit live keys to Git
- ✅ Use your hosting platform's environment variable settings (AWS Secrets Manager, Vercel Environment Variables, etc.)
- ✅ Keep `STRIPE_SECRET_KEY` completely secret (server-side only)

---

### Step 4: Create Webhook Endpoint in Stripe Dashboard

Unlike local development (where you used `stripe listen`), production needs a **permanent webhook endpoint**.

1. Go to: https://dashboard.stripe.com/webhooks (ensure **Live Mode**)
2. Click **"Add endpoint"**
3. Configure:
   - **Endpoint URL**: `https://api.smashmedgamsat.com/api/webhooks/stripe`
   - **Description**: `Production webhook for subscription events`
   - **Events to listen to**: Select these events:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
4. Click **"Add endpoint"**
5. **Copy the Signing Secret** (starts with `whsec_`)
6. Update your backend `.env` with: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`

---

### Step 5: Frontend Environment Variables

Update your **production frontend** environment variables:

#### For Vercel/Netlify:
Go to your project settings → Environment Variables and add:

```env
VITE_API_URL=https://api.smashmedgamsat.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx    # Your LIVE publishable key
```

#### For Local `.env.production` file:
Update `/client/.env.production`:

```env
VITE_API_URL=https://api.smashmedgamsat.com
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
```

**Note:** The publishable key (starting with `pk_live_`) is safe to expose on the client-side.

---

### Step 6: Update Price IDs in Code

Open `/client/src/pages/Pricing.tsx` and update the `PRICE_IDS` with your **LIVE Price IDs**:

```typescript
const PRICE_IDS = {
  weekly: "price_xxxxx",    // Your LIVE Weekly Price ID
  monthly: "price_xxxxx",   // Your LIVE Monthly Price ID
  yearly: "price_xxxxx",    // Your LIVE Yearly Price ID
};
```

**Important:** Commit and deploy this change to production.

---

### Step 7: Configure Stripe Customer Portal (Optional)

The Billing Portal allows customers to manage their subscriptions. Customize it:

1. Go to: https://dashboard.stripe.com/settings/billing/portal (Live Mode)
2. Configure:
   - **Business information**: Add your business name, support email
   - **Functionality**: Enable "Cancel subscriptions", "Update payment methods"
   - **Branding**: Add logo, colors to match your brand
3. Click **"Save changes"**

---

## 🚀 Deployment Steps

### 1. Deploy Backend

```bash
# On your AWS instance or deployment platform

# 1. Pull latest code
git pull origin main

# 2. Update environment variables (via your platform's UI or .env file)
# Make sure all production Stripe keys are set

# 3. Run database migrations
npx prisma migrate deploy

# 4. Restart backend server
pm2 restart all   # or your process manager command
```

### 2. Deploy Frontend

```bash
# If using Vercel/Netlify, just push to your deployment branch:
git push origin main

# Or manually build and deploy:
cd client
npm run build
# Upload the dist/ folder to your hosting
```

---

## 🧪 Testing Production (Carefully!)

### Test with Live Card

1. Navigate to your production site: `https://smashmedgamsat.com/pricing`
2. Click **Subscribe** on the cheapest plan (Weekly - $15)
3. Use a **real card** (you can refund it immediately after)
4. Complete payment
5. Verify:
   - ✅ Redirect to success page
   - ✅ Check Stripe Dashboard → Payments (see the payment)
   - ✅ Check webhook delivery in Stripe Dashboard → Webhooks
   - ✅ Check your database for new Subscription record
   - ✅ Navigate to `/account` - subscription should show as Active

### Immediately Refund Test Payment

1. Go to: https://dashboard.stripe.com/payments
2. Find your test payment
3. Click **"Refund"** → **"Refund full amount"**

---

## 🔐 Production Security Checklist

✅ All environment variables use **LIVE** keys (not test keys)  
✅ `STRIPE_SECRET_KEY` is kept secret (never in frontend or Git)  
✅ Webhook signature verification is enabled (already in code)  
✅ `NODE_ENV=production` is set  
✅ Database backups are configured  
✅ SSL/HTTPS is enabled on both frontend and backend  
✅ CORS is properly configured (only allow your frontend domain)  
✅ Rate limiting is enabled on payment endpoints  
✅ Error logs don't expose sensitive data  

---

## 🔍 Monitoring Production

### 1. Stripe Dashboard
Monitor these regularly:
- **Payments**: https://dashboard.stripe.com/payments
- **Subscriptions**: https://dashboard.stripe.com/subscriptions
- **Webhooks**: https://dashboard.stripe.com/webhooks (check delivery success rate)
- **Disputes**: https://dashboard.stripe.com/disputes
- **Logs**: https://dashboard.stripe.com/logs (API request history)

### 2. Set Up Stripe Email Notifications
1. Go to: https://dashboard.stripe.com/settings/notifications
2. Enable notifications for:
   - Failed payments
   - Disputes
   - Unusual activity

### 3. Backend Logs
Check your server logs for:
- Webhook signature verification failures
- Payment creation errors
- Database errors

---

## 🚨 Common Production Issues

### Issue: Webhook Signature Verification Failed

**Cause:** Wrong `STRIPE_WEBHOOK_SECRET` in backend .env

**Fix:**
1. Go to Stripe Dashboard → Webhooks
2. Click on your production webhook endpoint
3. Click "Reveal" next to "Signing secret"
4. Copy the secret
5. Update backend `.env`: `STRIPE_WEBHOOK_SECRET=whsec_xxxxx`
6. Restart backend server

---

### Issue: "No such price" Error

**Cause:** Using test mode Price IDs in production

**Fix:**
1. Make sure you created products in **Live Mode** (not Test Mode)
2. Update `PRICE_IDS` in `Pricing.tsx` with **Live Price IDs**
3. Redeploy frontend

---

### Issue: Redirect URL Goes to Localhost

**Cause:** Backend `FRONTEND_URL` still points to localhost

**Fix:**
1. Update backend `.env`: `FRONTEND_URL=https://smashmedgamsat.com`
2. Restart backend server

---

### Issue: CORS Errors in Browser Console

**Cause:** Backend not allowing requests from production frontend domain

**Fix:**
Check your backend CORS configuration allows your production frontend URL.

---

## 📊 Difference: Test vs Production

| Feature | Test Mode | Production Mode |
|---------|-----------|-----------------|
| **API Keys** | `sk_test_...` / `pk_test_...` | `sk_live_...` / `pk_live_...` |
| **Webhooks** | `stripe listen` CLI | Dashboard endpoint |
| **Test Cards** | `4242 4242 4242 4242` | Real credit cards |
| **Money** | Simulated (no real charges) | Real payments |
| **Products** | Test products | Live products |
| **Dashboard** | Separate test data | Live customer data |

---

## 🎯 Go-Live Checklist

Before accepting real customers:

- [ ] All Live Stripe keys configured in backend
- [ ] Live webhook endpoint created and verified
- [ ] Live products created with correct pricing
- [ ] Price IDs updated in code
- [ ] Frontend environment variables updated
- [ ] Test payment completed successfully (then refunded)
- [ ] Webhook events confirmed in Stripe Dashboard
- [ ] Database subscription records verified
- [ ] Customer Portal configured and tested
- [ ] SSL certificates valid on all domains
- [ ] Error monitoring/logging in place
- [ ] Customer support email configured in Stripe settings
- [ ] Terms of Service and Privacy Policy links added to checkout
- [ ] Refund policy defined

---

## 📞 Support Resources

- **Stripe Dashboard**: https://dashboard.stripe.com
- **Stripe Documentation**: https://stripe.com/docs
- **Stripe Support**: https://support.stripe.com
- **Stripe Status**: https://status.stripe.com
- **Test Cards Reference**: https://stripe.com/docs/testing

---

## 💰 Going Live Notes

1. **Start Small**: Consider launching with a limited number of users first
2. **Monitor Closely**: Watch webhook delivery rates and payment success rates
3. **Have Support Ready**: Be prepared to handle customer payment issues
4. **Backup Plan**: Have a way to manually grant access if payments fail
5. **Compliance**: Ensure you're compliant with data protection laws (GDPR, etc.)

---

Good luck with your launch! 🚀
