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
    slug: string
  };
  
export  type YachtDetailItem = {
    [key: string]: number | string | undefined;
  };


  export type Yacht = {
    name: string;
    slug: string;
    thumbnail: {
      image: string;
      altText: string;
    };
    length: number;
    prices: prices[];
    cabins: number;
    capacity: number;
    builder: string;
    built: number;
  };