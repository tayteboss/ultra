import { BlockContentIcon } from '@sanity/icons';

export default {
	title: 'Rich Text',
	name: 'projectRichText',
	type: 'document',
	icon: BlockContentIcon,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'This is an internal reference title.',
		},
		{
			title: "Rich Text Content",
			name: "content",
			type: "array",
			of: [
				{
					type: "block",
					styles: [
						{title: 'H1', value: 'h1'},
						{title: 'H2', value: 'h2'},
						{title: 'H3', value: 'h3'},
						{title: 'H4', value: 'h4'},
						{title: 'Normal', value: 'normal'},
					],
					lists: [],
				},
			]
		},
		{
			title: "Optional Footer Text",
			name: "footerText",
			type: "string",
			description: "This is optional secondary field of text."
		}
	]
}