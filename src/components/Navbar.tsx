import Link from 'next/link'
import MaxWidthWrapper from './MaxWidthWrapper'
import { buttonVariants } from './ui/button'
import { ArrowRight } from 'lucide-react'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

const Navbar = async () => {
  const { getUser } = getKindeServerSession()
  const user = await getUser()

  const isLoggedIn = true;

  const isAdmin = user?.email === process.env.ADMIN_EMAIL
  
  

  return (
    <nav className='sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
  <MaxWidthWrapper>
    <div className='flex h-14 items-center justify-between border-b border-zinc-200 '>
      <Link href='/' className='flex z-40 font-semibold text-green-600 font-montserrat-alternates '>
        <img src='https://i.postimg.cc/8zWF8SPt/image-removebg-preview.png' alt='' className="h-20 w-auto" />
      </Link>

          <div className='flex space-x-5'>
          <Link href='/configure/pro' className='text-gray-600 flex z-40 font-semibold'>
              Products
            </Link>
            
            
            <Link href='/api/company' className='text-gray-600 flex z-40 font-semibold'>
              Company
            </Link>
            <Link href='/configure/catalogue' className='text-gray-600 flex z-40 font-semibold'>
              Catalogue
            </Link>
            <Link href='/about' className='text-gray-600 flex z-40 font-semibold'>
              About Us
            </Link>
          </div>



          <div className='h-full flex items-center space-x-4'>
            {user ? (
              <>
                <Link
                  href='/api/auth/logout'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign out
                </Link>
                {isLoggedIn ? (
                  <Link
                    href='/configure/dash'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Dashboard ✨
                  </Link>
                ) : null}
                <Link
                  href='/configure/pro'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Create swag
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href='/api/auth/register'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Sign up
                </Link>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Login
                </Link>

                <div className='h-8 w-px bg-zinc-200 hidden sm:block' />

                <Link
                  href='/configure/upload'
                  className={buttonVariants({
                    size: 'sm',
                    className: 'hidden sm:flex items-center gap-1',
                  })}>
                  Create swag
                  <ArrowRight className='ml-1.5 h-5 w-5' />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
