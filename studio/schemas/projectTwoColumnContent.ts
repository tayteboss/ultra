import { BlockContentIcon } from '@sanity/icons';

export default {
	title: 'Two Column Content',
	name: 'projectTwoColumnContent',
	type: 'document',
	icon: BlockContentIcon,
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string",
		},
		{
			title: 'Content',
			name: 'content',
			type: "array",
			of: [
				{
					type: "block",
					styles: [],
					lists: [],
					marks: {
						decorators: [],
					}
				},
			]
		}
	]
}