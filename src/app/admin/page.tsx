import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <h1>Admin</h1>
      <ul>
        <li>
          <Link href="/admin/collections">Manage collections</Link>
        </li>
        <li>
          <Link href="/admin/lyrics">Manage song lyrics</Link>
        </li>
        <li>
          <Link href="/admin/novels">Manage novels</Link>
        </li>
      </ul>
    </main>
  )
}
