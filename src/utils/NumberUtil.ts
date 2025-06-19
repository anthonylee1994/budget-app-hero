export const NumberUtil = {
    formatCurrency: (value: number) => {
        return value.toLocaleString("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2});
    },
};
