import React, {useEffect} from "react";
import {Select, SelectItem, Tabs, Tab, SelectSection} from "@heroui/react";
import {useCategoryStore} from "@/stores/categoryStore";
import {useTransactionStore} from "@/stores/transactionStore";

export const FilterSection: React.FC = () => {
    const {categories, fetchCategories} = useCategoryStore();
    const {filters, setFilters} = useTransactionStore();

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleSortChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        if (selectedKey === "date_desc") {
            setFilters({recent: "desc", by_amount: undefined});
        } else if (selectedKey === "date_asc") {
            setFilters({recent: "asc", by_amount: undefined});
        } else if (selectedKey === "amount_desc") {
            setFilters({by_amount: "desc", recent: undefined});
        } else if (selectedKey === "amount_asc") {
            setFilters({by_amount: "asc", recent: undefined});
        }
    };

    const handleTypeChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        setFilters({
            budget_type: selectedKey === "all" ? undefined : (selectedKey as "income" | "expense"),
            page: 1,
        });
    };

    const handleCategoryChange = (keys: any) => {
        const selectedKey = Array.from(keys)[0] as string;
        setFilters({
            category_id: selectedKey === "all" || selectedKey === undefined ? undefined : parseInt(selectedKey),
            page: 1,
        });
    };

    const handlePeriodChange = (period: "weekly" | "monthly" | "yearly") => {
        setFilters({
            period,
            page: 1,
            date: new Date().toISOString().split("T")[0], // Current date as base
        });
    };

    const getCurrentSortKey = () => {
        if (filters.recent === "desc") return "date_desc";
        if (filters.recent === "asc") return "date_asc";
        if (filters.by_amount === "desc") return "amount_desc";
        if (filters.by_amount === "asc") return "amount_asc";
        return "date_desc";
    };

    return (
        <div className="space-y-4">
            {/* Filter Dropdowns */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Sort By */}
                <div>
                    <Select size="lg" selectedKeys={[getCurrentSortKey()]} onSelectionChange={handleSortChange} label="排序方式" placeholder="選擇排序方式">
                        <SelectItem key="date_desc">日期: 新到舊</SelectItem>
                        <SelectItem key="date_asc">日期: 舊到新</SelectItem>
                        <SelectItem key="amount_desc">金額: 高到低</SelectItem>
                        <SelectItem key="amount_asc">金額: 低到高</SelectItem>
                    </Select>
                </div>

                {/* Type Filter */}
                <div>
                    <Select size="lg" selectedKeys={[filters.budget_type || "all"]} onSelectionChange={handleTypeChange} label="類型" placeholder="選擇類型">
                        <SelectItem key="all">全部類型</SelectItem>
                        <SelectItem key="income">收入</SelectItem>
                        <SelectItem key="expense">支出</SelectItem>
                    </Select>
                </div>

                {/* Category Filter */}
                <div>
                    <Select size="lg" selectedKeys={[filters.category_id?.toString() || "all"]} onSelectionChange={handleCategoryChange} label="分類" placeholder="選擇分類">
                        <SelectItem key="all">全部分類</SelectItem>
                        <React.Fragment>
                            <SelectSection title="收入">
                                {categories
                                    .filter(category => category.budget_type === "income")
                                    .map(category => (
                                        <SelectItem key={category.id} textValue={category.name}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full" style={{backgroundColor: category.color}} />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                            </SelectSection>
                            <SelectSection title="支出">
                                {categories
                                    .filter(category => category.budget_type === "expense")
                                    .map(category => (
                                        <SelectItem key={category.id} textValue={category.name}>
                                            <div className="flex items-center gap-2">
                                                <div className="h-3 w-3 rounded-full" style={{backgroundColor: category.color}} />
                                                {category.name}
                                            </div>
                                        </SelectItem>
                                    ))}
                            </SelectSection>
                        </React.Fragment>
                    </Select>
                </div>
            </div>

            {/* Period Buttons */}
            <div className="flex gap-2">
                <Tabs
                    className="md:w-1/4"
                    fullWidth
                    selectedKey={filters.period}
                    onSelectionChange={key => (key === filters.period ? undefined : handlePeriodChange(key as "weekly" | "monthly" | "yearly"))}
                >
                    <Tab key="weekly" title="本週" />
                    <Tab key="monthly" title="本月" />
                    <Tab key="yearly" title="今年" />
                </Tabs>
            </div>
        </div>
    );
};
