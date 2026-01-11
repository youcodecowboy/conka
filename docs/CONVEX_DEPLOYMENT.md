# Convex Deployment

## Deploying to Production

To deploy Convex functions and schema changes to production:

```bash
npx convex deploy --yes
```

This command:
- Pushes all functions in `convex/` directory
- Deploys schema changes from `convex/schema.ts`
- Creates new tables and indexes as defined in the schema
- Updates existing functions with code changes

## What Gets Deployed

- **Functions**: All files in `convex/` (e.g., `convex/winEntries.ts`)
- **Schema**: Table definitions and indexes from `convex/schema.ts`
- **Types**: Auto-generated TypeScript types in `convex/_generated/`

## Important Notes

- Schema changes (new tables/indexes) are applied automatically when you deploy
- Always deploy after adding new indexes to avoid runtime errors
- The `--yes` flag skips the confirmation prompt

## Verifying Deployment

After deploying, check the output for:
- `✔ Added table indexes:` - confirms new indexes were created
- `✔ Deployed Convex functions to [url]` - confirms successful deployment
