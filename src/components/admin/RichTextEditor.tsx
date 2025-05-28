'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface RichTextEditorProps {
  initialValue: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export default function RichTextEditor({ initialValue, onChange, hasError = false }: RichTextEditorProps) {
  const [value, setValue] = useState(initialValue || '');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Simple list of most commonly used emojis
  const commonEmojis = [
    '😊', '😀', '😁', '😂', '🤣', '😃', '😄', '😅', 
    '👍', '👎', '👌', '👏', '🙌', '👋', '🤝', '🙏',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '💔',
    '💯', '✅', '⭐', '🔥', '💪', '👀', '🎉', '🎊', 
    '🛒', '💰', '💵', '💴', '💶', '💷', '💸', '💳',
    '📱', '💻', '🖨️', '📷', '📦', '✂️', '🎨', '🎬'
  ];
  
  // Update parent when local state changes
  const handleChange = useCallback((newValue: string) => {
    onChange(newValue);
  }, [onChange]);

  useEffect(() => {
    handleChange(value);
  }, [value, handleChange]);
  
  // Update local state when prop changes
  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue]);
  
  // Simple insert emoji function
  const insertEmoji = (emoji: string) => {
    if (textareaRef.current) {
      // Insert at cursor position
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const newValue = value.substring(0, start) + emoji + value.substring(end);
      setValue(newValue);
      
      // Set cursor position after the inserted emoji
      setTimeout(() => {
        textarea.focus();
        const newPosition = start + emoji.length;
        textarea.setSelectionRange(newPosition, newPosition);
      }, 10);
    } else {
      // Fallback to simple append
      setValue(value + emoji);
    }
  };
  
  // Handle Enter key in textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const cursorPosition = e.currentTarget.selectionStart;
      const newValue = value.substring(0, cursorPosition) + '\n' + value.substring(cursorPosition);
      setValue(newValue);
      
      setTimeout(() => {
        if (textareaRef.current) {
          const newPos = cursorPosition + 1;
          textareaRef.current.setSelectionRange(newPos, newPos);
        }
      }, 10);
    }
  };
  
  return (
    <div className={`border rounded-lg overflow-hidden ${hasError ? 'border-red-500' : 'border-gray-300'}`}>
      {/* Editor toolbar */}
      <div className="bg-white border-b border-gray-300 p-3 flex gap-3">
        <button 
          type="button" 
          onClick={() => setValue(prev => `${prev}<h2>عنوان</h2>`)}
          className="px-3 py-2 hover:bg-gray-300 rounded text-sm text-black font-medium border border-gray-300 transition-colors flex-1"
        >
          عنوان
        </button>
        <button 
          type="button" 
          onClick={() => setValue(prev => `${prev}<p>فقرة</p>`)}
          className="px-3 py-2 hover:bg-gray-300 rounded text-sm text-black font-medium border border-gray-300 transition-colors flex-1"
        >
          فقرة
        </button>
        <button 
          type="button" 
          onClick={() => setValue(prev => `${prev}<strong>نص عريض</strong>`)}
          className="px-3 py-2 hover:bg-gray-300 rounded text-sm font-bold text-black border border-gray-300 transition-colors flex-1"
        >
          خط سميك
        </button>
        <button 
          type="button" 
          onClick={() => setValue(prev => `${prev}<h3>عنوان القائمة</h3>
<ul>
  <li>العنصر الأول في القائمة - انقر للتعديل</li>
  <li>العنصر الثاني في القائمة - انقر للتعديل</li>
  <li>العنصر الثالث في القائمة - انقر للتعديل</li>
</ul>`)}
          className="px-3 py-2 hover:bg-gray-300 rounded text-sm text-black font-medium border border-gray-300 transition-colors flex-1"
        >
          قائمة
        </button>
        <button 
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="px-3 py-2 hover:bg-gray-300 rounded text-sm text-black font-medium border border-gray-300 transition-colors flex-1"
        >
          😊 إيموجي
        </button>
      </div>
      
      {/* Simple emoji grid */}
      {showEmojiPicker && (
        <div className="p-3 border-b border-gray-200 bg-white">
          <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-16 gap-2">
            {commonEmojis.map((emoji, index) => (
              <button
                key={index}
                type="button"
                onClick={() => insertEmoji(emoji)}
                className="w-8 h-8 text-lg bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-4 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        placeholder="أدخل وصف المنتج هنا..."
        dir="rtl"
      />
      
      {/* Help text */}
      <div className="bg-gray-50 border-t border-gray-200 p-2 text-xs text-gray-500">
        <p>يمكنك استخدام وسوم HTML مثل &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;h2&gt;</p>
        <p className="mt-1">اضغط Enter لإضافة سطر جديد</p>
      </div>
    </div>
  );
}