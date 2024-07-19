import clsx from 'clsx';
import Link from 'next/link'
import { FC, ReactElement, useEffect, useRef, useState } from 'react';
import { FaAlignJustify, FaTimes, FaTv } from 'react-icons/fa';

const IndexHeader: FC = (): ReactElement => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if(!headerRef.current) {
      return;
    }
    const resizeObserver: ResizeObserver = new ResizeObserver(() => {
      setMenuOpen(false);
    });
    resizeObserver.observe(headerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="relative z-[120] w-full border-b bg-white shadow-2xl shadow-gray-600/5 backdrop-blur dark:shadow-none" ref={headerRef}>
      <div className="m-auto px-6 xl:container md:px-12 lg:px-6">
        <div className="relative py-4 flex flex-wrap items-center justify-between gap-6 md:gap-0">
          <div className="flex w-full gap-x-4 lg:w-6/12">
            <div className="w-full flex justify-between items-center">
              <Link href="/" className="relative z-10 flex items-center gap-2 cursor-pointer justify-center self-center text-2xl font-semibold text-[#4aa1f3]">
                <FaTv />
                Uptimer
              </Link>
              <label
                htmlFor="hbr"
                className="peer-checked:hamburger relative z-20 block cursor-pointer lg:hidden"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <div className="space-y-2">
                  {!menuOpen ? (
                    <FaAlignJustify className="text-2xl block text-gray-600" />
                  ) : (
                    <FaTimes className="text-2xl block text-gray-600" />
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className={clsx(
            'navmenu w-full cursor-pointer z-50 flex-wrap items-center justify-end space-y-8 rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl lg:m-0 lg:flex lg:w-6/12 lg:space-y-0 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none',
            {
              'flex top-[64px] absolute': menuOpen,
              'hidden': !menuOpen
            }
          )}>
            <div className="text-[#74767e] lg:pr-4 w-full lg:w-auto">
              <ul className="flex flex-col lg:flex-row gap-4 text-base font-medium w-full lg:w-auto">
                <li className={clsx(
                  'z-50 flex cursor-pointer items-center relative h-9 justify-center rounded-full bg-green-500 text-white font-bold sm:px-6 hover:bg-green-400',
                  {
                    'ml-auto': !menuOpen
                  }
                )}>
                  <Link href="/login" className="z-50 mx-5">Login</Link>
                </li>
                <li className={clsx(
                  'z-50 flex cursor-pointer items-center relative h-9 justify-center rounded-full bg-green-500 text-white font-bold sm:px-6 hover:bg-green-400',
                  {
                    'ml-auto': !menuOpen
                  }
                )}>
                  <Link href="/create-account" className="z-50">Create an Account</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexHeader;
