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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

type DataObj = Array<{ id: string, description: string }>

type Props<S> = {
  fieldTitle: string,
  nameInSchema: keyof S & string,
  data: DataObj,
  className?: string,
}

export function SelectWithLabel<S>({
  fieldTitle, nameInSchema, data, className
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
            >{fieldTitle}
            </FormLabel>

            <Select
              {...field}
              onValueChange={field.onChange} >

              <FormControl>
                <SelectTrigger
                  id={nameInSchema}
                  // put other class names at the end of the list, that will let us overwrite any of these classes
                  className={`w-full max-w-xs ${className}`}
                >

                  <SelectValue
                    placeholder="Select a state"
                  />
                </SelectTrigger>
              </FormControl>

              <SelectContent>
                {data.map((obj) => (
                  // Avoid using duplicate keys
                  <SelectItem key={obj.id} value={obj.id}>
                    {obj.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    ></FormField>
  )
}

