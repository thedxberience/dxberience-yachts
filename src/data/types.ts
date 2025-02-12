export type prices = {
    type: string;
    price: number;
  };
  


export  type YachListingCardProps = {
    length: number;
    pricePerHour: number | undefined;
    name: string;
    imageUrl: string;
    imageAlt: string;
    builder?: string;
    cabins?: number;
    capacity?: number;
    built?: number;
  };
  
export  type YachtDetailItem = {
    [key: string]: number | string | undefined;
  };