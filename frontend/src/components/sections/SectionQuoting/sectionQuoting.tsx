import React, { useRef } from 'react'
import './sectionquoting.css';
import { useEffect, useState } from 'react';
import { adminAuth, getAllUsers } from '../../../services';
import { download, upload } from '../../../assets';
import { RequestsModal, UserScrollable } from '../../index';
import { UserDBData } from '../../../types/userModel';

interface SectionQuotingProps {
  pageFont: number
}

function SectionQuoting({ pageFont }: SectionQuotingProps) {
  const [searchValue, setSearchValue] = useState("");
  const [users, setUsers] = useState<UserDBData[]>([]);
  const [isRequestsModalOpen, setRequestsModalOpen] = useState<boolean>(false);
  const [requestUserId, setRequestUserId] = useState('');
  const [requestUserName, setRequestUserName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value)
  }
  const handleOpenRequestsModal = (id:string, userName:string) => {
    setRequestUserId(id);
    setRequestUserName(userName)
    setRequestsModalOpen(true);
  }
  const handleCloseRequestsModal = () => {
    setRequestsModalOpen(false);
  }

  // gets user session on reload
  useEffect(() => {
    const load = async () => {
      const result = await adminAuth(); // Immediately invoke the async function
      if (result) {
        const allUsers: UserDBData[] = await getAllUsers();
        allUsers.sort((a, b) => (a.displayName < b.displayName ? -1 : 1))
        setUsers(allUsers);
      } else {
        console.error(result);
      }
    }
    load();
  }, [])

  return (
    <>
      <div className="fileQuoting--container" style={{ fontSize: `${pageFont}rem` }}>

        <input className="fileQuoting--userList-searchbar" type="text" placeholder="search names" onChange={e => { handleInputChange(e) }} ></input>
        <div className='fileQuoting--userList-label'>
          <div>Nome</div>
          <div>Arquivos a cotar</div>
        </div>
        <div className="fileQuoting--userList" role="list">
          {users.map((user: UserDBData) => {
            return (
              <div className='fileQuoting--userList-item' role="listitem" key={user.id} onClick={() => handleOpenRequestsModal(user.id, user.displayName)}>
                <div>{user.displayName}</div>
                <div className='fileQuoting--userList-item-number'>{user.reqCount}</div>
              </div>
            )
          })}
        </div>

        <RequestsModal
          userName={requestUserName}
          userId={requestUserId}
          isOpen={isRequestsModalOpen}
          hasCloseBtn={true}
          onClose={handleCloseRequestsModal}
        />
      </div>
    </>
  )
}

export default SectionQuoting