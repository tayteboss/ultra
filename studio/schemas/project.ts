import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({type: 'project'}),
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 200,
        slugify: (input: string) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
    },
    {
      title: 'Client',
      name: 'client',
      type: 'string',
    },
    {
      title: 'Inactive',
      name: 'inactive',
      type: 'boolean',
      description: 'This will hide the project from the front-end.',
      validation: (Rule: any) => Rule.required(),
    },
    {
      title: 'Thumbnail Strip',
      name: 'thumbnailStrip',
      type: 'array',
      of: [
        {
          title: 'Image',
          type: 'image',
          fields: [
            {
              title: 'Alt',
              name: 'alt',
              type: 'string',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
        {
          title: 'Video',
          type: 'mux.video',
        },
      ],
    },
    {
      title: 'Hero Title',
      name: 'heroTitle',
      type: 'string',
    },
    {
      title: 'Hero Image',
      name: 'heroImage',
      type: 'image',
      fields: [
        {
          title: 'Alt',
          name: 'alt',
          type: 'string',
        },
      ],
      description: 'Please use an image or video, not both.',
    },
    {
      title: 'Mobile Hero Image',
      name: 'mobileHeroImage',
      type: 'image',
    },
    {
      title: 'Hero Video',
      name: 'heroVideo',
      type: 'mux.video',
      description: 'Please use an image or video, not both.',
    },
    {
      title: 'Mobile Hero Video',
      name: 'mobileHeroVideo',
      type: 'mux.video',
    },
    {
      title: 'Page Builder',
      name: 'pageBuilder',
      type: 'array',
      of: [
        {type: 'projectFullScreenMedia'},
        {type: 'projectTwoColumnMedia'},
        {type: 'projectRichText'},
        {type: 'projectTwoColumnContent'},
      ],
    },
    {
      title: 'Related Project',
      name: 'relatedProject',
      type: 'reference',
      to: [{type: 'project'}],
    },
  ],
}
