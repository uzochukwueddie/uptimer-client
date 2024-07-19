import Link from 'next/link';
import { FC, ReactElement } from 'react';
import { useViewContact } from '../hooks/useViewContact';
import { INotification } from '@/interfaces/notification.interface';
import Button from '@/components/Button';
import { FaPencilAlt, FaRegEnvelopeOpen, FaTrashAlt } from 'react-icons/fa';

const ContactGroupView: FC = (): ReactElement => {
  const { notifications, deleteGroup } = useViewContact();

  return (
    <div className="m-auto px-6 h-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <div className="h-20 flex items-center justify-end">
        <Link
          href="/contact/create"
          className="inline-flex px-4 py-2 text-base font-medium text-white rounded bg-green-400 md:items-center"
        >
          New Notification Group
        </Link>
      </div>
      <div className="my-4">
        <div className="relative overflow-x-auto">
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Group Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Integrations
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification: INotification) => {
                const emailsGroup = JSON.parse(notification.emails);

                return (
                  <tr key={notification.id} className="bg-white">
                    <td className="px-6 py-4 font-medium cursor-pointer text-[#1e8dee]">{notification.groupName}</td>
                    <td className="px-6 py-4 font-medium cursor-pointer text-[#1e8dee]">
                      <Button
                        label={`${emailsGroup.length}`}
                        icon={<FaRegEnvelopeOpen />}
                        className="inline-flex gap-2 items-center px-2 py-1 text-sm text-white rounded border bg-[#1e8dee]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex shadow-sm" role="group">
                        <Link 
                          href={`/contact/edit/${notification.id}`}
                          className="mr-1 inline-flex gap-2 items-center px-4 py-2 text-sm font-bold text-white rounded border bg-[#1e8dee] hover:bg-[#7fbef5]"
                        >
                          <FaPencilAlt />
                        </Link>
                        <Button
                          onClick={() => deleteGroup(parseInt(`${notification.id}`))}
                          icon={<FaTrashAlt />}
                          className="mr-1 inline-flex gap-2 items-center px-4 py-2 text-sm text-white rounded border bg-red-600 hover:bg-red-400"
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ContactGroupView;