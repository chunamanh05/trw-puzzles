"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  File, 
  FileText, 
  Image as ImageIcon, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Trash2 
} from "lucide-react";
import Link from "next/link";

interface ValidatedFile {
  id: string;
  file: File;
  isValid: boolean;
  error?: string;
  sizeFormatted: string;
}

const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const MAX_SIZE_MB = 5;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

export default function SmartFileValidator() {
  const [files, setFiles] = useState<ValidatedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const validateFile = (file: File): ValidatedFile => {
    const id = Math.random().toString(36).substring(7) + "-" + Date.now();
    let isValid = true;
    let error = "";

    if (!ALLOWED_TYPES.includes(file.type)) {
      isValid = false;
      error = "Định dạng file không được hỗ trợ (chỉ PDF, PNG, JPG)";
    } else if (file.size > MAX_SIZE_BYTES) {
      isValid = false;
      error = `Dung lượng file quá lớn (tối đa ${MAX_SIZE_MB}MB)`;
    }

    return {
      id,
      file,
      isValid,
      error,
      sizeFormatted: formatFileSize(file.size),
    };
  };

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    const validated = Array.from(newFiles).map(validateFile);
    setFiles((prev) => [...prev, ...validated]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const clearAll = () => setFiles([]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const acceptedFiles = files.filter((f) => f.isValid);
  const rejectedFiles = files.filter((f) => !f.isValid);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fcfcfc] p-6 md:p-12 font-sans selection:bg-[#00f5d4]/30">
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Header Navigation */}
      <nav className="max-w-4xl mx-auto mb-12 flex justify-between items-center">
        <Link href="/" className="text-sm font-mono text-muted-foreground hover:text-accent-primary transition-colors flex items-center gap-2">
          <X size={14} /> Back to Lobby
        </Link>
        <div className="px-3 py-1 rounded-full border border-glass-border bg-glass-bg text-[10px] font-bold tracking-widest uppercase text-accent-primary flex items-center gap-2">
          <CheckCircle2 size={12} /> File Guard
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Smart File <span className="text-accent-primary">Validator</span>
          </h1>
          <p className="text-muted-foreground text-sm md:text-base max-w-lg mx-auto">
            Upload files to validate type and size instantly. Accepted and rejected files are shown separately.
          </p>
        </div>

        {/* Dropzone */}
        <motion.div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          animate={{
            borderColor: isDragging ? "var(--accent-primary)" : "rgba(255, 255, 255, 0.08)",
            backgroundColor: isDragging ? "rgba(0, 245, 212, 0.05)" : "rgba(255, 255, 255, 0.02)",
            scale: isDragging ? 1.01 : 1,
          }}
          className={`relative border-2 border-dashed rounded-2xl p-12 mb-10 transition-all cursor-pointer group`}
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <input
            id="fileInput"
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <div className="flex flex-col items-center gap-4">
            <div className={`p-4 rounded-xl bg-glass-bg border border-glass-border transition-all duration-500 ${isDragging ? 'rotate-12 scale-110' : 'group-hover:-translate-y-2'}`}>
              <Upload className="text-muted-foreground group-hover:text-accent-primary transition-colors" size={32} />
            </div>
            <div className="text-center">
              <p className="text-lg font-medium mb-1">
                Drag & drop files
              </p>
              <p className="text-sm text-muted-foreground">
                or <span className="text-accent-primary">browse to upload</span>
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["PDF", "PNG", "JPG", "Max 5 MB"].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-medium text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Status Bar */}
        {files.length > 0 && (
          <div className="flex items-center justify-between p-4 mb-6 rounded-xl bg-glass-bg border border-glass-border text-xs font-medium">
            <div className="flex gap-4">
              <span className="text-muted-foreground">{files.length} file queued</span>
              <span className="text-accent-primary">{acceptedFiles.length} accepted</span>
              {rejectedFiles.length > 0 && (
                <span className="text-red-400">{rejectedFiles.length} rejected</span>
              )}
            </div>
            <button 
              onClick={clearAll}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} /> Clear all
            </button>
          </div>
        )}

        <div className="space-y-10">
          {/* Accepted List */}
          {acceptedFiles.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest uppercase text-accent-primary">
                <CheckCircle2 size={14} /> Accepted <span className="opacity-50 ml-2">{acceptedFiles.length}</span>
              </div>
              <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                  {acceptedFiles.map((f) => (
                    <FileRow key={f.id} item={f} onRemove={() => removeFile(f.id)} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}

          {/* Rejected List */}
          {rejectedFiles.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4 text-xs font-bold tracking-widest uppercase text-red-400">
                <AlertCircle size={14} /> Rejected <span className="opacity-50 ml-2">{rejectedFiles.length}</span>
              </div>
              <div className="grid gap-3">
                <AnimatePresence mode="popLayout">
                  {rejectedFiles.map((f) => (
                    <FileRow key={f.id} item={f} onRemove={() => removeFile(f.id)} />
                  ))}
                </AnimatePresence>
              </div>
            </section>
          )}
        </div>

        {/* Final Submission Button */}
        <AnimatePresence>
          {acceptedFiles.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="w-full mt-12 py-4 rounded-xl bg-accent-primary text-black font-bold text-lg shadow-[0_0_20px_-5px_rgba(0,245,212,0.5)] hover:shadow-[0_0_30px_-5px_rgba(0,245,212,0.7)] transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              Submit {acceptedFiles.length} Accepted File{acceptedFiles.length > 1 ? 's' : ''}
            </motion.button>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function FileRow({ item, onRemove }: { item: ValidatedFile; onRemove: () => void }) {
  const getFileIcon = () => {
    if (item.file.type.includes("image")) return <ImageIcon size={20} className="text-accent-secondary" />;
    if (item.file.type.includes("pdf")) return <FileText size={20} className="text-accent-primary" />;
    return <File size={20} className="text-muted-foreground" />;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20, scale: 0.95 }}
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-colors ${
        item.isValid 
          ? "bg-glass-bg border-glass-border hover:border-accent-primary/30" 
          : "bg-red-400/5 border-red-400/20 hover:border-red-400/40"
      }`}
    >
      <div className={`p-2.5 rounded-lg ${item.isValid ? 'bg-white/5' : 'bg-red-400/10'}`}>
        {getFileIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm truncate">{item.file.name}</p>
          {!item.isValid && (
             <span className="text-[10px] bg-red-400/20 text-red-400 px-1.5 py-0.5 rounded font-mono uppercase">
               Error
             </span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          {item.sizeFormatted} {item.error && `• ${item.error}`}
        </p>
      </div>

      <div className="flex items-center gap-3">
        {item.isValid ? (
          <CheckCircle2 size={18} className="text-accent-primary opacity-60 group-hover:opacity-100 transition-opacity" />
        ) : (
          <AlertCircle size={18} className="text-red-400 opacity-60" />
        )}
        <button 
          onClick={onRemove}
          className="p-1.5 rounded-lg hover:bg-white/10 text-muted-foreground hover:text-foreground transition-all"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}
