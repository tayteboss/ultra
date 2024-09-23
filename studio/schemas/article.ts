export default {
  title: 'Article',
  name: 'article',
  type: 'document',
  fields: [
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
      title: 'Date',
      name: 'date',
      type: 'date',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
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
      title: 'Related Article',
      name: 'relatedArticle',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'article'}]}],
    },
  ],
}
