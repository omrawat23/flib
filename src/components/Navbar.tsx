import Link from 'next/link';
import MaxWidthWrapper from './MaxWidthWrapper';
import { buttonVariants } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isLoggedIn = true;

  return (
    <nav className='sticky z-[100] inset-x-0 top- w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all'>
      <MaxWidthWrapper>
        <div className='flex items-center justify-between py-1 sm:py-1 border-b border-zinc-200 relative'>
          <Link href='/' className='flex font-semibold text-green-600 font-montserrat-alternates'>
            <img src='https://i.postimg.cc/8zWF8SPt/image-removebg-preview.png' alt='' className="h-16 w-auto" />
          </Link>


          <div className='hidden sm:flex space-x-4 sm:space-x-5'>
            <Link href='/configure/pro' className='text-gray-600 flex font-semibold'>
              Products
            </Link>
            <Link href='/api/company' className='text-gray-600 flex font-semibold'>
              Company
            </Link>
            <Link href='/configure/catalogue' className='text-gray-600 flex font-semibold'>
              Catalogue
            </Link>
            <Link href='/about' className='text-gray-600 flex font-semibold'>
              About Us
            </Link>
          </div>

          <div className='flex items-center space-x-4'>
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
                {/* Adjusting the positioning of signup and login buttons */}
                <div className="mr-4">
                  <Link
                    href='/api/auth/register'
                    className={buttonVariants({
                      size: 'sm',
                      variant: 'ghost',
                    })}>
                    Sign up
                  </Link>
                </div>

                <Link
                  href='/api/auth/login'
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                  })}>
                  Login
                </Link>

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
        {/* Row of links */}
        <div className="sm:hidden flex flex-row justify-center mt-1">
          <Link href='/configure/pro' className='text-gray-600 font-semibold mx-2'>
            Products
          </Link>
          <Link href='/api/company' className='text-gray-600 font-semibold mx-2'>
            Company
          </Link>
          <Link href='/configure/catalogue' className='text-gray-600 font-semibold mx-2'>
            Catalogue
          </Link>
          <Link href='/about' className='text-gray-600 font-semibold mx-2'>
            About Us
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
