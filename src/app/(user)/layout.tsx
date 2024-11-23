import {Navbar} from '~/components/nav/navbar'

export default function UserLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
