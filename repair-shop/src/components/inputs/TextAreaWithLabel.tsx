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
import { TextareaHTMLAttributes } from "react"
import { Textarea } from '@/components/ui/textarea'


type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  className?: string,
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextAreaWithLabel<S>({ fieldTitle, nameInSchema, className, ...props }: Props<S>) {
  const form = useFormContext()
  return (<FormField
    control={form.control}
    name={nameInSchema}
    render={({ field }) => {
      return (
        <FormItem>
          <FormLabel
            className="text-base mb-2"
            htmlFor={nameInSchema}
          >{fieldTitle}</FormLabel>
          <FormControl>
            <Textarea
              id={nameInSchema}
              // put other class names at the end of the list, that will let us overwrite any of these classes
              className={`disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
              {...props}
              // onchange and onblur
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )
    }}
  ></FormField>)
}
