import { FC, ReactElement } from 'react';

const HomeSkeleton: FC = (): ReactElement => {
  return (
    <>
      <div className="m-auto pr-6 h-screen relative min-h-screen xl:container">
        <div className="h-20 flex flex-col gap-y-3 mb-4 mt-2 md:items-center md:justify-between md:flex-row md:mb-0 md:mt-0">
          <div className="inline-flex" role="group">
            {[1, 2, 3].map((_, index: number) => (
              <div key={index} className="mr-1 inline-flex items-center px-6 py-4 text-sm font-bold rounded bg-lightGray"></div>
            ))}
          </div>
          <div className="inline-flex px-6 py-4 text-base font-medium rounded bg-lightGray md:items-center"></div>
        </div>
        <div className="h-44 flex flex-col items-start justify-start bg-lightGray lg:flex-row lg:items-center lg:justify-between lg:h-20">
          <div className="inline-flex items-center px-4 py-2 cursor-pointer text-base font-medium bg-lightGray rounded mb-3 lg:mb-0" />
        </div>
        <div className="my-4">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3 w-[15%]">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3 w-[15%]">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="px-6 py-4 bg-lightGray"></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...Array(20).keys()].map((_, index: number) => (
                <tr key={index} className={`${index % 2 === 0 ? '' : 'bg-lightGray'}`}>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                  <td className="px-6 py-4"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default HomeSkeleton;
