import Link from "next/link";

 
export default function DashboardLayout({ children }: {children: React.ReactNode}) {
  return (
    <>
    <nav className="flex flex-row gap-2 items-center mt-4">
        <Link className="bg-gray-200 rounded-lg px-4 py-2" href="/dashboard">Profile</Link>
        <Link className="bg-gray-200 rounded-lg px-4 py-2" href="/dashboard/orders">Orders</Link>
    </nav>
      <main>{children}</main>
    </>
  )
}