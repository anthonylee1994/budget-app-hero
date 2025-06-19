import React, {useState, useCallback, useEffect} from "react";
import {Autocomplete, AutocompleteItem} from "@heroui/react";
import {Icon} from "@iconify/react";

interface IconifySearchResponse {
    icons: string[];
    total: number;
    collections: Record<
        string,
        {
            name: string;
            category: string;
        }
    >;
}

interface IconOption {
    key: string;
    label: string;
    icon: string;
}

interface Props {
    value?: string;
    onChange: (iconName: string | null) => void;
}

export const IconPicker: React.FC<Props> = ({value, onChange}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<IconOption[]>([]);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    // Search function
    const searchIcons = useCallback(async (query: string) => {
        if (!query.trim()) {
            setItems([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(`https://api.iconify.design/search?query=${encodeURIComponent(query)}&limit=20`);
            const data: IconifySearchResponse = await response.json();

            const iconOptions: IconOption[] = (data.icons || []).map(iconName => ({
                key: iconName,
                label: iconName,
                icon: iconName,
            }));

            setItems(iconOptions);
        } catch (error) {
            console.error("Failed to search icons:", error);
            setItems([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = useCallback(
        (value: string) => {
            setInputValue(value);
            searchIcons(value);
        },
        [searchIcons]
    );

    const handleSelectionChange = useCallback(
        (key: React.Key | null) => {
            if (key) {
                onChange(key.toString());
            }
        },
        [onChange]
    );

    return (
        <div className="flex flex-col gap-4">
            <Autocomplete
                label="選擇圖示"
                placeholder="輸入關鍵字搜尋圖示 (例如: money, food, car)"
                isLoading={isLoading}
                items={items}
                inputValue={inputValue}
                onClear={() => onChange(null)}
                onInputChange={handleInputChange}
                onSelectionChange={handleSelectionChange}
                startContent={<Icon icon="mdi:magnify" className="text-lg text-default-400" />}
                listboxProps={{
                    emptyContent: (
                        <div className="p-4 text-center text-default-500">
                            <Icon icon="mdi:emoticon-sad-outline" className="mx-auto mb-2 text-4xl" />
                            <p>找不到相關圖示</p>
                            <p className="text-sm">嘗試使用英文關鍵字搜尋</p>
                        </div>
                    ),
                }}
                classNames={{
                    base: "w-full",
                    listboxWrapper: "max-h-80",
                }}
            >
                {item => (
                    <AutocompleteItem key={item.key} textValue={item.label} startContent={<Icon icon={item.icon} className="flex-shrink-0 text-xl text-foreground" />}>
                        <div className="flex flex-col">
                            <span className="text-small font-medium">{item.label}</span>
                        </div>
                    </AutocompleteItem>
                )}
            </Autocomplete>
        </div>
    );
};
