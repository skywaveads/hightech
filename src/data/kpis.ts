export interface KPI {
  id: string;
  value: number;
  suffix: string;
  label: string;
  labelAr: string;
  icon?: string; // اسم أيقونة من lucide-react
}

export const kpis: KPI[] = [
  {
    id: 'clients',
    value: 3000,
    suffix: '+',
    label: 'Active Clients',
    labelAr: 'عميل نشط',
    icon: 'Users'
  },
  {
    id: 'material',
    value: 25,
    suffix: 'M m²',
    label: 'Material Cut',
    labelAr: 'مليون متر مربع من المواد المقطوعة',
    icon: 'Scissors'
  },
  {
    id: 'satisfaction',
    value: 98,
    suffix: '%',
    label: 'Client Satisfaction',
    labelAr: 'رضا العملاء',
    icon: 'ThumbsUp'
  },
  {
    id: 'centers',
    value: 4,
    suffix: '',
    label: 'Regional Service Centers',
    labelAr: 'مراكز خدمة إقليمية',
    icon: 'Building'
  }
]; 