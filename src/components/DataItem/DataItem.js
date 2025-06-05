import styles from './DataItem.module.css'
import { FaEdit, FaTrash, FaPlus} from 'react-icons/fa';


function DataItem({ itemKey, value, editingField, setEditingField, handlers }) {
  const isEditing = (index = null) => editingField.key === itemKey && editingField.index === index;
  const stopEditing = () => setEditingField({ key: null, index: null });

  const renderValue = (item, index = null) => {
    if (isEditing(index)) {
      return (
        <input
          autoFocus
          value={item}
          onChange={(e) => handlers.handleEditChange(e, itemKey, index)}
          onBlur={stopEditing}
          onKeyDown={(e) => e.key === 'Enter' && stopEditing()}
        />
      );
    }
    return <span className={styles.subitem_text}>{index !== null && '• '}{item}</span>;
  };

  return (
    <div className={styles.data_item}>
      <div className={styles.data_text}>
        <strong>{itemKey}:</strong>
        {Array.isArray(value) ? (
          <ul className={styles.subitem_list}>
            {value.map((item, index) => (
              <li key={index}>
                {renderValue(item, index)}
                <div className={styles.subitem_actions}>
                  <button onClick={() => setEditingField({ key: itemKey, index })}><FaEdit /></button>
                  <button onClick={() => handlers.handleDelete(itemKey, index)}><FaTrash /></button>
                </div>
              </li>
            ))}
            <li>
              <button className={styles.add_button} onClick={() => handlers.handleAddItem(itemKey)}>
                <FaPlus /> Adicionar item
              </button>
            </li>
          </ul>
        ) : (
          <div className={styles.single_item_container}>
             {renderValue(value)}
            <div className={styles.data_actions}>
              <button onClick={() => setEditingField({ key: itemKey, index: null })}><FaEdit /></button>
              <button onClick={() => handlers.handleDelete(itemKey)}><FaTrash /></button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DataItem;