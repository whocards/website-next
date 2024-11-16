import {PurchasesTable} from '~/features/purchases/PurchasesTable'

export default async function AdminPage() {
  // const session = await protectedRoute()

  return (
    <div className='container mx-auto p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Admin Dashboard</h1>
      <div>
        {/* <p>Welcome, {session.user?.name}</p> */}
        {/* Add your admin content here */}
        <PurchasesTable />
      </div>
    </div>
  )
}
