import React, { useRef, useState } from 'react';
import { useChatStore } from '../Store/useChatStore';
import { X, Image, Send } from 'lucide-react';
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessages } = useChatStore();

  // Max image size in MB (adjust as needed)
  const MAX_IMAGE_SIZE_MB = 5;

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const maxSizeBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      toast.error(`Image is too large (max ${MAX_IMAGE_SIZE_MB}MB)`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "chatapp");
      formData.append("cloud_name", "dm4bvkpeg");

      toast.loading("Uploading image...");

      const res = await fetch("https://api.cloudinary.com/v1_1/dm4bvkpeg/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      toast.dismiss();
      if (data.secure_url) {
        setImagePreview(data.secure_url);
      } else {
        toast.error("Image upload failed");
        console.error("Cloudinary upload error", data);
      }
    } catch (err) {
      toast.dismiss();
      toast.error("Failed to upload image");
      console.error(err);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;
    try {
      await sendMessages({  
        text: text.trim(),
        image: imagePreview,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className='p-4 lg:p-6 border-t border-base-200 bg-base-100 w-full'>
      {imagePreview && (
        <div className='mb-4 flex items-center gap-2'>
          <div className='relative'>
            <img
              src={imagePreview}
              alt="Preview"
              className='w-20 h-20 object-cover rounded-xl shadow-sm border border-base-200'
            />
            <button
              onClick={removeImage}
              className='absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-error-content flex items-center justify-center shadow-md hover:scale-110 transition-transform'
              type='button'
            >
              <X className='size-4' />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className='flex items-center gap-3'>
        <div className='flex-1 flex items-center gap-2 bg-base-200/40 rounded-xl px-4 py-2 border border-base-200 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all'>
          <input
            type="text"
            className='w-full bg-transparent border-0 outline-none text-base placeholder:text-base-content/40 focus:ring-0'
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type='button'
            className='btn btn-sm btn-ghost btn-circle text-base-content/60 hover:text-primary hover:bg-primary/10 transition-all'
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type='submit'
          className='btn btn-primary btn-sm btn-circle hover:shadow-lg transition-all'
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
