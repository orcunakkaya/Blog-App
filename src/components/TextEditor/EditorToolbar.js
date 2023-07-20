import React from 'react';
import { Quill } from 'react-quill';

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
    <svg viewBox="0 0 22 22">
        <title>undo</title>
        <path
            fill="#6C757D"
            d="M12.5,8C9.85,8 7.45,9 5.6,10.6L2,7V16H11L7.38,12.38C8.77,11.22 10.54,10.5 12.5,10.5C16.04,10.5 19.05,12.81 20.1,16L22.47,15.22C21.08,11.03 17.15,8 12.5,8Z"
        />
    </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
    <svg viewBox="0 0 22 22">
        <title>redo</title>
        <path
            fill="#6C757D"
            d="M18.4,10.6C16.55,9 14.15,8 11.5,8C6.85,8 2.92,11.03 1.54,15.22L3.9,16C4.95,12.81 7.95,10.5 11.5,10.5C13.45,10.5 15.23,11.22 16.62,12.38L13,16H22V7L18.4,10.6Z"
        />
    </svg>
);
const CustomClose = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
            fill="#fa5c7c"
            d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-83.6 290.5c4.8 4.8 4.8 12.6 0 17.4l-40.5 40.5c-4.8 4.8-12.6 4.8-17.4 0L256 313.3l-66.5 67.1c-4.8 4.8-12.6 4.8-17.4 0l-40.5-40.5c-4.8-4.8-4.8-12.6 0-17.4l67.1-66.5-67.1-66.5c-4.8-4.8-4.8-12.6 0-17.4l40.5-40.5c4.8-4.8 12.6-4.8 17.4 0l66.5 67.1 66.5-67.1c4.8-4.8 12.6-4.8 17.4 0l40.5 40.5c4.8 4.8 4.8 12.6 0 17.4L313.3 256l67.1 66.5z"
        />
    </svg>
);
const CustomSave = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
            fill="#00a0df"
            d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"
        />
    </svg>
);
// Undo and redo functions for Custom Toolbar
function undoChange() {
    this.quill.history.undo();
}
function redoChange() {
    this.quill.history.redo();
}

// Add sizes to whitelist and register them
const Size = Quill.import('formats/size');
Size.whitelist = ['small', 'medium', 'large'];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import('formats/font');
Font.whitelist = ['arial', 'comic-sans', 'courier-new', 'georgia', 'helvetica', 'lucida'];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
    toolbar: {
        container: '.toolbar',
        handlers: {
            undo: undoChange,
            redo: redoChange,
        },
    },
    history: {
        delay: 500,
        maxStack: 100,
        userOnly: true,
    },
};

export const modules2 = (toolbar_uniq_label) => {
    return {
        toolbar: {
            container: `.toolbar_uniq_label-${toolbar_uniq_label}`,
            handlers: {
                undo: undoChange,
                redo: redoChange,
            },
        },
        history: {
            delay: 500,
            maxStack: 100,
            userOnly: true,
        },
    };
};

// Formats objects for setting up the Quill editor
export const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'color',
];

// Quill Toolbar component
const QuillToolbar = ({ toolbar_uniq_label, isShowSave = false, handleCloseBtn, handleSaveBtn }) => {

    return (
        <div className={`toolbar_uniq_label-${toolbar_uniq_label}`}>
            <span className="option-container">
                <button className="ql-undo">
                    <CustomUndo />
                </button>
                <button className="ql-redo">
                    <CustomRedo />
                </button>
            </span>
            <span className="option-container">
                <select className="ql-header" />
            </span>
            <span className="option-container">
                <select className="ql-font" defaultValue="arial">
                    <option value="arial">Arial</option>
                    <option value="comic-sans">Comic Sans</option>
                    <option value="courier-new">Courier New</option>
                    <option value="georgia">Georgia</option>
                    <option value="helvetica">Helvetica</option>
                    <option value="lucida">Lucida</option>
                </select>
                <select className="ql-size" defaultValue="medium">
                    <option value="small">'Size 1'</option>
                    <option value="medium">'Size 2'</option>
                    <option value="large">'Size 3'</option>
                </select>
            </span>
            {isShowSave && (
                <span className="ql-formats">
                    <button
                        style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                        onClick={handleCloseBtn}
                        className="ql-close">
                        <CustomClose />
                    </button>
                    <button
                        style={{ border: '1px solid #d9d9d9', borderRadius: '4px' }}
                        onClick={handleSaveBtn}
                        className="ql-save">
                        <CustomSave />
                    </button>
                </span>
            )}
            <span className="option-container">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
            </span>

            <span className="option-container">
                <select className="ql-align" />
                <select className="ql-color" />
                <select className="ql-background" />
            </span>

            <span className="option-container">
                <button className="ql-list" value="ordered" />
                <button className="ql-list" value="bullet" />
                <button className="ql-script" value="super" />
                <button className="ql-script" value="sub" />
            </span>

        </div>
    );
};

export default React.memo(QuillToolbar);
