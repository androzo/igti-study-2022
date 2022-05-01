export interface IDespesa {
  id: number;
  descricao: string;
  categoria: string;
  valor: number;
  dia: number;
}

export function getAllDespesasEndpoint(): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas`).then(handleResponse);
}

export function getDespesasEndpoint(
  year: string,
  month: string
): Promise<IDespesa[]> {
  return fetch(`http://localhost:3001/despesas?mes=${year}-${month}`).then(
    handleResponse
  );
}

function handleResponse(resp: Response) {
  if (resp.ok) {
    return resp.json();
  } else {
    throw new Error(resp.statusText);
  }
}
