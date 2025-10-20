import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function BottomSheet({ open, onClose, children }: Props) {
  if (!open) return null;

  return (
    <>
      {/* overlay */}
      <div className="fixed inset-0 bg-black/30 z-10" onClick={onClose} />

      {/* sheet */}
      <div
        role="dialog"
        aria-modal="true"
        className="fixed left-0 right-0 bottom-0 z-20 bg-white max-h-[70vh] rounded-t-2xl px-4 py-7 animate-[slideUp_160ms_ease_out]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(16px); opacity:.7 } to { transform: translateY(0); opacity:1 } }`}</style>
    </>
  );
}
