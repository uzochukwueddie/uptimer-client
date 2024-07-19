import { FC, ReactElement } from "react";
import { useSSLHome } from "../hooks/useSSLHome";
import PageLoader from "@/components/PageLoader";
import Link from "next/link";
import SSLTable from "./SSLTable";
import Paginate from "@/components/Paginate";
import { FaCheckCircle } from "react-icons/fa";
import SSLButtonGroup from "./SSLButtonGroup";

const SSLHome: FC = (): ReactElement => {
  const { loading, monitors, limit, updateLimit } = useSSLHome();

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
        <div className="m-auto px-6 h-screen static min-h-screen xl:container md:px-12 lg:px-6">
          <>
            <div className="h-20 flex items-center justify-between">
              <SSLButtonGroup sslMonitors={monitors} />
              <Link
                href="/ssl/create"
                className="inline-flex px-4 py-2 text-base font-medium text-white rounded bg-green-400 md:items-center"
              >
                New SSL Test
              </Link>
            </div>
            {!loading && monitors.length > 0 ? (
              <>
                <div className="my-4">
                  <SSLTable limit={limit} monitors={monitors} />
                </div>
                <div className="my-4">
                  {monitors.length > 0 ? (
                    <Paginate
                      updateLimit={updateLimit}
                      length={monitors.length}
                      defaultLimit={limit.end}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </>
            ) : (
              <>
                {!loading && !monitors.length && (
                  <div className="h-[50%] flex flex-col items-center justify-center">
                    <FaCheckCircle className="text-[60px] text-green-400" />
                    <p className="text-base lg:text-lg py-2">
                      You have no SSL tests.
                    </p>
                    <Link
                      href="/ssl/create"
                      className="inline-flex items-center px-4 py-2 text-base font-medium text-white rounded bg-green-400"
                    >
                      New SSL Test
                    </Link>
                  </div>
                )}
              </>
            )}
          </>
        </div>
      )}
    </>
  );
};

export default SSLHome;
