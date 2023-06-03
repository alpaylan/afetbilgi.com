import { OutputKind, OutputSummary } from '../interfaces/Output/Output';

export const mockOutputSummaries: OutputSummary[] = [
  {
    id: '1',
    name: 'Open Shops',
    table: 'Table 1',
    kind: OutputKind.PAGE,
    isActive: true,
    lastUpdatedBy: 'Eren',
    lastUpdatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Election Results',
    table: 'Secim 2023',
    kind: OutputKind.PAGE,
    isActive: false,
    lastUpdatedBy: 'AA',
    lastUpdatedAt: new Date(),
  },
  {
    id: '3',
    name: 'New Page',
    table: 'Table 2',
    kind: OutputKind.PAGE,
    isActive: true,
    lastUpdatedBy: 'Emre',
    lastUpdatedAt: new Date(),
  },
];
