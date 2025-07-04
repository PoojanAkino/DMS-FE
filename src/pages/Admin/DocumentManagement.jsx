import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DocumentManagement() {
  const [documents, setDocuments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
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
        `${import.meta.env.VITE_BACKEND_URL}/api/documents/${docId}/dowload`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          responseType: "blob",
        }
      );

      let finalName = fileName;
      if (fileType === "folder" && !finalName.endsWith(".zip")) {
        finalName += ".zip";
      }

      const blob = new Blob([response.data]);
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

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />

      <h2 className="mb-4 fw-bold text-primary">
        <i className="bi bi-folder2-open me-2"></i> Document Management
      </h2>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Sr No.</th>
                  <th>File Name</th>
                  <th>Owner</th>
                  <th>Type</th>
                  <th>Uploaded At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentDocs.length > 0 ? (
                  currentDocs.map((doc, index) => (
                    <tr key={doc._id}>
                      <td>{indexOfFirstDoc + index + 1}</td>
                      <td>{doc.fileName}</td>
                      <td>{doc.owner?.userName || "Unknown"}</td>
                      <td>{doc.fileType}</td>
                      <td>{formatDate(doc.createdAt)}</td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              setSelectedDoc(doc);
                              setShowDeleteModal(true);
                            }}
                          >
                            <i className="bi bi-trash me-1"></i>Delete
                          </button>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() =>
                              handleDownload(doc._id, doc.fileType, doc.fileName)
                            }
                          >
                            <i className="bi bi-download me-1"></i>Download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No documents found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav className="mt-3">
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={prevPage}>
                    Previous
                  </button>
                </li>
                <li
                  className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
                >
                  <button className="page-link" onClick={nextPage}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>

      {showDeleteModal && selectedDoc && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{selectedDoc.fileName}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
