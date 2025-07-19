import React, { useState } from 'react';
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';
import styles from './Card.module.scss';

const NoteCard = ({ id, title, content, tags, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);
  const [editTags, setEditTags] = useState(tags.join(', '));
  //console.log(id);

//   const handleSave = () => {
//     onUpdate(id, {
//       title: editTitle,
//       content: editContent,
//       tags: editTags.split(',').map(tag => tag.trim())
//     });
//     setIsEditing(false);
//   };
const handleSave = () => {
  if (!editTitle.trim() || !editContent.trim() || !editTags.trim()) {
    alert("Title, content, and tags must not be empty.");
    return;
  }

  onUpdate(id, {
    title: editTitle.trim(),
    content: editContent.trim(),
    tags: editTags.split(',').map(tag => tag.trim())
  });

  setIsEditing(false);
};


    return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className={styles.input}
            />
            <div className={styles.actions}>
              <FiCheck className={styles.icon} onClick={handleSave} title="Save" />
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.title}>{title}</h3>
            <div className={styles.actions}>
              <FiEdit className={styles.icon} onClick={() => setIsEditing(true)} title="Edit" />
              <FiTrash2 className={styles.icon} onClick={() => onDelete(id)} title="Delete" />
            </div>
          </>
        )}
      </div>

        {isEditing ? (
        <>
            <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className={styles.textarea}
        />
        <input
            type="text"
            value={editTags}
            onChange={(e) => setEditTags(e.target.value)}
            className={styles.input}
          />
        </>
      ) : (
        <>
          <p className={styles.content}>{content}</p>
          <div className={styles.tags}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>#{tag}</span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default NoteCard;
