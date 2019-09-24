const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
export const Validators = {
	required: (value: string | null | undefined) => {
		return {
			errorName: "required",
			valid: value !== null && value !== undefined && value !== ""
		};
	},
	min: (min: number) => (value: string | null | undefined) => {
		return {
			errorName: "min",
			valid: value === null || value === undefined || value.length >= min
		};
	},
	max: (max: number) => (value: string | null | undefined) => {
		return {
			errorName: "max",
			valid: value === null || value === undefined || value.length <= max
		};
	},
	range: (min: number, max: number) => (value: string | null | undefined) => {
		return {
			errorName: "range",
			valid: value === null || value === undefined || (parseInt(value) <= max && parseInt(value) >= min)
		};
	},
	email: (value: string | null | undefined) => {
		return {
			errorName: "email",
			valid: value === null || value === undefined || emailRegex.test(value)
		};
	},
	password: (value: string | null | undefined) => {
		return {
			errorName: "password",
			valid: Validators.min(8)(value).valid
		};
	},
	url: (value: string | null | undefined) => {
		return {
			errorName: "url",
			valid: value === null || value === undefined || urlRegex.test(value)
		};
	}
};
