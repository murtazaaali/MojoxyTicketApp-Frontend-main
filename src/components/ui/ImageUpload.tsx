import { useEffect, useMemo } from "react";
import { Upload, X } from "lucide-react";

interface ImageUploadProps {
    value: File | string | "";
    onChange: (file: File | string) => void;
    error?: string;
    label?: string;
    accept?: string;
    className?: string;
}

const ImageUpload = ({
    value,
    onChange,
    error,
    label = "Upload Image",
    accept = "image/*",
    className = "",
}: ImageUploadProps) => {
    // Memoized preview URL
    const preview = useMemo(() => {
        if (value instanceof File) {
            return URL.createObjectURL(value);
        } else if (typeof value === "string" && value !== "") {
            return value;
        } else {
            return null;
        }
    }, [value]);

    // Cleanup Object URLs when value changes
    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            return () => URL.revokeObjectURL(url);
        }
    }, [value]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        // Check if filename contains space
        if (/\s/.test(file.name)) {
            alert("File name must not contain spaces. Please rename your file.");

            // Reset input
            e.target.value = "";

            return;
        }

        onChange(file);
    };


    const handleRemove = () => {
        onChange("");
    };

    return (
        <div className={className}>
            {label && (
                <label className="block text-sm font-medium text-gray-300 mb-2">
                    {label}
                </label>
            )}

            <div className="space-y-4">
                <div className="relative">
                    <input
                        type="file"
                        accept={accept}
                        className={`w-full bg-white/5 border ${error ? "border-red-500" : "border-white/10"
                            } rounded-xl px-4 py-3 text-white placeholder-gray-500 
                        focus:outline-none focus:border-purple-500 focus:ring-2 
                        focus:ring-purple-500/20 transition-all file:mr-4 file:py-2 file:px-4
                        file:rounded-lg file:border-0 file:text-sm file:font-semibold
                        file:bg-purple-500/20 file:text-purple-300 hover:file:bg-purple-500/30
                        file:cursor-pointer cursor-pointer`}
                        onChange={handleFileChange}
                    />
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                {preview && (
                    <div className="relative inline-block">
                        <div className="relative group">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full max-w-md h-auto rounded-lg border-2 border-white/20 shadow-lg"
                                onError={(e) => {
                                    e.currentTarget.src = "";
                                    e.currentTarget.alt = "Failed to load image";
                                }}
                            />
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="absolute top-2 right-2 bg-red-500/80 hover:bg-red-600 
                                text-white rounded-full p-2 opacity-0 group-hover:opacity-100 
                                transition-opacity duration-200"
                                title="Remove image"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-gray-400 mt-2">Image Preview</p>
                    </div>
                )}

                {!preview && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Upload className="w-4 h-4" />
                        <span>Upload an image file (PNG, JPG, JPEG, GIF, WEBP)</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;
