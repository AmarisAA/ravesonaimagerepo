import type { Schema, Struct } from '@strapi/strapi'

export interface SizeInfoSize extends Struct.ComponentSchema {
  collectionName: 'components_size_info_sizes'
  info: {
    description: ''
    displayName: 'size'
    icon: 'collapse'
  }
  attributes: {
    sizes: Schema.Attribute.Enumeration<['S', 'MD', 'L', 'XL', 'XXL']>
  }
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'size-info.size': SizeInfoSize
    }
  }
}
