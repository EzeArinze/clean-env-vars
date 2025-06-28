# clean-env-vars

A dev utility that scans .env files and:

- ✅ Detects unused environment variables
- ✅ Validates presence of required keys
- ✅ Supports both `process.env.*` and `import.meta.env.*` patterns

## Installation

```bash
# Install globally
npm install -g clean-env-vars

# Or use with npx (no installation required)
npx clean-env-vars --check
```

## Usage

```bash
# If installed globally
clean-env-vars --check

# Or with npx
npx clean-env-vars --check
```

### Example Output

**When everything is in order:**

```bash
✅ All environment variables are properly documented!
```

**When issues are found:**

```bash
🧹 Unused variables in .env:
- UNUSED_VAR
- OLD_API_KEY

🔍 Missing variables in .env.example:
- DATABASE_URL
- API_SECRET
```

**When .env.example doesn't exist:**

```bash
⚠️  No .env.example file found. Consider creating one with these variables:
- DATABASE_URL
- API_SECRET

💡 Tip: Create a .env.example file to document required environment variables for your team.
```

## Features

### ✅ MVP Features (v0.1)

- Load `.env` and `.env.example` files
- Gracefully handle missing `.env` or `.env.example` files
- Scan your codebase for env usage (`process.env.*` and `import.meta.env.*`)
- Report missing required vars in `.env.example`
- Report extra/unused vars in `.env`
- Fast file discovery with `fast-glob`
- Supports TypeScript, JavaScript, JSX, and TSX files
- Helpful suggestions and tips

### 🚧 Planned Features

- `--generate` flag to auto-create `.env.example`
- Custom scan directories
- Configuration file support
- Integration with CI/CD pipelines

## How It Works

1. **Parse** your `.env` and `.env.example` files
2. **Scan** your source code for `process.env.*` and `import.meta.env.*` usage
3. **Compare** and report:
   - Variables in `.env` but not used in code (unused)
   - Variables used in code but missing from `.env.example` (missing)

## Configuration

By default, the tool scans the `src/` directory for TypeScript and JavaScript files. It ignores:

- `node_modules/`
- `dist/`
- `build/`

## Contributing

This is an MVP. Pull requests welcome!

## License

MIT
