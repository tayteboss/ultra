import { UsersIcon } from '@sanity/icons';

export default {
	title: "Client",
	name: "client",
	type: "document",
	icon: UsersIcon,
	fields: [
		{
			title: "Title",
			name: "title",
			type: "string"
		},
		{
			title: "Url",
			name: "url",
			type: "url"
		}
	]
}