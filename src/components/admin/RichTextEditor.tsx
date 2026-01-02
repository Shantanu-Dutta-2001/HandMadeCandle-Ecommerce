import React, { useRef } from 'react';
import { Bold, Italic, List, ListOrdered, Type } from 'lucide-react';

interface RichTextEditorProps {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange, placeholder }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    const handleInput = () => {
        if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
        }
    };

    return (
        <div style={{
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'white'
        }}>
            <div style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '0.5rem',
                background: '#f8f8f8',
                borderBottom: '1px solid var(--border-subtle)'
            }}>
                <button
                    type="button"
                    onClick={() => execCommand('bold')}
                    style={btnStyle} title="Bold"><Bold size={16} /></button>
                <button
                    type="button"
                    onClick={() => execCommand('italic')}
                    style={btnStyle} title="Italic"><Italic size={16} /></button>
                <button
                    type="button"
                    onClick={() => execCommand('insertUnorderedList')}
                    style={btnStyle} title="Bullet List"><List size={16} /></button>
                <button
                    type="button"
                    onClick={() => execCommand('insertOrderedList')}
                    style={btnStyle} title="Numbered List"><ListOrdered size={16} /></button>
                <button
                    type="button"
                    onClick={() => execCommand('formatBlock', 'H3')}
                    style={btnStyle} title="Heading"><Type size={16} /></button>
            </div>
            <div
                ref={editorRef}
                contentEditable
                onInput={handleInput}
                style={{
                    padding: '1rem',
                    minHeight: '120px',
                    outline: 'none',
                    color: 'var(--text-primary)',
                    backgroundColor: 'white'
                }}
                dangerouslySetInnerHTML={{ __html: value === '' ? (placeholder ? `<span style="color: #aaa">${placeholder}</span>` : '') : value }}
                onFocus={(e) => {
                    if (value === '') e.currentTarget.innerHTML = '';
                }}
            />
        </div>
    );
};

const btnStyle: React.CSSProperties = {
    padding: '4px',
    background: 'none',
    border: '1px solid transparent',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
    transition: 'all 0.2s'
};

export default RichTextEditor;
