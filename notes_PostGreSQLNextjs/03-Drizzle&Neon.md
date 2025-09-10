### Connect to Neon
- environment variables
- create `db` folder:
	- `/db`
		- `index.ts`: connect to database, create db instance, config env file.
		```ts
		import { neon } from '@neondatabase/serverless';
		import { config } from 'dotenv';
		import { drizzle } from 'drizzle-orm/neon-http';
		
		config({ path: '.env.local' })
		const sql = neon(process.env.DATABASE_URL!);
		
		// logger
		// const db = drizzle(sql, { logger: true })
		const db = drizzle({ client: sql });
		
		export { db }		
		```
		- `schema.ts`

				
### Create Schemas
[Schemas in Drizzle](https://orm.drizzle.team/docs/sql-schema-declaration#shape-your-data-schema)
- `$onupdate` method
- serial
```ts
import { pgTable, serial, text, varchar, boolean, timestamp } from "drizzle-orm/pg-core";

export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name").notNull(),
  lastName: varchar("last_name").notNull(),
  email: varchar("email").unique().notNull(),
  phone: varchar("phone").unique().notNull(),
  address1: varchar("address1").notNull(),
  address2: varchar("address2"),
  city: varchar("city").notNull(),
  state: varchar("state", { length: 2 }).notNull(),
  zip: varchar("zip", { length: 10 }).notNull(),
  notes: text("notes"),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

```

- relations: 
[drizzle relations](https://orm.drizzle.team/docs/relations)
```ts
// Create relations
export const customersRelations = relations(customers, ({ many }) => ({
  tickets: many(tickets)
}))

export const ticketsRelations = relations(tickets, ({ one }) => ({
  customers: one(customers, {
    fields: [tickets.customerId],
    references: [customers.id]
  })
}))
```
### Infer Schema Type
```ts
export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>
```
- [inferring-types](https://zod.dev/basics#inferring-types)
- 
### Migrations
- Define `drizzle.config.ts` file and apply migrations
	[Migrations](https://orm.drizzle.team/docs/drizzle-config-file)
	- In generated `Meta` directory, it tracks the changes, so in next time migration, it knows what has happened in the past.
	- 













