import { ImageIcon } from '@sanity/icons';

export default {
  title: 'Full Screen Media',
  name: 'projectFullScreenMedia',
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
      title: 'Video',
      name: 'video',
      type: 'mux.video',
	  description: 'Please only use an image or video field'
    },
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      description: 'Please only use an image or video field'
    },
  ]
}
