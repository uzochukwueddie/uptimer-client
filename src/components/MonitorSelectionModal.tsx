import { useRouter } from "next/navigation";
import React, { FC, ReactElement } from "react";
import Button from "./Button";
import UptimeGroupBtn from "./UptimeGroupBtn";

const MONITOR_TYPES = ["HTTP", "TCP", "Redis", "MongoDB"];

type MonitorSelectionProp = {
  onClose: () => void;
};

const MonitorSelectionModal: FC<MonitorSelectionProp> = ({
  onClose,
}): ReactElement => {
  const router = useRouter();

  return (
    <div className="absolute left-0 top-0 right-0 bottom-0 h-full w-full z-50 overflow-hidden">
      <div className="py-2 z-10 absolute top-0 right-0 left-0 bottom-0 bg-black/[.65]">
        <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
          <div className="relative bottom-auto left-auto right-auto top-auto max-h-[90vh] max-w-[400px] bg-white p-4 text-[#404145]">
            <div className="border-grey mb-[10px] w-full border-b text-left">
              <h4 className="text-[17px] font-bold">Select Monitor Type</h4>
            </div>
            <div className="mb-5 text-base">
              <UptimeGroupBtn
                buttonsText={MONITOR_TYPES}
                labelText=""
                type="string"
                onClick={(event: string) => {
                  router.push(`/uptime/${event.toLowerCase()}/create`);
                }}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button
                className="rounded bg-gray-200 px-6 py-3 text-center text-sm font-bold text-black focus:outline-none md:px-4 md:py-2 md:text-base"
                label="Cancel"
                onClick={onClose}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorSelectionModal;
