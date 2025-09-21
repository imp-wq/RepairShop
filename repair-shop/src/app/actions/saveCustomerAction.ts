"use server"

import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertCustomerSchema, insertCustomerSchemaType } from "@/zod-schemas/customers";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm/sql";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveCustomerAction = actionClient
  .metadata({ actionName: 'saveCustomerAction' })
  .inputSchema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
  })
  .action(async ({
    parsedInput: customer
  }: {
    parsedInput: insertCustomerSchemaType
  }) => {
    const { isAuthenticated } = getKindeServerSession()

    const isAuth = await isAuthenticated()
    if (!isAuth) {
      redirect('/login')
    }


    // Create new customer
    if (customer.id === 0) {
      try {
        const result = await db.insert(customers).values({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phone: customer.phone,
          address1: customer.address1,
          ...(customer.address2?.trim() ? { address2: customer.address2 } : {}),
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          ...(customer.notes?.trim() ? { notes: customer.notes } : {}),
        })
          // return the customer id
          .returning({ insertedId: customers.id })
        return { message: `Customer ID ${result[0].insertedId} created successfully` }

      } catch (err: any) {
        const cause = err?.cause ?? err; // Drizzle wraps pg error under cause
        console.error('Insert failed', {
          message: err?.message,
          pgCode: cause?.code,           // e.g. 23505
          pgMessage: cause?.message,     // full text message
          detail: cause?.detail,         // e.g. Key (email)=(...) already exists
          constraint: cause?.constraint, // e.g. customers_email_key
          table: cause?.table,
        });
        throw err;
      }

    }

    // Update existing customer
    const result = await db.update(customers)
      .set({
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        address1: customer.address1,
        address2: customer.address2 ?? null,
        city: customer.city,
        state: customer.state,
        zip: customer.zip,
        notes: customer.notes ?? null,
      })
      .where(eq(customers.id, customer.id!))
      .returning({ updatedId: customers.id })
    return {
      message: `Customer ID ${result[0].updatedId} updated successfully`,
      active: customer.active
    }
  })