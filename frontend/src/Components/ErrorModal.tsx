import { Modal } from 'antd';

function ErrorModal({ visible, errorMessage, onClose }: { visible: boolean, errorMessage: string, onClose: () => void }) {
  return (
    <Modal
      open={visible}
      onOk={onClose}
      onCancel={onClose}
      closable={false}
    >
      <p>{errorMessage}</p>
    </Modal>
  );
}

export default ErrorModal;
