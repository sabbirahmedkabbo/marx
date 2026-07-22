'use client';

import React, { useState, useRef, useEffect, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileVideo, Image as ImageIcon, X, CheckCircle, ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function ChallengeSubmissionPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [purchaseCode, setPurchaseCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/') && !selectedFile.type.startsWith('video/')) {
      alert('Please upload an image or video file.');
      return;
    }
    
    setFile(selectedFile);
    
    if (selectedFile.type.startsWith('image/')) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null); // Video doesn't need image preview, we'll show icon + name
    }
  };

  const removeFile = () => {
    setFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    
    setIsSubmitting(true);
    setProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 100); // 2 seconds total for 0 to 100
  };

  // Confetti generator
  const renderConfetti = () => {
    const confetti = [];
    const colors = ['#1B4332', '#2F7D32', '#5AAE4A', '#C8E6B9', '#FFD54F'];
    
    for (let i = 0; i < 50; i++) {
      const randomX = Math.random() * 100; // viewport width %
      const randomY = Math.random() * 20 - 20; // start slightly above screen
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 8 + 4;
      const delay = Math.random() * 0.5;
      const duration = Math.random() * 2 + 2;
      const rotation = Math.random() * 360;

      confetti.push(
        <motion.div
          key={i}
          initial={{ 
            x: `${randomX}vw`, 
            y: `${randomY}vh`, 
            rotate: 0, 
            opacity: 1 
          }}
          animate={{ 
            y: '120vh', 
            rotate: rotation,
            opacity: [1, 1, 0]
          }}
          transition={{ 
            duration, 
            delay, 
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: Math.random() * 2
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            zIndex: 50,
            pointerEvents: 'none'
          }}
        />
      );
    }
    return confetti;
  };

  return (
    <div className="min-h-screen bg-[#F8FFF5] pt-28 pb-20 px-4 relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-[#C8E6B9] blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] rounded-full bg-[#FFD54F] blur-[120px] opacity-20" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <Link href="/" className="inline-flex items-center text-[#2F7D32] hover:text-[#1B4332] mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <div className="inline-block px-3 py-1 bg-[#C8E6B9] text-[#1B4332] rounded-full text-sm font-bold mb-3 flex items-center mx-auto w-fit">
                    <Sparkles className="w-4 h-4 mr-1 text-[#2F7D32]" />
                    #GoIn20
                  </div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-[#1B4332] tracking-tight">Submit Your Challenge</h1>
                  <p className="text-gray-600 mt-2">Show us how you Go In 20! Upload your entry below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* File Upload Zone */}
                  <div>
                    <label className="block text-sm font-semibold text-[#1B4332] mb-2">Your Entry</label>
                    <div 
                      className={`relative rounded-xl border-2 border-dashed transition-all duration-300 ease-in-out ${isDragging ? 'border-[#5AAE4A] bg-[#F8FFF5]' : 'border-gray-300 hover:border-[#5AAE4A]/50 bg-gray-50'}`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      onClick={() => !file && fileInputRef.current?.click()}
                    >
                      <input 
                        type="file" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleFileSelect}
                        accept="image/*,video/*"
                      />
                      
                      {!file ? (
                        <div className="p-10 flex flex-col items-center justify-center text-center cursor-pointer">
                          <div className="w-16 h-16 bg-[#C8E6B9]/50 text-[#2F7D32] rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <UploadCloud className="w-8 h-8" />
                          </div>
                          <p className="text-[#1B4332] font-semibold text-lg">Click or drag file to upload</p>
                          <p className="text-gray-500 text-sm mt-1">Image or Video (Max 50MB)</p>
                        </div>
                      ) : (
                        <div className="p-4 relative">
                          <button 
                            type="button" 
                            onClick={(e) => { e.stopPropagation(); removeFile(); }}
                            className="absolute top-2 right-2 bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors z-10"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          
                          {previewUrl ? (
                            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden bg-black/5">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
                            </div>
                          ) : (
                            <div className="flex items-center justify-center w-full h-32 rounded-lg bg-[#C8E6B9]/30 border border-[#5AAE4A]/30">
                              <div className="text-center flex flex-col items-center">
                                <FileVideo className="w-10 h-10 text-[#2F7D32] mb-2" />
                                <p className="text-[#1B4332] font-medium truncate max-w-[200px]">{file.name}</p>
                                <p className="text-gray-500 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Caption */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label htmlFor="caption" className="block text-sm font-semibold text-[#1B4332]">Caption</label>
                      <span className={`text-xs ${caption.length > 280 ? 'text-red-500' : 'text-gray-500'}`}>
                        {caption.length} / 280
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="caption"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5AAE4A] focus:ring-2 focus:ring-[#5AAE4A]/20 outline-none transition-all resize-none bg-white/50 focus:bg-white"
                        placeholder="Tell us about your challenge..."
                        value={caption}
                        onChange={(e) => setCaption(e.target.value.slice(0, 280))}
                      />
                      <div className="absolute bottom-3 right-3 flex items-center space-x-1">
                        <span className="text-xs font-bold text-[#2F7D32] bg-[#C8E6B9] px-2 py-0.5 rounded-md">#GoIn20</span>
                      </div>
                    </div>
                  </div>

                  {/* Purchase Code */}
                  <div>
                    <label htmlFor="purchaseCode" className="block text-sm font-semibold text-[#1B4332] mb-2 flex items-center">
                      Purchase Code
                      <span className="ml-2 text-xs font-normal text-gray-500 flex items-center cursor-help" title="Found on your receipt">
                        <AlertCircle className="w-3 h-3 mr-0.5" /> Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      id="purchaseCode"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5AAE4A] focus:ring-2 focus:ring-[#5AAE4A]/20 outline-none transition-all bg-white/50 focus:bg-white"
                      placeholder="e.g. VATIKA-12345"
                      value={purchaseCode}
                      onChange={(e) => setPurchaseCode(e.target.value)}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || !file}
                      className="w-full relative overflow-hidden bg-gradient-to-r from-[#2F7D32] to-[#5AAE4A] text-white rounded-full px-8 py-4 font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      {isSubmitting ? (
                        <div className="flex flex-col items-center justify-center">
                          <span className="flex items-center mb-1">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Uploading... {progress}%
                          </span>
                          <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden absolute bottom-0 left-0">
                            <motion.div 
                              className="h-full bg-white/80" 
                              initial={{ width: 0 }}
                              animate={{ width: `${progress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                        </div>
                      ) : (
                        "Submit Entry"
                      )}
                      
                      {/* Button glass effect */}
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-full" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl border border-white shadow-2xl overflow-hidden relative"
            >
              {renderConfetti()}
              
              <div className="p-10 md:p-14 text-center flex flex-col items-center relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-24 h-24 bg-[#C8E6B9] rounded-full flex items-center justify-center mb-6 shadow-inner"
                >
                  <CheckCircle className="w-12 h-12 text-[#2F7D32]" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#1B4332] mb-3">Congratulations!</h2>
                <p className="text-lg text-[#2F7D32] font-semibold mb-2">Your entry has been submitted successfully!</p>
                <p className="text-gray-500 mb-8 max-w-sm">We've received your #GoIn20 challenge. It is currently pending moderation.</p>
                
                <Link 
                  href="/"
                  className="inline-flex justify-center items-center px-8 py-3 bg-white text-[#2F7D32] border-2 border-[#2F7D32] hover:bg-[#F8FFF5] rounded-full font-bold transition-colors shadow-sm hover:shadow-md w-full sm:w-auto"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
