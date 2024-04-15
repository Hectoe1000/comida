export class GenericFilterRequest {
    numeroPagina: number  = 1;
    cantidad: number  = 50;
    filtros: ItemFilter[] = [];
}
export class ItemFilter {
    name: string  = "";
    value: string  = "";
}