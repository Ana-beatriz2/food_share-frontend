

export default function transformDate(date) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}