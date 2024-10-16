import {UsersIcon} from '@sanity/icons'

export default {
  title: 'Client',
  name: 'client',
  type: 'document',
  icon: UsersIcon,
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Logo',
      name: 'logo',
      type: 'image',
    },
  ],
}
