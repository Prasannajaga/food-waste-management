app/
├── layout.tsx                    # Root layout — wraps everything (fonts, html, etc.)
├── globals.css                   # Global styles
│
├── (auth)/                       # Authenticated (protected) routes
│   ├── layout.tsx                # Layout with sidebar + session check
│   ├── dashboard/
│   │   └── page.tsx              # Example protected page
│   ├── profile/
│       └── page.tsx              # Another protected page
│
├── (public)/                     # Public routes (login, register, etc.)
│   ├── layout.tsx                # Layout without sidebar
│   ├── login/
│   │   └── page.tsx              # Login page
│   ├── register/
│       └── page.tsx              # Registration page
│
├── api/
│   └── auth/
│       └── [...nextauth]/route.ts # NextAuth API route
