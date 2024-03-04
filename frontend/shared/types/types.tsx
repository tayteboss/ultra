export type MediaType = {
	media: [
		{
			webmVideoFile: {
				url: string;
			};
			mp4VideoFile: {
				url: string;
			};
			placeholderImage: {
				url: string;
			};
		}
	];
};

export type TransitionsType = {
	hidden: {
		opacity: number;
		transition: {
			duration: number;
		};
	};
	visible: {
		opacity: number;
		transition: {
			duration: number;
			delay?: number;
		};
	};
};

export type HomePageType = {
	seoTitle: string;
	seoDescription: string;
};

export type SiteSettingsType = {
	postCode: string;
	linkedInUrl: string;
	addressUrl: string;
	newBusinessEmail: string;
	streetAddress: string;
	instagramUrl: string;
	careersEmail: string;
	generalEnquiriesEmail: string;
};

export type WorkPageType = {
	seoTitle: string;
	seoDescription: string;
};

export type ProjectType = {
	title: string;
	slug: string;
	seoDescription: string;
};

export type ContactPageType = {
	seoTitle: string;
	seoDescription: string;
};

export type OffBriefPageType = {
	seoTitle: string;
	seoDescription: string;
};

export type AboutPageType = {
	seoTitle: string;
	seoDescription: string;
};
