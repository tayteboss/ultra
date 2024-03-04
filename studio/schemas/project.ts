import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export default {
	title: 'Project',
	name: 'project',
	type: 'document',
	orderings: [orderRankOrdering],
	fields: [
		orderRankField({ type: "project" }),
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
				slugify: (input: string) => input
						.toLowerCase()
						.replace(/\s+/g, '-')
						.slice(0, 200)
			},
			validation: (Rule: any) => Rule.required()
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
			description: 'This will hide the project from the front-end.'
		},
		{
			title: 'Thumbnail Strip',
			name: 'thumbnailStrip',
			type: 'array',
			of: [
				{
					type: 'image',
					fields: [
						{
							title: 'Alt',
							name: 'alt',
							type: 'string',
							options: {
								isHighlighted: true
							}
						}
					]
				},
				{
					type: 'mux.video'
				}
			]
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
				}
			]
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
			]
		},
		// pick one related project
		{
			title: 'Related Project',
			name: 'relatedProject',
			type: 'reference',
			to: [{type: 'project'}]
		},
	]
}