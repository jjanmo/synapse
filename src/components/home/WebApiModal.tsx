import type { WebApiItem } from '@/types/scrape';
import { useEffect, useRef, type FC } from 'react';

interface Props {
  webApiList: WebApiItem[];
  isOpen: boolean;
  title: string;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
}

const WebApiModal: FC<Props> = ({ webApiList, isOpen, title, onClose, closeOnBackdropClick = true }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // isOpen 상태와 실제 <dialog> 모달 상태 동기화
    if (isOpen && !dialog.open) {
      try {
        dialog.showModal();
      } catch {
        // 이미 열린 상태에서 showModal 호출 시 에러 방지
      }
    }
    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onClose();
    };

    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  // 백드롭(overlay) 클릭 시 닫기
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !closeOnBackdropClick) return;

    const handleClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const clickedInsideDialog =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      if (!clickedInsideDialog) {
        onClose();
      }
    };

    dialog.addEventListener('click', handleClick);
    return () => {
      dialog.removeEventListener('click', handleClick);
    };
  }, [onClose, closeOnBackdropClick]);

  return (
    <dialog ref={dialogRef} aria-labelledby="webapi-modal-title">
      <div>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 id="webapi-modal-title">{title}</h3>
          <button type="button" onClick={onClose}>
            닫기
          </button>
        </header>
        <ul>
          {webApiList.map((webApi) => (
            <li key={webApi.id}>{webApi.title}</li>
          ))}
        </ul>
      </div>
    </dialog>
  );
};

export default WebApiModal;
