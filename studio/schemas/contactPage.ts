import { HomeIcon } from '@sanity/icons';

export default {
	title: "Contact Page",
	name: "contactPage",
	type: "document",
	icon: HomeIcon,
	fields: [
		{
			title: 'Reference Title',
			name: 'referenceTitle',
			type: 'string',
			description: 'This is an internal reference title.'
		},
		{
			title: 'SEO Title',
			name: 'seoTitle',
			type: 'string',
			description: 'This is the SEO title that appears in search engines.'
		},
		{
			title: 'SEO Description',
			name: 'seoDescription',
			type: 'string',
			description: 'This is the SEO description that appears in search engines.'
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
			type: 'mux.video'
		},
		{
			title: 'New Business CTA',
			name: 'newBusinessCta',
			type: 'string',
		},
		{
			title: 'New Business Button Title',
			name: 'newBusinessButtonTitle',
			type: 'string',
		},
		{
			title: 'General Enquiries CTA',
			name: 'generalEnquiriesCta',
			type: 'string',
		},
		{
			title: 'General Enquiries Button Title',
			name: 'generalEnquiriesButtonTitle',
			type: 'string',
		},
		{
			title: 'Careers CTA',
			name: 'contactCta',
			type: 'string',
		},
		{
			title: 'Careers Button Title',
			name: 'contactButtonTitle',
			type: 'string',
		},
	]
}