# 📚 INTEGRATION GUIDES - Hustle Teacher Setup

Complete step-by-step instructions for integrating all third-party services.

---

## 1. 🔍 Google Analytics 4 (GA4)

### Setup Steps:

1. **Go to:** https://analytics.google.com
2. **Create Account:**
   - Click "Start measuring"
   - Account name: "Hustle Teacher"
   - Create

3. **Create Property:**
   - Property name: "Hustle Teacher Development"
   - Reporting timezone: Your timezone
   - Currency: USD
   - Create

4. **Create Data Stream:**
   - Platform: Web
   - Website URL: `https://HustleTeacher.vercel.app`
   - Stream name: "Hustle Teacher Website"
   - Create stream

5. **Get Measurement ID:**
   - It's in format: `G-XXXXXXXXXX`
   - **Copy this ID**

6. **Add to .env:**
   ```
   PUBLIC_GA_ID=G-XXXXXXXXXX
   ```

7. **Redeploy:**
   ```bash
   git push origin main
   ```

8. **Verify:**
   - Go to Analytics → Real-time
   - Visit your site
   - You should see your activity in real-time

### Tips:
- Create separate GA4 properties for dev/staging vs production
- Set up goals for form submissions, newsletter signups
- Create custom events for important actions
- Enable "Ecommerce" section for future monetization

---

## 2. 🔒 Google reCAPTCHA v3

### Setup Steps:

1. **Go to:** https://www.google.com/recaptcha/admin

2. **Create New Site:**
   - Label: "Hustle Teacher"
   - reCAPTCHA Type: **v3** (best for UX)
   - Domains: `HustleTeacher.vercel.app`
   - Accept terms
   - Submit

3. **Get Keys:**
   - Site Key (public) - copy this
   - Secret Key (keep private) - copy this

4. **Add to .env:**
   ```
   PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
   RECAPTCHA_SECRET_KEY=your-secret-key
   ```

5. **Redeploy:**
   ```bash
   git push origin main
   ```

6. **Test:**
   - Go to your contact form
   - Submit a message
   - reCAPTCHA will validate

### Tips:
- v3 has no CAPTCHA checkbox (best UX)
- Returns a score 0.0-1.0 (higher = more human-like)
- Minimum score ~0.5 recommended
- Forms auto-validate with integrated API

### Verification Method:
The contact form API (`src/pages/api/contact.ts`) will validate the response and check the score.

---

## 3. ✉️ Mailchimp Setup

### Prerequisites:
- You have a NewsletterSignup component ready
- Forms are configured on pages

### Setup Steps:

1. **Sign Up:** https://mailchimp.com
   - Create free account
   - Verify email

2. **Create Audience:**
   - Dashboard → Audiences → Create an audience
   - Audience name: "Hustle Teacher Subscribers"
   - Company: "Hustle Teacher"
   - Address: Your address
   - Default from: Your email
   - Create audience

3. **Get Audience ID:**
   - Go to Audience → Settings
   - Look for "Audience ID" (format: `abc123def456`)
   - **Copy this**

4. **Get API Key & Server:**
   - Account → Extras → API Keys
   - Create new key or copy existing
   - Format: `[key-xxx]`
   - Extract server prefix from key (e.g., `us1`, `eu1`)

5. **Add to .env:**
   ```
   PUBLIC_MAILCHIMP_AUDIENCE_ID=abc123def456
   PUBLIC_MAILCHIMP_SERVER=us1
   ```

6. **Set Up Automation (Optional but Recommended):**
   - Audience → Automations → Welcome Series
   - Create automated welcome email
   - Send when someone subscribes
   - Include thank you + link to your blog

7. **Redeploy:**
   ```bash
   git push origin main
   ```

8. **Test:**
   - Visit your site
   - Use NewsletterSignup form
   - Enter your email
   - Should receive confirmation in Mailchimp dashboard

### Tips:
- Start with welcome email automation
- Create content upgrade (free PDF, checklist) for lead magnet
- Set up monthly email digest with top posts
- Segment subscribers by interest (topics they click)
- Monitor open rates and click rates

