import {HomeIcon} from '@sanity/icons'

export default {
  title: 'Contact Page',
  name: 'contactPage',
  type: 'document',
  icon: HomeIcon,
  fields: [
    {
      title: 'Reference Title',
      name: 'referenceTitle',
      type: 'string',
      description: 'This is an internal reference title.',
    },
    {
      title: 'SEO Title',
      name: 'seoTitle',
      type: 'string',
      description: 'This is the SEO title that appears in search engines.',
    },
    {
      title: 'SEO Description',
      name: 'seoDescription',
      type: 'string',
      description: 'This is the SEO description that appears in search engines.',
    },
    {
      title: 'Prefix Hero Title',
      name: 'prefixHeroTitle',
      type: 'string',
      description: 'First part of title before showreel video',
    },
    {
      title: 'Suffix Hero Title',
      name: 'suffixHeroTitle',
      type: 'string',
      description: 'Last part of title after showreel video',
    },
    {
      title: 'Showreel video',
      name: 'showreelVideo',
      type: 'mux.video',
    },
    {
      title: 'Work with us CTA',
      name: 'newBusinessCta',
      type: 'text',
    },
    {
      title: 'Work with us Button Title',
      name: 'newBusinessButtonTitle',
      type: 'string',
    },
    {
      title: 'Talk to us CTA',
      name: 'generalEnquiriesCta',
      type: 'text',
    },
    {
      title: 'Talk to us Button Title',
      name: 'generalEnquiriesButtonTitle',
      type: 'string',
    },
    {
      title: 'Join us CTA',
      name: 'contactCta',
      type: 'text',
    },
    {
      title: 'Join us Button Title',
      name: 'contactButtonTitle',
      type: 'string',
    },
    {
      title: 'Follow us CTA',
      name: 'followUsCta',
      type: 'text',
    },
    {
      title: 'Find us CTA',
      name: 'findUsCta',
      type: 'text',
    },
    {
      title: 'Newsletter CTA',
      name: 'newsletterCta',
      type: 'text',
    },
  ],
}
