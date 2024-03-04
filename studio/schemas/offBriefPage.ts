import { HomeIcon } from '@sanity/icons';

export default {
	title: "Off Brief Page",
	name: "offBriefPage",
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
			title: 'Hero Title',
			name: 'heroTitle',
			type: 'string',
		},
		{
			title: 'Gallery',
			name: 'gallery',
			type: 'array',
			of: [
				{
					type: 'image',
					fields: [
						{
							title: 'Alt',
							name: 'alt',
							type: 'string',
						}
					]
				},
			]
		}
	]
}