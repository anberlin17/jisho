import Search from '@/ui/search-panel'

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <section role="search">
        <Search />
      </section>
      {children}
    </>
  )
}
