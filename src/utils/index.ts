export const formatDate = (dateValue: Date | string | number) => {
    const date = new Date(dateValue);

    return new Intl.DateTimeFormat('pl-PL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(date).replace(/,/g, '');
}