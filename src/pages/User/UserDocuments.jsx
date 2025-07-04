// src/pages/User/UserDocuments.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        `${import.meta.env.VITE_BACKEND_URL}/api/documents/${doc._id}/dowload`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          responseType: "blob",
        }
      );
      let finalName = doc.fileName;
      if (doc.fileType === "folder" && !finalName.endsWith(".zip")) {
        finalName += ".zip";
      }
      const blob = new Blob([response.data]);
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", finalName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch {
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

  return (
    <div>
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>User Documents</h2>
        <button className="btn btn-primary" onClick={() => setShowUploadModal(true)}>
          Upload Document
        </button>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Sr No.</th>
                <th>File Name</th>
                <th>Type</th>
                <th>Uploaded At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDocs.length > 0 ? currentDocs.map((doc, index) => (
                <tr key={doc._id}>
                  <td>{indexOfFirst + index + 1}</td>
                  <td>{doc.fileName}</td>
                  <td>{doc.fileType}</td>
                  <td>{formatDate(doc.createdAt)}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <button className="btn btn-sm btn-primary" onClick={() => handleDownload(doc)}>
                        Download
                      </button>
                      <button className="btn btn-sm btn-warning" onClick={() => openUpdateModal(doc)}>
                        Update
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => confirmDelete(doc)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpload}>
                <div className="modal-header">
                  <h5 className="modal-title">Upload Document</h5>
                  <button type="button" className="btn-close" onClick={() => setShowUploadModal(false)} />
                </div>
                <div className="modal-body">
                  <label className="form-label">File Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control mb-2" required value={uploadForm.fileName} onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })} />
                  <label className="form-label">Type <span className="text-danger">*</span></label>
                  <select className="form-select mb-2" value={uploadForm.fileType} onChange={(e) => setUploadForm({ ...uploadForm, fileType: e.target.value })}>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                  </select>
                  <label className="form-label">Select File <span className="text-danger">*</span></label>
                  <input type="file" className="form-control" required onChange={(e) => setUploadForm({ ...uploadForm, file: e.target.files[0] })} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => setShowUploadModal(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Upload</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={handleUpdate}>
                <div className="modal-header">
                  <h5 className="modal-title">Update Document</h5>
                  <button type="button" className="btn-close" onClick={() => setShowUpdateModal(false)} />
                </div>
                <div className="modal-body">
                  <label className="form-label">File Name <span className="text-danger">*</span></label>
                  <input type="text" className="form-control mb-2" required value={updateForm.fileName} onChange={(e) => setUpdateForm({ ...updateForm, fileName: e.target.value })} />
                  <label className="form-label">Type <span className="text-danger">*</span></label>
                  <select className="form-select mb-2" value={updateForm.fileType} onChange={(e) => setUpdateForm({ ...updateForm, fileType: e.target.value })}>
                    <option value="file">File</option>
                    <option value="folder">Folder</option>
                  </select>
                  <label className="form-label">Replace File (optional)</label>
                  <input type="file" className="form-control" onChange={(e) => setUpdateForm({ ...updateForm, file: e.target.files[0] })} />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" type="button" onClick={() => setShowUpdateModal(false)}>Cancel</button>
                  <button className="btn btn-primary" type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && selectedDoc && (
        <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} />
              </div>
              <div className="modal-body">
                Are you sure you want to delete <strong>{selectedDoc.fileName}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
