import React, { useEffect, useRef, useState } from 'react'
import './modal.css';
import getUserRequests from '../../services/getUserRequests';
import { requestData } from '../../types/requestModel';
import Collapsible from './Collapsible/collapsible';

interface ModalProps {
  userName: string
  userId: string
  userEmail: string
  isOpen: boolean;
  hasCloseBtn?: boolean;
  onClose?: () => void;
}


function RequestsModal({ userName, userId, userEmail, isOpen, hasCloseBtn, onClose }: ModalProps) {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const [userRequests, setUserRequests] = useState([]);
  const getRequests = async (id: string) => {
    const resultData = await getUserRequests(id);
    if (resultData) {
      setUserRequests(resultData)
      console.log(resultData);
    } else {
      console.error("Something went wrong...");
    }
  }

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        getRequests(userId);
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
      setUserRequests([]);
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  return (
    <>
      <dialog ref={modalRef} className="modal" onKeyDown={handleKeyDown}>
        <div className="modal-header">
          <div>{userName} ({userEmail})</div>
          {hasCloseBtn && (
            <button className="modal-close-btn" onClick={handleCloseModal}>
              Close
            </button>
          )}
        </div>
        <div className="modal-list" role="list">
          <div className='modal-list-label'>
            <div>Título</div>
            <div>Orçamento</div>
          </div>
          {userRequests.map((request: requestData) => {
            return (
              <div role="listitem" key={request.id}>
                <Collapsible
                  title={request.title}
                  pending={request.pending}
                  url={request.url}
                  price={request.price}
                  id={request.id}
                />
              </div>
            )
          })}
        </div>
      </dialog>
    </>
  )
}

export default RequestsModal