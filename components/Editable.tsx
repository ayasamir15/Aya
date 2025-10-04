
import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { EditIcon } from './icons/IconComponents';

type EditableProps = {
  initialValue: string;
  onSave: (value: string) => void;
  as?: 'input' | 'textarea';
  className?: string;
  children: (value: string) => React.ReactNode;
};

const Editable: React.FC<EditableProps> = ({ initialValue, onSave, as = 'input', className, children }) => {
  const { isLoggedIn } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(value);
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && as === 'input') {
      handleSave();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (!isLoggedIn) {
    return <>{children(initialValue)}</>;
  }

  if (isEditing) {
    const commonProps = {
      ref: inputRef as any,
      value: value,
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
      onBlur: handleSave,
      onKeyDown: handleKeyDown,
      className: `bg-transparent border border-dashed border-primary rounded-md p-1 -m-1 focus:outline-none focus:ring-1 focus:ring-primary ${className}`
    };

    return as === 'textarea' ? (
      <textarea {...commonProps} rows={4} className={`${commonProps.className} w-full`}/>
    ) : (
      <input type="text" {...commonProps} className={`${commonProps.className} w-full`}/>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="relative group p-1 -m-1 rounded-md cursor-pointer hover:bg-primary/10 transition-colors"
    >
      {children(value)}
      <div className="absolute top-0 right-0 p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <EditIcon />
      </div>
    </div>
  );
};

export default Editable;
