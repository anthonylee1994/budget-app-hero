import React, {useState, useRef} from "react";
import {FaTrash, FaPlus} from "react-icons/fa";
import {addToast, Button} from "@heroui/react";
import {apiClient} from "@/utils/apiClient";
import {Avatar} from "@heroui/react";

interface Props {
    value?: string;
    onChange: (url: string | undefined) => void;
}

export const AvatarUploader: React.FC<Props> = ({value, onChange}) => {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (file: File) => {
        if (!file.type.startsWith("image/")) {
            addToast({
                title: "檔案格式錯誤",
                description: "請選擇圖片檔案",
                color: "danger",
            });
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            // 5MB limit
            addToast({
                title: "檔案過大",
                description: "請選擇小於 5MB 的圖片",
                color: "danger",
            });
            return;
        }

        setIsUploading(true);

        try {
            // Create a FormData object for file upload
            const formData = new FormData();
            formData.append("image", file);

            // Upload to the /photos endpoint as per API specification
            const response = await apiClient.post("/photos", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            // API returns { url: "https://example.com/uploaded-image.jpg" }
            const imageUrl = response.data.url;

            onChange(imageUrl);
        } catch (error: any) {
            console.error("Upload error:", error);

            let errorMessage = "請稍後再試";

            addToast({
                title: "上傳失敗",
                description: errorMessage,
                color: "danger",
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleRemoveAvatar = () => {
        onChange(undefined);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="relative">
            <Avatar isDisabled={isUploading} className="mb-5 h-24 w-24" src={value} />
            <Button
                isLoading={isUploading}
                isIconOnly
                isDisabled={isUploading}
                className="absolute bottom-4 right-0 rounded-full"
                color={value ? "danger" : "primary"}
                size="sm"
                onPress={value ? handleRemoveAvatar : openFileDialog}
            >
                {value ? <FaTrash /> : <FaPlus />}
            </Button>
            <input type="file" accept="image/png, image/jpeg" ref={fileInputRef} onChange={handleFileInputChange} className="hidden" />
        </div>
    );
};
