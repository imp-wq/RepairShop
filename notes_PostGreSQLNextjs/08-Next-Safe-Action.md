## Next Safe Action
- Optional fields in when creating an object:
	```ts
		   const result = await db.insert(customers).values({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address1: customer.address1,
        ...(customer.address2?.trim() ? { address2: customer.address2 } : {}),
        city: customer.city,
      })
    }
	```
- create server actions for database operation:
	[Server Components – React](https://react.dev/reference/rsc/server-components)
	[Getting Started: Updating Data | Next.js](https://nextjs.org/docs/app/getting-started/updating-data)
- Generally we don't **display database errors** to customers, because we don't want to give away those database details.
	```ts
  handleServerError(e, utils) {
	  // Look at the constructor name of database errors
      console.log("Error in safe-action:", e.constructor.name);
    const { clientInput, metadata } = utils
    Sentry.captureException(e, (scope) => {
      scope.clear()
      scope.setContext('serverError', { message: e.message, stack: e.stack })
      scope.setContext('metadata', { actionName: metadata.actionName })
      scope.setContext('clientInput', { clientInput })
      return scope
    })

	// DO NOT give away details of database errors!
    if (e.constructor.name === 'DrizzleQueryError') {
      return "Database Error: Your data did not save correctly. Support will be notified."
    }

    return e.message
  }
	```





