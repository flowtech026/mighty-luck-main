export interface Bonus {
  id: string;
  title: string;
  desc: string;
  iconType: string;
}

export interface Payment {
  id: string;
  titleExpanded: string;
  titleClosed: string;
  descClosed: string;
  symbol?: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
}
