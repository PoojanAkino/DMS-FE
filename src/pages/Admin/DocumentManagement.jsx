import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './DocumentManagement.module.css';

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const docsPerPage = 10;

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/documents`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const docs = response.data.documents || [];
      // ✅ Sort from latest to oldest
      const sortedDocs = docs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setDocuments(sortedDocs);
    } catch (error) {
      console.error("Failed to fetch documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDoc) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/documents/${selectedDoc._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Document deleted successfully");
      setShowDeleteModal(false);
      setSelectedDoc(null);
      fetchDocuments();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  const handleDownload = async (docId, fileType, fileName) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/documents/${docId}/download`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      }
    );

    // Get the proper filename from Content-Disposition header if available
    let finalName = fileName;
    const contentDisposition = response.headers['content-disposition'];
    
    if (contentDisposition) {
      // Extract filename from Content-Disposition header
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        finalName = matches[1].replace(/['"]/g, '');
      }
    } else {
      // Fallback: Only add .zip for folders if Content-Disposition is not present
      if (fileType === "folder" && !finalName.endsWith(".zip")) {
        finalName += ".zip";
      }
    }

    // IMPORTANT: Create blob with the correct MIME type from response headers
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const blob = new Blob([response.data], { type: contentType });
    
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", finalName);

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);

    toast.success("Download started");
  } catch (error) {
    console.error("Download failed:", error);
    toast.error(error.response?.data?.message || "Download failed");
  }
};

  useEffect(() => {
    fetchDocuments();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'folder':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'pdf':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="10,9 9,9 8,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'image':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="14,2 14,8 20,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
    }
  };

  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = documents.slice(indexOfFirstDoc, indexOfLastDoc);
  const totalPages = Math.ceil(documents.length / docsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading documents...</p>
      </div>
    );
  }

  return (
    <div className={styles.documentManagement}>
      <ToastContainer position="top-right" autoClose={2000} />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Document Management
          </h1>
          <p className={styles.subtitle}>Manage and organize all system documents</p>
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{documents.length}</span>
            <span className={styles.statLabel}>Total Documents</span>
          </div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sr No.</th>
                <th>Document Details</th>
                <th>Owner</th>
                <th>Type</th>
                <th>Upload Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentDocs.length > 0 ? (
                currentDocs.map((doc, index) => (
                  <tr key={doc._id} className={styles.tableRow}>
                    <td className={styles.srNo}>
                      {indexOfFirstDoc + index + 1}
                    </td>
                    <td className={styles.documentDetails}>
                      <div className={styles.documentInfo}>
                        <div className={`${styles.fileIcon} ${styles[doc.fileType + 'Icon']}`}>
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div className={styles.fileDetails}>
                          <div className={styles.fileName}>{doc.fileName}</div>
                          <div className={styles.fileSize}>Document File</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.ownerCell}>
                      <div className={styles.ownerInfo}>
                        <div className={styles.ownerAvatar}>
                          {(doc.owner?.userName || "U").charAt(0).toUpperCase()}
                        </div>
                        <span className={styles.ownerName}>
                          {doc.owner?.userName || "Unknown"}
                        </span>
                      </div>
                    </td>
                    <td className={styles.typeCell}>
                      <div className={`${styles.typeTag} ${styles[doc.fileType + 'Type']}`}>
                        {getFileIcon(doc.fileType)}
                        <span>{doc.fileType}</span>
                      </div>
                    </td>
                    <td className={styles.dateCell}>
                      <div className={styles.dateInfo}>
                        <div className={styles.date}>{formatDate(doc.createdAt)}</div>
                      </div>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.actionButtons}>
                        <button
                          className={`${styles.actionBtn} ${styles.downloadBtn}`}
                          onClick={() =>
                            handleDownload(doc._id, doc.fileType, doc.fileName)
                          }
                          title="Download document"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button
                          className={`${styles.actionBtn} ${styles.deleteBtn}`}
                          onClick={() => {
                            setSelectedDoc(doc);
                            setShowDeleteModal(true);
                          }}
                          title="Delete document"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>No documents found</h3>
                    <p>No documents have been uploaded to the system yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationBtn} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="15,18 9,12 15,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Previous
            </button>
            
            <div className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              className={`${styles.paginationBtn} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="9,18 15,12 9,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {showDeleteModal && selectedDoc && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <div className={styles.modalIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className={styles.modalText}>
                  <h2 className={styles.modalTitle}>Delete Document</h2>
                  <p className={styles.modalDescription}>
                    Are you sure you want to delete <strong>{selectedDoc.fileName}</strong>? 
                    This action cannot be undone.
                  </p>
                </div>
                <button 
                  className={styles.closeBtn} 
                  onClick={() => setShowDeleteModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  className={styles.cancelBtn} 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className={styles.confirmBtn} onClick={handleDelete}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Delete Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}