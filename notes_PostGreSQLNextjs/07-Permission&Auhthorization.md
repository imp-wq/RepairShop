- kinde/management-api-js
	- Create a new application(M2M) in kinde 
- Kinde Permission Mechanism:
	- You can assignment permissions to roles
	- Any time you assign a role to a user, they will automatically get all the permissions assigned to that role
	- In this system, we will give every admin a manager permission as well


### Form - isEditable
- a value passed from the server component to the client component
- New customer is active by default:
	```ts
	{isLoading ? <p>Loading...</p> : isManager && customer?.id ? (
              <CheckboxWithLabel<insertCustomerSchemaType>
                fieldTitle="Active"
                nameInSchema="active"
                message="Yes"
              />) : null}
	```

- Compare email without case sensitive:
	```ts
	const isEditable = user?.email?.toLowerCase() === ticket.tech.toLowerCase()
	```


