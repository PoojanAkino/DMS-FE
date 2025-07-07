// src/pages/User/UserDocuments.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from './UserDocument.module.css';

export default function UserDocuments() {
  const [documents, setDocuments] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({ fileName: "", fileType: "file", file: null });
  const [updateForm, setUpdateForm] = useState({ id: "", fileName: "", fileType: "file", file: null });
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loading, setLoading] = useState(true);

  const docsPerPage = 10;

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/documents`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const docs = response.data.documents || [];
      const sorted = docs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setDocuments(sorted);
    } catch (error) {
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("fileName", uploadForm.fileName);
      formData.append("fileType", uploadForm.fileType);
      formData.append("file", uploadForm.file);

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/documents/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Uploaded successfully");
      setUploadForm({ fileName: "", fileType: "file", file: null });
      setShowUploadModal(false);
      fetchDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const openUpdateModal = (doc) => {
    setUpdateForm({ id: doc._id, fileName: doc.fileName, fileType: doc.fileType, file: null });
    setShowUpdateModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (isProcessing) return;
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("fileName", updateForm.fileName);
      formData.append("fileType", updateForm.fileType);
      if (updateForm.file) formData.append("file", updateForm.file);

      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${updateForm.id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Updated successfully");
      setShowUpdateModal(false);
      fetchDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const confirmDelete = (doc) => {
    setSelectedDoc(doc);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!selectedDoc || isProcessing) return;
    setIsProcessing(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/documents/${selectedDoc._id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      toast.success("Deleted successfully");
      setShowDeleteModal(false);
      fetchDocuments();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (doc) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/documents/${doc._id}/download`, // Fixed: dowload -> download
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: "blob",
      }
    );

    // Get the proper filename from Content-Disposition header if available
    let finalName = doc.fileName;
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
      if (doc.fileType === "folder" && !finalName.endsWith(".zip")) {
        finalName += ".zip";
      }
    }

    // IMPORTANT: Create blob with the correct MIME type from response headers
    const contentType = response.headers['content-type'] || 'application/octet-stream';
    const blob = new Blob([response.data], { type: contentType });
    
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", finalName);
    
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    window.URL.revokeObjectURL(link.href);
    link.remove();
    
    toast.success("Download started");
  } catch (error) {
    console.error("Download failed:", error);
    toast.error("Download failed");
  }
};

  const indexOfLast = currentPage * docsPerPage;
  const indexOfFirst = indexOfLast - docsPerPage;
  const currentDocs = documents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(documents.length / docsPerPage);

  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  };

  const getFileIcon = (fileType) => {
    switch (fileType) {
      case 'folder':
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading documents...</p>
      </div>
    );
  }

  return (
    <div className={styles.userDocuments}>
      <ToastContainer />
      
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>User Documents</h1>
          <p className={styles.subtitle}>Manage and organize your personal documents</p>
        </div>
        <button className={styles.uploadBtn} onClick={() => setShowUploadModal(true)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Upload Document
        </button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Sr No.</th>
                <th>Document Details</th>
                <th>Type</th>
                <th>Uploaded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentDocs.length > 0 ? currentDocs.map((doc, index) => (
                <tr key={doc._id} className={styles.tableRow}>
                  <td className={styles.srNo}>
                    {indexOfFirst + index + 1}
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
                        onClick={() => handleDownload(doc)}
                        title="Download document"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <polyline points="7,10 12,15 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.updateBtn}`}
                        onClick={() => openUpdateModal(doc)}
                        title="Update document"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button
                        className={`${styles.actionBtn} ${styles.deleteBtn}`}
                        onClick={() => confirmDelete(doc)}
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
              )) : (
                <tr>
                  <td colSpan="5" className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H4C3.46957 21 2.96086 20.7893 2.58579 20.4142C2.21071 20.0391 2 19.5304 2 19V5C2 4.46957 2.21071 3.96086 2.58579 3.58579C2.96086 3.21071 3.46957 3 4 3H9L11 6H20C20.5304 6 21.0391 6.21071 21.4142 6.58579C21.7893 6.96086 22 7.46957 22 8V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3>No documents found</h3>
                    <p>Upload your first document to get started.</p>
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
              onClick={() => setCurrentPage(currentPage - 1)}
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
              onClick={() => setCurrentPage(currentPage + 1)}
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <form onSubmit={handleUpload} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Upload Document</h2>
                <button 
                  type="button" 
                  className={styles.closeBtn} 
                  onClick={() => setShowUploadModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    File Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter file name"
                    required
                    value={uploadForm.fileName}
                    onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Type <span className={styles.required}>*</span>
                  </label>
                  <select
                    className={styles.formSelect}
                    value={uploadForm.fileType}
                    onChange={(e) => setUploadForm({ ...uploadForm, fileType: e.target.value })}
                  >
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Select File <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="file"
                    className={styles.formInput}
                    required
                    onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })}
                  />
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  type="button" 
                  className={styles.cancelBtn} 
                  onClick={() => setShowUploadModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className={styles.spinner}></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="7,10 12,5 17,10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="12" y1="5" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Upload Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <form onSubmit={handleUpdate} className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h2 className={styles.modalTitle}>Update Document</h2>
                <button 
                  type="button" 
                  className={styles.closeBtn} 
                  onClick={() => setShowUpdateModal(false)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    File Name <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    className={styles.formInput}
                    placeholder="Enter file name"
                    required
                    value={updateForm.fileName}
                    onChange={(e) => setUpdateForm({ ...updateForm, fileName: e.target.value })}
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Type <span className={styles.required}>*</span>
                  </label>
                  <select
                    className={styles.formSelect}
                    value={updateForm.fileType}
                    onChange={(e) => setUpdateForm({ ...updateForm, fileType: e.target.value })}
                  >
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                  </select>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    Replace File (optional)
                  </label>
                  <input
                    type="file"
                    className={styles.formInput}
                    onChange={(e) => setUpdateForm({ ...updateForm, file: e.target.files[0] })}
                  />
                </div>
              </div>
              
              <div className={styles.modalFooter}>
                <button 
                  type="button" 
                  className={styles.cancelBtn} 
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className={styles.submitBtn}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className={styles.spinner}></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Update Document
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
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
                <button 
                  className={styles.confirmBtn} 
                  onClick={handleDelete}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <div className={styles.spinner}></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polyline points="3,6 5,6 21,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Delete Document
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}