### Integration Points in Your Site:
- `src/components/NewsletterSignup.astro` - ready to use
- Add to homepage, blog posts, sidebar
- Mailchimp handles GDPR compliance

---

## 4. 🔎 Google Search Console

### Setup Steps:

1. **Go to:** https://search.google.com/search-console

2. **Add Property:**
   - URL prefix: `https://HustleTeacher.vercel.app`
   - Continue

3. **Verify Ownership:**
   - Option 1: HTML tag (Recommended)
     - Copy verification code
     - ADD to your BaseHead.astro or vercel.json
   - Option 2: DNS record
     - Add TXT record to domain DNS
   - Click Verify

4. **Submit Sitemap:**
   - Left menu → Sitemaps
   - New sitemap → `sitemap-index.xml`
   - Submit

5. **Wait for Indexing:**
   - Check coverage report after 24 hours
   - Should gradually index your pages

### After Setup:
- Monitor "Coverage" for errors
- Check "Performance" for search results
- Review "Core Web Vitals" for speed issues
- Fix any "Errors" or "Valid with warnings"

### Tips:
- Check for crawl errors (404s, redirects)
- Request indexing for new pages
- Monitor click-through rate (CTR) from search results
- Find keywords you're ranking for
- Identify pages with potential improvement

---

## 5. 🌐 Bing Webmaster Tools

### Setup Steps:

1. **Go to:** https://www.bing.com/webmaster

2. **Add Site:**
   - https://HustleTeacher.vercel.app
   - Continue

3. **Choose Verification Method:**
   - Option 1: HTML tag (Recommended)
   - Option 2: XML file
   - Option 3: DNS record
   - Follow prompts

4. **Submit Sitemap:**
   - Tools → Sitemaps
   - Submit: `https://HustleTeacher.vercel.app/sitemap-index.xml`

5. **Wait for Indexing:**
   - Can take 1-2 weeks
   - Monitor in dashboard

