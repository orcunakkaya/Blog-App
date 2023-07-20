import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../../assets/styles/editor.scss';
import EditorToolbar, { formats, modules2 } from './EditorToolbar';

const TextEditor = ({
    value,
    setValue,
    disabled = false,
    toolbar_uniq_label = 'toolbar_uniq_label',
    placeholder,
    className,
    isShowSave,
    handleCloseBtn,
    handleSaveBtn,
    quillRef
}) => {

    return (
        <div className={`global-rich-text-editor ${disabled && 'global-rich-text-editor-disabled'} ${className}`}>
            {
                // !disabled &&
                <EditorToolbar
                    toolbar_uniq_label={toolbar_uniq_label}
                    isShowSave={isShowSave}
                    handleCloseBtn={handleCloseBtn}
                    handleSaveBtn={handleSaveBtn}
                />
            }

            <ReactQuill
                theme="snow"
                value={value}
                onChange={setValue}
                modules={modules2(toolbar_uniq_label)}
                formats={formats}
                readOnly={disabled}
                placeholder={placeholder && placeholder}
                ref={quillRef}
            />
        </div>
    );
};

export default React.memo(TextEditor);