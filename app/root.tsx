import globalStylesUrl from '~/styles/global.css'
import { ReactNode } from 'react'
import { Outlet, LiveReload, Link } from 'remix'

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  )
}

function Document({
  children,
  title
}: {
  children: ReactNode
  title?: ReactNode
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='stylesheet' href={globalStylesUrl} />
        <title>{title ? title : 'Remix Blog'}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === 'development' ? <LiveReload /> : null}
      </body>
    </html>
  )
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='logo'>
          Remix
        </Link>

        <ul className='nav'>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
        </ul>
      </nav>

      <div className='container'>{children}</div>
    </>
  )
}
