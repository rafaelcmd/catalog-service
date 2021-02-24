export const castMemberConfig = {
  name: 'esv6',
  connector: 'esv6',
  index: 'catalog',
  version: 7,
  debug: process.env.APP_ENV === 'dev',
  defaultSize: 50,
  configuration: {
    node: process.env.ELASTIC_SEARCH_HOST,
    requestTimeout: process.env.ELASTIC_SEARCH_REQUEST_TIMEOUT,
    pingTimeout: process.env.ELASTIC_SEARCH_PING_TIMEOUT
  },
  mappingProperties: {
    docType: {
      type: 'keyword',
    },
    id: {
      type: 'keyword'
    },
    name: {
      type: 'text',
      fields: {
        keyword: {
          type: 'keyword',
          // eslint-disable-next-line @typescript-eslint/naming-convention
          ignore_above: 256
        }
      }
    },
    type: {
      type: 'number'
    },
    deletedAt: {
      type: 'date'
    },
    createdAt: {
      type: 'date'
    },
    updatedAt: {
      type: 'date'
    }
  }
};