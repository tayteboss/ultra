import { ImageIcon } from '@sanity/icons';

export default {
	title: 'Two Column Media',
	name: 'projectTwoColumnMedia',
	type: 'document',
	icon: ImageIcon,
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
			description: 'This is an internal reference title.',
		},
		{
			title: 'Left Image',
			name: 'leftImage',
			type: 'image',
			description: 'Please only use an image or video field'
		},
		{
			title: 'Left Video',
			name: 'leftVideo',
			type: 'mux.video',
			description: 'Please only use an image or video field'
		},
		{
			title: 'Right Image',
			name: 'rightImage',
			type: 'image',
			description: 'Please only use an image or video field'
		},
		{
			title: 'Right Video',
			name: 'rightVideo',
			type: 'mux.video',
			description: 'Please only use an image or video field'
		},
	]
}