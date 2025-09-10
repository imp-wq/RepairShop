## Data Validation
## React Hook Form
- pass in the submit form function in `handleSubmit`
```ts
  async function submitForm(data: insertCustomerSchemaType) {
    console.log(data)
  }
```

```tsx
<form
          onSubmit={form.handleSubmit(submitForm)}
>
```
- create form with React Hook Form and ShadCN:
	[ShadCN Docs](https://ui.shadcn.com/docs/components/form)
- create schema for RHF validation:
	```ts
	import { createInsertSchema, createSelectSchema } from "drizzle-zod"
	import { customers } from "@/db/schema"
	import { z } from "zod"
	
	export const insertCustomerSchema = createInsertSchema(customers, {
	firstName: (schema) => schema.min(1, "First name is required"),
	lastName: (schema) => schema.min(1, "Last name is required"),
	address1: (schema) => schema.min(1, "Address is required"),
	city: (schema) => schema.min(1, "City is required"),
	state: (schema) => schema.min(2, "State must be 2 or 3 characters").max(3, "State must be 2 or 3 characters"),
	email: (schema) => z.email("Invalid email address"),
	zip: (schema) => schema.regex(/^\d{5}(-\d{4})?$/, "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits"),
	phone: (schema) => schema.regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number format. Use XXX-XXX-XXXX"),
	})
	
	export const selectCustomerSchema = createSelectSchema(customers)
	
	export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>
	
	export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>
	```
	- `insertCustomerSchema` adds **additional validations** on top of the existing schema `customers`
	- Use created schema in RHF with `zodResolver`:
		- Code
			```ts
			const form = useForm<insertCustomerSchemaType>({
			mode: 'onBlur',
			resolver: zodResolver(insertCustomerSchema),
			defaultValues
			})
			```
		- 
## Data Flow of Forms
1. get customer/ticket id from the search parameters
2. get customer/ticket info from database(by drizzle queries)
3. pass this info to the form components
4. form components display UI based on given info

## ClassName
```tsx
 <Input
              id={nameInSchema}
              // put other class names at the end of the list, that will let us overwrite any of these classes
              className={``}
            /S>
```
## Components with Generic
```tsx
<InputWithLabel<insertCustomerSchemaType>
              fieldTitle="First Name"
              nameInSchema="firstName"
            />
```
- props definition:
```ts
type Props<S> = {
fieldTitle: string,
nameInSchema: keyof S & string,
className?: string,
} & InputHTMLAttributes<HTMLInputElement>
```
