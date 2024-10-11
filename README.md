# Prisma on Deno

An example of Deno 2 with Prisma, using Sqlite as the database.

## Development

### Create `.env` file

Add the following to the `.env` file:

```bash
DATABASE_URL="file:./dev.db"
```

## Setup

```bash
deno install # (Follow direcitons in command line if you have to given additional permissions)
deno task prisma:generate
```

## Run test to see Prisma on Deno

This is a basic example of how to use Prisma on Deno with TypeScript types.

```bash
deno task test
```

## Notes

The `prisma/patch.ts` file is needed to be modify the TypeScript definition from Prisma so Deno is able to resolve some of the types for the Prisma client.
