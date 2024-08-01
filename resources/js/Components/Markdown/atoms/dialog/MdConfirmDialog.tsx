import Modal from 'react-modal';

interface MdConfirmDialogProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onConfirm: () => void;
    title: string;
    labelYes: string;
    labelNo: string;
    message: string;
}

/**
 * マークダウン確認ダイアログ
 * @param isOpen
 * @param onRequestClose
 * @param onConfirm
 * @param title
 * @param labelYes
 * @param labelNo
 * @param message
 * @returns JSX
 */
const MdConfirmDialog = ({
    isOpen,
    onRequestClose,
    onConfirm,
    title,
    labelYes,
    labelNo,
    message,
}: MdConfirmDialogProps) => {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Confirmation Dialog"
            ariaHideApp={false}
            className="modal"
            overlayClassName="overlay"
        >
            <div className="p-4">
                <h2 className="text-lg font-bold mb-4">{title}</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onRequestClose}
                        className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                        {labelNo}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onRequestClose();
                        }}
                        className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                    >
                        {labelYes}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default MdConfirmDialog;
