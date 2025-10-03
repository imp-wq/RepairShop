import CustomerSearch from "./CustomerSearch"
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults"
import CustomerTable from "./CustomerTable"

export const metadata = {
  title: 'Customers Search'
}

export default async function Customers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const { searchText } = await searchParams
  if (!searchText) return <CustomerSearch />

  const results = await getCustomerSearchResults(searchText)
  return (
    <>
      <CustomerSearch />
      {results.length ? <CustomerTable data={results} /> : (
        <p className="mt-4">No Results Found</p>
      )}
    </>
  )
  // return results

}