### Tips:
- Bing is used by 10% of searchers (don't ignore)
- Bing indexing is sometimes faster than Google
- Similar reports to Google Search Console
- Good for monitoring backlinks

---

## 6. 🔥 Microsoft Clarity (Heatmaps)

### Setup Steps:

1. **Go to:** https://clarity.microsoft.com

2. **Log In / Create Account:**
   - Use Microsoft account
   - Create free account if needed

3. **Create New Project:**
   - Project name: "Hustle Teacher"
   - Website URL: `https://HustleTeacher.vercel.app`
   - Create

4. **Get Project ID:**
   - Copy the tracking code
   - Extract Project ID from code
   - **Should look like:** `qvyz1x8g3d`

5. **Add to .env:**
   ```
   PUBLIC_CLARITY_ID=qvyz1x8g3d
   ```

6. **Redeploy:**
   ```bash
   git push origin main
   ```

7. **Wait for Data:**
   - Takes a few hours to collect data
   - Visit your site to generate traffic

### Features to Monitor:
- **Recordings:** Watch how users interact
- **Heatmaps:** See where users click/scroll
- **Session analytics:** User path through site
- **Metrics:** Page load time, click depth, scroll depth

### Tips:
- Check which CTA buttons get clicked most
- Identify confusing navigation
- See where users scroll to
- Improve form abandonment areas
- Find mobile UX issues

---

## 7. 📧 Email Setup (DKIM/SPF/DMARC)

If sending emails from your domain:

### Through Mailchimp:
Mailchimp handles most of this automatically. Just authenticate:

1. **Mailchimp → Audience → Settings**
2. **Authentication**
3. **Verify domain ownership**
4. Add DNS records provided:
   - CNAME for DKIM
   - TXT for SPF (if needed)

### Manual Setup (Advanced):
If sending from custom email:

1. **Go to domain provider:**
   - GoDaddy, Namecheap, etc.

2. **Add DNS records:**
   - SPF: `v=spf1 include:mailchimp.com ~all`
   - DKIM: Get from email provider
   - DMARC: `v=DMARC1; p=none; rua=mailto:your@email.com`

3. **Test:**
   - Send test email
   - Check spam folder
   - Use tools like MXToolbox to verify

---

## 8. 🎨 Custom Domain Setup

### From GoDaddy/Namecheap/etc:

1. **Register Domain:** hustleteacher.com (or your choice)

2. **Add to Vercel:**
   - Vercel Dashboard → Domains
   - Add domain
   - Choose domain registrar
   - Follow nameserver instructions

3. **Update Nameservers:**
   - Domain provider → Change nameservers
   - Point to Vercel's nameservers
   - Takes 24-48 hours to propagate

4. **Update .env and Configs:**
   ```
   astro.config.mjs:
   site: 'https://hustleteacher.com'
   
   vercel.json:
   Should auto-update
   ```

5. **Test:**
   - Wait 24 hours
   - Visit https://hustleteacher.com

---

## 9. ✅ Verification Checklist

After setup, verify everything works:

### Analytics:
- [ ] GA4 dashboard shows real-time visitors
- [ ] Events are tracking (page views, clicks)
- [ ] Google Search Console sees your sitemap
- [ ] Bing Webmaster Tools has your URL

### Security:
- [ ] reCAPTCHA working on contact form
- [ ] Security headers verified at securityheaders.com
- [ ] SSL certificate working (green lock icon)
- [ ] forms submitting without errors

### Email:
- [ ] Newsletter signup works
- [ ] Confirmation emails from Mailchimp arriving
- [ ] Welcome email sequence triggered

### SEO:
- [ ] Sitemap accessible at `/sitemap-index.xml`
- [ ] robots.txt accessible at `/robots.txt`
- [ ] No crawl errors in Search Console
- [ ] All pages indexable (no noindex tags)

### Performance:
- [ ] PageSpeed score >90 (https://pagespeed.web.dev/)
- [ ] Core Web Vitals passing
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsive (DevTools)

---

## 📞 Troubleshooting

### GA4 not showing data:
- Check Measurement ID is correct
- Redeploy site
- Wait 24 hours for indexing
- Check console for errors (F12)

### reCAPTCHA errors:
- Verify keys are correct
- Check domain added to reCAPTCHA admin
- Clear browser cache
- Test in private window

### Mailchimp not receiving emails:
- Check Audience ID and Server are correct
- Verify email in form is correct format
- Check Mailchimp dashboard for bounce rates
- Re-authenticate domain

### Forms not submitting:
- Check browser console for errors (F12)
- Verify reCAPTCHA is loaded
- Check network tab for API response
- Try in different browser

### Search Console not seeing sitemap:
- Wait 24-48 hours
- Verify domain ownership first
- Check sitemap URL is correct
- Verify robots.txt allows /sitemap-index.xml

---

## 🔗 API Endpoints Created

### Contact Form:
```
POST /api/contact
Validates:
- Name, email, subject, message
- reCAPTCHA response
- Email format
Returns: Success/error message
```

### Future Endpoints to Add:
- Newsletter direct subscribe
- Comment submission
- Admin notifications

---

## 📊 Monitoring Dashboard URLs

Save these for regular checks:

- **Google Analytics:** https://analytics.google.com
- **Search Console:** https://search.google.com/search-console
- **Mailchimp:** https://mailchimp.com/dashboard
- **Clarity:** https://clarity.microsoft.com
- **Vercel:** https://vercel.com/dashboard
- **PageSpeed:** https://pagespeed.web.dev/
- **Security Headers:** https://securityheaders.com/

---

## 🎯 Next Integration Goals (Future)

- [ ] Sentry error tracking
- [ ] SendGrid for transactional emails
- [ ] Stripe for payments (if adding courses)
- [ ] ConvertKit for advanced email
- [ ] Zapier for automation
- [ ] Discord webhook notifications

---

**Setup Status:** In Progress  
**Last Updated:** March 9, 2026  
**Questions?** Refer to individual service docs or contact support
