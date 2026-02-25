import { tryCatch } from "@/app/utils/helpers";
import { prices } from "@/data/types";

type SortOrder = "asc" | "desc";
type SortBy = "price" | "_updated";

type YachtFilters = {
  min?: number;
  max?: number;
  capacityMin?: number;
  capacityMax?: number;
};

type BackendPrice = {
  price?: number | null;
  type?: string | null;
};

type BackendImage = {
  image?: string | null;
  altText?: string | null;
};

type BackendYacht = {
  buildDate?: number | string | null;
  builder?: string | null;
  cabins?: number | null;
  capacity?: number | null;
  formDescription?: string | null;
  gallery?: BackendImage[] | null;
  length?: number | null;
  yachtLength?: number | null;
  mainDescription?: string | null;
  moreDetails?: string | null;
  moreDetailsTitle?: string | null;
  name?: string | null;
  price?: number | null;
  priceRate?: string | null;
  prices?: BackendPrice[] | null;
  shortDescription?: string | null;
  slug?: string | null;
  thumbnail?: BackendImage | null;
  title?: string | null;
};

const YACHTS_BACKEND_BASE_URL = (
  process.env.DXBERIENCE_BACKEND_URL || "https://dxberienceapi.up.railway.app/api/v1"
).replace(/\/$/, "");
const DEFAULT_YACHT_IMAGE = "/images/yachts_hero_img.jpeg";

const normalizePrices = (
  priceList: BackendPrice[] | null | undefined,
  price: number | null | undefined,
  priceRate: string | null | undefined
): prices[] => {
  if (Array.isArray(priceList) && priceList.length > 0) {
    return priceList
      .filter(
        (
          entry
        ): entry is {
          price: number;
          type: string;
        } => typeof entry?.price === "number" && typeof entry?.type === "string"
      )
      .map((entry) => ({ price: entry.price, type: entry.type }));
  }

  if (typeof price === "number") {
    return [
      {
        price,
        type: priceRate && priceRate.trim() ? priceRate : "hourly",
      },
    ];
  }

  return [];
};

const normalizeThumbnail = (thumbnail: BackendImage | null | undefined, name: string) => ({
  image: thumbnail?.image || DEFAULT_YACHT_IMAGE,
  altText: thumbnail?.altText || `${name} yacht image`,
});

const normalizeGallery = (
  gallery: BackendImage[] | null | undefined,
  yachtName: string
) => {
  if (!Array.isArray(gallery)) {
    return [];
  }

  return gallery
    .filter((entry): entry is BackendImage => Boolean(entry?.image))
    .map((entry) => ({
      image: entry.image as string,
      altText: entry.altText || `${yachtName} gallery image`,
    }));
};

const toSortField = (sortBy: SortBy): string =>
  sortBy === "_updated" ? "_updatedAt" : "price";

const buildYachtsUrl = (
  sortOrder: SortOrder,
  sortBy: SortBy,
  filter?: YachtFilters
): string => {
  const url = new URL(`${YACHTS_BACKEND_BASE_URL}/yachts`);
  url.searchParams.set("sortOrder", sortOrder);
  url.searchParams.set("sortBy", toSortField(sortBy));

  if (typeof filter?.min === "number") {
    url.searchParams.set("price__gte", String(filter.min));
  }
  if (typeof filter?.max === "number") {
    url.searchParams.set("price__lte", String(filter.max));
  }
  if (typeof filter?.capacityMin === "number") {
    url.searchParams.set("capacity__gte", String(filter.capacityMin));
  }
  if (typeof filter?.capacityMax === "number") {
    url.searchParams.set("capacity__lte", String(filter.capacityMax));
  }

  return url.toString();
};

const getYachtBySlugUrl = (slug: string): string =>
  `${YACHTS_BACKEND_BASE_URL}/yachts/${encodeURIComponent(slug)}`;

async function fetchBackend<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  const payload = (await response.json().catch(() => null)) as
    | { message?: string }
    | T
    | null;

  if (!response.ok) {
    const errorMessage =
      payload && typeof payload === "object" && "message" in payload
        ? (payload.message as string)
        : "Failed to fetch data from Dxberience backend.";
    throw new Error(errorMessage);
  }

  return payload as T;
}

const mapYachtSummary = (item: BackendYacht) => {
  const yachtName = item.name || item.title || "";

  return {
    name: yachtName,
    slug: item.slug || "",
    prices: normalizePrices(item.prices, item.price, item.priceRate),
    cabins: typeof item.cabins === "number" ? item.cabins : 0,
    capacity: typeof item.capacity === "number" ? item.capacity : 0,
    builder: item.builder || "",
    length:
      typeof item.length === "number"
        ? item.length
        : typeof item.yachtLength === "number"
          ? item.yachtLength
          : 0,
    thumbnail: normalizeThumbnail(item.thumbnail, yachtName),
  };
};

const mapYachtDetail = (item: BackendYacht) => {
  const yachtName = item.name || item.title || "";

  return {
    name: yachtName,
    slug: item.slug || "",
    mainDescription: item.mainDescription || "",
    formDescription: item.formDescription || item.shortDescription || "",
    moreDetails: item.moreDetails || "",
    moreDetailsTitle: item.moreDetailsTitle || "",
    prices: normalizePrices(item.prices, item.price, item.priceRate),
    cabins: item.cabins ?? null,
    builder: item.builder ?? null,
    buildDate: item.buildDate ?? null,
    capacity: item.capacity ?? null,
    length:
      typeof item.length === "number"
        ? item.length
        : typeof item.yachtLength === "number"
          ? item.yachtLength
          : null,
    shortDescription: item.shortDescription ?? "",
    thumbnail: normalizeThumbnail(item.thumbnail, yachtName),
    gallery: normalizeGallery(item.gallery, yachtName),
  };
};

export async function getBySlug(slug: string) {
  const yacht = await fetchBackend<BackendYacht>(getYachtBySlugUrl(slug));
  return mapYachtDetail(yacht);
}

export async function getAll(
  sortOrder: SortOrder = "desc",
  filter?: YachtFilters,
  sortBy: SortBy = "_updated"
){
    const { data: result, error } = await tryCatch(
      fetchBackend<BackendYacht[]>(buildYachtsUrl(sortOrder, sortBy, filter))
    );

    if (error){
      return {data: null, error};
    }

    return {data: result.map(mapYachtSummary), error: null};
}
