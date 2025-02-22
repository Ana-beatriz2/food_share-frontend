import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function transformDate(date) {
    return format(new Date(date), 'dd/MM/yyyy', { locale: ptBR })
}