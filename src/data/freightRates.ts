/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface FreightLookupResult {
  km: number;
  ratePerTon: number;
  found: boolean;
  status: 'sin_km' | 'encontrada' | 'estimada' | 'fuera_de_rango';
  statusLabel: string;
}

export const FREIGHT_RATES_BY_KM: number[] = Array.from({ length: 1000 }, (_, i) => {
  const km = i + 1;
  return Math.round(15000 + km * 105.5);
});

/**
 * Obtiene la tarifa de flete en $/t segun los kilometros recorridos.
 * Emula exactamente la formula Excel:
 * =IFERROR(INDEX('Tarifas de Flete'!$B$4:$B$1003,MATCH($B$12,'Tarifas de Flete'!$A$4:$A$1003,0)),0)
 */
export function getFreightRate(kmInput: number | string | null | undefined): FreightLookupResult {
  const km = Math.round(Number(kmInput) || 0);
  if (km <= 0) {
    return {
      km: 0,
      ratePerTon: 0,
      found: false,
      status: 'sin_km',
      statusLabel: 'Sin km cargado (0 km)'
    };
  }

  if (km >= 1 && km <= FREIGHT_RATES_BY_KM.length) {
    const rate = FREIGHT_RATES_BY_KM[km - 1];
    return {
      km,
      ratePerTon: rate,
      found: true,
      status: 'encontrada',
      statusLabel: 'Tarifa encontrada'
    };
  }

  const lastRate = FREIGHT_RATES_BY_KM[FREIGHT_RATES_BY_KM.length - 1] || 120500;
  return {
    km,
    ratePerTon: lastRate,
    found: true,
    status: 'estimada',
    statusLabel: 'Tarifa estimada (+1000 km)'
  };
}
