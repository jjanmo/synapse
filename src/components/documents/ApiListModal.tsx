import type { ScrapedWebApiItem } from '@/types/webapis';
import { useEffect, useRef } from 'react';
import { File, X } from 'lucide-react';
import Link from 'next/link';
import type { Nullable } from '@/types/common';
import styles from '@/components/documents/ApiListModal.module.css';

interface Props {
  title: string;
  apiList: ScrapedWebApiItem[];
  isOpen: boolean;
  onCloseModal: VoidFunction;
  closeOnOverlayClick?: boolean;
}

const ApiListModal = ({ apiList, isOpen, title, onCloseModal, closeOnOverlayClick = true }: Props) => {
  const dialogRef = useRef<Nullable<HTMLDialogElement>>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  /** isOpen 상태와 dialog 모달 상태 동기화 */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    }
    if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  /** esc로 닫을 때 상태 동기화 */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (event: Event) => {
      event.preventDefault();
      onCloseModal();
    };
    dialog.addEventListener('cancel', handleCancel);
    return () => {
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onCloseModal]);

  /** overlay 클릭 시 닫기 */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !closeOnOverlayClick) return;

    const handleOverlayClick = (event: MouseEvent) => {
      const rect = dialog.getBoundingClientRect();
      const clickedDialogInside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      const clickedOverlay = !clickedDialogInside;
      if (clickedOverlay) {
        onCloseModal();
      }
    };

    dialog.addEventListener('click', handleOverlayClick);
    return () => {
      dialog.removeEventListener('click', handleOverlayClick);
    };
  }, [onCloseModal, closeOnOverlayClick]);

  return (
    <dialog ref={dialogRef} aria-labelledby="api-modal-title" className={styles.dialog}>
      <header className={styles.header}>
        <h3 id="api-modal-title" className={styles.title}>
          {title}
        </h3>
        <button type="button" onClick={onCloseModal} className={styles.closeButton}>
          <X size={24} />
        </button>
      </header>
      <ul>
        {apiList.map(({ id, title, url }) => {
          return (
            <li key={id} className={styles.item}>
              <div className={styles.title}>{title}</div>
              <div className={styles.linksContainer}>
                <Link title="MDN" href={`https://developer.mozilla.org${url}`} target="_blank">
                  <File size={16} />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </dialog>
  );
};

export default ApiListModal;
