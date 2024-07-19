import { IPagination } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import React, { FC, ReactElement, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface PaginateProps {
  updateLimit: (newLimit: IPagination) => void;
  defaultLimit: number;
  length: number;
}

const Paginate: FC<PaginateProps> = ({
  length,
  defaultLimit,
  updateLimit,
}): ReactElement => {
  const [limit] = useState<number>(defaultLimit);
  const [page, setPage] = useState<number>(1);

  function pageLimit(): number {
    return Math.floor(length / limit) + (length % limit > 0 ? 1 : 0);
  }

  function updatePage(value: number): void {
    setPage(value);
    updateLimit({
      start: limit * (value - 1),
      end: limit * value,
    });
  }

  return (
    <div className="inline-flex gap-4 text-sm">
      <div
        onClick={() => updatePage(page - 1)}
        className={clsx(
          "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300",
          {
            "cursor-none pointer-events-none": page === 1,
            "cursor-pointer": page > 1,
          }
        )}
      >
        <FaAngleLeft />
      </div>
      <div className="flex gap-2 items-center">
        <div>Page</div>
        <div>
          {page} of {pageLimit()}
        </div>
      </div>
      <div
        onClick={() => updatePage(page + 1)}
        className={clsx(
          "flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300",
          {
            "cursor-none pointer-events-none": !(page < pageLimit()),
            "cursor-pointer": page < pageLimit(),
          }
        )}
      >
        <FaAngleRight />
      </div>
    </div>
  );
};

export default Paginate;
