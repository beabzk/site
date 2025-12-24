---
description: how to add a new theme to the website
---

# Adding a New Theme

To add a new theme to the website, follow these steps:

1. **Open `src/contexts/ThemeContext.tsx`**.
2. **Add the theme key** to the `Theme` union type:
   ```typescript
   type Theme = | "emerald" | "amber" | "sapphire" | "rose" | "slate" | "paper" | "your-new-theme";
   ```
3. **Define the theme palette** in the `themes` object:
   ```typescript
   "your-new-theme": {
     name: "Your Theme Name",
     value: "your-new-theme" as Theme,
     colors: {
       background: "#...",
       backgroundSecondary: "#...",
       backgroundTertiary: "#...",
       textPrimary: "#...",
       textSecondary: "#...",
       textTertiary: "#...",
       accent: "#...",
       accentSecondary: "#...",
     },
     meta: {
       isLight: false, // Set to true if it's a light theme
       description: "A brief description"
     }
   }
   ```
4. **Verification**:
   - Restart the dev server.
   - Use the Theme Switcher in the navigation to select your new theme.
   - Check all pages to ensure the color contrast is sufficient.

> [!TIP]
> Use the `slate` or `paper` themes as templates for dark/light variations respectively.
