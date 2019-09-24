export const classes = (...classNames: (string | undefined | null)[]) => {
	return classNames.filter(className => !!className).join(" ");
};

export const mergeObjectKeys = <T>(o1: T, o2: T) => {
	return {...o1, ...o2};
};
