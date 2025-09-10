'use client'
import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { InputHTMLAttributes } from "react"

type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  className?: string,
} & InputHTMLAttributes<HTMLInputElement>

export function InputWithLabel<S>({
  fieldTitle, nameInSchema, className, ...props
}: Props<S>) {
  const form = useFormContext()
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => {
        console.log(field)
        return (
          <FormItem>
            <FormLabel
              className="text-base"
              htmlFor={nameInSchema}
            >{fieldTitle}</FormLabel>
            <FormControl>
              <Input
                id={nameInSchema}
                // put other class names at the end of the list, that will let us overwrite any of these classes
                className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
                {...props}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    ></FormField>
  )
}

