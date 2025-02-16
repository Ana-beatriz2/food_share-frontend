export function formataDiasFuncionamento(funcionamentos) {
    return funcionamentos.map(funcionamento => funcionamento.dia).join(', ');
}

export function formataHorariosFuncionamento(funcionamentos) {
    return funcionamentos.map(funcionamento => `${funcionamento.hora_inicio.slice(0, 5)} às ${funcionamento.hora_fim.slice(0, 5)}`).join(', ');
}