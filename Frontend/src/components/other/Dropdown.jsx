import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Dropdown = ({ isOpen, onClose, navLinks, colors, position }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleScroll = () => {
      onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="fixed max-h-[calc(100svh-100px)] custom-scrollbar overflow-x-hidden overflow-y-scroll w-48 rounded-2xl shadow-xl py-2"
          style={{
            background: colors.background,
            zIndex: 9999,
            boxShadow: `0 4px 6px -1px ${colors.primary}20`,
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 5px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: ${colors.primary};
                border-radius: 10px;
              }
            `}
          </style>
          <div>
            {Object.entries(navLinks).map(([item, link], index) => (
              <motion.div
                key={item}
                whileHover={{
                  x: 5,
                  backgroundColor: colors.primary,
                  color: colors.background,
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  to={link}
                  className="block px-4 py-2"
                  style={{ color: colors.text }}
                  onClick={onClose}
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Dropdown;
