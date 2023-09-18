export interface Dimensions {
  width: number
  height: number
}

export interface ImagesInterface {
  alt: string
  copyright: string | null
  url: string
  dimensions: Dimensions
}

export interface TextInterface {
  type: string
  text: string
  spans: string[]
}

export interface ClientsMainInterface {
  client: ImagesInterface
}

export interface ListMainInterface {
  place: ImagesInterface
  format: string
}

export interface URLInterface {
  link_type: string
  url: string
  target: string
}

export interface BrandsMainInterface {
  brand_image_product: ImagesInterface
  brand_image_title: ImagesInterface
  brand_image_decorator: ImagesInterface
  brand_text: TextInterface[] | any
  facebook: URLInterface
  instagram: URLInterface
  cart: URLInterface
}