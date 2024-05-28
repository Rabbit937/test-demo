export interface INav {
	path: string;
	title: string;
	disabled?: boolean;
}

export interface menuItem {
	path: string;
	meta: {
		name: string;
		index: string;
	};
	children: menuItem[];
}
