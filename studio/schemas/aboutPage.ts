import { HomeIcon } from '@sanity/icons';

export default {
	title: "About Page",
	name: "aboutPage",
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
			description: 'First part of title before clients logo',
		},
		{
			title: 'Suffix Hero Title',
			name: 'suffixHeroTitle',
			type: 'string',
			description: 'Last part of title after clients logo',
		},
		{
			title: 'Clients Logos',
			name: 'clientsLogos',
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
					],
					description: 'Please upload white png logos on a transparent background, keep all logos a similar size for best results.'
				}
			]
		},
		{
			title: 'Description',
			name: 'description',
			type: 'string',
			description: 'Content underneath hero title'
		},
		{
			title: 'Team Roles',
			name: 'teamRoles',
			type: 'array',
			of: [
				{
					type: 'string',
				}
			]
		},
		{
			title: 'Services List',
			name: 'servicesList',
			type: 'array',
			of: [
				{
					type: 'string',
				}
			]
		},
		{
			title: "Client List",
			name: "clientList",
			type: "array",
			of: [
				{ type: 'client' },
			]
		},
		{
			title: 'Location CTA',
			name: 'locationCta',
			type: 'string',
		}
	]
}