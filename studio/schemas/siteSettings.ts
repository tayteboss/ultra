export default {
  title: 'Site Settings',
  name: 'siteSettings',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
      initialValue: 'Site Settings',
    },
    {
      title: 'General Enquiries Email',
      name: 'generalEnquiriesEmail',
      type: 'email',
    },
    {
      title: 'New Business Email',
      name: 'newBusinessEmail',
      type: 'email',
    },
    {
      title: 'Careers Email',
      name: 'careersEmail',
      type: 'email',
    },
    {
      title: 'Instagram URL',
      name: 'instagramUrl',
      type: 'url',
    },
    {
      title: 'LinkedIn URL',
      name: 'linkedInUrl',
      type: 'url',
    },
    {
      title: 'Street Address',
      name: 'streetAddress',
      type: 'string',
    },
    {
      title: 'Post Code',
      name: 'postCode',
      type: 'string',
    },
    {
      title: 'Address URL',
      name: 'addressUrl',
      type: 'url',
    },
    {
      title: 'Accent Hex Codes',
      name: 'accentHexCodes',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      title: 'Cookies CTA',
      name: 'cookieCta',
      type: 'string',
    },
  ],
}
