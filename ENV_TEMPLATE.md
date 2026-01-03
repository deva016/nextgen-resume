# ==============================================
# Environment Variables Template
# ==============================================
# Copy this content to your .env.local file and fill in your actual values
# After Stripe removal, only these variables are required

# ==============================================
# DATABASE (PostgreSQL/Vercel Postgres)
# ==============================================
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NO_SSL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=

# ==============================================
# CLERK AUTHENTICATION (Required)
# ==============================================
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# ==============================================
# VERCEL BLOB STORAGE
# ==============================================
BLOB_READ_WRITE_TOKEN=

# ==============================================
# GOOGLE GEMINI API
# ==============================================
GEMINI_API_KEY=

# ==============================================
# APPLICATION
# ==============================================
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# ==============================================
# STRIPE - REMOVED
# ==============================================
# The following Stripe variables have been removed:
# - STRIPE_SECRET_KEY
# - STRIPE_WEBHOOK_SECRET
# - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
# - NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
# - NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY
