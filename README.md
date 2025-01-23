# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.








# Supabase (Public Variables - Safe to expose in client-side code)
NUXT_PUBLIC_SUPABASE_URL=https://yxeavcmexxnrgtbecpyz.supabase.co
NUXT_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4ZWF2Y21leHhucmd0YmVjcHl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU3NDAyMjQsImV4cCI6MjA1MTMxNjIyNH0.eAAETUusArp3cCZ-1YIHNv8d0Hw7mH7e9ETmpQfR0WU

# Supabase (Private Variables - Server-side only, keep these secret)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4ZWF2Y21leHhucmd0YmVjcHl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTc0MDIyNCwiZXhwIjoyMDUxMzE2MjI0fQ.EalQPu8E6A1Xouxr2GuuTxqKJYFHOuGwBiCdlfgHJcg

# MinIO Configuration
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_USE_SSL=false
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=xpost-files

# TinyMCE API Key
TINYMCE_API_KEY=bbhvscv2uvis9ux7clsseuhcwy81djxylz401h2jsrrbpt6a

# Server Configuration
PORT=3000

