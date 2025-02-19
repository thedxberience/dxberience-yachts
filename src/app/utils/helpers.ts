export function currencyFormat(num: number) {
    return num?.toFixed().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}