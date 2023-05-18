import { useEffect } from 'react';
// Оставил часть ваших комментариев, что бы не забыть.

function Popup({ isOpen, name, onClose, closeAllPopups, children }) {
  // обработчик `Escape`
  useEffect(() => {
    // ограничиваем навешивание обработчика: если не открыт, то не нужно навешивать
    if (!isOpen) return;
    // объявляем внутри `useEffect` функцию, чтобы она не теряла ссылку при перерисовке компонента
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };

    document.addEventListener('keydown', closeByEscape);
    // обязательно удаляем обработчик в `clean-up` функции
    return () => document.removeEventListener('keydown', closeByEscape);
    // обязательно следим за `isOpen`, чтобы срабатывало только при открытии, а не всегда
  }, [isOpen, onClose]);

  // обработчик оверлея
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      closeAllPopups();
    }
  };

  // внутри верстка обертки любого попапа с классом `popup` и добавлением `popup_opened`.
  return (
    <div
      className={`popup popup_${name} ${isOpen && onClose ? 'popup_opened' : ''}`}
      onClick={handleOverlay}
    >
      <div className={`popup__container popup__container_${name}`}>
        {children}
        <button className="popup__close" type="button" onClick={closeAllPopups} />
      </div>
    </div>
  );
}

export default Popup;
