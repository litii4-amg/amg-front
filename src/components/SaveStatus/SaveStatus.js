import styles from './SaveStatus.module.css';
import { FaSave, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';

function SaveStatus({ status }) {
  const statusConfig = {
    saving: { icon: <FaSave />, text: 'Salvando...', className: styles.status_saving },
    error: { icon: <FaExclamationCircle />, text: 'Erro ao salvar', className: styles.status_error },
    saved: { icon: <FaCheckCircle />, text: 'Salvo', className: styles.status_saved },
  };

  const currentStatus = statusConfig[status];
  if (!currentStatus) return null;

  return <span className={currentStatus.className}>{currentStatus.icon} {currentStatus.text}</span>;
}

export default SaveStatus;